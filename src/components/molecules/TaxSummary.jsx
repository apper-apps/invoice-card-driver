import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { formatCurrency } from "@/utils/helpers";

const TaxSummary = ({ totals, invoiceData, onInputChange }) => {
  return (
    <div className="form-section">
      <h2>
        <ApperIcon name="Calculator" size={20} className="text-primary-600" />
        Tax Summary
      </h2>
      
      {/* Tax Configuration */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={invoiceData.taxEnabled}
              onChange={(e) => onInputChange("taxEnabled", e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable Tax</span>
          </label>
        </div>
        
        {invoiceData.taxEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cgstRate">CGST Rate (%)</Label>
              <Input
                id="cgstRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={invoiceData.cgstRate}
                onChange={(e) => onInputChange("cgstRate", parseFloat(e.target.value) || 0)}
                placeholder="9"
              />
            </div>
            <div>
              <Label htmlFor="sgstRate">SGST Rate (%)</Label>
              <Input
                id="sgstRate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={invoiceData.sgstRate}
                onChange={(e) => onInputChange("sgstRate", parseFloat(e.target.value) || 0)}
                placeholder="9"
              />
            </div>
          </div>
        )}
      </div>
      
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
            {invoiceData.taxEnabled && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">CGST @ {invoiceData.cgstRate}%:</span>
                  <span>{formatCurrency(totals.cgst)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">SGST @ {invoiceData.sgstRate}%:</span>
                  <span>{formatCurrency(totals.sgst)}</span>
                </div>
              </>
            )}
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