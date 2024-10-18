import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel } from "flowbite-react";


function ProjectDetails() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const slug = urlParams.get("slug");
  const [project, setProject] = useState({});
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/project/getProject?slug=${slug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError(null);
          }, 5000);
          return;
        }
        setProject(data?.data[0]);
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };
    fetchProject();
  }, [slug]);

  // Create skills array with styling
  const skills = (skill) => {
    return skill?.split("|").map((s, key) => (
      <span
        key={key}
        className=" dark:text-white  text-black px-2  py-1 rounded-full text-sm font-semibold mr-2 mb-2"
      >
        {s}
      </span>
    ));
  };

  return (
    <main className="p-4 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="mt-8 text-[#27374D] dark:text-[#DDE6ED] p-3 text-center font-heading_font text-3xl lg:text-5xl">
        Project Details
      </h1>
      <div className="py-6 h-64 sm:h-72 xl:h-96 2xl:h-[28rem]">
        <Carousel>
          {project?.images?.map((image, key) => (
            <div key={key} className="w-full h-full md:w-96">
              <img src={image?.url} alt={project.projectName} className="w-full h-full object-cover" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 text-gray-700 dark:text-gray-400 mt-4">
        <h2 className="text-lg font-semibold">
          {project?.projectName}
        </h2>
        <p className="text-sm">
          {new Date(project?.from).toLocaleDateString()} - {new Date(project?.to).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center space-x-4 mt-6">
        {project?.githubUrl && (
          <Link
            to={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-yellow-500 to-yellow-400  text-white  hover:from-yellow-600 hover:to-yellow-500 px-4 py-2 rounded-md text-sm font-semibold shadow-lg transition duration-300 ease-in-out  transform hover:-translate-y-1"
          >
            Github
          </Link>
        )}
        {project?.projectUrl && (
          <Link
            to={project.projectUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-gradient-to-r from-green-500 to-green-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-green-600 hover:to-green-500 transform hover:-translate-y-1"
          >
            Project
          </Link>
        )}
      </div>
     
      <div className="p-4 max-w-3xl mx-auto w-full mt-6">
        <p className="text-[#27374D] dark:text-gray-300 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: `${project?.description}` }} />
      </div>
      <div className="flex flex-wrap border py-4 px-2 border-gray-300 items-center justify-center mt-6">
        {skills(project?.skills)}
      </div>
    </main>
  );
}

export default ProjectDetails;
