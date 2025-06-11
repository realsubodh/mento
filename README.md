<p align="center">
  <img src="https://github.com/user-attachments/assets/1290e597-9a75-4179-9367-bcc9d2279755" alt="Mento Logo" />
</p>
<h3 align="center">Mento</h3>

<p align="center">
  The personal bookmark manager for smart, folder-based link organization.
  <br />
  <a href="#demo"><strong>Explore the Demo »</strong></a>
  <br />
  <br />
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#architecture"><strong>Architecture</strong></a> ·
  <a href="#self-hosting"><strong>Self-hosting</strong></a> 
</p>

<p align="center">
  <a href="https://github.com/realsubodh/mento">
    <img src="https://img.shields.io/github/stars/realsubodh/mento?style=social" alt="GitHub stars" />
  </a>
  <a href="https://x.com/real_subodh">
    <img src="https://img.shields.io/twitter/follow/real_subodh?style=social" alt="Twitter" />
  </a>
  <a href="https://github.com/realsubodh/mento/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/realsubodh/mento?label=license&logo=github&color=orange" alt="License" />
  </a>
  <img src="https://visitor-badge.laobi.icu/badge?page_id=realsubodh.mento" alt="Visitors" />
</p>
<br/>

## Introduction

**Mento** is the modern, full-stack bookmark manager for [folder-based organization](#), [smart link saving](#), and [Notion-style viewing](#).

Designed for developers and digital power users, Mento helps you save, categorize, and revisit content with zero clutter. Built on a fast, responsive dashboard experience, it’s the perfect tool for managing everything from YouTube videos to X threads — all in one place.

> Mento is built for your digital brain — structured, searchable, and beautifully minimal.

<br/>

## Tech Stack

- [React](https://react.dev/) – framework
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling framework
- [Framer Motion](https://www.framer.com/motion/) – animations
- [Axios](https://axios-http.com/) – API requests
- [React Hot Toast](https://react-hot-toast.com/) – notifications
- [Node.js](https://nodejs.org/) – backend runtime
- [Express.js](https://expressjs.com/) – web server framework
- [MongoDB](https://www.mongodb.com/) – NoSQL database
- [JWT](https://jwt.io/) – authentication (JSON Web Tokens)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) – password hashing
- [dotenv](https://github.com/motdotla/dotenv) – environment configuration
- [Postman](https://www.postman.com/) – API testing

<br/>

## Architecture

Mento follows a clean and modular **MERN stack** architecture, ensuring scalability, performance, and maintainability.

```txt
Client (React + Vite)
├─ Tailwind CSS           → UI styling
├─ React Router DOM       → Routing and layout management
├─ Axios                  → API requests
├─ Framer Motion          → Animations and transitions
└─ React Hot Toast        → Notifications and user feedback

         ↓

Server (Node.js + Express)
├─ Modular route handling (REST APIs)
├─ JWT-based auth middleware
├─ Bcrypt for password hashing
└─ Mongoose ODM for MongoDB schemas

         ↓

Database (MongoDB)
├─ users         → user credentials & auth tokens
├─ folders       → default + custom folders per user
└─ bookmarks     → linked to folders, enriched with metadata
```

<br/>

## Self-Hosting / Local Development

You can run **Mento** locally with full functionality using the following steps:

<h5>1. Clone the Repository</h5>

```bash
git clone https://github.com/realsubodh/mento.git
```

<h5>2. Install the node modules in both frontend and backend folder.</h5>

```bash
npm install
```

<h5>3. Create a .env file in the backend/ folder:</h5>

```bash
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

<h5>4. Start the Development Servers.</h5>

```bash
cd backend
node server.js
```

```bash
cd frontend
npm run dev
```
<br/>

## Support & Community

If you found Mento helpful or inspiring:

- ⭐ Star this repo to show your support  
- 👨‍💻 Follow me on [GitHub](https://github.com/realsubodh) for more full-stack and open-source projects

Every star keeps this project alive and motivates further development. Thank you!

## Demo

