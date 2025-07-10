import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { generateInvoicePDF } from "@/utils/pdfGenerator";
import { convertToWords, formatCurrency } from "@/utils/helpers";
import InvoicePreview from "@/components/organisms/InvoicePreview";
import InvoiceForm from "@/components/organisms/InvoiceForm";
import InvoiceService from "@/services/api/InvoiceService";

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date().toISOString().split("T")[0],
    customerName: "",
    customerAddress: "",
    customerGSTIN: "",
    customerMobile: "",
    taxEnabled: true,
    cgstRate: 9,
    sgstRate: 9,
    items: Array(10).fill().map((_, index) => ({
      id: index + 1,
      description: "",
      quantity: 0,
      rate: 0,
      amount: 0
    }))
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    loadNextInvoiceNumber();
  }, []);

  const loadNextInvoiceNumber = async () => {
    try {
      const nextNumber = await InvoiceService.getNextInvoiceNumber();
      setInvoiceData(prev => ({
        ...prev,
        invoiceNumber: nextNumber
      }));
    } catch (error) {
      toast.error("Failed to load invoice number");
    }
  };

  const handleInputChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    // Calculate amount for the item
    if (field === "quantity" || field === "rate") {
      const quantity = field === "quantity" ? parseFloat(value) || 0 : newItems[index].quantity;
      const rate = field === "rate" ? parseFloat(value) || 0 : newItems[index].rate;
      newItems[index].amount = quantity * rate;
    }

    setInvoiceData(prev => ({
      ...prev,
      items: newItems
    }));
  };

const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);
    const cgst = invoiceData.taxEnabled ? subtotal * (invoiceData.cgstRate / 100) : 0;
    const sgst = invoiceData.taxEnabled ? subtotal * (invoiceData.sgstRate / 100) : 0;
    const grandTotal = subtotal + cgst + sgst;

    return {
      subtotal,
      cgst,
      sgst,
      grandTotal,
      amountInWords: convertToWords(grandTotal)
    };
  };

  const validateForm = () => {
    if (!invoiceData.customerName.trim()) {
      toast.error("Customer name is required");
      return false;
    }
    if (!invoiceData.customerAddress.trim()) {
      toast.error("Customer address is required");
      return false;
    }
    if (!invoiceData.customerMobile.trim()) {
      toast.error("Customer mobile is required");
      return false;
    }

    const hasItems = invoiceData.items.some(item => 
      item.description.trim() && item.quantity > 0 && item.rate > 0
    );
    
    if (!hasItems) {
      toast.error("At least one item is required");
      return false;
    }

    return true;
  };

  const handleGenerateInvoice = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    try {
      const totals = calculateTotals();
      const completeInvoiceData = {
        ...invoiceData,
        ...totals
      };

      await generateInvoicePDF(completeInvoiceData);
      await InvoiceService.incrementInvoiceNumber();
      
      toast.success(`Invoice ${invoiceData.invoiceNumber} generated successfully!`);
      
      // Reset form and load next invoice number
setInvoiceData({
        invoiceNumber: "",
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        customerName: "",
        customerAddress: "",
        customerGSTIN: "",
        customerMobile: "",
        taxEnabled: true,
        cgstRate: 9,
        sgstRate: 9,
        items: Array(10).fill().map((_, index) => ({
          id: index + 1,
          description: "",
          quantity: 0,
          rate: 0,
          amount: 0
        }))
      });
      
      await loadNextInvoiceNumber();
      setShowPreview(false);
    } catch (error) {
      toast.error("Failed to generate invoice");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    if (!validateForm()) return;
    setShowPreview(true);
  };

const handleClearForm = () => {
    setInvoiceData({
      ...invoiceData,
      customerName: "",
      customerAddress: "",
      customerGSTIN: "",
      customerMobile: "",
      items: Array(10).fill().map((_, index) => ({
        id: index + 1,
        description: "",
        quantity: 0,
        rate: 0,
        amount: 0
      }))
    });
    setShowPreview(false);
  };

  const handleCustomerSelect = (customer) => {
    if (customer) {
      setInvoiceData(prev => ({
        ...prev,
        customerName: customer.name || "",
        customerAddress: customer.address || "",
        customerGSTIN: customer.gstin || "",
        customerMobile: customer.mobile || ""
      }));
    }
  };

  const handleItemSelect = (selectedItem, index) => {
    if (selectedItem && index >= 0 && index < invoiceData.items.length) {
      handleItemChange(index, "description", selectedItem.description || "");
      handleItemChange(index, "rate", selectedItem.rate || 0);
    }
  };

  const totals = calculateTotals();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Invoice Form */}
        <div className="space-y-6">
<InvoiceForm
            invoiceData={invoiceData}
            onInputChange={handleInputChange}
            onItemChange={handleItemChange}
            totals={totals}
            isGenerating={isGenerating}
            onGenerateInvoice={handleGenerateInvoice}
            onPreview={handlePreview}
            onClearForm={handleClearForm}
            customers={customers}
            items={items}
            onCustomerSelect={handleCustomerSelect}
            onItemSelect={handleItemSelect}
          />
        </div>

        {/* Invoice Preview */}
        <div className="space-y-6">
          {showPreview && (
            <InvoicePreview
              invoiceData={{ ...invoiceData, ...totals }}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;