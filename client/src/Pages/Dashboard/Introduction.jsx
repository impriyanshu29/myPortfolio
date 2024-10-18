import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Introduction() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState({});

  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  // Messages ->
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [changeAbout , setChangeAbout] = useState(" ")
  const handleChanges = (e) => {
    setInfoData({
      ...infoData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/intro/createIntro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          about: changeAbout,
          infoData
        }
          
        
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setUpdateMessage("");
        return;
      }

      setInfoData(data.data);
      setUpdateMessage(data.message);
      setLoading(false);
      setError("");
      setTimeout(() => {
        setUpdateMessage("");
      }, 5000);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setLoading(false);
      setUpdateMessage("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/getIntro`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
          return;
        }
      
        setInfoData(data.data);
        setChangeAbout(data.data.about)
      } catch (error) {
        console.log(error);
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchInfo();
  }, []);

  console.log(infoData); // Debug state

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/intro/uploadProfileImage`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setError("Error while uploading image");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setInfoData(data.data);
      setUpdateMessage("Image uploaded successfully");
    } catch (error) {
      console.log(error);
      setError("Unable to upload image");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
        setUpdateMessage("");
      }, 5000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/intro/deleteProfileImage?publicId=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }
      setUpdateMessage(data.message);
      setError("");
      setTimeout(() => {
        setUpdateMessage(" ");
      }, 5000);
    } catch (error) {
      setError("Unable to delete ");
      setTimeout(() => {
        setError(" ");
      }, 5000);
    }
  };

  const handlePDFChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handlePDFSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("No file selected");
      return;
    }

    const pdfData = new FormData();
    pdfData.append("resumePdf", resumeFile);
    try {
      setPdfLoading(true);
      const res = await fetch(`${apiUrl}/api/intro/uploadResumePdf`, {
        method: "POST",
        body: pdfData,
      });

      if (!res.ok) {
        setLoading(false);
        setError("Error while uploading PDF");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setInfoData(data.data);
      setPdfLoading(false);
      setUpdateMessage("PDF uploaded successfully");
      setTimeout(() => {
        setUpdateMessage(" ");
      }, 5000);
    } catch (error) {
      setLoading(false);
      setError("Unable to upload PDF");
      setTimeout(() => {
        setError(" ");
      }, 5000);
    }
  };

  const handlePDFDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/intro/deleteResumePdf?publicId=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }
      setUpdateMessage(data.message);
      setError("");
      setTimeout(() => {
        setUpdateMessage(" ");
      }, 5000);
    } catch (error) {
      setError("Unable to delete ");
      setTimeout(() => {
        setError(" ");
      }, 5000);
    }
  };

  console.log("InfoData", infoData);
  console.log("Image", infoData?.image);
  return (
    <div className="overflow-hidden p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div className="mb-4 flex items-center justify-center rounded-lg py-2">
        <h1 className="text-center font-heading_font text-3xl my-4 text-black/80 dark:text-green-100">
          Introduction Details
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-lg font-subheading_font text-black/80 dark:text-green-50">
            Basic Info
          </p>
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Name */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                My Name
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="name"
                value={infoData.name}
                onChange={handleChanges}
              ></input>
            </div>
            {/* My Email */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your email"
                id="email"
                value={infoData.email}
                onChange={handleChanges}
              ></input>
            </div>

            {/* Headlines */}
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="headlines"
                >
                  Headlines
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Headlines"
                  id="headlines"
                  value={infoData.headlines}
                  onChange={handleChanges}
                ></input>
              </div>
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="headlines"
                >
                  Sub Heading
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Sub Headings"
                  id="subHeading"
                  value={infoData.subHeading}
                  onChange={handleChanges}
                ></input>
              </div>
            </div>

            {/* About */}
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="about"
                >
                  About<span className="text-red-700">*</span>
                </label>

                <ReactQuill
                  theme="snow"
                  className=" h-72 mb-12"
                  id="about"
                  placeholder="Enter Description"
                  value={changeAbout}
                  onChange={(value) => setChangeAbout(value )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-400 border-dashed">
          <p className="text-lg mt-2 font-subheading_font text-black/80 dark:text-green-50">
            Other Info
          </p>

          <div className="mt-2 dark:text-gray-500 font-body_font mb-2 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Location */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="location"
              >
                Location<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter location"
                id="location"
                value={infoData.location}
                onChange={handleChanges}
              ></input>
            </div>

            {/* City */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="city"
              >
                City<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter city"
                id="city"
                value={infoData.city}
                onChange={handleChanges}
              ></input>
            </div>

            {/* Hobbies */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="hobies"
              >
                Hobies<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Hobbies"
                id="hobbies"
                value={infoData.hobbies}
                onChange={handleChanges}
              ></input>
            </div>

            {/* Interests */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="interests"
              >
                Interests<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Interests"
                id="interests"
                value={infoData.interests}
                onChange={handleChanges}
              ></input>
            </div>

            {/* Languages */}
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="languages"
                >
                  Languages<span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Languages you know"
                  id="languages"
                  value={infoData.languages}
                  onChange={handleChanges}
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
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
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
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
      <div className="flex flex-wrap justify-center  gap-4">
        {infoData?.image?.map((image, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 ">
            <img
              src={image?.url}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-md border border-gray-300"
            />
            <div className="flex justify-center">
              <button
                onClick={() => handleDelete(image?.public_id)}
                className=" bg-red-500 mt-5 justify-center text-white rounded-md p-2 px-5 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handlePDFSubmit}>
        <div className="flex border-t border-dashed mt-6 lg:flex-col  ">
          <div className="w-full my-3 flex lg:justify-between gap-4 items-center">
            <div className="flex-[6]">
              <label
                className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="image"
              >
                PDF Upload <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                id="image"
                onChange={handlePDFChange}
              ></input>
            </div>
            <div className="flex-[2] flex items-center mt-5 ">
              <button
                type="submit"
                className="flex items-center justify-center h-10 p-4 w-full rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1"
                disabled={loading}
              >
                {pdfLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex  flex-wrap gap-4">
        {infoData?.resumePdf?.map((image, index) => (
          <div key={index} className="w-full gap-6 flex flex-col ">
            <div>
              <embed
                src={image?.url}
                type="application/pdf"
                className="w-full h-auto rounded-md border border-gray-300"
                width="100%"
                height="400px"
              />
            </div>

            <div className="flex flex-row justify-center gap-6 ">
              <Link to={image?.url} target="_blank" rel="noopener noreferrer">
                <button className=" dark:bg-green-100 dark:text-black text-white bg-black/80 rounded-md p-2 px-6 hover:bg-green-600">
                  Show
                </button>
              </Link>
              <button
                onClick={() => handlePDFDelete(image?.public_id)}
                className=" bg-red-500 text-white rounded-md p-2 px-5 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-center text-red-600 error">{error}</div>}
      {updateMessage && (
        <div className="text-center text-green-600 success">
          {updateMessage}
        </div>
      )}
    </div>
  );
}

export default Introduction;
