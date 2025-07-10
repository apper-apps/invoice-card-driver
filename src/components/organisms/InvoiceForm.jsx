import React from "react";
import ApperIcon from "@/components/ApperIcon";
import InvoiceDetails from "@/components/molecules/InvoiceDetails";
import CustomerDetails from "@/components/molecules/CustomerDetails";
import ItemsTable from "@/components/molecules/ItemsTable";
import TaxSummary from "@/components/molecules/TaxSummary";
import ActionButtons from "@/components/molecules/ActionButtons";

const InvoiceForm = ({
  invoiceData,
  onInputChange,
  onItemChange,
  totals,
  isGenerating,
  onGenerateInvoice,
  onPreview,
  onClearForm
}) => {
  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="company-header">
        <div className="flex items-center gap-3 mb-4">
          <ApperIcon name="Zap" size={40} className="text-yellow-300" />
          <div>
            <h1 className="company-name">S M Electrical</h1>
            <p className="text-primary-100 text-sm">Professional Electrical Services</p>
          </div>
        </div>
        <div className="company-details">
          <p>3, 304, Datt Kripa Apartment, Shankar Mandir Road</p>
          <p>Fine Mens Wear, Kalwa East, Thane, Maharashtra, 400605</p>
          <div className="flex justify-between items-center mt-3">
            <p>GSTIN: 27HACPM9017C1ZR</p>
            <p>Mobile: 9324538480</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <InvoiceDetails
        invoiceData={invoiceData}
        onInputChange={onInputChange}
      />

      {/* Customer Details */}
      <CustomerDetails
        invoiceData={invoiceData}
        onInputChange={onInputChange}
      />

      {/* Items Table */}
      <ItemsTable
        items={invoiceData.items}
        onItemChange={onItemChange}
      />

{/* Tax Summary */}
      <TaxSummary 
        totals={totals} 
        invoiceData={invoiceData}
        onInputChange={onInputChange}
      />
      {/* Action Buttons */}
      <ActionButtons
        isGenerating={isGenerating}
        onGenerateInvoice={onGenerateInvoice}
        onPreview={onPreview}
        onClearForm={onClearForm}
      />
    </div>
  );
};

export default InvoiceForm;