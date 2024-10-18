import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import Image2 from "../assets/11.png";
import Image3 from "../assets/13.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoMdPaper } from "react-icons/io";
import { IoDiamondOutline } from "react-icons/io5";
import { LuFileCode2 } from "react-icons/lu";
import { FaDiscord } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3 } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaDocker } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiRedux } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { FaLinux } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";


const items = [
  {
    icon: <LuFileCode2 className="text-green-600 font-bold h-6 w-7" />,
    title: "Proven Expertise",
    description:
      "Specialize in MERN I ensure your project is built with the latest technologies",
  },
  {
    icon: <IoMdPaper className="text-green-600 font-bold h-6 w-7" />,
    title: "Tailored Solutions",
    description:
      "Delivering customized solutions that perfectly fit your vision",
  },
  {
    icon: <IoDiamondOutline className="text-green-600 font-bold h-6 w-7" />,
    title: "Attention to Detail",
    description:
      "Clean, efficient code to a seamless user experience, ensuring the highest quality",
  },
];

const skills = [
  { icon: <FaReact className="text-blue-500 h-12 w-12" />, title: "React" },
  { icon: <FaNode className="text-green-500 h-12 w-12" />, title: "Node" },
  {
    icon: <RiTailwindCssFill className="text-blue-500 h-12 w-12" />,
    title: "Tailwind CSS",
  },
  { icon: <SiExpress className="text-gray-500 h-12 w-12" />, title: "Express" },
  {
    icon: <SiMongodb className="text-green-500 h-12 w-12" />,
    title: "MongoDB",
  },
  { icon: <FaDocker className="text-blue-500 h-12 w-12" />, title: "Docker" },
  { icon: <FaGitAlt className="text-red-500 h-12 w-12" />, title: "Git" },
  {
    icon: <FaGithub className="text-black dark:text-gray-200 h-12 w-12" />,
    title: "Github",
  },
  { icon: <FaHtml5 className="text-red-500 h-12 w-12" />, title: "HTML5" },
  { icon: <FaCss3 className="text-blue-500 h-12 w-12" />, title: "CSS3" },
  { icon: <SiRedux className="text-purple-500 h-12 w-12" />, title: "Redux" },
  { icon: <DiRedis className="text-red-500 h-12 w-12" />, title: "Redis" },
  {
    icon: <FaAws className="text-black dark:text-gray-200 h-12 w-12" />,
    title: "AWS",
  },
  {
    icon: <IoLogoFirebase className="text-yellow-400 h-12 w-12" />,
    title: "Firebase",
  },
  {
    icon: <FaLinux className="text-black dark:text-gray-200 h-12 w-12" />,
    title: "Linux",
  },
  {
    icon: <IoLogoJavascript className="text-yellow-400 h-12 w-12" />,
    title: "JavaScript",
  },
];

