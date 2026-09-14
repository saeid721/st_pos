import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalClass, setModalClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => {
        setModalClass("opacity-100 translate-y-0 scale-100");
      }, 10);
    } else {
      setModalClass("opacity-0 translate-y-[-20px] scale-95");
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Perform search logic here
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center scale-125">
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ease-out"
            aria-hidden="true"
            onClick={handleCloseModal}
          ></div>

          <div
            className={`relative bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-out w-full max-w-md ${modalClass}`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Search</h3>
              <button onClick={handleCloseModal}>
                <FiX className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <FiSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-500">
                  POPULAR SEARCH
                </h4>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Chats</span>
                    <span className="text-sm text-gray-500">/apps/chat</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Emails</span>
                    <span className="text-sm text-gray-500">/apps/email</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Calendar</span>
                    <span className="text-sm text-gray-500">
                      /apps/calendar
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">User Profile</span>
                    <span className="text-sm text-gray-500">
                      /user-profile/overview
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      Account Settings
                    </span>
                    <span className="text-sm text-gray-500">
                      /account-settings/account
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
