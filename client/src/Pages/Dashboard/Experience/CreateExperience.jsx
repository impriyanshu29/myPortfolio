import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Datepicker } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreateExperience() {
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState({
    role: "",
    companyName: "",
    employmentType: " ",
    location: "",
    startDate: "",
    endDate: "",
    experience: "",
    description: "",
  });


  const apiUrl = import.meta.env.VITE_API_URL;
  // Messages ->
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [data  , setData] = useState([{}]); 
  const handleChanges = (e) => {
    setInfoData({ ...infoData, [e.target.id]: e.target.value });
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/experience/createExperience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...infoData}),
      });
        const data = await res.json();
        if(!res.ok){
          setError(data.message);
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 5000);
          return;
        }
        setUpdateMessage(data.message);
        setLoading(false);
        setData(data?.data);
        setTimeout(() => {
            setUpdateMessage("");
            navigate("/admin2213008?tab=experience");
        }, 5000);

    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="overflow-hidden p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div className="mb-4 flex items-center justify-center rounded-lg py-2">
        <h1 className="text-center font-heading_font text-3xl my-4 text-black/80 dark:text-green-100">
          Experience Details
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-lg font-subheading_font text-black/80 dark:text-green-50">
            Education Info
          </p>
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Name */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Company Name
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Eg: Google Inc."
                id="companyName"
                onChange={handleChanges}
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="skills"
              >
                Role<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Eg: Software Developer"
                id="role"
                onChange={handleChanges}
              ></input>
            </div>

            {/* From */}

            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="date">
                Start Date
              </label>
              <Datepicker
                id="startDate"
                name="from"
                className="w-full  border border-gray-300 rounded-lg hover:rounded-xl hover:shadow-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400 bg-white"
                placeholder="Select Date"
                onSelect={handleChanges}
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="date">
                End Date
              </label>
              <Datepicker
                id="endDate"
                name="to"
                className="w-full  border border-gray-300 rounded-lg hover:rounded-xl hover:shadow-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400 bg-white"
                placeholder="Select Date"
                onSelect={handleChanges}
              />
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Employment Type <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Eg: Full Time, Part Time, Internship"
                  id="employmentType"
                  onChange={handleChanges}
                ></input>
              </div>
            </div>
            <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Experience <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Eg: 2 years"
                  id="experience"
                  onChange={handleChanges}
                ></input>
              </div>
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Location <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Eg: Gorakhpur, India"
                  id="location"
                  onChange={handleChanges}
                ></input>
              </div>
              <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Description <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                placeholder="Eg: Worked on the front end of the website."
                  id="description"
                  onChange={handleChanges}
                ></input>
              </div>
            </div>
          </div>
        </div>

       

        

        <div className="mt-4  ">
          <button
            type="submit"
            className="flex items-center justify-center w-full h-10 rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Info"}
          </button>
        </div>
      </form>

      
      {error && <div className="text-center text-red-600 error">{error}</div>}
      {updateMessage && (
        <div className="text-center text-green-600 success">
          {updateMessage}
        </div>
      )}
    </div>
  );
}

export default CreateExperience;
