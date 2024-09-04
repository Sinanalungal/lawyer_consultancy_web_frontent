import React, { FC } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-xs">{description}</p>
        <div className="flex justify-end text-xs space-x-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-slate-600  text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
