# NextStay 🏡

NextStay is a full-stack web application designed for travelers to discover and book perfect accommodations worldwide. Built with Node.js and Express, it provides a seamless and intuitive platform for both guests searching for their next stay and hosts wanting to list their properties.

---

## ✨ Key Features

- **👤 User Authentication:** Secure user registration and login system with persistent sessions.  
- **🏠 Full CRUD for Listings:** Authenticated users can **C**reate, **R**ead, **U**pdate, and **D**elete their own property listings.  
- **⭐ Reviews and Ratings:** Users can leave reviews and star ratings on listings they've visited.  
- **☁️ Cloud Image Uploads:** Image uploads are handled by and stored in the cloud using Cloudinary.  
- **🗺️ Interactive Maps:** Each listing displays its location on an interactive map, powered by Mapbox.  
- **Responsive Design:** A clean and modern UI built with Bootstrap that works on all screen sizes.  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Frontend:** EJS (Embedded JavaScript templates), HTML, CSS  
- **Styling:** Bootstrap  
- **Authentication:** Passport.js for session management  
- **Services:** Cloudinary (Image Hosting), Mapbox (Geocoding & Maps)  
- **Package Manager:** NPM  

---

## 🚀 Getting Started

Follow these steps to run NextStay locally.

### Prerequisites

Make sure you have Node.js, npm, and MongoDB installed on your machine.

- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/AmansYadav309/NextStay.git
    ```

2. **Navigate to the project directory**
    ```bash
    cd NextStay
    ```

3. **Install dependencies**
    ```bash
    npm install
    ```

4. **Set up Environment Variables**  
   Create a `.env` file in the root of the project. You can copy the `.env.example` file as a template:
    ```bash
    cp .env.example .env
    ```
   
   Then update the values in `.env` with your actual credentials:
    ```env
    # MongoDB Connection URL
    MONGODB_URI="your_mongodb_connection_string"

    # Session Secret
    SECRET="somesupersecretkey"

    # Cloudinary Credentials
    CLOUD_NAME="your_cloud_name"
    CLOUD_API_KRY="your_cloud_api_key"
    CLOUD_API_SECRET="your_cloud_api_secret"

    # Mapbox Access Token
    MAP_TOKEN="your_mapbox_access_token"

    # Server Port
    PORT=8080
    ```

---

### 🗄️ Database Setup

1. **Connect MongoDB**  
   The app automatically connects to the MongoDB database specified in your `.env` file using Mongoose.  
   If the database does not exist, it will be created automatically.

2. **(Optional) Seed the Database**  
   To populate the database with sample listings:
    ```bash
    node init/index.js
    ```
   This script uses data from `init/data.js` and adds example listings for testing.

---

### 💻 Running the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

## 🚀 Deployment

This application is ready for deployment on platforms like Vercel, Heroku, or other Node.js hosting services.

### Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and connect your GitHub account
3. Import your project from GitHub
4. Add your environment variables in the Vercel dashboard:
   - `MONGODB_URI`
   - `SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_KEY`
   - `CLOUDINARY_SECRET`
   - `MAP_TOKEN`
5. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `NODE_ENV=production`
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `SECRET` - A strong secret key for sessions
- `PORT` - Port number (usually set by the hosting platform)

---

## ✍️ Author

- **Aman Yadav** - [GitHub Profile](https://github.com/AmansYadav309)

