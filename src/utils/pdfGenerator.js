import jsPDF from "jspdf";
import { formatCurrency, formatDate } from "./helpers";

export const generateInvoicePDF = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF();
      
      // Company Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("S M ELECTRICAL", 105, 20, { align: "center" });
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("3, 304, Datt Kripa Apartment, Shankar Mandir Road", 105, 30, { align: "center" });
      doc.text("Fine Mens Wear, Kalwa East, Thane, Maharashtra, 400605", 105, 36, { align: "center" });
      doc.text("GSTIN: 27HACPM9017C1ZR | Mobile: 9324538480", 105, 42, { align: "center" });
      
      // Invoice Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("INVOICE", 105, 55, { align: "center" });
      
      // Invoice Details
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 20, 70);
      doc.text(`Invoice Date: ${formatDate(invoiceData.invoiceDate)}`, 20, 76);
      doc.text(`Due Date: ${formatDate(invoiceData.dueDate)}`, 20, 82);
      
      // Customer Details
      doc.setFont("helvetica", "bold");
      doc.text("Bill To:", 20, 95);
      doc.setFont("helvetica", "normal");
      doc.text(invoiceData.customerName, 20, 102);
      
      // Split address into multiple lines if too long
      const addressLines = doc.splitTextToSize(invoiceData.customerAddress, 80);
      let yPosition = 108;
      addressLines.forEach(line => {
        doc.text(line, 20, yPosition);
        yPosition += 6;
      });
      
      if (invoiceData.customerGSTIN) {
        doc.text(`GSTIN: ${invoiceData.customerGSTIN}`, 20, yPosition);
        yPosition += 6;
      }
      doc.text(`Mobile: ${invoiceData.customerMobile}`, 20, yPosition);
      
      // Items Table
      const tableStartY = yPosition + 15;
      const tableHeaders = ["Sr.", "Description", "Qty", "Rate", "Amount"];
      const columnWidths = [15, 80, 20, 30, 35];
      const columnX = [20, 35, 115, 135, 165];
      
      // Table Header
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.rect(20, tableStartY, 180, 8);
      tableHeaders.forEach((header, index) => {
        doc.text(header, columnX[index] + 2, tableStartY + 6);
      });
      
      // Table Rows
      doc.setFont("helvetica", "normal");
      const itemsWithValues = invoiceData.items.filter(item => 
        item.description.trim() && item.quantity > 0 && item.rate > 0
      );
      
      let currentY = tableStartY + 8;
      itemsWithValues.forEach((item, index) => {
        doc.rect(20, currentY, 180, 8);
        doc.text((index + 1).toString(), columnX[0] + 2, currentY + 6);
        
        // Handle long descriptions
        const descLines = doc.splitTextToSize(item.description, columnWidths[1] - 4);
        const lineHeight = 6;
        const maxLines = Math.floor(8 / lineHeight);
        const displayLines = descLines.slice(0, maxLines);
        
        displayLines.forEach((line, lineIndex) => {
          doc.text(line, columnX[1] + 2, currentY + 6 + (lineIndex * lineHeight));
        });
        
        doc.text(item.quantity.toString(), columnX[2] + 2, currentY + 6);
        doc.text(formatCurrency(item.rate), columnX[3] + 2, currentY + 6);
        doc.text(formatCurrency(item.amount), columnX[4] + 2, currentY + 6);
        
        currentY += 8;
      });
      
      // Add empty rows for spacing
      const emptyRows = Math.max(0, 8 - itemsWithValues.length);
      for (let i = 0; i < emptyRows; i++) {
        doc.rect(20, currentY, 180, 8);
        currentY += 8;
      }
      
      // Tax Summary
      const summaryStartY = currentY + 10;
      doc.setFont("helvetica", "bold");
      doc.text("Tax Summary:", 120, summaryStartY);
      
      doc.setFont("helvetica", "normal");
      doc.text(`Subtotal: ${formatCurrency(invoiceData.subtotal)}`, 120, summaryStartY + 8);
      doc.text(`CGST @ 9%: ${formatCurrency(invoiceData.cgst)}`, 120, summaryStartY + 16);
      doc.text(`SGST @ 9%: ${formatCurrency(invoiceData.sgst)}`, 120, summaryStartY + 24);
      
      doc.setFont("helvetica", "bold");
      doc.text(`Grand Total: ${formatCurrency(invoiceData.grandTotal)}`, 120, summaryStartY + 35);
      
      // Amount in Words
      doc.setFont("helvetica", "bold");
      doc.text("Amount in Words:", 20, summaryStartY);
      doc.setFont("helvetica", "normal");
      const amountLines = doc.splitTextToSize(invoiceData.amountInWords, 90);
      let amountY = summaryStartY + 8;
      amountLines.forEach(line => {
        doc.text(line, 20, amountY);
        amountY += 6;
      });
      
      // Footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for your business!", 105, 270, { align: "center" });
      doc.text("This is a computer generated invoice.", 105, 276, { align: "center" });
      
      // Save the PDF
      const filename = `Invoice_${invoiceData.invoiceNumber}.pdf`;
      doc.save(filename);
      
      resolve(filename);
    } catch (error) {
      reject(error);
    }
  });
};