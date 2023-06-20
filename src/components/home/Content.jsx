import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../utils/Card";
import {
  FaTimes,
  FaSun,
  FaSmog,
  FaCloudRain,
  FaTint,
  FaWind,
  FaBolt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Button from "../../utils/Button";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

<<<<<<< HEAD
const Content = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
=======
const Content = ({ data }) => {
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
  const [airQualityData, setAirQualityData] = useState(null);
  const [toggleDetail, setToggleDetail] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: null,
    longitude: null,
    zoom: 10,
  });

  const buttonDetail = () => {
    setToggleDetail(!toggleDetail);
  };

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

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      try {
        const { lat, lon } = await getCoordinates(searchTerm);
        const response = await axios.get(
          `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=af4152e1-073a-446c-8201-08b3bfa4da86`
        );
        setSearchResult(response.data);
        console.log(response.data);
        setError("");
      } catch (error) {
        console.error("Error searching city data:", error);
        setError("Error searching city data. Please try again.");
      }
    } else {
      setError("Please enter a city name.");
    }

    setSearchTerm(" ");
  };

  const trackAirQuality = async () => {
    try {
      const response = await axios.get(
        "https://api.airvisual.com/v2/nearest_city?key=af4152e1-073a-446c-8201-08b3bfa4da86"
      );
      setAirQualityData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetAirQuality = () => {
    setAirQualityData(null);
    setSearchResult(null);
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) {
      return (
        <div className="bg-green-300 py-1 px-3 shadow-sm border-none w-20 rounded text-slate-600 ml-4 flex justify-center">
          Good
        </div>
      );
    } else if (aqi <= 100) {
      return (
        <div className="bg-yellow-200 py-1 px-3 shadow-sm border-none w-20 rounded text-slate-600 ml-4 flex justify-center">
          Moderate
        </div>
      );
    } else if (aqi <= 150) {
      return (
        <div className="bg-yellow-400 py-1 px-3 shadow-sm border-none me-6 rounded text-slate-600 ml-4 flex justify-center">
          Unhealty For Sensitive Groups
        </div>
      );
    } else if (aqi <= 200) {
      return (
        <div className="bg-red-200 py-1 px-3 shadow-sm border-none w-20 rounded text-slate-600 ml-4 flex justify-center">
          Unhealty
        </div>
      );
    } else if (aqi <= 300) {
      return (
        <div className="bg-red-400 py-3 px-3 shadow-sm border-none w-20 rounded text-slate-600 ml-4 flex justify-center">
          Very Unhealty
        </div>
      );
    } else {
      return (
        <div className="bg-red-800 py-3 px-3 shadow-sm border-none w-20 rounded text-slate-600 ml-4 flex justify-center">
          Hazardous
        </div>
      );
    }
  };

  const getWeatherIcon = (weatherCode, isDay) => {
    if (
      (isDay && (weatherCode === "01d" || weatherCode === "02d")) ||
      (!isDay && (weatherCode === "01n" || weatherCode === "02n"))
    ) {
      // Kondisi cuaca cerah (pagi/malam)
      return <FaSun className="mr-2" />;
    } else if (
      weatherCode === "09d" ||
      weatherCode === "09n" ||
      weatherCode === "10d" ||
      weatherCode === "10n"
    ) {
      // Kondisi cuaca hujan
      return <FaCloudRain className="mr-2" />;
    } else if (weatherCode === "11d" || weatherCode === "11n") {
      // Kondisi cuaca badai
      return <FaBolt className="mr-2" />;
    } else if (weatherCode === "50d" || weatherCode === "50n") {
      // Kondisi cuaca berkabut
      return <FaSmog className="mr-2" />;
    } else {
      // Kondisi cuaca lainnya (misalnya panas, terik, dll)
      return <FaSun className="mr-2" />;
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  const customIcon = L.icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  return (
<<<<<<< HEAD
    <>
      <form>
        <div className="flex justify-center w-full mt-10">
          <div className="md:flex justify-center w-2/3 gap-2">
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
      </form>
      <Card
        title="Card Information"
        condition={airQualityData}
        searchResult={searchResult}
      >
        <div className="card-body p-2">
          {searchResult ? (
            <div
              className={`${searchResult && "w-2/4"}md:flex md:justify-between`}
            >
              <div>
                <h2 className="text-2xl font-bold text-sky-100">
                  {searchResult.data.city}
                </h2>
                <p className="text-sky-100 mb-4">
                  {searchResult.data.state}, {searchResult.data.country}
                </p>
                <div className="flex items-center text-sky-100 text-lg ">
                  {getWeatherIcon(searchResult.data.current.weather.ic)}
                  <span className="mr-1">
                    {searchResult.data.current.weather.tp}°C
                  </span>
                </div>
                <div className="flex items-center text-sky-100 text-lg ">
                  <FaSmog className="mr-2" />
                  <span>
                    Air Quality : {searchResult.data.current.pollution.aqius}
                  </span>
                </div>
                <div className="flex items-center text-sky-100 text-lg ">
                  <FaWind className="mr-2" />
                  <span>
                    Wind : {searchResult.data.current.weather.ws} km/h
                  </span>
                </div>
                <div className="flex items-center text-sky-100 text-lg ">
                  <FaTint className="mr-2" />
                  <span>Humidity: {searchResult.data.current.weather.hu}%</span>
                </div>
                <div className="mt-4 text-sky-100 text-lg ">
                  <span className="mr-2">
                    AQI Score : {searchResult.data.current.pollution.aqius}
                  </span>
                  <div className="flex items-center mt-2  text-sky-100 text-lg ">
                    Status{" "}
                    {getAirQualityStatus(
                      searchResult.data.current.pollution.aqius
                    )}
                  </div>
                  <div className="button-modal flex gap-2">
                    <Button
                      text="Reset"
                      onClick={resetAirQuality}
                      className="mx-auto"
=======
    <Card title="Card Information">
      <div className="card-body">
        {data ? (
          <div className="flex mr-40">
            <div>
              <h2 className="text-2xl text-sky-100">{data.data.city}</h2>
              <p className="text-sky-100 mb-4">
                {data.data.state}, {data.data.country}
              </p>
              <div className="flex items-center text-sky-100 text-lg">
                {getWeatherIcon(data.data.current.weather.ic)}
                <span className="mr-1">{data.data.current.weather.tp}°C</span>
              </div>
              <div className="flex items-center text-sky-100 text-lg">
                <FaSmog className="mr-2" />
                <span>Air Quality: {data.data.current.pollution.aqius}</span>
              </div>
              <div className="flex items-center text-sky-100 text-lg">
                <FaWind className="mr-2" />
                <span>Wind: {data.data.current.weather.ws} km/h</span>
              </div>
              <div className="flex items-center text-sky-100 text-lg">
                <FaTint className="mr-2" />
                <span>Humidity: {data.data.current.weather.hu}%</span>
              </div>
              <div className="mt-4 text-sky-100 text-lg">
                <span className="mr-2">
                  SKOR AQI: {data.data.current.pollution.aqius}
                </span>
                <div className="flex items-center mt-2 text-sky-100 text-lg">
                  Status:{" "}
                  {getAirQualityStatus(data.data.current.pollution.aqius)}
                </div>
              </div>
              <Button text="Reset" onClick={resetAirQuality} />
            </div>
          </div>
        ) : airQualityData ? (
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl text-sky-100">
                {airQualityData.data.city}
              </h2>
              <p className="text-sky-100 mb-4">
                {airQualityData.data.state}, {airQualityData.data.country}
              </p>
              <div className="flex items-center text-sky-100 text-lg">
                {getWeatherIcon(airQualityData.data.current.weather.ic)}
                <span className="mr-1">
                  {airQualityData.data.current.weather.tp}°C
                </span>
              </div>
              <div className="flex items-center text-sky-100 text-lg">
                <FaSmog className="mr-2" />
                <span>
                  Air Quality: {airQualityData.data.current.pollution.aqius}
                </span>
              </div>
              <div className="flex items-center text-sky-100 text-lg">
                <FaWind className="mr-2" />
                <span>Wind: {airQualityData.data.current.weather.ws} km/h</span>
              </div>
              <div className="flex items-center text-sky-100 text-lg">
                <FaTint className="mr-2" />
                <span>Humidity: {airQualityData.data.current.weather.hu}%</span>
              </div>
              <div className="mt-4 text-sky-100 text-lg">
                <span className="mr-2">
                  SKOR AQI: {airQualityData.data.current.pollution.aqius}
                </span>
                <div className="flex items-center mt-2 text-sky-100 text-lg">
                  Status:{" "}
                  {getAirQualityStatus(
                    airQualityData.data.current.pollution.aqius
                  )}
                </div>
              </div>
              <Button text="Reset" onClick={resetAirQuality} />
            </div>
            {viewport.latitude && viewport.longitude && (
              <div className="mt-8" style={{ width: "50%" }}>
                <h3 className="text-xl text-sky-100 mb-4">Location Map</h3>
                <MapContainer
                  center={[viewport.latitude, viewport.longitude]}
                  zoom={viewport.zoom}
                  style={{ width: "100%", height: "300px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {viewport.latitude && viewport.longitude && (
                    <Marker
                      position={[viewport.latitude, viewport.longitude]}
                      icon={customIcon}
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
                    />
                    <Button
                      text="Detail"
                      className="mx-auto"
                      onClick={buttonDetail}
                    />
                  </div>
                </div>
                {/* MODAL */}
                {toggleDetail && (
                  <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
                    <div className="relative w-5/6 md:w-2/4  p-10 rounded-xl bg-base-200">
                      <button
                        className="absolute top-2 right-2 text-gray-400 focus:outline-none"
                        onClick={buttonDetail}
                      >
                        {" "}
                        <FaTimes />
                      </button>
                      <div className="w-full flex justify-center">
                        <div className="w-full gap-2">
                          <h2 className="text-2xl font-bold text-sky-100">
                            {searchResult.data.city}
                          </h2>
                          <p className="text-sky-100 mb-1">
                            {searchResult.data.state},{" "}
                            {searchResult.data.country}
                          </p>
                          <p className="text-slate-400 mb-4 text-xs">
                            Terakhir Diperbarui Pada, {""}
                            {searchResult?.data?.current.pollution.ts &&
                              new Date(
                                searchResult.data.current.pollution.ts
                              ).toLocaleString()}
                          </p>
                          <div className="pollution mb-6">
                            <h5 className="text-xl mb-2 font-medium">
                              Pollution
                            </h5>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaSmog className="mr-2" />
                              <span>
                                Air Quality :{" "}
                                {searchResult.data.current.pollution.aqius}
                              </span>
                            </div>
                          </div>
                          <div className="weather">
                            <h5 className="text-xl mb-2 font-medium">
                              Weather
                            </h5>
                            <div className="flex items-center text-sky-100 text-lg ">
                              {getWeatherIcon(
                                searchResult.data.current.weather.ic
                              )}
                              <span className="mr-1">
                                {searchResult.data.current.weather.tp}°C
                              </span>
                            </div>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaTint className="mr-2" />
                              <span>
                                Humidity :{" "}
                                {searchResult.data.current.weather.hu}%
                              </span>
                            </div>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaWind className="mr-2" />
                              <span>
                                Wind : {searchResult.data.current.weather.ws}{" "}
                                km/h
                              </span>
                            </div>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaWind className="mr-2" />
                              <span>
                                Pressure :{" "}
                                {searchResult.data.current.weather.pr} mbar
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 text-sky-100 text-lg ">
                            <div className="flex items-center mt-2 text-sky-100 text-lg ">
                              Status :{" "}
                              {getAirQualityStatus(
                                searchResult.data.current.pollution.aqius
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
<<<<<<< HEAD
            </div>
          ) : airQualityData ? (
            <div className="md:flex md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-sky-100">
                  {airQualityData.data.city}
                </h2>
                <p className="text-sky-100 mb-4">
                  {airQualityData.data.state}, {airQualityData.data.country}
                </p>
                <div className="flex items-center text-sky-100 text-lg ">
                  {getWeatherIcon(airQualityData.data.current.weather.ic)}
                  <span className="mr-1">
                    {airQualityData.data.current.weather.tp}°C
                  </span>
                </div>
                <div className="flex items-center text-sky-100 text-lg ">
                  <FaSmog className="mr-2" />
                  <span>
                    Air Quality : {airQualityData.data.current.pollution.aqius}
                  </span>
                </div>
                <div className="flex items-center text-sky-100 text-lg ">
                  <FaWind className="mr-2" />
                  <span>
                    Wind : {airQualityData.data.current.weather.ws} km/h
                  </span>
                </div>
                <div className="flex items-center text-sky-100 text-lg ">
                  <FaTint className="mr-2" />
                  <span>
                    Humidity: {airQualityData.data.current.weather.hu}%
                  </span>
                </div>
                <div className="mt-4 text-sky-100 text-lg pe-2">
                  <span className="mr-2">
                    AQI Score : {airQualityData.data.current.pollution.aqius}
                  </span>
                  <div className="flex items-center mt-2  text-sky-100 text-lg">
                    Status{" "}
                    {getAirQualityStatus(
                      airQualityData.data.current.pollution.aqius
                    )}
                  </div>
                  <div className="button-modal flex gap-2">
                    <Button
                      text="Reset"
                      onClick={resetAirQuality}
                      className="mx-auto"
                    />
                    <Button
                      text="Detail"
                      className="mx-auto"
                      onClick={buttonDetail}
                    />
                  </div>
                </div>

                {/* MODAL */}
                {toggleDetail && (
                  <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
                    <div className="relative w-5/6 md:w-2/4  p-10 rounded-xl bg-base-200">
                      <button
                        className="absolute top-2 right-2 text-gray-400 focus:outline-none"
                        onClick={buttonDetail}
                      >
                        {" "}
                        <FaTimes />
                      </button>
                      <div className="w-full flex justify-center">
                        <div className="w-full gap-2">
                          <h2 className="text-2xl font-bold text-sky-100">
                            {airQualityData.data.city}
                          </h2>
                          <p className="text-sky-100 mb-1">
                            {airQualityData.data.state},{" "}
                            {airQualityData.data.country}
                          </p>
                          <p className="text-slate-400 mb-4 text-xs">
                            Terakhir Diperbarui Pada, {""}
                            {airQualityData?.data?.current.pollution.ts &&
                              new Date(
                                airQualityData.data.current.pollution.ts
                              ).toLocaleString()}
                          </p>
                          <div className="pollution mb-6">
                            <h5 className="text-xl mb-2 font-medium">
                              Pollution
                            </h5>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaSmog className="mr-2" />
                              <span>
                                Air Quality :{" "}
                                {airQualityData.data.current.pollution.aqius}
                              </span>
                            </div>
                          </div>
                          <div className="weather">
                            <h5 className="text-xl mb-2 font-medium">
                              Weather
                            </h5>
                            <div className="flex items-center text-sky-100 text-lg ">
                              {getWeatherIcon(
                                airQualityData.data.current.weather.ic
                              )}
                              <span className="mr-1">
                                {airQualityData.data.current.weather.tp}°C
                              </span>
                            </div>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaTint className="mr-2" />
                              <span>
                                Humidity :{" "}
                                {airQualityData.data.current.weather.hu}%
                              </span>
                            </div>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaWind className="mr-2" />
                              <span>
                                Wind : {airQualityData.data.current.weather.ws}{" "}
                                km/h
                              </span>
                            </div>
                            <div className="flex items-center text-sky-100 text-lg ">
                              <FaWind className="mr-2" />
                              <span>
                                Pressure :{" "}
                                {airQualityData.data.current.weather.pr} mbar
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 text-sky-100 text-lg ">
                            <div className="flex items-center mt-2 text-sky-100 text-lg ">
                              Status :{" "}
                              {getAirQualityStatus(
                                airQualityData.data.current.pollution.aqius
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {viewport.latitude && viewport.longitude && (
                <div className="mt-8 md:mt-0 w-full md:w-2/4">
                  <h3 className="text-2xl font-bold text-sky-100 mb-4">
                    Location Map
                  </h3>
                  <MapContainer
                    center={[viewport.latitude, viewport.longitude]}
                    zoom={viewport.zoom}
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "10px",
                      zIndex: 20,
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {viewport.latitude && viewport.longitude && (
                      <Marker
                        position={[viewport.latitude, viewport.longitude]}
                        icon={Icon}
                      />
                    )}
                  </MapContainer>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <hr className="flex-grow border-t-2 border-black" />
              <button onClick={trackAirQuality} className="mx-3">
                Click Here To Track Your Air Quality!
              </button>
              <hr className="flex-grow border-t-2 border-black" />
            </div>
          )}
        </div>
      </Card>
    </>
=======
            )}
          </div>
        ) : (
          <div className="flex items-center mr-40">
            <hr className="flex-grow border-t-2 border-black" />
            <button onClick={trackAirQuality} className="mx-3">
              Click Here To Search City Data!
            </button>
            <hr className="flex-grow border-t-2 border-black" />
          </div>
        )}
      </div>
    </Card>
>>>>>>> ddf2399dce1f19615ce63ad081a92ecc6b707ec5
  );
};

export default Content;
