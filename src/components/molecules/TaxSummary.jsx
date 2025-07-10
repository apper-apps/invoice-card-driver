import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency } from "@/utils/helpers";

const TaxSummary = ({ totals }) => {
  return (
    <div className="form-section">
      <h2>
        <ApperIcon name="Calculator" size={20} className="text-primary-600" />
        Tax Summary
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Amount in Words</h3>
          <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded border">
            {totals.amountInWords}
          </p>
        </div>
        
        <div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Subtotal:</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">CGST @ 9%:</span>
              <span>{formatCurrency(totals.cgst)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">SGST @ 9%:</span>
              <span>{formatCurrency(totals.sgst)}</span>
            </div>
            <div className="border-t-2 border-gray-800 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total:</span>
                <span className="text-primary-900">{formatCurrency(totals.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;