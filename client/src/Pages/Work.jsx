import * as React from "react";
import { useState, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";







export function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/project/getProject.`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          setTimeout(() => {
            setError(null);
          }, 5000);
          return;
        }
        setProjects(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };
    fetchProjects();
  }, []);
  const abbreviatedMonthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  const sliceSkills = (skills) => {
    if (typeof skills !== "string") {
      return "";
    }
  
    const skillArray = skills.split(" | ");
    const skillLimit = (window.innerWidth)< 768 ? 4 : 6;
  
    return skillArray.slice(0, skillLimit).join(" | ");
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-green-100 md:text-5xl">
          My Projects
        </h1>
        <h2 className="text-2xl hidden md:flex justify-center  mt-4 font-medium text-gray-600 dark:text-green-200/40 md:text-3xl">
          Showcasing My Work and Achievements
        </h2>
        <p className="mt-4 text-lg hidden md:block text-gray-600 dark:text-gray-300">
          Passionate about creating impactful solutions, my portfolio reflects a journey of dedication, innovation, and excellence in every project I undertake.
        </p>
      </div>

      {/* Timeline */}
      <div className="hidden md:flex">
        <Timeline position="alternate-reverse">
          {projects?.map((project) => (
            <TimelineItem key={project._id}>
              <TimelineSeparator>
                <TimelineDot className="bg-yellow-500" />
                <TimelineConnector className="bg-yellow-500" />
              </TimelineSeparator>
              <TimelineContent>
                <div className="flex max-w-2xl flex-col items-center  rounded-md border border-gray-300 dark:border-gray-700  dark:bg-black/50 shadow-md p-4 md:flex-row">
                  <div>
                    <h1 className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-100">
                      {project?.projectName}
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      {abbreviatedMonthNames[new Date(project?.from).getUTCMonth()] + " " + new Date(project?.from).getUTCFullYear()}{" - "}{abbreviatedMonthNames[new Date(project?.to).getUTCMonth()] + " " + new Date(project?.to).getUTCFullYear()}
                    </p>
                    <Link to={`projectDetails/?slug=${project?.slug}`} className="mt-2 inline-flex items-center text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
                      <button className=" bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-3xl transition duration-300 ease-in-out">
                        <div className="flex gap-3 items-center">Project Detail <BsBoxArrowUpRight /></div>
                      </button>
                    </Link>
                    
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {sliceSkills(project?.skills)} {"..."}
                    </p>
                    <div className="mt-2 flex flex-wrap justify-between gap-2">
                      {project?.images.map((image, index) => (
                         <Link key={index} to={image?.url}>
                        <img
                          key={index}
                          src={image.url}
                          alt={project.projectName}
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
        {projects?.map((project) => (
          <div key={project._id} className="flex flex-col items-center rounded-md border border-gray-300 dark:border-gray-700 dark:bg-black/50 shadow-md p-4">
            <h1 className="inline-flex items-center text-xl font-semibold text-gray-900 dark:text-gray-100">
              {project?.projectName}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {abbreviatedMonthNames[new Date(project?.from).getUTCMonth()] + " " + new Date(project?.from).getUTCFullYear()}{" - "}{abbreviatedMonthNames[new Date(project?.to).getUTCMonth()] + " " + new Date(project?.to).getUTCFullYear()}
            </p>
            <Link to={`projectDetails/?slug=${project?.slug}`} className="mt-2 inline-flex items-center text-sm text-yellow-600 dark:text-yellow-400 hover:underline">
              <button className="mt-1 bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded-3xl transition duration-300 ease-in-out">
                <div className="flex gap-3 items-center">View Project <BsBoxArrowUpRight /></div>
              </button>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {sliceSkills(project?.skills)} {".... "}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project?.images.map((image, index) => (

                <Link key={index} to={image?.url}>
                <img
                  key={index}
                  src={image.url}
                  alt={project.projectName}
                  className="w-20 h-20 rounded-md object-cover"
                />
                </Link>

              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
