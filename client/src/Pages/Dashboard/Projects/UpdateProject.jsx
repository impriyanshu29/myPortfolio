import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Datepicker } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


function UpdateProject() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState({});
  const [updateData, setUpdateData] = useState({
    description: "",
  });

  const [imageFile, setImageFile] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("_id");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/project/getProject?_id=${id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          setTimeout(() => setError(null), 5000);
          return;
        }
        setInfoData(data?.data[0]);
        setUpdateData((prevState) => ({
          ...prevState,
          description: data?.data[0]?.description,
        }));
        
        setImageData(data?.data[0]?.images);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setTimeout(() => setError(null), 5000);
      }
    };
    fetchProjects();
  }, [id]);

 
  const handleChanges = (e) => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value });
  };

  console.log(updateData);
  const handleImageChange = (e) => {
    setImageFile(Array.from(e.target.files));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const formData = new FormData();
      imageFile.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch(`${apiUrl}/api/project/uploadImage`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setImageLoading(false);
        setTimeout(() => setError(""), 5000);
        return;
      }

      setImageData((prevData) => [...prevData, ...data.data]);
      setUpdateMessage(data.message);
      setImageLoading(false);
      setTimeout(() => setUpdateMessage(""), 5000);
    } catch (error) {
      setError("Failed to upload image");
      setImageLoading(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/project/updateProject?_id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updateData, images: imageData }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        setTimeout(() => setError(""), 5000);
        return;
      }
      setUpdateMessage(data.message);
      setLoading(false);
      setTimeout(() => {
        setUpdateMessage("");
        navigate("/admin2213008?tab=projects");
      }, 5000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDelete = async (public_id) => {
    try {
      const res = await fetch(`${apiUrl}/api/project/deleteImage?_id=${id}&&public_id=${public_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setTimeout(() => setError(null), 5000);
        return;
      }
      setImageData((prevData) => prevData.filter((image) => image.public_id !== public_id));
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(null), 5000);
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
            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="projectName"
              >
                Project Name
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                defaultValue={infoData.projectName}
                id="projectName"
                onChange={handleChanges}
              />
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
                id="skills"
  defaultValue={infoData.skills}
                onChange={handleChanges}
              />
            </div>

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
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="projectUrl"
                >
                  Project Link<span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
    defaultValue={infoData.projectUrl}
                  id="projectUrl"
                  onChange={handleChanges}
                />
              </div>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="githubUrl"
              >
                Github URL<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="githubUrl"
  defaultValue={infoData.githubUrl}
                onChange={handleChanges}
              />
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="linkedinUrl"
              >
                Linkedin URL<span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="linkedinUrl"
  defaultValue={infoData.linkedinUrl}
                onChange={handleChanges}
              />
            </div>
          </div>
        </div>

        <div className="my-6 py-4 lg:py-2 border-t border-dashed border-gray-400">
          <label
            className="text-sm pt-5 pb-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="description"
          >
            Project Description <span className="text-red-700">*</span>
          </label>
          <ReactQuill
            theme="snow"
            className="h-72 mb-12 content-of-post"
            id="description"
            value={updateData.description}
            onChange={(value) => setUpdateData({ ...updateData, description: value })}
          />
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
        <div className="flex lg:flex-col border-t border-dashed mt-6">
          <div className="w-full my-3 flex lg:justify-between gap-4 items-center">
            <div className="flex-[6]">
              <label
                className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="image"
              >
                Images <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="file"
                multiple
                id="image"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex-[2] flex items-center mt-5">
              <button
                type="submit"
                className="flex items-center justify-center h-10 p-4 w-full rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1"
                disabled={imageLoading}
              >
                {imageLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex gap-2">
        {imageData?.map((image, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5"
          >
            <img
              src={image?.url}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-md border border-gray-300"
            />
            <div className="flex justify-center">
              <button
                onClick={() => handleDelete(image?.public_id)}
                className="bg-red-500 mt-5 justify-center text-white rounded-md p-2 px-5 hover:bg-red-600"
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

export default UpdateProject;
