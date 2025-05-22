"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/10 mt-12 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src="/logo.svg" alt="PrepWise Logo" width={24} height={24} />
            <span className="text-lg font-semibold">PrepWise</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-light-100 hover:text-white">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-light-100 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-light-100 hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-light-100 hover:text-white">
                Contact
              </Link>
            </div>
            
            <div className="text-sm text-light-100">
              © {new Date().getFullYear()} PrepWise. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
