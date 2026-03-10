import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl

export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);


    // check if the user is authenticated and if so, set the user data and connect the socket

     const checkAuth = async () => {
    try {
        const { data } = await axios.get("/api/auth/check");
        if (data.success) {
            setAuthUser(data.user)
            connectSocket(data.user)
        }
    } catch (error) {
           // only show toast if a token was present (we attempted an auth request)
           if (token) toast.error(error.message)
    } finally {
        setIsCheckingAuth(false);
    }
}

// login function to handle user authentication and socket connection 
      const login = async (state, credentials)=>{
    try {
        const { data } = await axios.post(`/api/auth/${state}`, credentials);
        if (data.success){
            setAuthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"] = data.token;
            setToken(data.token);
            localStorage.setItem("token", data.token);
            toast.success(data.message);
        }
        else
        {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

   
// logout function to clear user data, token and disconnect socket
    const logout =  async ()=>{
        localStorage.removeItem("token");
        setAuthUser(null);
        setToken(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successfully");
        socket.disconnect();
    }


    //update profile function to update user profile updates

     const updateProfile = async (body)=>{
    try {
        const { data } = await axios.put("/api/auth/update-profile", body);
        if(data.success){
            setAuthUser(data.user);
            toast.success(data.message || "Profile updated successfully");
        } else {
            toast.error(data.message || "Unable to update profile");
        }
        return data;
    } catch (error) {
        toast.error(
            error.response?.data?.message || error.message || "Network error"
        );
        return { success: false };
    }
}

// Helper function to set up online users listener
  const setupOnlineUsersListener = (socketInstance) => {
    socketInstance.on("getOnlineUsers", (userIds) => {
        console.log("Received getOnlineUsers event with:", userIds);
        setOnlineUsers(userIds);
    });
  };

  // connect to socket function to handle socket connection and online users updates
  const connectSocket = (userData)=>{
    if(!userData) return;
    
    // Disconnect old socket if it exists
    if (socket) {
        socket.disconnect();
    }

    console.log("Connecting socket with userData._id:", userData._id);
    const newSocket = io(backendUrl, {
        query: {
            userId: userData._id?.toString?.() || userData._id,
        }
    });
    
    newSocket.on("connect", () => {
        console.log("Socket connected");
        setupOnlineUsersListener(newSocket);
    });

    newSocket.on("reconnect", () => {
        console.log("Socket reconnected");
        setupOnlineUsersListener(newSocket);
    });

    newSocket.connect();
    setSocket(newSocket);
}

useEffect(()=>{
    // Only check auth on initial mount if we have a token from localStorage
    if(token){
        axios.defaults.headers.common["token"] = token;
        checkAuth();
    } else {
        // no token means not logged in, skip auth check
        setIsCheckingAuth(false);
    }
},[]) // Run only once on component mount

useEffect(() => {
    // Cleanup socket when component unmounts
    return () => {
        if (socket) {
            socket.disconnect();
        }
    };
}, [socket])


    const value = {
           axios,
           authUser,
           onlineUsers,
           socket,
           login,
           logout,
           updateProfile,
           isCheckingAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}