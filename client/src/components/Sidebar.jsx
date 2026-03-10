import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Sidebar = () => {
  
  const {getUsers,users,selectedUser,setSelectedUser,unseenMessages,setUnseenMessages} = useContext(ChatContext);

  const {logout,onlineUsers} = useContext(AuthContext)
  const [input,setInput] = useState(false)
  const navigate = useNavigate();

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers();
  },[onlineUsers])




  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white
      ${selectedUser ? 'max-md:hidden' : ''}`}
    >
      {/* ================= Header ================= */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />

          {/* Menu Dropdown */}
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />

            <div
              className="absolute top-full right-0 z-20 w-32 p-4 rounded-md
              bg-[#282142] border border-gray-600 text-gray-100 hidden
              group-hover:block"
            >
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm hover:text-violet-400"
              >
                Edit Profile
              </p>

              <hr className="my-2 border-t border-gray-500" />

              <p onClick={() => logout()} className="cursor-pointer text-sm hover:text-red-400">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Search Bar ================= */}
      <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
        <img src={assets.search_icon} alt="Search" className="w-3" />
        <input onChange={(e)=>setInput(e.target.value)}
          type="text"
          placeholder="Search user..."
          className="bg-transparent border-none outline-none text-white
          text-xs placeholder-[#c8c8c8] flex-1"
        />
      </div>

      {/* ================= User List ================= */}
      <div className="flex flex-col mt-4 gap-1">
        {filteredUsers.map((user, index) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-3 p-2 px-4 rounded cursor-pointer
            hover:bg-[#282142]/50
            ${selectedUser?._id === user._id ? 'bg-[#282142]/60' : ''}`}
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-square rounded-full object-cover"
            />

            {/* ✅ FIXED USERNAME DISPLAY */}
            <div className="flex flex-col">
              <p className="text-sm">
                {user.name || user.username || user.fullName}
              </p>

              {
                onlineUsers.includes(user._id)
              
              ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>

            {unseenMessages[user._id]>0 && (
              <p className="absolute top-3 right-3 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/60">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
