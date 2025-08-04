"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/dashboard/Sidebar";
import Header from "@/app/dashboard/DashboardHeader";
import { FaFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Policy {
  id: number;
  title: string;
  description: string;
  category: string;
  effectiveDate: string;
  lastUpdated: string;
  file?: string;
}

const categories = ["All", "HR", "IT", "Finance", "Operations", "Compliance"];

const PoliciesPage = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPolicy, setNewPolicy] = useState<Policy>({
    id: 0,
    title: "",
    description: "",
    category: "",
    effectiveDate: "",
    lastUpdated: new Date().toISOString().split("T")[0],
    file: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);

  // // Load sample policies
  // useEffect(() => {
  //   const samplePolicies: Policy[] = [
  //     {
  //       id: 1,
  //       title: "Remote Work Policy",
  //       description:
  //         "Guidelines for employees working remotely, including expectations and equipment provisions.",
  //       category: "HR",
  //       effectiveDate: "2023-01-15",
  //       lastUpdated: "2023-05-20",
  //       file: "/pdfs/remote-work-policy.pdf",
  //     },
  //     {
  //       id: 2,
  //       title: "Data Security Policy",
  //       description:
  //         "Protocols for handling sensitive company data and preventing security breaches.",
  //       category: "IT",
  //       effectiveDate: "2023-02-10",
  //       lastUpdated: "2023-06-15",
  //       file: "/pdfs/remote-work-policy.pdf",
  //     },
  //     {
  //       id: 3,
  //       title: "Expense Reimbursement Policy",
  //       description:
  //         "Process for submitting and approving employee expense reports and reimbursements.",
  //       category: "Finance",
  //       effectiveDate: "2023-03-01",
  //       lastUpdated: "2023-04-10",
  //       file: "/pdfs/remote-work-policy.pdf",
  //     },
  //     {
  //       id: 4,
  //       title: "Code of Conduct",
  //       description:
  //         "Expected behavior and ethical standards for all employees company-wide.",
  //       category: "HR",
  //       effectiveDate: "2023-01-01",
  //       lastUpdated: "2023-01-01",
  //       file: "/pdfs/remote-work-policy.pdf",
  //     },
  //     {
  //       id: 5,
  //       title: "Social Media Policy",
  //       description:
  //         "Guidelines for employee use of social media in relation to the company.",
  //       category: "HR",
  //       effectiveDate: "2023-04-05",
  //       lastUpdated: "2023-07-12",
  //       file: "/pdfs/remote-work-policy.pdf",
  //     },
  //   ];
  //   setPolicies(samplePolicies);
  // }, []);

  // useEffect(() => {
  //   const fetchPolicies = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/documents");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch documents");
  //       }
  //       const data = await response.json();
  //       setPolicies(data);
  //     } catch (error) {
  //       console.error("Error fetching policies:", error);
  //     }
  //   };

  //   fetchPolicies();
  // }, []);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:8000/policies");
        if (!response.ok) {
          throw new Error("Failed to fetch policies");
        }
        const data = await response.json();
        setPolicies(data); // assumes `setPolicies` accepts the array of policies directly
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewPolicy({
      ...newPolicy,
      [name]: value,
    });
  };

  // const handleAddPolicy = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validate all required fields
  //   if (
  //     !newPolicy.title ||
  //     !newPolicy.description ||
  //     !newPolicy.category ||
  //     !newPolicy.effectiveDate ||
  //     !policyFile
  //   ) {
  //     setError("Please fill in all fields and upload a PDF file.");
  //     return;
  //   }

  //   // OPTIONAL: kalau nak submit ke backend
  //   const formData = new FormData();
  //   formData.append("title", newPolicy.title);
  //   formData.append("description", newPolicy.description);
  //   formData.append("category", newPolicy.category);
  //   formData.append("effectiveDate", newPolicy.effectiveDate);
  //   formData.append("pdf", policyFile);

  //   // Contoh: kalau ada API
  //   // await fetch("/api/policies", {
  //   //   method: "POST",
  //   //   body: formData,
  //   // });

  //   // Save locally to state (mock add)
  //   const policy: Policy = {
  //     ...newPolicy,
  //     id: policies.length + 1,
  //     lastUpdated: new Date().toISOString().split("T")[0],
  //     pdfUrl: URL.createObjectURL(policyFile!),
  //   };

  //   setPolicies([policy, ...policies]);

  //   // Reset form
  //   setNewPolicy({
  //     id: 0,
  //     title: "",
  //     description: "",
  //     category: "",
  //     effectiveDate: "",
  //     lastUpdated: new Date().toISOString().split("T")[0],
  //     pdfUrl: "",
  //   });
  //   setPolicyFile(null);
  //   setShowAddForm(false);
  //   setError(null);
  // };

  // const handleAddPolicy = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (
  //     !newPolicy.title ||
  //     !newPolicy.description ||
  //     !newPolicy.category ||
  //     !newPolicy.effectiveDate ||
  //     !policyFile
  //   ) {
  //     setError("Please fill in all fields and upload a PDF file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", newPolicy.title);
  //   formData.append("description", newPolicy.description);
  //   formData.append("category", newPolicy.category);
  //   formData.append("effectiveDate", newPolicy.effectiveDate); // match backend key
  //   formData.append("file", policyFile);

  //   try {
  //     const response = await fetch("http://localhost:8000/documents", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to upload policy");
  //     }

  //     const result = await response.json();

  //     const newAddedPolicy: Policy = {
  //       id: Date.now(), // temp ID
  //       title: result.title,
  //       description: result.description,
  //       category: result.category,
  //       effectiveDate: result.effectiveDate,
  //       lastUpdated: new Date().toISOString().split("T")[0],
  //       file: result.file, // returned from FastAPI
  //     };

  //     setPolicies([newAddedPolicy, ...policies]);
  //     setNewPolicy({
  //       id: 0,
  //       title: "",
  //       description: "",
  //       category: "",
  //       effectiveDate: "",
  //       lastUpdated: new Date().toISOString().split("T")[0],
  //       file: "",
  //     });
  //     setPolicyFile(null);
  //     setShowAddForm(false);
  //     setError(null);
  //   } catch (error: any) {
  //     setError(error.message || "An error occurred");
  //   }
  // };

  // const handleAddPolicy = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (
  //     !newPolicy.title ||
  //     !newPolicy.description ||
  //     !newPolicy.category ||
  //     !newPolicy.effectiveDate ||
  //     !policyFile
  //   ) {
  //     setError("Please fill in all fields and upload a PDF file.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", newPolicy.title);
  //   formData.append("description", newPolicy.description);
  //   formData.append("category", newPolicy.category);
  //   formData.append("effectiveDate", newPolicy.effectiveDate);
  //   formData.append("file", policyFile);

  //   try {
  //     // Fixed: Use correct endpoint URL
  //     const response = await fetch("http://localhost:8000/policies", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.detail || "Failed to upload policy");
  //     }

  //     const result = await response.json();

  //     // Fixed: Use the actual ID returned from backend
  //     const newAddedPolicy: Policy = {
  //       id: result.id, // Use the actual ID from backend response
  //       title: result.title,
  //       description: result.description,
  //       category: result.category,
  //       effectiveDate: result.effectiveDate,
  //       lastUpdated: result.lastUpdated, // Use the actual lastUpdated from backend
  //       file: result.file,
  //     };

  //     setPolicies([newAddedPolicy, ...policies]);
  //     setNewPolicy({
  //       id: 0,
  //       title: "",
  //       description: "",
  //       category: "",
  //       effectiveDate: "",
  //       lastUpdated: "",
  //       file: "",
  //     });
  //     setPolicyFile(null);
  //     setShowAddForm(false);
  //     setError(null);
  //   } catch (error: any) {
  //     setError(error.message || "An error occurred");
  //   }
  // };

  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check all required fields
    if (
      !newPolicy.title ||
      !newPolicy.description ||
      !newPolicy.category ||
      !newPolicy.effectiveDate ||
      !policyFile
    ) {
      setError("Please fill in all fields and upload a PDF file.");
      return;
    }

    // Check file is a PDF
    if (policyFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newPolicy.title);
    formData.append("description", newPolicy.description);
    formData.append("category", newPolicy.category);
    formData.append("effectiveDate", newPolicy.effectiveDate);
    formData.append("file", policyFile); // optional in backend, but required here

    try {
      const response = await fetch("http://localhost:8000/policies", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to upload policy.");
      }

      const result = await response.json();

      const newAddedPolicy: Policy = {
        id: result.id,
        title: result.title,
        description: result.description,
        category: result.category,
        effectiveDate: result.effectiveDate,
        lastUpdated: result.lastUpdated,
        file: result.file || "",
      };

      // Update UI
      setPolicies([newAddedPolicy, ...policies]);

      // Reset form
      setNewPolicy({
        id: 0,
        title: "",
        description: "",
        category: "",
        effectiveDate: "",
        lastUpdated: "",
        file: "",
      });

      setPolicyFile(null);
      setShowAddForm(false);
      setError(null);
    } catch (error: any) {
      setError(error.message || "An error occurred.");
    }
  };

  const handleDeletePolicy = (id: number) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      setPolicies(policies.filter((policy) => policy.id !== id));
    }
  };

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPolicyFile(file);
    } else {
      setError("Please upload a valid PDF file.");
      setPolicyFile(null);
    }
  };

  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (policy: Policy) => {
    setSelectedPolicy(policy);
    setShowDetailsModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search policies..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter */}
              <div className="flex-shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition duration-300 w-full md:w-auto"
                >
                  Add New Policy
                </button>
              </div>
            </div>
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl border border-black">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add New Policy
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setError(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>

                {error && (
                  <div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                    role="alert"
                  >
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleAddPolicy}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="title"
                    >
                      Policy Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newPolicy.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter policy title"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="description"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newPolicy.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the policy in detail..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="category"
                      >
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={newPolicy.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select category</option>
                        {categories
                          .filter((cat) => cat !== "All")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="effectiveDate"
                      >
                        Effective Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="effectiveDate"
                        name="effectiveDate"
                        value={newPolicy.effectiveDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="policyFile"
                      className="block text-gray-700 text-sm font-medium mb-2"
                    >
                      Upload Policy PDF <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="policyFile"
                      name="policyFile"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setError(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Save Policy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDetailsModal && selectedPolicy && (
            <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Policy Details
                  </h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    &times;
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Title:</strong> {selectedPolicy.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedPolicy.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedPolicy.category}
                  </p>
                  <p>
                    <strong>Effective Date:</strong>{" "}
                    {formatDate(selectedPolicy.effectiveDate)}
                  </p>
                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {formatDate(selectedPolicy.lastUpdated)}
                  </p>
                  {selectedPolicy.file && (
                    <p>
                      <strong>PDF:</strong>{" "}
                      <a
                        href={selectedPolicy.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {selectedPolicy.file}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Policies List */}
          {filteredPolicies.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No policies found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center"
              >
                Add New Policy
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          policy.category === "HR"
                            ? "bg-pink-100 text-pink-800"
                            : policy.category === "IT"
                            ? "bg-blue-100 text-blue-800"
                            : policy.category === "Finance"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {policy.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(policy.effectiveDate)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {policy.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {policy.description}
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Updated: {formatDate(policy.lastUpdated)}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          onClick={() => handleViewDetails(policy)}
                        >
                          View Details
                        </button>
                        {policy.file && (
                          <a
                            href={policy.file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFilePdf className="text-blue-600" size={18} />
                          </a>
                        )}
                        <button
                          onClick={() => handleDeletePolicy(policy.id)}
                          //className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          <MdDelete className="text-red-600" size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
