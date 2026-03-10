# 💬 ChatApp - Real-Time Messaging Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<div align="center">
  <h3>🚀 A modern, real-time chat application built with the MERN stack</h3>
  <p>Experience seamless messaging with real-time updates, beautiful UI, and secure authentication</p>
</div>

---

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" width="50" height="50" alt="Real-time Chat" />
        <br><strong>Real-Time Messaging</strong>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Locked.png" width="50" height="50" alt="Secure Auth" />
        <br><strong>Secure Authentication</strong>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Artist.png" width="50" height="50" alt="Beautiful UI" />
        <br><strong>Modern UI/UX</strong>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera.png" width="50" height="50" alt="Media Sharing" />
        <br><strong>Media Sharing</strong>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Green Circle.png" width="50" height="50" alt="Online Status" />
        <br><strong>Online Status</strong>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile Phone.png" width="50" height="50" alt="Responsive" />
        <br><strong>Responsive Design</strong>
      </td>
    </tr>
  </table>
</div>

### 🎯 Key Capabilities
- **🔐 JWT Authentication** - Secure login/signup with token-based auth
- **📱 Real-Time Communication** - Instant messaging with Socket.IO
- **🖼️ Image Uploads** - Cloudinary integration for profile pictures and media
- **👥 User Management** - View online users, manage profiles
- **💬 Message History** - Persistent chat history with MongoDB
- **📱 Mobile-First** - Responsive design for all devices
- **🎨 Modern UI** - Beautiful interface with Tailwind CSS
- **⚡ Fast Performance** - Optimized with Vite build tool

---

## 🛠️ Tech Stack

### 🎨 Frontend
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white" alt="Socket.io" />
</div>

### ⚙️ Backend
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" alt="Cloudinary" />
</div>

---

## 🚀 Quick Start

### 📋 Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account
- Git

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   ⚠️ **SECURITY WARNING**: Never commit `.env` files to version control!

   Create `.env` files in both `server` and `client` directories:

   **Server (.env)**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

   **Client (.env)**
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

   <div align="center">
     <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Warning.png" width="30" height="30" alt="Warning" />
     <strong>Important: Add .env files to .gitignore before committing!</strong>
   </div>

4. **Start the application**
   ```bash
   # Start the server (from server directory)
   npm run server

   # Start the client (from client directory)
   npm run dev
   ```

5. **Access the app**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 📱 Usage

### 🔐 Authentication
1. **Sign Up** - Create a new account with email, password, and profile info
2. **Login** - Access your account with existing credentials
3. **Profile** - Update your profile picture, bio, and personal information

### 💬 Messaging
1. **Select User** - Choose a user from the sidebar to start chatting
2. **Send Messages** - Type and send text messages in real-time
3. **Share Media** - Upload and share images in conversations
4. **View History** - Access previous messages and media shared

### 👥 User Management
- View all registered users
- See online/offline status
- Access user profiles and information

---

## 📡 API Endpoints

### 🔐 Authentication Routes
```
POST /api/auth/signup          - User registration
POST /api/auth/login           - User login
GET  /api/auth/check           - Verify authentication
PUT  /api/auth/update-profile  - Update user profile
```

### 💬 Message Routes
```
GET  /api/messages/users        - Get all users for sidebar
POST /api/messages/send/:id     - Send message to user
GET  /api/messages/:id          - Get messages with user
PUT  /api/messages/mark/:id     - Mark message as seen
```

### 🛠️ Utility Routes
```
GET  /api/status               - Server health check
```

---

## 🏗️ Project Structure

```
chat-app/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Page components
│   │   └── lib/              # Utility functions
│   ├── package.json
│   └── vite.config.js
├── server/                    # Node.js backend
│   ├── controllers/          # Route controllers
│   ├── lib/                  # Utility libraries
│   ├── middleware/           # Express middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── server.js             # Main server file
│   └── package.json
└── README.md
```

---

## 🚀 Deployment

### Vercel Deployment
1. **Connect Repository** - Link your GitHub repo to Vercel
2. **Environment Variables** - Set all required env vars in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy both frontend and backend

### Manual Deployment
- **Frontend**: Build with `npm run build` and deploy to any static hosting
- **Backend**: Deploy to services like Railway, Render, or Heroku

---

## 🤝 Contributing

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand gestures/Folded Hands.png" width="50" height="50" alt="Contributing" />
</div>

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📝 Guidelines
- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Scroll.png" width="50" height="50" alt="License" />
</div>

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red Heart.png" width="30" height="30" alt="Heart" />
  <strong>Built with ❤️ using modern web technologies</strong>
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red Heart.png" width="30" height="30" alt="Heart" />
</div>

### 🛠️ Tools & Libraries
- **React** - UI framework
- **Node.js** - Runtime environment
- **MongoDB** - Database
- **Socket.IO** - Real-time communication
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool
- **Express** - Web framework

### 📚 Resources
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.IO Documentation](https://socket.io/docs/)

---

<div align="center">
  <h3>🎉 Happy Chatting! 🎉</h3>
  <p>Connect with friends and colleagues in real-time</p>

  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party Popper.png" width="50" height="50" alt="Party" />
</div></content>
<parameter name="filePath">c:\Users\Ankit Kumar\OneDrive\Desktop\chat-app\README.md