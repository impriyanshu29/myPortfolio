import React, {useState} from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
export function Footer() {
  const [error, setError] = useState(" ");
  const [updateMessage, setUpdateMessage] = useState(" ");
  const [socialData, setSocialData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/getSocial`);
        const data = await res.json();
      
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError(" ");
          }, 5000);
          return;
        }

        setSocialData(data.data);

        setUpdateMessage(data.message);
        setError(" ");
        setTimeout(() => {
          setUpdateMessage(" ");
        }, 5000);
      } catch (error) {
        setError("Unable to fetch social media");
        setTimeout(() => {
          setError(" ");
        }, 5000);
      }
    };
    fetchSocialMedia();
  }, []);
  return (
    <footer className="bg-black/90 text-white dark:bg-neutral-950 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="mt-2">Feel free to reach out for collaborations or just a friendly chat.</p>
          </div>
          <div className="flex space-x-6">
          {socialData?.map((social, index) => {
  return (
    //
    
    <div key={index} className="flex flex-col gap-4 mt-4">
      {social?.name === "Instagram" ? (
        <a
          href={social?.url}
          className="text-green-50 hover:text-pink-600 dark:hover:text-pink-600"
        >
          <FaInstagram size={24} />
        </a>
      ) : social?.name === "Linkedin" ? (
        <a
          href={social?.url}
          className="text-green-50 dark:hover:text-blue-600 hover:text-blue-600"
        >
          <FaLinkedin size={24} />
        </a>
      ) :social?.name === "Discord" ? (
        <a
          href={social?.url}
          className="text-green-50 dark:hover:text-blue-600 hover:text-blue-600"
        >
          <FaDiscord size={24} />
        </a>
      ): social?.name === "Email" ? (
        <a
           href={`mailto:${social.url}`}
          className="text-green-50 dark:hover:text-blue-600 hover:text-blue-600"
        >
          <MdEmail size={24} />
        </a>
      ):social?.name === "Facebook" ? (
        <a
           href={social.url}
          className="text-green-50 dark:hover:text-blue-600 hover:text-blue-600"
        >
          <FaFacebookF size={24} />
        </a>
      ): social?.name === "Github" ? (
        <a
          href={social?.url}
          className="text-green-50 dark:hover:text-gray-200 hover:text-black"
        >
          <FaGithub size={24} />
        </a>
      ) : social?.name === "X" ? (
        <a
          href={social?.url}
          className="text-green-50  "
        >
          <BsTwitterX size={24} />
        </a>
      ) : null}
    </div>
  );
})}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Priyanshu Tiwari. All rights reserved.</p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/resume" className="text-gray-400 hover:text-white transition-colors duration-300">Resume</Link>
            </li>
            <li>
              <Link to="/works" className="text-gray-400 hover:text-white transition-colors duration-300">Work</Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
