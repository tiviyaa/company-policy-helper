# main.py
from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
import os
import shutil
from pathlib import Path
import uuid
from database import collection
from openai import AzureOpenAI
from dotenv import load_dotenv
import aiofiles
load_dotenv()

endpoint = os.getenv("ENDPOINT")
apikey = os.getenv("AZURE_OPENAI_API_KEY")
apiversion = os.getenv("AZURE_OPENAI_API_VERSION")
vectorstoreid = os.getenv("VECTOR_STORE_ID")

client = AzureOpenAI(
    azure_endpoint = endpoint,
    api_key = apikey,
    api_version = apiversion
)

VECTOR_STORE_ID = vectorstoreid

# File upload configuration
UPLOAD_DIR = "../public/uploads" 
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

app = FastAPI(title="Policy Management API", version="1.0.0")

# CORS configuration for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PolicyBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1, max_length=100)
    effectiveDate: str  # ISO date string

class PolicyCreate(PolicyBase):
    pass

class PolicyUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    effectiveDate: Optional[str] = None

class PolicyResponse(PolicyBase):
    id: str = Field(alias="_id")
    lastUpdated: str
    file: Optional[str] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

# Helper functions
def policy_helper(policy) -> dict:
    """Convert MongoDB document to dictionary"""
    return {
        "id": str(policy["_id"]),
        "title": policy["title"],
        "description": policy["description"],
        "category": policy["category"],
        "effectiveDate": policy["effectiveDate"],
        "lastUpdated": policy["lastUpdated"],
        "file": policy.get("file")
    }

async def save_file(file: UploadFile) -> str:
    """Save uploaded file and return filename"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Generate unique filename
    file_extension = file.filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return unique_filename

def delete_file(filename: str):
    """Delete file from upload directory"""
    if filename:
        file_path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)

# API Routes

@app.get("/")
async def root():
    return {"message": "Policy Management API"}

@app.post("/policies", response_model=PolicyResponse)
async def create_policy(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    effectiveDate: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    """Create a new policy"""
    try:
        # Validate and parse effective date
        datetime.fromisoformat(effectiveDate.replace('Z', '+00:00'))
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid effectiveDate format. Use ISO format.")
    
    # Handle file upload
    filename = None
    file_id = None
    if file:
        # Step 1: Save the file locally
        filename = await save_file(file)
        file_path = os.path.join(UPLOAD_DIR, filename)

        # Step 2: Upload to OpenAI
        async with aiofiles.open(file_path, mode='rb') as f:
            file_bytes = await f.read()
            uploadedFile = client.files.create(
                file=(filename, file_bytes),
                purpose="assistants"
            )
            file_id = uploadedFile.id

         # Step 3: Attach file to vector store
        client.vector_stores.files.create(
            vector_store_id=VECTOR_STORE_ID,
            file_id=file_id
        )
    
    # Step 4: Create policy document
    policy_data = {
        "title": title,
        "description": description,
        "category": category,
        "effectiveDate": effectiveDate,
        "lastUpdated": datetime.utcnow().isoformat(),
        "file": filename
    }
    
    # Insert into database
    result = await collection.insert_one(policy_data)
    
    # Retrieve the created policy
    created_policy = await collection.find_one({"_id": result.inserted_id})
    
    return policy_helper(created_policy)

@app.get("/policies", response_model=List[PolicyResponse])
async def get_all_policies(
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
):
    """Get all policies with optional filtering and pagination"""
    query = {}
    if category:
        query["category"] = category
    
    cursor = collection.find(query).skip(skip).limit(limit).sort("lastUpdated", -1)
    policies = await cursor.to_list(length=limit)
    
    return [policy_helper(policy) for policy in policies]

@app.get("/policies/{policy_id}", response_model=PolicyResponse)
async def get_policy(policy_id: str):
    """Get a specific policy by ID"""
    try:
        object_id = ObjectId(policy_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid policy ID format")
    
    policy = await collection.find_one({"_id": object_id})
    
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    return policy_helper(policy)

@app.put("/policies/{policy_id}", response_model=PolicyResponse)
async def update_policy(
    policy_id: str,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    effectiveDate: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    """Update a policy"""
    try:
        object_id = ObjectId(policy_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid policy ID format")
    
    # Check if policy exists
    existing_policy = await collection.find_one({"_id": object_id})
    if not existing_policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    # Prepare update data
    update_data = {"lastUpdated": datetime.utcnow().isoformat()}
    
    if title is not None:
        update_data["title"] = title
    if description is not None:
        update_data["description"] = description
    if category is not None:
        update_data["category"] = category
    if effectiveDate is not None:
        try:
            datetime.fromisoformat(effectiveDate.replace('Z', '+00:00'))
            update_data["effectiveDate"] = effectiveDate
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid effectiveDate format. Use ISO format.")
    
    # Handle file upload
    if file:
        # Delete old file if exists
        old_filename = existing_policy.get("file")
        if old_filename:
            delete_file(old_filename)
        
        # Save new file
        new_filename = await save_file(file)
        update_data["file"] = new_filename
    
    # Update the policy
    await collection.update_one(
        {"_id": object_id},
        {"$set": update_data}
    )
    
    # Return updated policy
    updated_policy = await collection.find_one({"_id": object_id})
    return policy_helper(updated_policy)

@app.delete("/policies/{policy_id}")
async def delete_policy(policy_id: str):
    """Delete a policy"""
    try:
        object_id = ObjectId(policy_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid policy ID format")
    
    # Find the policy to get the filename
    policy = await collection.find_one({"_id": object_id})
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    # Delete the file if exists
    filename = policy.get("file")
    if filename:
        delete_file(filename)
    
    # Delete from database
    result = await collection.delete_one({"_id": object_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    return {"message": "Policy deleted successfully"}

@app.get("/policies/{policy_id}/download")
async def download_policy_file(policy_id: str):
    """Download the PDF file associated with a policy"""
    try:
        object_id = ObjectId(policy_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid policy ID format")
    
    policy = await collection.find_one({"_id": object_id})
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    filename = policy.get("file")
    if not filename:
        raise HTTPException(status_code=404, detail="No file associated with this policy")
    
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found on server")
    
    # Get original filename from policy title for download
    original_filename = f"{policy['title']}.pdf"
    
    return FileResponse(
        path=file_path,
        filename=original_filename,
        media_type='application/pdf'
    )

@app.get("/categories")
async def get_categories():
    """Get all unique categories"""
    categories = await collection.distinct("category")
    return {"categories": categories}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)