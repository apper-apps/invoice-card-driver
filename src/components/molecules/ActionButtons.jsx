import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ActionButtons = ({ 
  isGenerating, 
  onGenerateInvoice, 
  onPreview, 
  onClearForm 
}) => {
  return (
    <div className="form-section">
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          variant="secondary"
          onClick={onClearForm}
          disabled={isGenerating}
        >
          <ApperIcon name="RotateCcw" size={18} className="mr-2" />
          Clear Form
        </Button>
        
        <Button
          variant="primary"
          onClick={onPreview}
          disabled={isGenerating}
        >
          <ApperIcon name="Eye" size={18} className="mr-2" />
          Preview
        </Button>
        
        <Button
          variant="success"
          onClick={onGenerateInvoice}
          disabled={isGenerating}
          className="min-w-[140px]"
        >
          {isGenerating ? (
            <>
              <div className="loading-spinner mr-2" />
              Generating...
            </>
          ) : (
            <>
              <ApperIcon name="Download" size={18} className="mr-2" />
              Generate PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;