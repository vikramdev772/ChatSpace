import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern';
import { MessageSquare } from "lucide-react";

const SignInPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const { signin, isSigningIn} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(signinData)
  }

  return (
    <div className='h-screen grid lg:grid-cols-2'>
      {/* left Side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
              <div className='flex flex-col items-center gap-2 group'>
                <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    <MessageSquare className="w-6 h-6 text-primary"/>
                </div>
                <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
                <p className='text-base-content/60'>Sign in to your account</p>
              </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>

          </form>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern />
    </div>
  )
}

export default SignInPage