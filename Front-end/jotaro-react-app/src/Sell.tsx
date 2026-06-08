import React, { useState } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

interface SellProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
}

const Sell: React.FC<SellProps> = ({ darkMode, toggleDarkMode, user }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    size: '',
    price: '',
    status: 'Pending',
    listingDate: new Date().toISOString().split('T')[0],
    userId: 10,
    userName: user.name,
  });

  const [images, setImages] = useState<(File | null)[]>([null, null, null, null, null, null]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'zipCode') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSingleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);
    }
  };

  const handleSubmit = async () => {
  for (const [key, value] of Object.entries(formData)) {
    if (
      (typeof value === 'string' && value.trim() === '') ||
      value === null ||
      value === undefined
    ) {
      toast.warn(`Please fill out the ${key} field.`);
      return;
    }
}

  const uploadedImageExists = images.some(img => img !== null);
  if (!uploadedImageExists) {
    toast.warn('Please upload at least one image.');
    return;
  }

  if (thumbnailIndex === null || !images[thumbnailIndex]) {
    toast.warn('Please select a valid thumbnail image.');
    return;
  }

  const formPayload = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    formPayload.append(key, value);
  });

  const uploadedImages: File[] = [];
  let thumbnailMappedIndex = -1;

  images.forEach((img, index) => {
    if (img) {
      if (index === thumbnailIndex) {
        thumbnailMappedIndex = uploadedImages.length;
      }
      uploadedImages.push(img);
    }
  });

  if (thumbnailMappedIndex === -1) {
    toast.error('Selected thumbnail was not uploaded.');
    return;
  }

  uploadedImages.forEach(img => {
    formPayload.append('images', img);
  });

  formPayload.append('thumbnailIndex', thumbnailMappedIndex.toString());

  const toastId = toast.loading('Submitting property request...');

setTimeout(() => {
  toast.update(toastId, {
    render: 'Property request successful!',
    type: 'success',
    isLoading: false,
    autoClose: 3000,
    closeOnClick: true,
  });

  toast.info('You will be notified via Messages 📩 later');

  // Optional: clear the form
  setFormData({
    propertyType: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    size: '',
    price: '',
    status: 'Pending',
    listingDate: new Date().toISOString().split('T')[0],
    userId: 10,
    userName: user.name,
  });

  setImages([null, null, null, null, null, null]);
  setThumbnailIndex(null);

}, 1500);
};


  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />
    <div className="p-6 z-10 relative w-full opacity-80 mx-auto bg-gray-200 text-black dark:bg-gray-800 dark:text-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Request Property Sell</h2>
      <input
          type="text"
          name="username"
          disabled
          value={formData.userName}
          readOnly
          className="w-full mb-2 p-2 rounded bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          placeholder="User Name"
        />
      <input
          name="userId"
          value={formData.userId}
          disabled
          readOnly
          className="w-full mb-2 p-2 rounded bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          placeholder="User ID"
        />

      <select
        name="propertyType"
        value={formData.propertyType}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="">Select Type</option>
        <option value="Home">Home</option>
        <option value="Apartment">Apartment</option>
        <option value="Industrial">Industrial</option>
        <option value="Residential">Residential</option>
        <option value="Rental">Rental</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full mb-2 h-24 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
      />

      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
      />

      <div className="flex space-x-2">
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          className="flex-1 p-2 w-12 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleInputChange}
          className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
        
      </div>
      <div className='mt-2'>
        <input
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleInputChange}
          className="flex-1 w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>


      <div className="flex space-x-2 mt-2">
        <select name="numberOfBedrooms" value={formData.numberOfBedrooms} onChange={handleInputChange} className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
          <option value="">Bedrooms</option>
          {[...Array(11)].map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>

        <select name="numberOfBathrooms" value={formData.numberOfBathrooms} onChange={handleInputChange} className="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
          <option value="">Bathrooms</option>
          {[...Array(11)].map((_, i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <div className="mt-4">
        <label className="block">Size (sqft): {formData.size}</label>
        <input type="range" min="0" max="10000" name="size" value={formData.size} onChange={handleInputChange} className="w-full" />
      </div>

      <div className="mt-4 mb-2">
        <label className="block">Price (৳): {formData.price}</label>
        <input type="range" min="0" max="2000000" step="10000" name="price" value={formData.price} onChange={handleInputChange} className="w-full" />
      </div>

      <input
        name="status"
        type="text"
        disabled
        value={formData.status}
        readOnly
        className="w-full mb-2 p-2 rounded bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      />

      <div className="relative w-full">
        {/* Show placeholder only when empty */}
        {!formData.listingDate && (
          <span className="absolute left-3 top-[10px] text-gray-500 dark:text-gray-400 pointer-events-none select-none">
            Listing Date
          </span>
        )}

        {/* Visible but non-interactive date input */}
        <input
          name="listingDate"
          type="date"
          value={formData.listingDate}
          className="w-full no-date-icon-style mt-2 p-2 rounded bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        />
        {/* Transparent layer to block interaction */}
        <div className="absolute inset-0 cursor-not-allowed"></div>
      </div>


      <div className="mt-4">
        <h3 className="mb-2 font-semibold">Upload Property Images</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {['Thumbnail', 'Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5'].map((label, index) => (
            <div
              key={index}
              className="flex-none w-32 h-40 border border-gray-400 dark:border-gray-600 rounded-lg p-2 relative bg-gray-100 dark:bg-gray-700 text-black dark:text-white flex flex-col items-center justify-center text-sm"
            >
              <label className="absolute top-1 left-1 bg-white dark:bg-gray-900 px-1 rounded text-xs text-black dark:text-white">
                {label}
              </label>

              <input
                id={`sell-image-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleSingleImageChange(e, index)}
                className="hidden"
              />

              <label htmlFor={`sell-image-${index}`} className="cursor-pointer w-full h-full flex items-center justify-center">
                {images[index] ? (
                  <img
                    src={URL.createObjectURL(images[index]!)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 dark:text-gray-300">
                    <span className="text-3xl">+</span>
                    <span className="text-xs mt-1">Add Image</span>
                  </div>
                )}
              </label>
            </div>
          ))}
        </div>

        <label className="block mt-4 mb-1">Select Thumbnail Image Index</label>
        <select
          onChange={(e) => setThumbnailIndex(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="">Select Thumbnail</option>
          {[...Array(6)].map((_, index) => (
            <option key={index} value={index}>
              {index === 0 ? 'Thumbnail (recommended)' : `Image ${index}`}
            </option>
          ))}
        </select>
      </div>



      <div className="flex justify-end mt-6 space-x-2">
        <button onClick={handleSubmit} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl"><strong>Send Request</strong></button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Sell;
