import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Datepicker } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreateProject() {
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState({
    projectName: "",
    description: "",
    skills: " ",
    projectUrl: "",
    from: "",
    to: "",
    githubUrl: "",
    linkedinUrl: "",
  });

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
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleImageChange = (e) => {
    setImageFile(Array.from(e.target.files)); 
  };
  console.log(imageFile);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const formData = new FormData();
      // Append each file to the formData
      imageFile.forEach(file => {
        formData.append("images", file);
      });
  
      const res = await fetch(`/api/project/uploadImage`, {
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
  
      setImageData(data.data); 
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
  
console.log(imageData)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/project/createProject`, {
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
            navigate("/admin2213008?tab=projects");
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
          Project Details
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="text-lg font-subheading_font text-black/80 dark:text-green-50">
            Project Info
          </p>
          <div className="mt-4 gap-6 dark:text-gray-500 font-body_font space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Name */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Project Name
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Project Name"
                id="projectName"
                onChange={handleChanges}
              ></input>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="skills"
              >
                Technology<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Technologies used"
                id="skills"
                onChange={handleChanges}
              ></input>
            </div>

            {/* From */}

            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="date">
                From
              </label>
              <Datepicker
                id="from"
                name="from"
                className="w-full  border border-gray-300 rounded-lg hover:rounded-xl hover:shadow-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400 bg-white"
                placeholder="Select Date"
                onSelect={handleChanges}
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium" htmlFor="date">
                To
              </label>
              <Datepicker
                id="to"
                name="to"
                className="w-full  border border-gray-300 rounded-lg hover:rounded-xl hover:shadow-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400 bg-white"
                placeholder="Select Date"
                onSelect={handleChanges}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-400 border-dashed">
          <p className="text-lg mt-2 font-subheading_font text-black/80 dark:text-green-50">
            URLs
          </p>

          <div className="mt-2 dark:text-gray-500 font-body_font mb-2 gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
            {/* Project Links */}
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Project Link<span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Project Url"
                  id="projectUrl"
                  onChange={handleChanges}
                ></input>
              </div>
            </div>

            {/* GithubURl */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="github"
              >
                Github URL<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Github Url"
                id="githubUrl"
                onChange={handleChanges}
              ></input>
            </div>

            {/* Linkedin URL */}
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="linkedinURl"
              >
                Linkedin URL<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Linkedin URL"
                id="linkedinUrl"
                onChange={handleChanges}
              ></input>
            </div>
          </div>
        </div>

        <div className="my-6 py-4 lg:py-2 border-t border-dashed border-gray-400">
          <label
            className="text-sm pt-5 pb-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="links"
          >
            Project Description <span className="text-red-700">*</span>
          </label>
          <ReactQuill
            theme="snow"
            className=" h-72 mb-12"
            id="description"
            placeholder="Enter Description"
            onChange={(value) =>
              setInfoData({ ...infoData, description: value })
            }
          />
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

      {/* <div className="flex flex-wrap justify-center  gap-4">
        {infoData?.image?.map((image, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 "
          >
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
                <button
                  
                  className=" dark:bg-green-100 dark:text-black text-white bg-black/80 rounded-md p-2 px-6 hover:bg-green-600"
                >
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
      </div> */}

      {error && <div className="text-center text-red-600 error">{error}</div>}
      {updateMessage && (
        <div className="text-center text-green-600 success">
          {updateMessage}
        </div>
      )}
    </div>
  );
}

export default CreateProject;
