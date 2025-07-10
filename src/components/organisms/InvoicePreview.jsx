import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { formatCurrency, formatDate } from "@/utils/helpers";

const InvoicePreview = ({ invoiceData, onClose }) => {
  const getItemsWithValues = () => {
    return invoiceData.items.filter(item => 
      item.description.trim() && item.quantity > 0 && item.rate > 0
    );
  };

  const itemsWithValues = getItemsWithValues();

  return (
    <div className="invoice-preview">
      <div className="flex justify-between items-center mb-6 no-print">
        <h2 className="text-xl font-semibold text-gray-800">Invoice Preview</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ApperIcon name="X" size={24} />
        </button>
      </div>

      <div className="invoice-content">
        {/* Company Header */}
        <div className="text-center mb-8 border-b-2 border-primary-800 pb-6">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">S M ELECTRICAL</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>3, 304, Datt Kripa Apartment, Shankar Mandir Road</p>
            <p>Fine Mens Wear, Kalwa East, Thane, Maharashtra, 400605</p>
            <div className="flex justify-center gap-8 mt-2">
              <p><strong>GSTIN:</strong> 27HACPM9017C1ZR</p>
              <p><strong>Mobile:</strong> 9324538480</p>
            </div>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Invoice Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Invoice No:</strong> {invoiceData.invoiceNumber}</p>
              <p><strong>Invoice Date:</strong> {formatDate(invoiceData.invoiceDate)}</p>
              <p><strong>Due Date:</strong> {formatDate(invoiceData.dueDate)}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Bill To</h3>
            <div className="space-y-2 text-sm">
              <p><strong>{invoiceData.customerName}</strong></p>
              <p>{invoiceData.customerAddress}</p>
              {invoiceData.customerGSTIN && <p><strong>GSTIN:</strong> {invoiceData.customerGSTIN}</p>}
              <p><strong>Mobile:</strong> {invoiceData.customerMobile}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="text-left">Sr. No.</th>
                <th className="text-left">Description</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Rate</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {itemsWithValues.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{formatCurrency(item.rate)}</td>
                  <td className="text-right">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
              {/* Empty rows for spacing */}
              {Array(Math.max(0, 5 - itemsWithValues.length)).fill().map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Summary */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Amount in Words</h3>
            <p className="text-sm italic text-gray-600">
              {invoiceData.amountInWords}
            </p>
          </div>
          <div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 text-right font-medium">Subtotal:</td>
                  <td className="py-1 text-right">{formatCurrency(invoiceData.subtotal)}</td>
                </tr>
                <tr>
                  <td className="py-1 text-right font-medium">CGST @ 9%:</td>
                  <td className="py-1 text-right">{formatCurrency(invoiceData.cgst)}</td>
                </tr>
                <tr>
                  <td className="py-1 text-right font-medium">SGST @ 9%:</td>
                  <td className="py-1 text-right">{formatCurrency(invoiceData.sgst)}</td>
                </tr>
                <tr className="border-t-2 border-gray-800">
                  <td className="py-2 text-right font-bold text-lg">Grand Total:</td>
                  <td className="py-2 text-right font-bold text-lg">{formatCurrency(invoiceData.grandTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-gray-300 pt-6 mt-8">
          <p className="text-sm text-gray-600">
            Thank you for your business!
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This is a computer generated invoice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;