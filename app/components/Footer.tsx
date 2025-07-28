import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white p-4 text-center text-sm text-gray-500 shadow-inner">
      &copy; {new Date().getFullYear()} SmartHR. All rights reserved.
    </footer>
  );
}