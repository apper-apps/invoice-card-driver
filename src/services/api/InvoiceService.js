const INVOICE_NUMBER_KEY = "invoice_number";

class InvoiceService {
  static async getNextInvoiceNumber() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentNumber = localStorage.getItem(INVOICE_NUMBER_KEY);
        const nextNumber = currentNumber ? parseInt(currentNumber) + 1 : 1;
        resolve(`INV-${nextNumber.toString().padStart(3, "0")}`);
      }, 100);
    });
  }

  static async incrementInvoiceNumber() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentNumber = localStorage.getItem(INVOICE_NUMBER_KEY);
        const nextNumber = currentNumber ? parseInt(currentNumber) + 1 : 1;
        localStorage.setItem(INVOICE_NUMBER_KEY, nextNumber.toString());
        resolve(nextNumber);
      }, 100);
    });
  }

  static async saveInvoice(invoiceData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
        const invoice = {
          ...invoiceData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        invoices.push(invoice);
        localStorage.setItem("invoices", JSON.stringify(invoices));
        resolve(invoice);
      }, 200);
    });
  }

  static async getInvoices() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
        resolve(invoices);
      }, 200);
    });
  }

  static async getInvoiceById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
        const invoice = invoices.find(inv => inv.id === id);
        resolve(invoice);
      }, 200);
    });
  }
}

export default InvoiceService;