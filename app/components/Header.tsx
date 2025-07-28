import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
        <img src="/assistant.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold">SmartHR</h1>
      </Link>

      {/* Navigation Links + Button */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <nav className="hidden md:flex gap-6">
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
        </nav>
        <a href="./login"className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-900 transition">
          Login
        </a>
      </div>
    </header>
  );
}
