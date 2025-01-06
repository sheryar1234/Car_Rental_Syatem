import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const RenterNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('userEmail') || '',
    carImage: null,
    make: '',
    model: '',
    name: '',
    location:'',
    rentPrice: '',
    description: '',
  });
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const togglePopup = () => setIsPopupOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, carImage: e.target.files[0] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', formData.email);
    form.append('carImage', formData.carImage);
    form.append('make', formData.make);
    form.append('model', formData.model);
    form.append('name', formData.name);
    form.append('location', formData.location);
    form.append('rentPrice', formData.rentPrice);
    form.append('description', formData.description);

    try {
      const response = await axios.post('http://localhost:5000/api/vehicles/add', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
      setIsPopupOpen(false); // Close the popup
      setFormData({ email:'',carImage: null, make: '', model: '', name: '',location:'', rentPrice: '', description: '' }); // Reset form
    } catch (error) {
      console.error(error.response?.data?.message || 'Error adding vehicle');
      alert(error.response?.data?.message || 'Error adding vehicle');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {/* Navigation */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img className="h-9 w-auto" src="/logo.png" alt="Your Company" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                    Dashboard
                  </a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Team
                  </a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Projects
                  </a>
                  <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Calendar
                  </a>
                </div>
              </div>
            </div>

            {/* Add Vehicle Button */}
            <button
              onClick={togglePopup}
              className="text-white bg-gradient-to-r mt-2 mr-14 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-3.5 text-center me-2 mb-2"
            >
              + Add Vehicle
            </button>

            {/* Notification and Profile */}
            <div className="relative flex items-center space-x-4">
              {/* Notifications */}
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>

              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={toggleProfileMenu}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white overflow-y-auto rounded-lg shadow-xl w-[600px] relative p-8">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Form */}
            <h2 className="text-xl font-bold mb-3 text-center">Add Vehicle</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Image</label>
                <input
                  type="file"
                  name="carImage"
                  onChange={handleFileChange}
                  className="mt-1 pt-2 pb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Make</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Car Make"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Car Model"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rent Price</label>
                <input
                  type="text"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleInputChange}
                  placeholder="Rent Price"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-700 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenterNavbar;
