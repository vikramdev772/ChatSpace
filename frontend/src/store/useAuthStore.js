import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,


    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
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
            get().connectSocket();
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
            set({ authUser: res.data});
            toast.success("Signed in Successfully");
            get().connectSocket();
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
            get().disConnectSocket();
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
 
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disConnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}))