# Business Listing Platform

A professional business listing platform where businesses can register and showcase their services, similar to Manta, Houzz, or Clutch.

## Tech Stack

- **Frontend**: Next.js 14 + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT
- **File Storage**: Cloudinary (with local storage fallback)
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Render

## Features

- User Authentication (Email & Password)
- Business Owner Dashboard
- Business Listing Management
- Public Business Profiles
- Search and Filter System
- Review and Rating System
- Admin Panel
- Mobile Responsive Design
- SEO Optimized

## Project Structure

```
listingpro/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/           # Express.js backend application
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── config/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account (optional)

### Local Development Setup

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Businesses
- GET /api/businesses - Get all businesses
- POST /api/businesses - Create a new business
- GET /api/businesses/:id - Get business by ID
- PUT /api/businesses/:id - Update business
- DELETE /api/businesses/:id - Delete business

### Reviews
- POST /api/businesses/:id/reviews - Add a review
- GET /api/businesses/:id/reviews - Get business reviews
- DELETE /api/reviews/:id - Delete a review

### Admin
- GET /api/admin/businesses - Get all businesses (admin)
- PUT /api/admin/businesses/:id/approve - Approve business
- PUT /api/admin/businesses/:id/reject - Reject business

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

### Backend (Render)
1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Configure environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 