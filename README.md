# StudyNook - Library Study Room Booking

StudyNook is a full-stack library study room booking web application. Users can browse available study rooms, view room details, book rooms by date and time, manage their own room listings, and cancel their bookings.

## Live Links

- Client Live URL: Coming soon
- Server Live URL: Coming soon

## Project Purpose

The purpose of StudyNook is to make library study room booking simple, secure, and user-friendly. Students can find quiet study spaces, check room details, and reserve time slots without manual waiting or confusion.

## Key Features

- User registration and login
- Google authentication
- JWT authentication using HTTP-only cookies
- Protected private routes
- Browse all study rooms
- Search rooms by room name
- Filter rooms by amenities
- View detailed room information
- Add new study rooms
- Manage own listed rooms
- Edit and delete own rooms only
- Book a room by date and time slot
- Prevent overlapping bookings for the same room
- View personal bookings
- Cancel future confirmed bookings
- Toast notifications for user actions
- Loading and error states with retry option
- Fully responsive design
- Custom 404 page

## Main Pages

- `/` - Home page with latest study rooms
- `/rooms` - All study rooms with search and filter
- `/rooms/:id` - Room details and booking option
- `/login` - User login
- `/register` - User registration
- `/add-room` - Add a new study room
- `/my-listings` - Manage own listed rooms
- `/my-bookings` - View and cancel own bookings
- `*` - 404 page

## Technologies Used

### Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Firebase Authentication
- React Hot Toast
- React Helmet Async
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Cookie Parser
- CORS
- bcryptjs
- dotenv

## Authentication System

StudyNook uses Firebase for Google popup authentication and a custom backend authentication system for email/password login. After login, the backend creates a JWT token and stores it in an HTTP-only cookie. This helps keep private routes secure even after page reload.

## Booking System

Users can book a room by selecting a date, start time, and end time. The backend checks if the selected room is already booked for overlapping time slots. If there is a conflict, the booking request is blocked.

## Environment Variables

Create a `.env.local` file in the client project and add:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_API_URL=http://localhost:5000