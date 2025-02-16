
# ClinikkTV
### Postman Documentation - [https://documenter.getpostman.com/view/34049028/2sAYXEFJNE](https://documenter.getpostman.com/view/34049028/2sAYXEFJNE)



## Overview

This project is a **Media Upload & Streaming Platform** that allows users to upload and view media content (videos and audio). It uses **Cloudinary** for media storage.

## Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Cloud Storage**: Cloudinary  
- **Middleware**: Multer (for file uploads)  

## Features

✅ Upload video files  
✅ Cloudinary integration for media storage  
✅ Media search and filtering by title/type  
✅ Responsive UI with Tailwind CSS  

## Installation & Setup

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/vedant-radke/clinikkTV.git
cd clinikkTV
```
### 2️⃣ Backend Setup
```bash
cd server
npm install
```

#### .env file
```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
MONGO_URI=your-mongodb-uri
PORT = 3000
```

#### Start Server
```bash
npm start
```

### 3️⃣ Fontend Setup
```bash
cd client
npm install
npm run dev
```





