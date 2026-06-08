import React, { useEffect, useState } from "react";

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  selectedPropertyId?: number | null;
  selectedType?: string | null;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  selectedPropertyId,
  selectedType,
}) => {
  const [propertyId, setPropertyId] = useState("");
  const [type, setType] = useState("Rent");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Prefill values whenever the modal opens or props change
  useEffect(() => {
    if (selectedPropertyId) setPropertyId(selectedPropertyId.toString());
    if (selectedType) setType(selectedType);
  }, [selectedPropertyId, selectedType, isOpen]);


  // ✅ Auto-fill when opening the modal from Listings2
  useEffect(() => {
    if (isOpen && selectedPropertyId) {
      setPropertyId(String(selectedPropertyId));
    }
    if (isOpen && selectedType) {
      setType(selectedType);
    }
  }, [isOpen, selectedPropertyId, selectedType]);

  // Restrict Property ID to numbers (max 8 digits)
  const handlePropertyIdChange = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 8);
    setPropertyId(numeric);
  };

  const handleCardNumberChange = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 16);
    const formatted = numeric.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleCardHolderChange = (value: string) => {
    const formatted = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 26);
    setCardHolder(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 4);
    let formatted = numeric;
    if (numeric.length > 2) formatted = `${numeric.slice(0, 2)}/${numeric.slice(2)}`;
    setExpiry(formatted);
  };

  const handleCvvChange = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 4);
    setCvv(numeric);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
      <div
        className={`rounded-2xl p-8 w-[90%] sm:w-[35%] shadow-lg transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">💳 Payment & Billing</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Property ID */}
          <div>
            <label className="block mb-1 text-sm">Property ID</label>
            <input
              type="text"
              value={propertyId}
              onChange={(e) => handlePropertyIdChange(e.target.value)}
              placeholder="Enter Property ID"
              required
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 text-sm">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
            >
              <option value="Rent">Rent</option>
              <option value="Buy">Buy</option>
              <option value="Advance">Advance</option>
            </select>
          </div>

          {/* Card Inputs */}
          <div>
            <label className="block mb-1 text-sm">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
              inputMode="numeric"
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Card Holder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => handleCardHolderChange(e.target.value)}
              placeholder="John Doe"
              required
              className={`w-full px-3 py-2 border rounded-lg ${
                darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm">Expiry (MM/YY)</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="12/28"
                required
                inputMode="numeric"
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm">CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => handleCvvChange(e.target.value)}
                placeholder="***"
                required
                inputMode="numeric"
                className={`w-full px-3 py-2 border rounded-lg ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-500"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardModal;
