import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { formatCurrency } from "@/utils/helpers";

const ItemsTable = ({ items, onItemChange }) => {
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
            {items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <Input
                    type="text"
                    value={item.description}
                    onChange={(e) => onItemChange(index, "description", e.target.value)}
                    placeholder="Enter item description"
                    className="border-0 shadow-none focus:ring-0 p-1 text-sm"
                  />
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