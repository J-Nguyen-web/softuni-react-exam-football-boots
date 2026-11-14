# Jogo Bonito Store -- React Exam Project

A football boots catalog and community application built with React and
Supabase. Visitors can browse football boots, explore boot-surface
information, and view individual product details. Registered users can
publish boots, edit or delete their own entries, like boots, and leave
comments.

-   **GitHub repository:**
    https://github.com/J-Nguyen-web/softuni-react-exam-football-boots
-   **Live application:** `https://react-exam-joga-bonito.netlify.app`{=html}

------------------------------------------------------------------------
## Table of Contents



------------------------------------------------------------------------
## Project Overview

**Application name:** Jogo Bonito Store

**Application category:** Football boots catalog / community web
application.

**Main purpose:** Jogo Bonito Store allows football players and football
fans to browse a catalog of football boots and learn about the different
playing surfaces for which boots are designed. Users can create and
manage their own boot listings, interact with listings through likes,
and discuss products using comments. The application combines product
discovery with user-generated content and account-based permissions.






......................................
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

## Setup

```bash
Install dependencies
npm install

Launch client folder
npm run dev

Launch server folder
node server.js

Server URL
http://localhost:3030
