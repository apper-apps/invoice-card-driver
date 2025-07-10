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
});
  }

  // Customer data persistence methods
  static async saveCustomerData(customerData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem("customers") || "[]");
        const existingIndex = customers.findIndex(c => 
          c.customerName.toLowerCase() === customerData.customerName.toLowerCase()
        );
        
        if (existingIndex >= 0) {
          customers[existingIndex] = { ...customerData, updatedAt: new Date().toISOString() };
        } else {
          customers.push({ ...customerData, createdAt: new Date().toISOString() });
        }
        
        localStorage.setItem("customers", JSON.stringify(customers));
        resolve(customerData);
      }, 100);
    });
  }

  static async getCustomers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem("customers") || "[]");
        resolve(customers);
      }, 100);
    });
  }

  static async searchCustomers(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customers = JSON.parse(localStorage.getItem("customers") || "[]");
        const filtered = customers.filter(c => 
          c.customerName.toLowerCase().includes(query.toLowerCase()) ||
          c.customerMobile.includes(query)
        );
        resolve(filtered);
      }, 100);
    });
  }

  // Item data persistence methods
  static async saveItemData(itemData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = JSON.parse(localStorage.getItem("items_history") || "[]");
        const existingIndex = items.findIndex(i => 
          i.description.toLowerCase() === itemData.description.toLowerCase()
        );
        
        if (existingIndex >= 0) {
          items[existingIndex] = { ...itemData, updatedAt: new Date().toISOString() };
        } else {
          items.push({ ...itemData, createdAt: new Date().toISOString() });
        }
        
        localStorage.setItem("items_history", JSON.stringify(items));
        resolve(itemData);
      }, 100);
    });
  }

  static async getItems() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = JSON.parse(localStorage.getItem("items_history") || "[]");
        resolve(items);
      }, 100);
    });
  }

  static async searchItems(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = JSON.parse(localStorage.getItem("items_history") || "[]");
        const filtered = items.filter(i => 
          i.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 100);
    });
  }
}

export default InvoiceService;