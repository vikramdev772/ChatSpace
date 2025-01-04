import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from "react-router-dom";
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const{ signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if (!signUpForm.username.trim()) return toast.error("Username is required");
    if (!signUpForm.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(signUpForm.email)) return toast.error("Invalid email format");
    if (!signUpForm.password) return toast.error("Password is required");
    if (signUpForm.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm();
    
    if ( success === true) signup(signUpForm)
  };


  return (
    <div className='min-h-screen grid lg:grid-cols-2 '>
      {/* left Side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
            {/* LOGO */}
          <div className='flex flex-col items-center gap-2 group text-center mb-8'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
              <MessageSquare className='size-6 text-primary'/>
            </div>
            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
            <p className='text-base-content/60'>Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col'>
              <label className='label'> 
                <span className='label-text font-medium'>Username</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0  pl-3 flex items-center pointer-events-none'>
                  <User className='size-6 text-base-content/40'/>
                </div>
                <input 
                  type="text" 
                  className={`py-3 rounded-lg border-[2px] border-gray-700 bg-transparent w-full pl-10`}
                  placeholder='Vasanth Kumar'
                  value={signUpForm.username}
                  onChange={(e) => setSignUpForm({ ...signUpForm, username: e.target.value})}
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input 
                  type="email" 
                  className='py-3 border-[2px] border-gray-600 bg-transparent items-center rounded-lg w-full pl-10'
                  placeholder='vasanth@gmail.com'
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40'/>
                </div>
                <input 
                  type={ showPassword ? "text" : "password"}
                  className='py-3 rounded-lg border-[2px] border-gray-700 bg-transparent w-full pl-10'
                  placeholder='•••••••••'
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  { showPassword ? (
                    <EyeOff className='size-5 text-base-content/40'/> 
                    ) : 
                    (
                      <Eye  className='size-5 text-base-content/40'/>
                    ) }
                </button>
              </div>
            </div>

            <button 
              type='submit'
              className='py-3 bg-violet-500 rounded-lg w-full text-black'
              disabled={isSigningUp}
              >
                {
                  isSigningUp ? (
                      <>
                      <Loader2 className='size-5 animate-spin' />
                      Loading...
                      </>
                  ) : (
                    "Create Account"
                  )
                }
            </button>
          </form>
          
          <div className='text-center'>
              <p>
                Already have an account ? {" "}
                <Link to='/signin' className="link link-primary">
                  Sign in
                </Link>
              </p>
          </div>


        </div>
      </div>

      {/* right side */}
      <AuthImagePattern 
        title="join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  )
}

export default SignUpPage