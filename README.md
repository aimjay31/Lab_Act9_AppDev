# ShapR Study Session Tracker

ShapR is a mobile study tracking application built using React Native (Expo) for the frontend and Django REST Framework for the backend. It allows users to manage study sessions, track productivity, and view study history.

---

## Project Structure

Lab_Act9_AppDev/
│
├── backend/        # Django REST API
├── frontend/       # Expo React Native app
└── README.md

---

## Installation Guide

### 1. Clone the Repository

git clone https://github.com/aimjay31/Lab_Act9_AppDev.git
cd Lab_Act9_AppDev

---

## Backend Setup (Django)

### 2. Navigate to backend folder

cd backend

### 3. Create virtual environment

python -m venv venv

Activate it (Windows):

venv\Scripts\activate

---

### 4. Install dependencies

pip install -r requirements.txt

---

### 5. Apply migrations

python manage.py makemigrations
python manage.py migrate

---

### 6. Run the server

python manage.py runserver 0.0.0.0:8000

The backend will be available at:

http://YOUR-IP:8000

---

## Frontend Setup (Expo)

### 7. Navigate to frontend folder

cd ../frontend/frontend

---

### 8. Install dependencies

npm install

---

### 9. Run the app

npx expo start

Scan the QR code using Expo Go on your phone.

---

## Important Configuration

Update the API base URL in your frontend files:

http://YOUR-IP:8000/api

Example:

http://192.168.18.9:8000/api

Make sure your phone and computer are connected to the same network.

---

## Features

- User registration and login
- Token-based authentication
- Dashboard with study statistics
- Study session timer
- Productivity rating
- Study history tracking
- Profile viewing and editing

---

## Authentication

The backend uses token authentication. After login, a token is returned and must be included in all protected requests:

Authorization: Token <your_token>

---

## Common Issues

### Unauthorized (401 or 403)

Ensure that:
- The token is saved after login
- The token is included in request headers

---

### Cannot connect to backend

- Do not use localhost
- Use your local IP address instead
- Ensure both devices are on the same network

---

### Missing database tables

Run:

python manage.py migrate

---

## Notes

- Do not upload the venv folder to GitHub
- Use requirements.txt to install dependencies
- Backend runs on port 8000 by default

---

## Contributors

Add your group members here
