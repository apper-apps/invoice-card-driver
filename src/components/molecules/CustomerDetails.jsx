import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Textarea from "@/components/atoms/Textarea";

const CustomerDetails = ({ invoiceData, onInputChange }) => {
  return (
    <div className="form-section">
      <h2>
        <ApperIcon name="User" size={20} className="text-primary-600" />
        Customer Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            type="text"
            value={invoiceData.customerName}
            onChange={(e) => onInputChange("customerName", e.target.value)}
            placeholder="Enter customer name"
            required
          />
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