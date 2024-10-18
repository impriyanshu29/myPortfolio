import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Datepicker } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreateCertificate() {
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState({
    title: "",
    issuer: "",
    date: " ",
    description: "",
    jobs: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [imageFile, setImageFile] = useState([]);
  const [imageData, setImageData] = useState([]);

  // Messages ->
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [data  , setData] = useState([{}]); 
  const handleChanges = (e) => {
    setInfoData({ ...infoData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(Array.from(e.target.files)); 
  };


  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const formData = new FormData();
      // Append each file to the formData
      imageFile.forEach(file => {
        formData.append("certificateImage", file);
      });
  
      const res = await fetch(`${apiUrl}/api/certificate/uploadImage`, {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message);
        setImageLoading(false);
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }
  
      setImageData(data?.data); 
      setUpdateMessage(data.message);
      setImageLoading(false);
      setTimeout(() => {
        setUpdateMessage("");
      }, 5000);
      
    } catch (error) {
        console.log(error);
      setError("Failed to upload image");
      setImageLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/certificate/createCertificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...infoData, images: imageData }),
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
        setData(data.data);
        setTimeout(() => {
            setUpdateMessage("");
            navigate("/admin2213008?tab=certificate");
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
          Certificate Details
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-lg font-subheading_font text-black/80 dark:text-green-50">
            Certificate Info
          </p>
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Name */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Title
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Eg: Google Developer"
                id="title"
                onChange={handleChanges}
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="skills"
              >
                Issuer <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Eg: Google"
                id="issuer"
                onChange={handleChanges}
              ></input>
            </div>

            {/* From */}
            <div className="col-span-2 grid">
            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="date">
                Date
              </label>
              <Datepicker
                id="date"
                name="from"
                className="w-full  border border-gray-300 rounded-lg hover:rounded-xl hover:shadow-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400 bg-white"
                placeholder="Select Date"
                onSelect={handleChanges}
              />
            </div>
            </div>
           
            
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
                  placeholder="Enter description"
                  id="description"
                  onChange={handleChanges}
                ></input>
              </div>
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Jobs <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Eg: Google Developer"
                  id="jobs"
                  onChange={handleChanges}
                ></input>
              </div>
           
          </div>
        </div>

       

        

        <div className="mt-4  ">
          <button
            type="submit"
            className="flex items-center justify-center w-full h-10 rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Info"}
          </button>
        </div>
      </form>

      <form onSubmit={handleImageSubmit}>
        <div className="flex lg:flex-col border-t border-dashed mt-6   ">
          <div className="w-full my-3 flex lg:justify-between gap-4 items-center">
            <div className="flex-[6]">
              <label
                className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="image"
              >
                Images <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3  text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                multiple
                id="image"
                onChange={handleImageChange}
              ></input>
            </div>
            <div className="flex-[2] flex items-center mt-5 ">
              <button
                type="submit"
                className="flex items-center justify-center h-10 p-4 w-full rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
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

export default CreateCertificate;
