# NextStay

A full-stack web application for property listings with reviews and user authentication.

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating engine
- **Authentication**: Passport.js
- **Image Storage**: Cloudinary
- **Maps**: Mapbox

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file with the following variables:
   ```
   CLOUDINARY_URL=your_cloudinary_url
   MAPBOX_TOKEN=your_mapbox_token
   SESSION_SECRET=your_session_secret
   MONGODB_URI=your_mongodb_uri
   ```
4. Run the application:
   ```bash
   pnpm start
   ```

## Deployment

This application is configured for deployment on Vercel with pnpm support.

## Environment Variables

For deployment, make sure to set the following environment variables:
- `CLOUDINARY_URL`
- `MAPBOX_TOKEN`
- `SESSION_SECRET`
- `MONGODB_URI`
- `NODE_ENV` (set to "production")

## Scripts

- `pnpm start`: Start the production server
- `pnpm dev`: Start the development server with nodemon