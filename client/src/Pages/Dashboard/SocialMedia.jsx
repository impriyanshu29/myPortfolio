import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
function SocialMedia() {
  const [socialInfo, setSocialInfo] = useState({
    name: "",
    url: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [socialData, setSocialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const handleSocialChange = (e) => {
    setSocialInfo({
      ...socialInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${apiUrl}/api/intro/addSocials?`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "iampriyanshu2901@outlook.com",
          name: socialInfo.name,
          url: socialInfo.url,
        }),
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
      setSocialData([ data.data]);
      setUpdateMessage(data.message);
      setLoading(false);
      setTimeout(() => {
        setUpdateMessage("");
      }, 5000);
    } catch (error) {
     
      setError("Failed to add social media");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };


    useEffect(() => {
    const fetchSocials = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/intro/getSocial   `)
                ;
          
            const data = await res.json();
            if(!res.ok){
                setError(data.message);
                setLoading(false);
                setTimeout(() => {
                    setError("");
                }, 5000);
                return;
            }
            setSocialData(data.data);

                
            }
        catch (error) {
            
            setError("Failed to fetch social media");
            setLoading(false);
            setTimeout(() => {
                setError("");
            }
            , 5000);
        }
    };
    fetchSocials();
}, []);

  const handleSocialDelete = async (id) => {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/intro/deleteSocial?_id=${id}`, {
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
      setSocialData(socialData.filter((item) => item._id !== id));
      setUpdateMessage(data.message);
      setLoading(false);
      setTimeout(() => {
        setUpdateMessage("");
      }, 5000);
    } catch (error) {
      
      setError("Failed to delete social media");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="overflow-hidden  p-3 dark:glass-container md:w-2/4 md:px-14 min-h-screen mx-auto  bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40  dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900  ">
    <div className="mb-4 flex items-center justify-center rounded-lg py-2">
      <h1 className="text-center font-heading_font text-3xl my-4 text-black/80 dark:text-green-100 ">
        Social Media Details
      </h1>
    </div>
   
      <form onSubmit={handleSocialSubmit}>
        <div className="mt-2 dark:text-gray-500 font-body_font gap-6 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
          <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="name"
            >
              Name
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Social Media Name"
              id="name"
              onChange={handleSocialChange}
              value={socialInfo.name}
            >
              <option>Select Social Meida </option>
            <option value="Instagram">Instagram</option>
            <option value="Github">Github</option>
            <option value="Facebook">Facebook</option>
            <option value="Email">Email</option>
              <option value="Linkedin">Linkedin</option>
              <option value="Discord">Discord</option>
              <option value="X">X</option>
              </select>
          </div>

          <div className="w-full">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="url"
            >
              URL
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:placeholder:text-gray-700 text-gray-500 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter Social Media Link"
              id="url"
              onChange={handleSocialChange}
              value={socialInfo.url}
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="flex items-center justify-center w-full h-10 rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Social Media"}
          </button>
        </div>
        </form>
        <div className="mt-4">
          {socialData.flat().map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 mb-2 bg-white shadow-md rounded-md dark:bg-gray-800"
            >
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.name}
                </p>
                
                <Link to={item.url} className="text-sm text-gray-500 cursor-pointer dark:text-gray-400">
                  {item.url}
                </Link>
              </div>
              <button
                onClick={() => handleSocialDelete(item._id)}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {error && (
          <div className=" text-center text-red-600 error">{error}</div>
        )}
        {updateMessage && (
          <div className=" text-center text-green-600 success">
            {updateMessage}
          </div>
        )}
     
    </div>
    
  );
}

export default SocialMedia;
