export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

export const convertToWords = (amount) => {
  if (amount === 0) return "Zero Rupees Only";
  
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];
  
  const scales = ["", "Thousand", "Lakh", "Crore"];
  
  function convertGroup(num) {
    let result = "";
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    
    if (num > 0) {
      result += ones[num] + " ";
    }
    
    return result;
  }
  
  function convertIndianCurrency(amount) {
    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    
    let result = "";
    
    if (rupees === 0) {
      result = "Zero";
    } else {
      const crores = Math.floor(rupees / 10000000);
      const lakhs = Math.floor((rupees % 10000000) / 100000);
      const thousands = Math.floor((rupees % 100000) / 1000);
      const hundreds = rupees % 1000;
      
      if (crores > 0) {
        result += convertGroup(crores) + "Crore ";
      }
      
      if (lakhs > 0) {
        result += convertGroup(lakhs) + "Lakh ";
      }
      
      if (thousands > 0) {
        result += convertGroup(thousands) + "Thousand ";
      }
      
      if (hundreds > 0) {
        result += convertGroup(hundreds);
      }
    }
    
    result += "Rupees";
    
    if (paise > 0) {
      result += " and " + convertGroup(paise) + "Paise";
    }
    
    result += " Only";
    
    return result.trim();
  }
  
  return convertIndianCurrency(amount);
};

export const validateGSTIN = (gstin) => {
  if (!gstin) return true; // Optional field
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

export const generateInvoiceNumber = (lastNumber) => {
  const nextNumber = lastNumber ? parseInt(lastNumber.replace("INV-", "")) + 1 : 1;
  return `INV-${nextNumber.toString().padStart(3, "0")}`;
};