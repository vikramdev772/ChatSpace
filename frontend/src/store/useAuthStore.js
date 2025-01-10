import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],


    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });                        
            console.log("Error in checkAuth:", error);
        } finally {
            set({ isCheckingAuth: false });
        }

    },

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
           const res = await axiosInstance.post("/auth/signup",  data);
           set({ authUser: res.data });
           toast.success("Account created successfully");

        }catch(error) {
            console.log("Error in SigningUp",error)
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false})
        }
    },

    signin: async (data) => {
        try {
            const res = await axiosInstance.post('/auth/signin',data);
            localStorage.setItem('jwt', res.data.token)
            set({ authUser: res.data});
            toast.success("Signed in Successfully");
        } catch(error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningIn: false });
        }
    },

    signout: async () => {
        try{
            await axiosInstance.post("/auth/signout");
            set({ authUser: null });
            toast.success("Signed Out successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data})
            toast.success("Profile updated successfully")
        } catch {
            console.log("Error in update profile",error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdatingProfile: false });
        }
 
    }
}))