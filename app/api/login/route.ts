import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://tiviyarsiri17:T178%40hello@cluster0.7mz1b2e.mongodb.net/';
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    await client.connect();
    const db = client.db('company_policy_helper');
    const users = db.collection('users');
    
    const user = await users.findOne({ email, password });
    
    if (user) {
      return NextResponse.json({ 
        success: true, 
        message: `${user.name} You Are Successfully Logged In`,
        user: { name: user.name, email: user.email }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Email or Password is not matching with our record' 
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection error' 
    }, { status: 500 });
  } finally {
    await client.close();
  }
}