function Home() {
  const { currentTheme } = useSelector((state) => state.theme);
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "MERN Developer", "Football Player"],
    loop: {},
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [socialData, setSocialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error1, setError1] = useState("");

  const [total, setTotal] = useState("");
  const [resume, setResume] = useState("");
  const [updateMessage1, setUpdateMessage1] = useState("");

  const settings = {
    cssEase: "linear",
    infinite: true,
    speed: 2200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/getSocial`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setSocialData(data.data);
        setUpdateMessage(data.message);
        setError("");
        setTimeout(() => {
          setUpdateMessage("");
        }, 5000);
      } catch (error) {
        setError("Unable to fetch social media");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchSocialMedia();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/message/createMessage", {
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
      setSuccess(true);
      setLoading(false);
      setUpdateMessage1("MEssage sent successfully");
      setTimeout(() => {
        setSuccess(false);
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

  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/getTotal`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setTotal(data.data);
        setUpdateMessage(data.message);
        setError("");
        setTimeout(() => {
          setUpdateMessage("");
        }, 5000);
      } catch (error) {
        setError("Unable to fetch total things");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    getTotal();
  }, []); // Added empty dependency array to avoid infinite loop

 
  useEffect(() => {
    const getResumePdf = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/resumePdf`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setResume(data.data[0]);
        setUpdateMessage(data.message);
        setError("");
        setTimeout(() => {
          setUpdateMessage("");
        }, 5000);
      } catch (error) {
        setError("Unable to get resume");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    getResumePdf();
  }, []); // Added empty dependency array to avoid infinite loop


  return (
    <div className="w-full overflow-hidden ">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-green-50 via-gray-50 to-green-100 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900 dark:text-neutral-900">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-8">
          <div className="flex flex-col  justify-center text-center lg:text-left my-4 py-8 lg:col-span-7 space-y-6">
            <div className="mt-8 p-1 flex mx-auto lg:mx-0 max-w-max items-center space-x-2 rounded-full bg-green-100/40 dark:bg-zinc-950">
              <div className="rounded-full bg-green-200/40 dark:bg-neutral-900 dark:text-green-50 p-1 px-2">
                <p className="text-sm font-medium">Hire Me</p>
              </div>
              <a
                href="/contact"
                className="text-sm dark:text-green-50 font-medium hover:text-blue-600"
              >
                Contact &rarr;
              </a>
            </div>
            <h1 className="text-4xl font-bold tracking-tight dark:text-green-50 text-black/80 md:text-4xl lg:text-6xl">
              Namaste, I&apos;m Priyanshu Tiwari
            </h1>
            <h1 className="text-lg text-gray-700 dark:text-neutral-200">
              I'm a{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold">
                {text}
                <Cursor />
              </span>
            </h1>
            <p className="text-gray-600 dark:text-neutral-200">
              Passionate about building dynamic and responsive web applications.
              Experienced in creating end-to-end solutions using the MERN stack.
              Let's connect and create something amazing together!
            </p>
            <div className="flex items-center mx-auto lg:mx-0 space-x-4">
              <button
                type="button"
                className="rounded-md bg-yellow-500/70 dark:bg-yellow-400/80 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => window.open(resume?.url )}
              >
                Download Resume
              </button>
              <Link to="/resume">
                <button
                  type="button"
                  className="rounded-md text-green-100 dark:bg-green-100 dark:text-black px-3 py-2.5 text-sm font-semibold bg-black/80 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  View Portfolio
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-row gap-2 items-center lg:col-span-5">
            <img
              className="h-full w-full mt-8 object-cover"
              src={Image2}
              alt="Priyanshu Image"
            />
            <div className="flex flex-col ">
              {socialData?.map((social, index) => {
                return (
                  //

                  <div key={index} className="flex flex-col gap-4 mt-4">
                    {social?.name === "Instagram" ? (
                      <a
                        href={social?.url}
                        className="text-black/80 dark:text-green-100 hover:text-pink-600 dark:hover:text-pink-600"
                      >
                        <FaInstagram size={24} />
                      </a>
                    ) : social?.name === "Linkedin" ? (
                      <a
                        href={social?.url}
                        className="text-black/80 dark:text-green-100 dark:hover:text-blue-600 hover:text-blue-600"
                      >
                        <FaLinkedin size={24} />
                      </a>
                    ) : social?.name === "Discord" ? (
                      <a
                        href={social?.url}
                        className="text-black/80 dark:text-green-100 dark:hover:text-blue-600 hover:text-blue-600"
                      >
                        <FaDiscord size={24} />
                      </a>
                    ) : social?.name === "Email" ? (
                      <a
                        href={`mailto:${social.url}`}
                        className="text-black/80 dark:text-green-100 dark:hover:text-blue-600 hover:text-blue-600"
                      >
                        <MdEmail size={24} />
                      </a>
                    ) : social?.name === "Facebook" ? (
                      <a
                        href={social.url}
                        className="text-black/80 dark:text-green-100 dark:hover:text-blue-600 hover:text-blue-600"
                      >
                        <MdEmail size={24} />
                      </a>
                    ) : social?.name === "Github" ? (
                      <a
                        href={social?.url}
                        className="text-black/80 dark:text-green-100 dark:hover:text-gray-200 hover:text-black"
                      >
                        <FaGithub size={24} />
                      </a>
                    ) : social?.name === "X" ? (
                      <a
                        href={social?.url}
                        className="text-black/80 dark:text-green-100 dark:hover:text-blue-600 hover:text-blue-600"
                      >
                        <BsTwitterX size={24} />
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quantity section */}
      <div className="mx-auto mt-4 pb-6 bg-green-300/40 dark:bg-black/80 py-10 rounded-xl shadow max-w-6xl px-2 lg:px-8 dark:darkBanner">
        <div className="flex flex-wrap bloc justify-around gap-y-8 text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-100">
              <FaLaptopCode className="text-red-500 h-5 w-5 md:h-7 md:w-7" />
            </div>
            <h3 className="mt-3 text-sm md:text-lg dark:text-green-100 font-semibold text-black">
              +{total.totalProjects} Developed Projects
            </h3>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-yellow-100">
              <FaCode className="text-yellow-500 h-5 w-5 md:h-7 md:w-7" />
            </div>
            <h3 className="mt-3 text-sm md:text-lg font-semibold dark:text-green-100 text-black">
              +{total.totalSkills} Technologies Know
            </h3>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gray-100">
              <SlCalender className="text-gray-500 h-5 w-5 md:h-7 md:w-7" />
            </div>
            <h3 className="mt-3 text-sm md:text-lg font-semibold dark:text-green-100 text-black">
              +1 Year of Experience
            </h3>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative w-full bg-green-50/70 dark:bg-neutral-900 dark:text-neutral-200">
        <h1 className="text-3xl font-bold text-center pt-24 mb-2 dark:text-green-50 bloc text-black/80 md:text-4xl lg:text-6xl">
          About Me
        </h1>
        <div className="mx-auto max-w-6xl  grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-8">
          <div className="hidden lg:flex flex-col blo items-center lg:col-span-5">
            <img
              className="h-full w-full mt-8 object-cover"
              src={Image3}
              alt="Priyanshu Image"
            />
          </div>
          <div className="flex flex-col justify-center blo my-4 lg:py-8 lg:col-span-7 space-y-6">
            <div className="md:mt-8 mt-3 p-1 mx-auto lg:mx-0 flex max-w-max items-center space-x-2 rounded-full bg-green-100/40 dark:bg-zinc-950">
              <div className="rounded-full bg-green-200/40 dark:bg-neutral-900 p-1 px-2">
                <p className="md:text-sm text-xs font-medium">Skills</p>
              </div>
              <Link
                to="/resume"
                className="md:text-sm text-xs  font-medium hover:text-blue-600"
              >
                Have a Look &rarr;
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-center lg:text-left dark:text-green-50 text-black/80">
              Coding by Day, Goalkeeping by Passion
            </h2>
            <p className="text-gray-600 dark:text-neutral-200 text-center text-sm md:text-base px-2 md:px-6 lg:px-0 lg:text-left">
              Hey there! I'm Priyanshu Tiwari, a web developer who loves turning
              ideas into interactive, beautiful websites using MERN. When I'm
              not coding, you'll find me on the football field, diving and
              defending as a passionate goalkeeper. Whether it's crafting a
              seamless user experience or making a game-winning save, I bring my
              all to everything I do.
            </p>
            <div className="flex items-center space-x-4 justify-center lg:justify-start">
              <Link to="/contact">
                <button
                  type="button"
                  className="rounded-md bg-yellow-500/70 dark:bg-yellow-400/80 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Contact Me
                </button>
              </Link>
              <Link to="/works">
                <button
                  type="button"
                  className="rounded-md text-green-100 dark:bg-green-100 dark:text-black px-6 py-2.5 text-sm font-semibold bg-black/80 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  My Works
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className=" relative w-full md:py-8 py-4 pt-10 bg-green-50/70 dark:bg-neutral-900 dark:text-neutral-200  ">
        <Slider {...settings}>
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex items-center my-2 justify-center mx-auto h-16 w-16 md:h-20 md:w-20 ">
                {skill.icon}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Why Me */}
      <div className="relative w-full pb-6 text-center lg:text-left bg-green-50/70 dark:bg-neutral-900 dark:text-neutral-200">
        <h1 className="text-4xl font-bold text-center pt-16 lg:pt-20 md:mb-2 dark:text-green-50 bloc text-black/80 md:text-4xl lg:text-6xl">
          Why Me
        </h1>
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 lg:px-8">
          <div className="flex flex-col justify-center my-4 lg:py-8 lg:col-span-7 space-y-6 blo">
            <div className="md:mt-8 mt-4 p-1 flex max-w-max items-center space-x-2 rounded-full mx-auto lg:mx-0 bg-green-100/40 dark:bg-zinc-950">
              <div className="rounded-full bg-green-200/40 dark:bg-neutral-900 p-1 px-2">
                <p className="md:text-sm text-xs  font-medium">Who</p>
              </div>
              <Link
                to="/resume"
                className="text-sm font-medium hover:text-blue-600"
              >
                I am &rarr;
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-center lg:text-left dark:text-green-50 text-black/80">
              Why Work with Me on Your Next{" "}
              <span className="text-yellow-500/70 dark:text-yellow-400/80">
                Project?
              </span>
            </h2>
            <p className="text-gray-600 px-2 md:px-6 lg:px-0 dark:text-neutral-200 text-center text-sm md:text-base lg:text-left">
              With a perfect blend of creativity and technical expertise, I
              deliver bespoke solutions tailored to your unique needs. Count on
              clear communication and reliable delivery, ensuring your project
              is in capable hands from start to finish.
            </p>
            <div className="flex mx-auto lg:mx-0 items-center space-x-4">
              <Link to="/contact">
                <button
                  type="button"
                  className="rounded-md bg-yellow-500/70 dark:bg-yellow-400/80 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Know Me
                </button>
              </Link>
              <Link to="/works">
                <button
                  type="button"
                  className="rounded-md text-green-100 dark:bg-green-100 dark:text-black px-3 py-2.5 text-sm font-semibold bg-black/80 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Look at My Works
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 pt-5 blo lg:pt-10">
            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } `}
                >
                  <div className="flex flex-col items-center lg:items-start mx-auto lg:mx-0 gap-1  w-2/3">
                    {item.icon}
                    <p className="text-lg dark:text-green-200 text-black/80 font-bold">
                      {item.title}
                    </p>
                    <p className="text-sm dark:text-gray-500 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* contact from */}
      <div className="w-full pb-4 pt-8 text-center lg:text-left bg-green-50/70 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="flex flex-col items-center w-full justify-center text-center">
          <div className="w-full max-w-4xl px-4 md:px-12">
            <h1 className="text-4xl font-bold text-center md:mb-2 dark:text-green-50 bloc text-black/80 md:text-4xl lg:text-6xl">
              Contact Me
            </h1>

            <div className="mt-8 md:p-16 p-6 shadow-lg border-gray-300  dark:border-gray-800 border rounded-xl bg-gradient-to-r from-green-50 via-gray-50 to-green-100 dark:bg-gradient-to-r dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 dark:text-neutral-20">
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
                  {loading ? "Sending..." : "Send Message"}
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
    </div>
  );
}

export default Home;
