import React, { useContext,useState, useEffect } from 'react'
import assets from '../assets/assets'   // make sure this path is correct
import { AuthContext } from '../context/AuthContext'
import{ useNavigate } from 'react-router-dom'



const ProfilePage = () => {

 const {authUser,updateProfile} = useContext(AuthContext)
  const navigate = useNavigate()

  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  // Pre-populate form with existing user data
  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || '')
      setBio(authUser.bio || '')
    }
  }, [authUser])
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
        const result = await updateProfile({fullName: name, bio});
        if (result?.success) navigate('/');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
        const base64Image = reader.result;
        const result = await updateProfile({profilePic: base64Image, fullName: name, bio});
        if (result?.success) navigate('/');
    }

}



  
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex flex-col items-center justify-center relative">
      
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full transition"
      >
        ← Back
      </button>
      
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        
        {/* FORM SECTION */}
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile details</h3>

          {/* Avatar Upload */}
          <label 
            htmlFor="avatar" 
            className="flex items-center gap-3 cursor-pointer"
          >
            <input 
              type="file" 
              id="avatar" 
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />

            <img 
              src={
                selectedImg 
                  ? URL.createObjectURL(selectedImg) 
                  : (authUser?.profilePic || assets.avatar_icon)
              } 
              alt=""
              className={`w-12 h-12 ${selectedImg || authUser?.profilePic ? 'rounded-full' : ''}`}
            />

            Upload profile picture
          </label>

          {/* Name Input */}
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent"
          />

          {/* Bio Textarea */}
          <textarea
            required
            placeholder="Write profile bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Side Image */}
        <img className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg || authUser?.profilePic ? 'rounded-full' : ''}`} src={authUser?.profilePic || assets.logo_icon} alt="" />
        

      </div>
    </div>
  )
}

export default ProfilePage