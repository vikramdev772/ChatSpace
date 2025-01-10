import React, { useEffect } from 'react';

import { Routes, Route, Navigate} from "react-router-dom";
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path='/'         element={authUser ? <HomePage /> : <Navigate to='/signin' />}/>
        <Route path='/signup'   element={!authUser ? <SignUpPage/> : <Navigate to='/' /> } />
        <Route path='/signin'   element={!authUser ? <SignInPage/> : <Navigate to='/' /> } />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile'  element={authUser ? <ProfilePage /> : <Navigate to='/signin' /> } />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App