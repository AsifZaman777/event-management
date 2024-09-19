import { useState } from "react";
import { FaHome, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import venues from "../../venue_data"; // Assuming you have this file

const Venues = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/dashboard");
  };

  const [sorting, setSorting] = useState("Select capacity");
  const [showBars, setShowBars] = useState(true);

  const handleSort = (e) => {
    const selectedCapacity = e.target.value;
    setSorting(selectedCapacity);
  };

  const toggleBars = () => {
    setShowBars(!showBars); // Toggle the visibility of the bars on small screens
  };

  const sortedVenues =
    sorting === "Select capacity"
      ? venues
      : venues.filter((venue) => venue.capacity === parseInt(sorting));

  return (
    <div className="min-h-screen bg-slate-100" data-theme="halloween">
      {/* Navbar and Sorting Bar Container */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 sm:translate-y-0 ${
          showBars ? "translate-y-0" : "-translate-y-full sm:translate-y-0"
        }`}
      >
        {/* Navbar */}
        <div className="py-4 px-4 sm:px-8 bg-white shadow-sm flex flex-row items-center justify-between w-full">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-500">
            Venue List
          </h2>
          <button
            className="btn btn-ghost rounded-md bg-red-400 text-white text-md sm:text-md hover:bg-orange-600 hover:text-white"
            onClick={handleHome}
          >
            <FaHome className="inline mr-2 text-lg sm:text-2xl" />
            Home
          </button>
        </div>

        {/* Sorting Bar */}
        <div className="py-4 px-4 sm:px-8 bg-white border-none shadow-md flex flex-col sm:flex-row justify-between items-center w-full space-y-4 sm:space-y-0">
          {/* Sorting and Other Options */}
          <div className="relative w-full sm:w-auto">
            <select
              value={sorting}
              onChange={handleSort}
              className="block w-full mt-0 bg-white border border-orange-500 sm:px-10 py-2 text-md sm:text-md rounded leading-tight focus:outline-none text-orange-500 hover:text-white hover:bg-orange-500 duration-100"
            >
              <option>Select capacity</option>
              <option>50</option>
              <option>200</option>
              <option>300</option>
              <option>500</option>
              <option>1000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Three-dot menu for small screens */}
      <div className="fixed -top-6 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <button
          onClick={toggleBars}
          className="text-gray-500 bg-white p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white"
        >
          <FaEllipsisV className="text-2xl" />
        </button>
      </div>

      {/* Padding top to prevent content overlap */}
      <div className="pt-36">
        {/* Cards Section */}
        <div className="container mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {sortedVenues.map((venue) => (
            <div
              key={venue.id}
              className="max-w-full bg-white border border-gray-200 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:border-orange-500 hover:shadow-xl"
            >
              {/* Image */}
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-50 sm:w-80 mx-auto mt-4 object-cover"
                  src={venue.image}
                  alt={venue.name}
                />
              </a>
              <hr className="my-2 border-gray-200" />
              
              {/* Venue Details */}
              <div className="p-5">
                <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-500">
                  {venue.name}
                </h5>
                <p className="mb-3 text-md sm:text-md font-normal text-orange-500">
                  {`Location: ${venue.location}`}
                </p>
                <p className="mb-3 text-md sm:text-md font-normal text-orange-500">
                  {`Capacity: ${venue.capacity}`}
                </p>
                <p className="mb-3 text-md sm:text-md font-normal text-orange-500">
                  {`Price: $${venue.price}`}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-md sm:text-md font-medium text-white bg-blue-700 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-500 mt-4"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Venues;
