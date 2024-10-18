import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Carousel } from "flowbite-react";

export function CertificateList() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/certificate/getCertificates`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          setTimeout(() => {
            setError(null);
          }, 5000);
          return;
        }
        setEducation(data.data);
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

  console.log(education);
  
  // Function to get the first 20 words of a string
  

    const handleDeleteEducation = (id) => async () => {
    try {
      const res = await fetch(`${apiUrl}/api/certificate/deleteCertificate?_id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }
      setEducation(education.filter((project) => project._id !== id));
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    }

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4 bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
        {/* Headings */}
        <div className="mb-4 flex items-center justify-center rounded-lg py-2">
          <h1 className="text-center font-heading_font text-3xl my-4 text-black/80 dark:text-green-100">
            Certificate List
          </h1>
        </div>

        {/* List of Education */}
        <div className="mt-6 mb-5  flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-300 dark:border-gray-500 md:rounded-lg">
                <table className="min-w-full divide-y border-gray-300 dark:border-gray-500">
                  <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Title</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Issuer</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                     Jobs
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only text-red-600">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-gray-300 dark:border-gray-500 bg-gradient-to-r from-gray-50 via-gray-50 to-green-100/40 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
                    {education?.map((project) => (
                      <tr key={project._id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={project?.image[0]?.url}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                {project.title}
                              </div>
                             
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4">
                          <span
                            className="inline-flex  font-semibold leading-5 text-gray-700 dark:text-gray-400"
                          
                          > {project.issuer}
                            </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {project.jobs}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <Link
                            to={`/admin2213008?tab=updateCertificate&&_id=${project._id}`}
                            className="text-green-600"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <button className="text-red-600"
                          onClick={handleDeleteEducation(project._id)}
                          >Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Add button */}
        <div className="flex justify-center space-y-4  md:space-y-0 ">
          <div>
            <Link to="/admin2213008?tab=createCertificate">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new Certificate
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
