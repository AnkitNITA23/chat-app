import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import assets from '../assets/assets'

const LoginPage = () => {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (currState === "Sign up") {
      if (!fullName || !email || !password) {
        toast.error("Please fill in all fields")
        return
      }
    } else {
      if (!email || !password) {
        toast.error("Please fill in all fields")
        return
      }
    }
    
    setIsLoading(true)
    try {
      const state = currState === "Sign up" ? "signup" : "login"
      const credentials = {
        email,
        password,
        ...(currState === "Sign up" && { fullName, bio })
      }
      
      await login(state, credentials)
      navigate("/")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleState = () => {
    setCurrState(currState === "Sign up" ? "Login" : "Sign up")
    setFullName("")
    setEmail("")
    setPassword("")
    setBio("")
  }

  return (

    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* -------- left -------- */}
      <img
        src={assets.logo_big}
        alt=""
        className='w-[min(30vw,250px)]'
      />

      {/* -------- right -------- */}
      <form onSubmit={handleSubmit} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>

        <h2 className='font-medium text-2xl flex justify-between items-center'>

          {currState}

          <img
            src={assets.arrow_icon}
            alt=""
            className='w-5 cursor-pointer'
            onClick={toggleState}
          />

        </h2>


        {currState === "Sign up" && (

          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-white placeholder:opacity-60'
            placeholder="Full Name"
            required
            disabled={isLoading}
          />

        )}


        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address"
          required
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-white placeholder:opacity-60'
          disabled={isLoading}
        />


        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-white placeholder:opacity-60'
          disabled={isLoading}
        />

        {currState === "Sign up" && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Short bio (optional)"
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white resize-none placeholder:text-white placeholder:opacity-60'
            rows="3"
            disabled={isLoading}
          />
        )}


        <button
          type='submit'
          disabled={isLoading}
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? "Please wait..." : (currState === "Sign up" ? "Create Account" : "Login Now")}
        </button>

        {currState === "Sign up" && (

          <div className='flex items-center gap-2 text-sm text-gray-300'>

            <input type="checkbox" id="terms" required disabled={isLoading} />

            <label htmlFor="terms">Agree to the terms of use & privacy policy.</label>

          </div>

        )}

        {currState === "Sign up" && (
          <div className='text-center text-sm text-gray-300'>
            Already have an account? <span className='text-indigo-400 cursor-pointer hover:underline' onClick={toggleState}>Login here</span>
          </div>
        )}


      </form>

    </div>

  )
}

export default LoginPage
