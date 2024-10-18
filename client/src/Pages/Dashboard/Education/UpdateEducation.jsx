import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Datepicker } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateEducation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState({
    school: "",
    fieldOfStudy: "",
    degree: " ",
    startDate: "",
    endDate: "",
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
    const fetchEducation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/edu/getEducation?_id=${id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          setTimeout(() => setError(null), 5000);
          return;
        }
        const project = data.data[0];
        setInfoData({
          school: project.school,
          fieldOfStudy: project.fieldOfStudy,
          degree: project.degree,
          startDate: project.startDate,
          endDate: project.endDate,
        });
        setImageData(project.image[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setTimeout(() => setError(null), 5000);
      }
    };
    fetchEducation();
  }, [id]);


  const handleChanges = (e) => {
    const { id, value } = e.target;
    setInfoData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(Array.from(e.target.files));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    try {
      const formData = new FormData();
      imageFile.forEach((file) => {
        formData.append("educationImage", file);
      });

      const res = await fetch(`${apiUrl}/api/edu/uploadImage`, {
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

      setImageData(data?.data);
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
      const res = await fetch(`${apiUrl}/api/edu/updateEducation?_id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...infoData, images: imageData }),
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
        navigate("/admin2213008?tab=education");
      }, 5000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setTimeout(() => setError(""), 5000);
    }
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleDelete = async (public_id) => {
    try {
      const res = await fetch(
        `${apiUrl}/api/edu/deleteImage?_id=${id}&&public_id=${public_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setTimeout(() => setError(null), 5000);
        return;
      }
      setImageData({});
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="overflow-hidden p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div className="mb-4 flex items-center justify-center rounded-lg py-2">
        <h1 className="text-center font-heading_font text-3xl my-4 text-black/80 dark:text-green-100">
          Education Details
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
                Institute
                <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent text-gray-400 px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={infoData.school}
                id="school"
                onChange={handleChanges}
              />
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="skills"
              >
                Field Of Study <span className="text-red-700">*</span>
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                value={infoData.fieldOfStudy}
                id="fieldOfStudy"
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
                value={infoData.startDate}
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
                value={infoData.endDate}
                onSelect={handleChanges}
              />
            </div>
            <div className="col-span-2 grid">
              <div className="w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="links"
                >
                  Degree <span className="text-red-700">*</span>
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  value={infoData.degree}
                  id="degree"
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

      <div className="flex justify-center gap-2">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5">
          <img
            src={imageData?.url}
            alt={infoData?.school}
            className="w-full h-auto rounded-md border border-gray-300"
          />
          <div className="flex justify-center">
            <button
              onClick={() => handleDelete(imageData?.public_id)}
              className="bg-red-500 mt-5 justify-center text-white rounded-md p-2 px-5 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
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

export default UpdateEducation;
