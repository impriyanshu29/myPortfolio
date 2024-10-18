import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
function Resume() {
  const [myData, setMyData] = useState({});
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showAboutMore, setShowAboutMore] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  // Fetching INfo from the server
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/intro/getIntro`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setMyData(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchInfo();
  }, []);

  const getDisplayedText = () => {
    const words = myData?.subHeading?.split(" ") || [];
    const wordLimit = showMore
      ? words.length
      : window.innerWidth < 768
      ? 20
      : 40;
    return words.slice(0, wordLimit).join(" ");
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const getAboutTextDisplay = () => {
    const words = myData?.about?.split(" ") || [];
    const wordsLimit = showAboutMore
      ? words.length
      : window.innerWidth < 768
      ? 40
      : 80;
    return words.slice(0, wordsLimit).join(" ");
  };

  const displayedText = getAboutTextDisplay();
  const isTextTruncated =
    myData?.about?.split(" ").length > (window.innerWidth < 768 ? 20 : 40);

  const handleAboutShowMore = () => {
    setShowAboutMore((prev) => !prev);
  };

  const categorizeSkills = (skills) => {
    const categories = { Devops: [], Frontend: [], Backend: [] };

    skills.forEach((skill) => {
      if (skill?.category === "Devops") {
        categories.Devops.push({ name: skill?.name, level: skill?.level });
      } else if (skill?.category === "Frontend") {
        categories.Frontend.push({ name: skill?.name, level: skill?.level });
      } else {
        categories.Backend.push({ name: skill?.name, level: skill?.level });
      }
    });

    return categories;
  };

  const skillsByCategory = myData.skills
    ? categorizeSkills(myData.skills)
    : { DevOps: [], Frontend: [], Other: [] };
  // -------------------------------------------------------------------------------------------------------------------

  // Fetching Education Info from the server
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    const fetchEducationInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/edu/getEducation`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setEducationData(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchEducationInfo();
  }, []);

  // Fetching Experience Info from the server
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    const fetchExperienceInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/experience/getExperience`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setExperienceData(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchExperienceInfo();
  }, []);

  // fetching Certifications Info from the server
  const [certificationData, setCertificationData] = useState([]);

  useEffect(() => {
    const fetchCertificationInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/certificate/getCertificates`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setCertificationData(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchCertificationInfo();
  }, []);

  // fetching Projects Info from the server
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/project/getProject?limit=2`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setProjectData(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchProjectInfo();
  }, []);

  const abbreviatedMonthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-12  transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-green-100 md:text-5xl">
          My Portfolio
        </h1>
      </div>

      {/* Profile Card */}
      <div className="flex justify-center md:pt-12 pt-4  pb-1">
        <div className="max-w-5xl border-gray-300 w-full flex flex-col md:flex-row p-5 dark:border-gray-700  dark:bg-black/50 shadow border rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row w-full">
            {myData?.image?.map((data, index) => {
              const fixedSizeUrl = `https://res.cloudinary.com/dqdmdo5an/image/upload/w_400,h_400,g_center,c_fill/${data.public_id}.jpg`;
              return (
                <div key={index} className="w-full  md:w-[300px] h-[300px]">
                  <img
                    src={fixedSizeUrl}
                    alt="Priyanshu"
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              );
            })}

            <div className="w-full md:w-2/3 md:p-6 py-6 px-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold  text-center md:text-left text-gray-800 dark:text-green-100">
                  {myData?.name}
                </h1>
                <p className="bg-clip-text text-center md:text-left text-transparent bg-gradient-to-r from-gray-700 via-teal-600 to-green-400  dark:from-yellow-400 dark:via-orange-500 dark:to-red-600 font-semibold mt-2">
                  {myData?.headlines}
                </p>
                <p className="text-gray-500  text-center md:text-left dark:text-gray-300 mt-1 text-sm">
                  {getDisplayedText()}
                  {myData?.subHeading?.split(" ").length >
                    (window.innerWidth < 768 ? 20 : 40) && (
                    <span>
                      ...{" "}
                      <button
                        onClick={handleShowMore}
                        className="text-blue-500 underline"
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                    </span>
                  )}
                </p>
                <p className="text-gray-500  text-center md:text-left font-bold dark:text-gray-400 mt-2 text-sm">
                  {myData?.location}
                </p>

                <div className="flex mt-6 space-x-4">
                  {myData?.resumePdf?.map((pdf, index) => (
                    <Link key={index} to={pdf.url}>
                      <button
                        type="button"
                        className="rounded-md bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 focus:outline-none"
                      >
                        Download Resume
                      </button>
                    </Link>
                  ))}
                  <a
                    href={`mailto:${myData?.email}`}
                    className="rounded-md bg-gradient-to-r from-green-500 to-green-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-green-600 hover:to-green-500 focus:outline-none flex items-center space-x-2"
                  >
                    <MdEmail />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About me */}
      <div className="flex justify-center py-2">
        <div className="max-w-5xl border-gray-300 w-full py-3 flex flex-col md:flex-row px-5  dark:border-gray-700 dark:bg-black/50 shadow border rounded-lg overflow-hidden">
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-black/80 font-bold text-2xl flex justify-center dark:text-gray-100">
                About
              </h3>
            </div>
            <div>
              <p className="text-gray-500 content-of-post text-center md:text-left dark:text-gray-300 mt-1 text-sm">
                <span
                  dangerouslySetInnerHTML={{ __html: displayedText }}
                ></span>
                {isTextTruncated && (
                  <span>
                    ...{" "}
                    <button
                      onClick={handleAboutShowMore}
                      className="text-blue-500 underline"
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </button>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Treasures*/}

      <div className="flex justify-center py-2">
        <div className="max-w-5xl border-gray-300 w-full py-3 flex flex-col md:flex-row px-5 dark:border-gray-700 dark:bg-black/50 shadow border rounded-lg overflow-hidden">
          <div className="flex flex-col gap-6 w-full">
            <div className="text-center">
              <h3 className="text-black/80 font-bold text-2xl dark:text-gray-100">
                Tech Treasures
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* DevOps Skills */}
              <div className="bg-green-50 dark:bg-neutral-800 p-6 border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-green-100  text-center mb-4">
                  DevOps
                </h2>
                <ul>
                  {skillsByCategory?.Devops?.map((skill, index) => (
                    <li
                      key={index}
                      className="text-gray-700 flex justify-around dark:text-green-50/50 py-1"
                    >
                      <span>{skill.name}</span>
                      <span>{skill.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frontend Skills */}
              <div className="bg-green-50 dark:bg-neutral-800 p-6 border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800  dark:text-green-100  text-center mb-4">
                  Frontend
                </h2>
                <ul>
                  {skillsByCategory?.Frontend?.map((skill, index) => (
                    <li
                      key={index}
                      className="text-gray-700 flex justify-around  dark:text-green-50/50 py-1"
                    >
                      <span>{skill.name}</span>
                      <span>{skill.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Backend Skills */}
              <div className="bg-green-50 dark:bg-neutral-800 p-6 border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-green-100  text-center mb-4">
                  Backend
                </h2>
                <ul>
                  {skillsByCategory?.Backend?.map((skill, index) => (
                    <li
                      key={index}
                      className="text-gray-700 flex justify-around dark:text-green-50/50 py-1"
                    >
                      <span>{skill.name}</span>
                      <span>{skill.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Projects */}
        <div className="flex justify-center py-4 ">
          <div className="max-w-5xl border-gray-300 w-full py-5 px-3 md:px-8 dark:border-gray-700 dark:bg-black/50 shadow border rounded-lg overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Projects
              </h3>
            </div>
            <div className="hidden md:flex">
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {projectData?.map((cert, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot  />
                   <TimelineConnector  />
                  </TimelineSeparator>
                  <TimelineContent className="w-full">
                    <div className="flex flex-col md:flex-row md:items-center bg-green-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md p-4">
                      <div className="flex flex-col  ">
                        
                        <div className="flex-grow">
                          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {cert?.projectName}
                          </h1>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {abbreviatedMonthNames[new Date(cert?.from).getUTCMonth()] + " " + new Date(cert?.from).getUTCFullYear()}{" - "}{abbreviatedMonthNames[new Date(cert?.to).getUTCMonth()] + " " + new Date(cert?.to).getUTCFullYear()}
                          </p>
                          <Link to={`/works/projectDetails/?slug=${cert?.slug}`} className="mt-2 inline-flex items-center text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
                      <button className=" bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-3xl transition duration-300 ease-in-out">
                        <div className="flex gap-3 items-center">Project Detail </div>
                      </button>
                    </Link>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap justify-between gap-2">
                      {cert?.images.map((image, index) => (
                         <Link key={index} to={image?.url}>
                        <img
                          key={index}
                          src={image.url}
                          alt={cert?.projectName}
                          className="w-20 h-20 lg:w-40  rounded-md object-cover"
                        />
                        </Link>
                      ))}
                    </div>
                      </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            </div>
            {/* Mobile View */}
            <div className="md:hidden grid gap-8">
        {projectData?.map((project) => (
          <div key={project._id} className="flex flex-col items-center rounded-md border border-gray-300 dark:border-gray-700 dark:bg-black/50 shadow-md py-4">
            <h1 className="inline-flex items-center text-xl font-semibold text-gray-900 dark:text-gray-100">
              {project?.projectName}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {abbreviatedMonthNames[new Date(project?.from).getUTCMonth()] + " " + new Date(project?.from).getUTCFullYear()}{" - "}{abbreviatedMonthNames[new Date(project?.to).getUTCMonth()] + " " + new Date(project?.to).getUTCFullYear()}
            </p>
            <Link to={`/works/projectDetails/?slug=${project?.slug}`} className="mt-2 inline-flex items-center text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
              <button className="mt-1 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-3xl transition duration-300 ease-in-out">
                <div className="flex gap-3 items-center">View Project </div>
              </button>
            </Link>
            
            <div className="mt-2 flex flex-wrap gap-2">
              {project?.images.map((image, index) => (

                <Link key={index} to={image?.url}>
                <img
                  key={index}
                  src={image.url}
                  alt={project.projectName}
                  className="w-20 h-24 rounded-md object-cover"
                />
                </Link>

              ))}
            </div>
          </div>
        ))}
      </div>
            {/* More Project Link */}
            <div className="flex justify-center mt-4">
              <Link to="/works">
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 focus:outline-none">
                  More Projects
                </button>
              </Link>
          </div>
          </div>
      
      </div>
    
      {/* Education */}
      <div className="flex justify-center py-2">
        <div className="max-w-5xl border-gray-300 w-full py-3 flex flex-col md:flex-row md:px-5 px-2 dark:border-gray-700 dark:bg-black/50 shadow border rounded-lg overflow-hidden">
          <div className="flex flex-col gap-6 justify-center mx-auto lg:w-full">
            <div className="text-center">
              <h3 className="text-black/80 font-bold text-2xl dark:text-gray-100">
                Education
              </h3>
            </div>
            <div className="flex lg:flex-row flex-col lg:justify-around">
              {educationData?.map((edu, index) => (
                <div key={index} className="flex mb-4  flex-row  gap-4">
                  <div>
                    <img
                      src={edu?.image[0]?.url}
                      alt="edu"
                      className="md:w-20 md:h-20 object-contain w-24 h-24  rounded-lg "
                    ></img>
                  </div>
                  <div className="flex flex-col ">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-green-100">
                      {edu.school}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-300">
                      {edu.degree} - {edu.fieldOfStudy}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      {abbreviatedMonthNames[
                        new Date(edu?.startDate).getUTCMonth()
                      ] +
                        " " +
                        new Date(edu?.startDate).getUTCFullYear()}
                      {" - "}
                      {abbreviatedMonthNames[
                        new Date(edu?.endDate).getUTCMonth()
                      ] +
                        " " +
                        new Date(edu?.endDate).getUTCFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      {experienceData?.length > 0 ? (
        <div className="flex justify-center py-4 ">
          <div className="max-w-5xl w-full py-5 px-3 md:px-8 dark:border-gray-700 dark:bg-black/50 border-gray-300 shadow border rounded-lg overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Experience
              </h3>
            </div>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {experienceData?.map((exp, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent className="w-full">
                    <div className="flex flex-col md:flex-row md:items-center bg-green-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md p-4">
                      <div className="flex-grow">
                        <div className="md:flex items-center justify-between">
                          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {exp?.companyName}
                          </h1>

                          <p className="text-sm hidden md:block text-gray-600 dark:text-gray-400">
                            {abbreviatedMonthNames[
                              new Date(exp?.startDate).getUTCMonth()
                            ] +
                              " " +
                              new Date(exp?.startDate).getUTCFullYear()}
                            {" - "}
                            {abbreviatedMonthNames[
                              new Date(exp?.endDate).getUTCMonth()
                            ] +
                              " " +
                              new Date(exp?.endDate).getUTCFullYear()}
                          </p>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                          {exp?.role} - {exp?.employmentType}
                        </p>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                          Location: {exp?.location}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {exp?.description}
                        </p>
                      </div>
                      <div className="md:hidden text-xs font-semibold text-gray-800 dark:text-green-100 mt-2 md:mt-0">
                        {abbreviatedMonthNames[
                          new Date(exp?.startDate).getUTCMonth()
                        ] +
                          " " +
                          new Date(exp?.startDate).getUTCFullYear()}
                        {" - "}
                        {abbreviatedMonthNames[
                          new Date(exp?.endDate).getUTCMonth()
                        ] +
                          " " +
                          new Date(exp?.endDate).getUTCFullYear()}
                      </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      ) : null}

      {/* Certifications */}

      {certificationData?.length > 0 ? (
        <div className="flex justify-center py-4 ">
        
          <div className="max-w-5xl w-full py-5 border-gray-300 px-3 md:px-8 dark:border-gray-700 dark:bg-black/50 shadow border rounded-lg overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Certifications
              </h3>
            </div>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {certificationData?.map((cert, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot  />
                   <TimelineConnector className="bg-gray-300 dark:bg-gray-700" />
                  </TimelineSeparator>
                  <TimelineContent className="w-full">
                    <div className="flex flex-col md:flex-row md:items-center bg-green-50 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md p-4">
                      <div className="flex flex-col md:flex-row md:items-center items-center">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                          <Link to={cert?.image[0]?.url}>
                          <img
                            src={cert?.image[0]?.url}
                            alt="Certification"
                            className="w-24 h-24 md:w-40  object-cover rounded-lg"
                          />
                          </Link>
                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Issued By: {cert?.issuer}
                          </h1>
                          <p className="text-base text-gray-600 dark:text-gray-400">
                            {cert?.jobs}
                          </p>
                          <p className="text-base text-gray-600 dark:text-gray-400">
                            Issued On: {abbreviatedMonthNames[new Date(cert?.date).getUTCMonth()] + " " + new Date(cert?.date).getUTCFullYear()}
                          </p>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {cert?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
      
      </div>
      ) : null}
    </div>
  );
}

export default Resume;
