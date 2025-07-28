import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header />

      {/* Main Section */}
      <section
        id="home"
        className="flex-grow flex flex-col md:flex-row items-center justify-center text-center md:text-left p-10 gap-12"
      >
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            AI-Powered Company Policy & HR Assistant
          </h2>
          <p className="text-gray-600 max-w-xl mb-6">
            AI-powered HR system for managing company policies and processing
            leave applications.
          </p>
          <a
            href="/dashboard"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-900 transition"
          >
            Get Started
          </a>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="/chatai.jpg"
            alt="Company Policy Illustration"
            className="w-full max-w-3xl mx-auto"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
