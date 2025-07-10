import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ApperIcon name="FileText" size={32} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold">Invoice Pro</h1>
              <p className="text-primary-100 text-sm">S M Electrical - Professional Billing Solution</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-100">
              <p>GSTIN: 27HACPM9017C1ZR</p>
              <p>Mobile: 9324538480</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;