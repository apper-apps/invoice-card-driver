import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

const InvoiceDetails = ({ invoiceData, onInputChange }) => {
  return (
    <div className="form-section">
      <h2>
        <ApperIcon name="FileText" size={20} className="text-primary-600" />
        Invoice Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            type="text"
            value={invoiceData.invoiceNumber}
            onChange={(e) => onInputChange("invoiceNumber", e.target.value)}
            placeholder="INV-001"
            disabled
          />
        </div>
        
        <div>
          <Label htmlFor="invoiceDate">Invoice Date</Label>
          <Input
            id="invoiceDate"
            type="date"
            value={invoiceData.invoiceDate}
            onChange={(e) => onInputChange("invoiceDate", e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={invoiceData.dueDate}
            onChange={(e) => onInputChange("dueDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;