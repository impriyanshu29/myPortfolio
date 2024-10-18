import React from 'react'
import { useState,useEffect,useCallback } from 'react';
function Contact() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [updateMessage1, setUpdateMessage1] = useState("");
  const [loading ,setLoading] = useState(false)
  const [error1 ,setError1] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const handleChanges = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      if (prevData[id] === value) return prevData; // Avoid state update if the value hasn't changed
      return { ...prevData, [id]: value };
    });
  }, []);
  


  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/message/createMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
     
      setLoading(false);
      setUpdateMessage1("MEssage sent successfully");
      setTimeout(() => {
       
        setUpdateMessage1("");
      }, 5000);
    } catch (error) {
      setError1("Unable to send message");
      setLoading(false);
      setTimeout(() => {
        setError1("");
      }, 5000);
    }
  };
  return (
    <div className="w-full pb-4 pt-8 text-center lg:text-left  dark:text-neutral-200">
        <div className="flex flex-col items-center w-full justify-center text-center">
          <div className="w-full max-w-4xl px-4 md:px-12">
            <h1 className="text-4xl font-bold text-center md:mb-2 dark:text-green-50 bloc text-black/80 md:text-4xl lg:text-6xl">
              Contact Me
            </h1>

            <div className="mt-8 md:p-16 p-6   dark:bg-neutral-950">
            <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
        <div className="grid w-full gap-1">
          <label
            className="text-sm font-medium text-left leading-none text-gray-700 dark:text-gray-300"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            className="flex h-10  w-full rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-green-400"
            type="text"
            id="first_name"
            placeholder="Eg: Priyanshu"
            value={formData.first_name}
            onChange={handleChanges}
          />
        </div>
        <div className="grid w-full text-left items-center gap-1">
          <label
            className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-green-400"
            type="text"
            id="last_name"
            placeholder="Eg:Tiwari"
            value={formData.last_name}
            onChange={handleChanges}
          />
        </div>
      </div>
      <div className="grid w-full items-center gap-1">
        <label
          className="text-sm font-medium text-left leading-none text-gray-700 dark:text-gray-300"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-green-400"
          type="email"
          id="email"
          placeholder="Eg:abc1234@outlook.com"
          value={formData.email}
          onChange={handleChanges}
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <label
          className="text-sm font-medium text-left leading-none text-gray-700 dark:text-gray-300"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="flex h-20 w-full rounded-md border border-gray-400 bg-transparent px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-green-400"
          id="message"
          placeholder="Eg: Hi, I would like to discuss a project with you."
          rows={4}
          value={formData.message}
          onChange={handleChanges}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-black"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
            </div>
            {error1 && (
            <div className="mt-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 p-2 rounded-md">
              {error1}
            </div>
          )}
          {updateMessage1 && (
            <div className="mt-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 p-2 rounded-md">
              <p>Message sent successfully! I'll get back to you soon.</p>
            </div>
          )}
          </div>
          
        </div>
      </div>
  )
}

export default Contact