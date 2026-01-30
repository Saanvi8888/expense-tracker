
import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="relative w-full max-w-2xl p-4">
        <div className="bg-white rounded-lg shadow-lg border-2 border-slate-700">

          
          <div className="flex items-center justify-between p-4 border-b bg-slate-700">
            <h3 className="text-lg font-medium text-white ">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 text-white hover:text-gray-900 hover:bg-gray-200 rounded-lg flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

         
          <div className="p-4 md:p-5 space-y-4">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
