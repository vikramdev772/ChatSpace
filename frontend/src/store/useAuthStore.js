import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    
    isCheckingAuth: true,

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
            set({ authUser: res.data})
        } catch(error) {

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
    }
}))