'use client';

import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "אישור פעולה", // Default title
  message = "האם אתה בטוח שברצונך להמשיך?", // Default message
  confirmText = "אישור", // Default confirm text
  cancelText = "ביטול", // Default cancel text
}) => {
  if (!isOpen) return null;

  return (
    <div 
      dir="rtl" // Ensure RTL direction
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close modal on backdrop click
    >
      <div 
        className="relative w-full max-w-md bg-[var(--background)] rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--primary)] mb-4 text-center">
            {title}
          </h3>
          <p className="text-base text-[var(--foreground)] mb-6 text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Buttons Area */}
        <div className="flex justify-center space-x-4 space-x-reverse px-6 pb-6 sm:px-8 sm:pb-8 bg-gray-50/50 pt-4 border-t border-gray-100">
          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="min-w-[100px] px-5 py-2.5 bg-red-600 text-white rounded-full font-semibold text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150 ease-in-out shadow-sm"
          >
            {confirmText}
          </button>
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="min-w-[100px] px-5 py-2.5 bg-gray-200 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-150 ease-in-out shadow-sm"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 