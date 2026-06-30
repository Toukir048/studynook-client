# StudyNook - Library Study Room Booking System

<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=28&duration=2800&pause=900&color=10B981&center=true&vCenter=true&width=900&lines=StudyNook+-+Library+Study+Room+Booking;Browse%2C+Book%2C+Manage%2C+and+Cancel+Study+Rooms;Full-Stack+MERN+App+with+JWT+Cookie+Authentication" alt="StudyNook animated typing banner" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=061826" alt="React badge" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite badge" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS badge" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node Express badge" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB badge" />
  <img src="https://img.shields.io/badge/Auth-JWT_Cookies-F59E0B?style=for-the-badge" alt="JWT cookie auth badge" />
</p>

<p align="center">
  <strong>A full-stack library study room booking platform for finding rooms, managing listings, and reserving focused study time.</strong>
</p>

---

## 🔗 Live Links

| Resource | URL |
| --- | --- |
| Client Live Site | https://studynook-client-swart.vercel.app/ |
| Server Live API | https://studynook-server-utic.onrender.com/ |

---

## 📌 Project Overview

**StudyNook** is a full-stack library study room booking web application. Users can register, log in, browse available study rooms, view room details, add their own study rooms, manage their listings, book rooms for specific time slots, view their bookings, and cancel bookings.

The application uses **JWT authentication with HTTP-only cookies** on the backend, while Firebase Authentication supports Google login and Firebase user handling on the client. The client is deployed on Vercel, the server is deployed on Render, and the database is hosted on MongoDB Atlas.

---

## ✨ Key Features

| Category | Features |
| --- | --- |
| Authentication | Email/password registration and login, Google login, JWT authentication with HTTP-only cookies, protected/private routes, persistent login after refresh |
| Rooms | Browse all study rooms, search rooms by name, filter rooms by amenities, view detailed room information |
| Listings | Add a study room, view my listings, edit own room listing, delete own room listing |
| Bookings | Book a room by date and time, prevent overlapping bookings for the same room and time, view my bookings, cancel booking |
| User Experience | Toast notifications, loading and error states, responsive design, 404 page, SPA route refresh support on Vercel |
| Theme | Class-based dark mode toggle with saved local preference |

---

## 🧰 Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router DOM, Axios, Firebase Authentication, React Hot Toast, React Helmet Async, Lucide React |
| Backend | Node.js, Express.js, MongoDB, JWT, HTTP-only Cookie Authentication, Cookie Parser, CORS, Bcrypt.js |
| Deployment | Vercel, Render, MongoDB Atlas |

---

## 🗺️ Pages And Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page with project introduction and latest study rooms |
| `/rooms` | Public | Browse, search, and filter all study rooms |
| `/rooms/:id` | Public / Protected action | View room details and open booking flow |
| `/login` | Public | Email/password login and Google login |
| `/register` | Public | Email/password registration and Google registration |
| `/add-room` | Private | Add a new study room listing |
| `/my-listings` | Private | View, edit, and delete own room listings |
| `/my-bookings` | Private | View and cancel personal bookings |
| `*` | Public | Custom 404 page |

---

## 🔐 Authentication Flow

StudyNook uses a hybrid authentication setup designed for secure full-stack access.

| Step | Flow |
| --- | --- |
| Email/password registration | The client creates the Firebase user, stores the user in the backend once, and redirects the user to login after success |
| Email/password login | The client authenticates with the backend, receives a JWT in an HTTP-only cookie, and syncs Firebase auth where needed |
| Google login | Firebase popup login returns the Google account profile, then the backend creates or verifies the user and issues the JWT cookie |
| Persistent session | On refresh, the client calls `/api/auth/me` to restore the logged-in user from the secure cookie |
| Logout | The backend clears the JWT cookie and Firebase sign-out is attempted on the client |

This keeps protected routes secure while preserving a smooth refresh experience.

---

## 📅 Booking System

StudyNook lets users reserve study rooms by selecting:

- Booking date
- Start time
- End time
- Optional special note

Before confirming a booking, the backend checks the selected room and time range. If another booking already overlaps with that date and time slot, the request is blocked. This prevents two users from booking the same room for conflicting time periods.

Users can view their own bookings from `/my-bookings` and cancel bookings when cancellation is available.

---

## ⚙️ Environment Variables

Use environment variables to connect the deployed or local client and server. Secret values should stay outside source control.

### Client Environment

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Server Environment

```env
PORT=
CLIENT_URL=
NODE_ENV=
MONGODB_URI=
DB_NAME=
JWT_SECRET=
DNS_SERVERS=
```

---

## 🛠️ Local Installation Guide

### Client Setup

```bash
npm install
npm run dev
```

### Server Setup

```bash
npm install
npm run dev
```

---

## 📦 Production Commands

### Client

```bash
npm run build
```

### Server

```bash
npm start
```

---

## 🚀 Deployment Information

| Part | Platform | Notes |
| --- | --- | --- |
| Frontend | Vercel | SPA routing is supported with `vercel.json` rewrites to `index.html` |
| Backend | Render | Express API serves authentication, rooms, listings, and bookings |
| Database | MongoDB Atlas | Stores users, study rooms, and booking records |
| Auth Cookie | HTTP-only JWT Cookie | Used by the backend to protect private API routes |

---

## 🌟 Project Highlights

- Clean full-stack MERN architecture
- Secure JWT authentication with HTTP-only cookies
- Firebase-powered Google authentication
- Private dashboard routes for listings and bookings
- Room search and amenity filtering
- Conflict-safe room booking logic
- Responsive Tailwind CSS interface
- Dark mode toggle with saved preference
- User-friendly toast feedback
- Loading, error, empty, and 404 states
- Production-ready Vercel SPA refresh handling

---

## ✅ Final Assignment Notes

StudyNook demonstrates a complete client-server workflow with authentication, protected routes, CRUD-style room listing management, booking validation, responsive UI design, and production deployment. The project is structured to show practical full-stack development skills using React, Vite, Tailwind CSS, Express.js, MongoDB, Firebase Authentication, and JWT cookie-based authorization.
