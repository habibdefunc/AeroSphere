import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import Content from "../components/home/Content";

<<<<<<< HEAD
const Search = () => {
=======
const Search = ({ onSearch }) => {
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const getCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cityName
        )}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      } else {
        throw new Error("City not found");
      }
    } catch (error) {
      console.error("Error getting coordinates:", error);
      throw new Error("Error getting coordinates. Please try again.");
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        const { lat, lon } = await getCoordinates(searchTerm);
        const response = await axios.get(
          `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=af4152e1-073a-446c-8201-08b3bfa4da86`
        );
        setSearchResult(response.data);
        console.log(response.data);
<<<<<<< HEAD
=======
        onSearch(response.data);
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
        setError("");
      } catch (error) {
        console.error("Error searching city data:", error);
        setError("Error searching city data. Please try again.");
      }
    } else {
      setError("Please enter a city name.");
    }
  };

  return (
    <>
<<<<<<< HEAD
      <button className="btn btn-ghost btn-circle z-50" onClick={toggleSearch}>
        {isSearchOpen ? <FaSearch /> : <FaSearch />}
      </button>
      {isSearchOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
          <div className="relative w-5/6 md:w-2/4  p-10 rounded-xl bg-base-200">
            <button
              className="absolute top-2 right-2 text-gray-400 focus:outline-none"
              onClick={toggleSearch}
            >
              {" "}
              <FaTimes />
            </button>
            <div className="w-full flex justify-center">
              <div className="md:flex w-full gap-2">
                <div className="bg-transparentinput md:w-[70%]">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="py-3 px-4 rounded-full w-full mb-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="button md:w-2/1">
                  <button
                    className="btn border-white  rounded-full w-full"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="hidden"> */}
      {searchResult ? <Content data={searchResult} /> : ""}
      {/* </div> */}
=======
      <button className="btn btn-ghost btn-circle" onClick={toggleSearch}>
        <FaSearch />
      </button>
      {isSearchOpen && (
        <div className="fixed inset-0 flex mt-10 items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your city here..."
              className="border border-gray-300 px-4 py-2 rounded w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute top-2 right-3 text-gray-400 focus:outline-none"
              onClick={toggleSearch}
            >
              <FaTimes />
            </button>
            <button
              className="absolute top-2 right-10 text-gray-400 focus:outline-none"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      )}
      {searchResult ? <Content data={searchResult} /> : ""}
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
    </>
  );
};

export default Search;
