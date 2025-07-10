import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Label from "@/components/atoms/Label";
import Textarea from "@/components/atoms/Textarea";
import Input from "@/components/atoms/Input";

const CustomerDetails = ({ invoiceData, onInputChange, customers = [] }) => {
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    if (invoiceData.customerName && customers.length > 0) {
      const filtered = customers.filter(customer =>
        customer.customerName?.toLowerCase().includes(invoiceData.customerName.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  }, [invoiceData.customerName, customers]);

  const handleCustomerNameChange = (value) => {
    onInputChange("customerName", value);
    setShowCustomerDropdown(value.length > 0);
  };

  const handleCustomerSelection = (customer) => {
    onInputChange("customerName", customer.customerName || "");
    onInputChange("customerMobile", customer.customerMobile || "");
    onInputChange("customerAddress", customer.customerAddress || "");
    onInputChange("customerGSTIN", customer.customerGSTIN || "");
    setShowCustomerDropdown(false);
  };
  return (
    <div className="form-section">
      <h2>
        <ApperIcon name="User" size={20} className="text-primary-600" />
        Customer Details
      </h2>
      
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            type="text"
            value={invoiceData.customerName}
            onChange={(e) => handleCustomerNameChange(e.target.value)}
            placeholder="Enter customer name"
            required
            onFocus={() => setShowCustomerDropdown(invoiceData.customerName.length > 0)}
          />
          {showCustomerDropdown && filteredCustomers.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
                  onClick={() => handleCustomerSelection(customer)}
                >
                  <div className="font-medium text-gray-900">{customer.customerName}</div>
                  <div className="text-sm text-gray-500">{customer.customerMobile}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="customerMobile">Mobile Number *</Label>
          <Input
            id="customerMobile"
            type="tel"
            value={invoiceData.customerMobile}
            onChange={(e) => onInputChange("customerMobile", e.target.value)}
            placeholder="Enter mobile number"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="customerAddress">Address *</Label>
          <Textarea
            id="customerAddress"
            value={invoiceData.customerAddress}
            onChange={(e) => onInputChange("customerAddress", e.target.value)}
            placeholder="Enter customer address"
            rows={3}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="customerGSTIN">GSTIN (Optional)</Label>
          <Input
            id="customerGSTIN"
            type="text"
            value={invoiceData.customerGSTIN}
            onChange={(e) => onInputChange("customerGSTIN", e.target.value)}
            placeholder="Enter GSTIN if applicable"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;