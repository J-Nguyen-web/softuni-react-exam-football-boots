# Boots Store Application

A single-page React application for browsing boots, viewing details, posting comments, and liking products.  
The project focuses on client-side architecture, RESTful data handling, and role-based UI behavior.

---

## Overview

The application allows users to:
- Browse a catalog of boots
- View detailed information for each item
- Post and manage comments
- Like and unlike boots
- Perform owner-restricted actions such as editing or deleting entries

Authentication and authorization determine available actions in the UI.

---

## Features

- User authentication (login / register)
- Persistant data using localStorage
- Boots catalog with details page
- Comments system
- Like / unlike functionality
- Owner-only edit and delete actions
- Custom reusable data-fetching hook
- Client-side state synchronization without page reloads

---

## Tech Stack

- React
- React Router
- Context API
- Fetch API
- CSS
- Vite

---

## Project Structure

```txt
src/
│── components/
│   ├── boots/
│   ├── comments/
│   └── common/
│
│── context/
│   ├── UserContext.jsx
│   └── ModalContext.jsx
│
│── hooks/
│   ├── useReq.js
│   └── useForm.js
│
│── util/
│   └── errorHandler.js
│
│── App.jsx
│── main.jsx
```
## Getting Started

# Install dependencies
npm install

# Start the client
npm run dev

# Start the server
node server.js

# Server runs on:
# http://localhost:3030
