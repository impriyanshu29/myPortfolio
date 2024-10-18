import React, {useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {Spinner} from 'flowbite-react' 
import {useDispatch,useSelector} from 'react-redux';
import { signInFail,signInSucess,signInStart } from '../Redux/function/user.slice';
import { FaGoogle } from "react-icons/fa";



function SignIn() {
const [formData, setFormData] = useState({});
const {loading,error} = useSelector(state => state.user);
const navigate = useNavigate();
const dispatch = useDispatch();
const apiUrl = import.meta.env.VITE_API_URL;



  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
    console.log(formData);
  
  }

  console.log('Form Data:',formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${apiUrl}/api/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSucess(data));
        navigate('/admin2213008'); // Redirect to the home page after successful sign-in
      } else {
        // Handle specific error cases
        if (data.error) {
          dispatch(signInFail(data.error));
        } else {
          dispatch(signInFail('An error occurred.'));
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      dispatch(signInFail('An error occurred.'));
    }
  };
  
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <Link to="/" className={`whitespace-nowrap self-center font-logo_font text-black/80 dark:text-green-50 text-sm sm:text-xl font-semibold`}>
        
      Priyanshu Tiwari
      </Link>
          </div>
          <h2 className="dark:text-[#BFCDD9] text-center text-2xl  leading-tight font-heading_font text-[#27374D]">
            Sign in to your account
          </h2>
        
        
          <form  className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5 dark:text-green-50">
              <div>
                <label htmlFor="" className="dark:text-[#65768C] text-base font-medium font-body_font  text-[#27374D]">
                  {' '}
                  Email {' '} or {' '} Username{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10  dark:bg-green-100 dark:border-[#0F1926]  w-full rounded-md border  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 
                    dark:placeholder:text-black/80
                    focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Email or Username"
                    id="email"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="dark:text-[#65768C] text-base font-medium font-body_font  text-[#27374D]">
                    {' '}
                    Password{' '}
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 dark:bg-green-100 dark:border-[#0F1926]   w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-black/80 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:text-[#BFCDD9] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id='password'
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full dark:bg-yellow-400/80 items-center justify-center rounded-md bg-black/80  px-3.5 py-2.5 font-semibold leading-7 text-[#DDE6ED] hover:bg-[#DDE6ED] hover:text-[#27374D] transition-all duration-200"
                  disabled={loading}
                >
                  {
                    loading ? (
                      <>
                        <Spinner size='sm'/>
                        <span className='pl-4'>Loging in...</span>
                      </>
                    ):'Get Started'
                  }
                </button>
              </div>
            </div>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
          <div className="mt-3 space-y-3">
        
         </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn;