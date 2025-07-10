import React, { useState } from "react";
import { formatCurrency } from "@/utils/helpers";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const ItemsTable = ({ items, onItemChange, itemHistory = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQueries, setSearchQueries] = useState({});

  const handleDescriptionChange = (index, value) => {
    setSearchQueries(prev => ({ ...prev, [index]: value }));
    onItemChange(index, "description", value);
  };

  const getFilteredItems = (query) => {
    if (!query || query.length < 1) return [];
    return itemHistory.filter(item => 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleItemSelection = (index, historyItem) => {
    onItemChange(index, "description", historyItem.description);
    onItemChange(index, "rate", historyItem.rate);
    setActiveDropdown(null);
    setSearchQueries(prev => ({ ...prev, [index]: "" }));
  };
  return (
    <div className="form-section">
      <h2>
        <ApperIcon name="Package" size={20} className="text-primary-600" />
        Items & Services
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                Sr. No.
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                Qty
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                Rate
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
{items?.map((item, index) => (
              <tr key={item.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                  {index + 1}
                </td>
<td className="border border-gray-300 px-3 py-2 relative">
                  <Input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    placeholder="Enter item description"
                    className="border-0 shadow-none focus:ring-0 p-1 text-sm"
onFocus={() => setActiveDropdown(item.description?.length > 0 ? index : null)}
                    onBlur={() => setTimeout(() => setActiveDropdown(null), 200)}
                  />
                  {activeDropdown === index && getFilteredItems(searchQueries[index] || item.description).length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {getFilteredItems(searchQueries[index] || item.description).map((historyItem, historyIndex) => (
                        <div
                          key={historyIndex}
                          className="px-2 py-1 cursor-pointer hover:bg-gray-100 border-b border-gray-50"
                          onClick={() => handleItemSelection(index, historyItem)}
                        >
                          <div className="text-sm font-medium text-gray-900">{historyItem.description}</div>
                          <div className="text-xs text-gray-500">Rate: {formatCurrency(historyItem.rate)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onItemChange(index, "quantity", e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1"
                    className="border-0 shadow-none focus:ring-0 p-1 text-sm text-center"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => onItemChange(index, "rate", e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="border-0 shadow-none focus:ring-0 p-1 text-sm text-center"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;