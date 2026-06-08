import React, { useEffect, useState, useMemo, useRef } from 'react';
import Navbar from './Navbar';
import heroImage from './9.jpg';
import heroImage2 from './11_3.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Typewriter from 'typewriter-effect';

interface HomeProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
}

interface Property {
  propertyId: number;
  propertyType: string;
  price: number;
  numberOfBedroom: number;
  numberOfBathroom: number;
  size: number;
  status: string;
  address: string;
  city: string;
  zipCode: string;
  imgUrls: string[];
}

const dummyAgents: Record<number, string> = {
  1001: 'Sarah Ahmed',
  1002: 'Rafi Hasan',
  1003: 'Nadia Islam',
  1004: 'Karim Uddin',
  1005: 'Priya Chowdhury',
  1006: 'Tariq Mahmud',
};

const ListingCard: React.FC<{
  darkMode: boolean;
  property: Property;
}> = ({ property }) => {
  const agentName = dummyAgents[property.propertyId] ?? 'Unknown Agent';

  return (
    <div className="relative w-[480px] bg-white dark:bg-slate-900 dark:shadow-slate-500 shadow-slate-500 border-slate-500 dark:border-slate-500 rounded-lg overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl transition flex flex-col h-full">
      {/* Property image — non-clickable */}
      <div className="cursor-default">
        <img
          src={property.imgUrls[0]}
          alt="Property"
          className="w-full h-64 object-cover"
          loading="lazy"
          onError={e => (e.currentTarget.src = '/default-house.jpg')}
        />
        <div className="p-4">
          <div className="font-bold text-lg">
            ৳{property.price.toLocaleString()}
            {property.propertyType === 'Rental' && (
              <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-3 text-gray-500 text-sm">
              <div className="flex items-center gap-1 rounded-full text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white transition-colors duration-300 px-2 py-1">
                🛏 {property.numberOfBedroom} Beds
              </div>
              <div className="flex items-center gap-1 rounded-full text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white transition-colors duration-300 px-2 py-1">
                🛁 {property.numberOfBathroom} Baths
              </div>
              <div className="flex items-center gap-1 rounded-full text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white transition-colors duration-300 px-2 py-1">
                📏 {property.size} sqft
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                property.propertyType === 'Home'
                  ? 'bg-green-200 text-green-800'
                  : property.propertyType === 'Industrial'
                  ? 'bg-yellow-200 text-yellow-800'
                  : property.propertyType === 'Apartment'
                  ? 'bg-cyan-200 text-cyan-800'
                  : property.propertyType === 'Rental'
                  ? 'bg-purple-200 text-purple-800'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {property.propertyType}
            </span>
          </div>

          <div className="flex gap-3 text-gray-500 text-sm mt-2">
            <div
              className={`flex items-center justify-center gap-1 rounded-full px-2 py-1 font-medium transition-colors duration-300 ${
                property.status === 'Available'
                  ? 'dark:bg-green-400 dark:text-black w-24 bg-green-500 text-white'
                  : property.status === 'Sold'
                  ? 'dark:bg-red-400 dark:text-black w-16 bg-red-500 text-white'
                  : property.status === 'Rented'
                  ? 'dark:bg-sky-400 dark:text-black w-[70px] bg-sky-500 text-white'
                  : 'dark:bg-yellow-400 dark:text-black w-20 bg-yellow-500 text-white'
              }`}
            >
              {property.status}
            </div>
          </div>
          <div className="text-gray-500 text-sm mt-3">{property.address}</div>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-col gap-2 mt-auto">
        <div className="text-xs text-gray-400 flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
          <div className="text-yellow-500">Property ID: {property.propertyId}</div>
          <div className="text-cyan-500 text-right truncate">Agent: {agentName}</div>
        </div>
      </div>
    </div>
  );
};

const headings = [
  "Find Your Next Home",
  "Find The Best Office",
  "Explore Your Industrial Space",
  "Discover Top Properties",
];

const properties: Property[] = [
  {
    propertyId: 1001,
    propertyType: "Home",
    price: 8500000,
    numberOfBedroom: 4,
    numberOfBathroom: 3,
    size: 2400,
    status: "Available",
    address: "123 Green Road",
    city: "Dhaka",
    zipCode: "1207",
    imgUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPygByVCJyLXQ8IXNrEqtUrlwvDXU7Kly3hw&s"],
  },
  {
    propertyId: 1002,
    propertyType: "Apartment",
    price: 4500000,
    numberOfBedroom: 3,
    numberOfBathroom: 2,
    size: 1500,
    status: "Available",
    address: "45 Lake View",
    city: "Dhaka",
    zipCode: "1212",
    imgUrls: ["https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"],
  },
  {
    propertyId: 1003,
    propertyType: "Industrial",
    price: 25000000,
    numberOfBedroom: 0,
    numberOfBathroom: 2,
    size: 10000,
    status: "Sold",
    address: "12 Industrial Zone",
    city: "Chittagong",
    zipCode: "4000",
    imgUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaA0z0k7nGToCjzURR4tA5APXpgm_iw3otYQ&s"],
  },
  {
    propertyId: 1004,
    propertyType: "Rental",
    price: 35000,
    numberOfBedroom: 2,
    numberOfBathroom: 2,
    size: 1200,
    status: "Rented",
    address: "88 Gulshan Avenue",
    city: "Dhaka",
    zipCode: "1212",
    imgUrls: ["https://cdn.home-designing.com/wp-content/uploads/2023/04/modern-houses-1024x683.jpg"],
  },
  {
    propertyId: 1005,
    propertyType: "Residential",
    price: 6200000,
    numberOfBedroom: 3,
    numberOfBathroom: 2,
    size: 1800,
    status: "Available",
    address: "21 Banani Road",
    city: "Dhaka",
    zipCode: "1213",
    imgUrls: ["https://media.istockphoto.com/id/2155879397/photo/house-in-a-charming-neighborhood-with-stunning-sidewalk-landscaping.jpg?s=612x612&w=0&k=20&c=nQJOUoNb2RNev3QVNjIohcmxQABCTetCdgfnc8MV8sU="],
  },
  {
    propertyId: 1006,
    propertyType: "Home",
    price: 9900000,
    numberOfBedroom: 5,
    numberOfBathroom: 4,
    size: 3200,
    status: "Available",
    address: "7 Hill View",
    city: "Sylhet",
    zipCode: "3100",
    imgUrls: ["https://media.istockphoto.com/id/2155879397/photo/house-in-a-charming-neighborhood-with-stunning-sidewalk-landscaping.jpg?s=612x612&w=0&k=20&c=nQJOUoNb2RNev3QVNjIohcmxQABCTetCdgfnc8MV8sU="],
  },
];

const Home: React.FC<HomeProps> = ({ darkMode, toggleDarkMode, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Property[]>([]);
  const [randomProperties, setRandomProperties] = useState<Property[]>([]);
  const swiperRef = useRef<any>(null);

  const isAdmin = user?.userType?.toLowerCase() === 'admin';

  useEffect(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matches = properties
        .filter(p =>
          p.address.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term) ||
          p.zipCode.toLowerCase().includes(term) ||
          p.propertyId.toString().includes(term)
        )
        .slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const shuffled = [...properties].sort(() => 0.5 - Math.random());
    setRandomProperties(shuffled.slice(0, 6));
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="font-sans text-gray-900 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />

        {/* Hero Section */}
        <section
          className="relative bg-gray-100 dark:bg-gray-800 h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${darkMode ? heroImage2 : heroImage})` }}
        >
          <div className="bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 p-6 rounded-lg max-w-xl w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              <Typewriter
                onInit={(typewriter) => {
                  if (isAdmin) {
                    typewriter.typeString(`Welcome Admin ${user.name}`).start();
                  } else {
                    headings.forEach((text) => {
                      typewriter.typeString(text).pauseFor(2500).deleteAll(20);
                    });
                    typewriter.start();
                  }
                }}
                options={{
                  autoStart: true,
                  loop: !isAdmin,
                  delay: 40,
                  cursor: '|',
                }}
              />
            </h1>

            <input
              type="text"
              placeholder="🔍 City, address, zip... "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded mb-4 dark:bg-gray-800 dark:border-gray-700"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white dark:bg-gray-800 rounded w-[530px] z-10 bg-opacity-90 dark:bg-opacity-90">
                {suggestions.map(prop => (
                  <li
                    key={prop.propertyId}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(prop.address);
                      setSuggestions([]);
                    }}
                  >
                    {prop.address}, {prop.city} · ৳{prop.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="w-full bg-blue-600 text-white py-3 pointer-events-none font-semibold rounded"
            >
              Search Homes
            </button>
          </div>
        </section>

        {/* Featured Listings */}
        <section
          className="py-12 px-4 mx-auto relative overflow-hidden"
          style={{ width: '100%', height: '730px' }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Find Your Space</h2>
            <div
              onMouseEnter={() => swiperRef.current?.autoplay?.stop?.()}
              onMouseLeave={() => swiperRef.current?.autoplay?.start?.()}
            >
              <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={24}
                slidesPerView={3}
                freeMode={true}
                grabCursor={true}
                loop={true}
                speed={8000}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
                breakpoints={{
                  320: { slidesPerView: 1.1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="w-full"
              >
                {randomProperties.map((property) => (
                  <SwiperSlide key={property.propertyId} className="mb-20">
                    <ListingCard darkMode={darkMode} property={property} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-blue-50 dark:bg-gray-800 py-12 z-10 relative bg-transparent dark:bg-transparent">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold mb-6">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                ['Search Properties', 'Browse homes by location, price, and features.'],
                ['Contact Agents', 'Get connected with trusted real estate agents.'],
                ['Close the Deal', 'Finalize your dream home purchase smoothly.'],
              ].map(([title, desc], i) => (
                <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded shadow">
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
