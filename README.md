# Jogo Bonito Store -- React Exam Project

A football boots catalog and community application built with React and
Supabase. Visitors can browse football boots, explore boot-surface
information, and view individual product details. Registered users can
publish boots, edit or delete their own entries, like boots, and leave
comments.

-   **GitHub repository:**
    https://github.com/J-Nguyen-web/softuni-react-exam-football-boots
-   **Live application:** https://react-exam-joga-bonito.netlify.app

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
manage their own boot products, interact through likes,
and discuss using comments. The application combines product
discovery with user-generated content and account-based permissions.

## Features

-   Public home page with the three most-liked and three newest boot
    products.
-   Public catalog with search by boot model or terrain type.
-   Individual boot details pages.
-   Football terrain information guide.
-   Football boots size guide.
-   User registration, login, and logout.
-   Persistent authentication session through Supabase Auth.
-   Create, edit, and delete boot products.
-   Author-only edit and delete controls.
-   Like and unlike boot products.
-   Post comments and delete comments authored by the current user.
-   User profile showing created boots, liked boots, and comments.
-   Form validation, loading indicators, and frontend functionality that user can see and interact with
    error/confirmation modals.

------------------------------------------------------------------------

## Technology Stack

  ---------------------------------------------------------------------
  Technology  and                       Purpose
  ---------------------------------- ----------------------------------
  React 19                           Component-based user interface

  JavaScript (ES modules)            Application logic

  Vite                               Development server and production
                                     build

  React Router DOM 7                 Client-side routing and route
                                     parameters

  Supabase                           Hosted backend-as-a-service

  Supabase Auth                      User registration, login, logout,
                                     and session management

  Supabase PostgreSQL                Persistent application data

  `@supabase/supabase-js`            Communication with Supabase

  React Context API                  Shared authentication and modal
                                     state

  CSS                                Global and component/page styling
  ---------------------------------------------------------------------

------------------------------------------------------------------------

## Application Structure

The frontend application is located in the `client/` directory.

``` text
softuni-react-exam-football-boots/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── boots-create/
│   │   │   ├── boots-details/
│   │   │   ├── boots-edit/
│   │   │   ├── bootsCard/
│   │   │   ├── catalog/
│   │   │   ├── comments/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── profile/
│   │   │   ├── register/
│   │   │   ├── size-guide/
│   │   │   ├── terrains/
│   │   │   ├── GuestRoutes.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   └── Roulette.jsx
│   │   ├── context/
│   │   │   ├── ModalContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── hooks/
│   │   │   └── useFormValidate.js
│   │   ├── util/
│   │   │   ├── arrayWords.js
│   │   │   ├── attachLikes.js
│   │   │   ├── errorHandler.js
│   │   │   └── terrainType.js
│   │   ├── validators/
│   │   │   ├── validateBoots.js
│   │   │   ├── validateLogin.js
│   │   │   └── validateRegister.js
│   │     ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── supabaseClient.js
│   ├── .env                 # Local environment variables (not committed)
│   ├── package.json
│   └── vite.config.js
├── server-softuni/          # Legacy practice server; not used by the current app
└── README.md
```

The application entry point is `src/main.jsx`. It mounts the React
application inside `BrowserRouter`, `ModalProvider`, and `UserProvider`.
`App.jsx` defines the page routes and shared header/footer.

------------------------------------------------------------------------

## Installation and Local Development

### Prerequisites

-   Node.js and npm
-   A Supabase project with the required database tables and
    authentication configured

### 1. Clone the repository

``` bash
git clone https://github.com/J-Nguyen-web/softuni-react-exam-football-boots.git
cd softuni-react-exam-football-boots
```

### 2. Install frontend dependencies

``` bash
cd client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `client/` directory. Add the Supabase
project URL and publishable key:

``` env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use the values from your Supabase project's API/Connect settings. Do not
commit the `.env` file or expose a Supabase secret/service-role key in
the frontend.

### 4. Start the development server

``` bash
npm run dev
```

Vite will print the local development URL in the terminal (normally
`http://localhost:5173`).

### 5. Create a production build

``` bash
npm run build
```

To preview the production build locally:

``` bash
npm run preview
```

------------------------------------------------------------------------

## Environment Configuration

The frontend reads the following Vite environment variables:

  ---------------------------------------------------------------------
  Variable                           Description
  ---------------------------------- ----------------------------------
  `VITE_SUPABASE_URL`                URL of the Supabase project

  `VITE_SUPABASE_PUBLISHABLE_KEY`    Public/publishable key used by the
                                     browser client
  ---------------------------------------------------------------------

The Supabase client is initialized in `client/src/supabaseClient.js`.

The publishable key is intended for browser use. Database access must be
restricted through correctly configured Supabase Row Level Security
(RLS) policies. Never place a service-role key in a Vite environment
variable.

------------------------------------------------------------------------

## Supabase Backend

The project uses **Supabase (BaaS)** as its remote backend. Supabase
provides the hosted PostgreSQL database and authentication service instead of previous SoftUni practice server, so a
separate Node.js/Express backend deployment is not required.

The current frontend communicates with Supabase through
`@supabase/supabase-js`. The application uses the following tables:

  -----------------------------------------------------------------------
  Table                   Purpose                 Main data used by the
                                                  application
  ----------------------- ----------------------- -----------------------
  `boots`                 Main CRUD collection    Boot model, terrain
                                                  type, price, image URL,
                                                  description, author ID,
                                                  creation timestamp

  `likes`                 User interactions       Boot ID and user ID

  `comments`              User discussions        Comment message, boot
                                                  ID, and user ID

  `profiles`              Public profile          User ID and username
                          information             
  -----------------------------------------------------------------------

Supabase Auth manages user accounts. The application stores the username
as user metadata during registration and reads profile usernames when
displaying comment authors.

### Data relationships

-   Each boot product is associated with its creator through
    `boots.user_id`.
-   Each like connects a user to a boot through `likes.user_id` and
    `likes.boots_id`.
-   Each comment connects a user to a boot through `comments.user_id`
    and `comments.boots_id`.
-   The `profiles` table is queried to display usernames next to
    comments.

### Security note

The interface checks record ownership before showing author-specific
actions. Supabase Row Level Security policies should also enforce
ownership at database level for `INSERT`, `UPDATE`, and `DELETE`
operations. Client-side checks alone are not a security boundary. Before
submission, verify that the policies on `boots`, `likes`, and `comments`
prevent users from modifying or deleting another user's records.

------------------------------------------------------------------------

## Deployment

### Frontend -- Netlify

The React frontend is deployed as a Vite static site on Netlify.

Recommended Netlify build settings when the Netlify site is connected to
the repository root:

  Setting             Value
  ------------------- -----------------
  Base directory      `client`
  Build command       `npm run build`
  Publish directory   `dist`

Add the same two environment variables from the [Environment
Configuration](#environment-configuration) section in the Netlify site
settings.

Because the application uses client-side routing, configure the hosting
provider to serve `index.html` for application routes (SPA
fallback/redirect). This allows direct navigation and page refreshes on
routes such as `/boots/details/:bootsId`.

### Backend -- Supabase

The database and authentication are hosted by Supabase. There is no
separate backend server to deploy for this BaaS setup.

------------------------------------------------------------------------

# React Exam Functional Guide

## 1. Project Overview

**Application Name:** Jogo Bonito Store

**Application Category / Topic:** Football boots catalog and community
application.

**Main Purpose:**

Jogo Bonito Store is a single-page application for browsing football
boots and discovering information about different football playing
surfaces. Visitors can explore the catalog and view detailed information
about each pair of boots. Registered users can contribute their own
products, edit or remove their products, like boots, and post comments,
creating a small community around football footwear.

## 2. User Access & Permissions

### Guest (Not Authenticated)

Guests can access the informational and browsing parts of the
application.

**Available pages / routes:**

-   `/` -- Home page.
-   `/boots` -- Full boots catalog.
-   `/boots/details/:bootsId` -- Details of a selected pair of boots.
-   `/terrains` -- Information about football pitch/terrain types.
-   `/size-guide` -- Football boots size conversion guide.
-   `/login` and `/register` -- Authentication pages.

**Public data shown:**

-   Boot products and their details.
-   Like counts.
-   Public comments and comment authors.
-   Terrain information and size guide content.
-   Home page sections showing the most-liked and newest boots.

Guests cannot access protected create, edit, or profile pages. The
details page provides a login link when a guest attempts to interact.
Comment submission is disabled for unauthenticated users.

### Authenticated User

Logged-in users have access to all public pages and additional account
functionality.

**Main sections / pages:**

-   Home, catalog, boot details, terrain guide, and size guide.
-   `/profile` -- Personal activity overview.
-   `/boots/create` -- Create a new boot product.
-   `/boots/edit/:bootsId` -- Edit a boot product.

**Details pages:**

-   Users can open any boot details page.
-   The owner sees edit and delete controls for their own product.
-   Other authenticated users can like/unlike the product and post
    comments.
-   Users can delete their own comments.

**Create / Edit / Delete actions:**

-   Authenticated users can create boot products.
-   The product creator is stored as `user_id`.
-   The owner is identified by comparing the current user's ID with the
    product's `user_id`.
-   Edit and delete controls are displayed only to the owner.
-   Database-level authorization should additionally be enforced through
    Supabase RLS policies.

## 3. Authentication & Session Handling

### Authentication Flow

1.  When the application starts, `UserProvider` subscribes to Supabase
    Auth state changes using `supabase.auth.onAuthStateChange`.
2.  Supabase restores the existing session, if one is available, and
    provides the current user.
3.  The context updates `user`, `isAuth`, and `authLoading`. While the
    initial authentication state is being resolved, route guards display
    a loading component.
4.  During registration, the application submits the email, password,
    and username to `supabase.auth.signUp`. The username is stored in
    user metadata.
5.  During login, the application calls
    `supabase.auth.signInWithPassword`.
6.  On successful login or registration, the user is redirected to the
    home page.
7.  On logout, the application calls `supabase.auth.signOut` and
    redirects to the home page.

Authentication errors are caught and displayed through the application's
modal notification system.

### Session Persistence

-   Authentication state is shared through React Context
    (`UserContext`).
-   Supabase Auth manages session persistence in the browser using its
    client-side session storage mechanism.
-   On page refresh, Supabase restores the stored session and emits the
    initial authentication state.
-   `authLoading` prevents route guards from redirecting before the
    authentication state has been resolved.

## 4. Routing Structure

### Route Guards Logic

The routing is configured with React Router DOM in `App.jsx`.

-   **Public routes** are available to both guests and authenticated
    users.
-   **Protected routes** are wrapped by `ProtectedRoute`. Guests are
    redirected to `/login`.
-   **Guest-only routes** (`/login` and `/register`) are wrapped by
    `GuestRoute`. Authenticated users are redirected to `/`.
-   Both guards wait for the initial authentication check to finish
    before making a redirect decision.

### Main Routes

  -----------------------------------------------------------------------
  Route                       Page                  Access
  --------------------------- --------------------- ---------------------
  `/`                         Home                  Public

  `/boots`                    Catalog               Public

  `/boots/details/:bootsId`   Boot details          Public

  `/terrains`                 Terrain guide         Public

  `/size-guide`               Size guide            Public

  `/boots/create`             Create boot product   Protected

  `/boots/edit/:bootsId`      Edit boot product     Protected

  `/profile`                  User profile          Protected

  `/login`                    Login                 Guest only

  `/register`                 Register              Guest only

  `/logout`                   Logout action         Route is not wrapped
                                                    in either route guard
  -----------------------------------------------------------------------

The application has more than five client-side routes and uses URL
parameters for the boot details and edit pages.

### Nested & Parameterized Routes

The application uses nested route elements for route guards.
`ProtectedRoute` and `GuestRoute` render an `Outlet` for their child
routes.

Parameterized routes:

-   `/boots/details/:bootsId` -- Uses `useParams()` to identify the boot
    whose details should be loaded.
-   `/boots/edit/:bootsId` -- Uses `useParams()` to identify the boot to
    load into the edit form.

## 5. List → Details Flow

### Catalog / List Page

The catalog displays boot products with their model, terrain type,
price, image, description, and associated like count.

Users can search by boot model or terrain type. The search value is read
from the URL query string (`?search=...`) using `useSearchParams()`. The
catalog fetches boot and like data from Supabase and combines the like
counts with the boot records using the `attachLikes` utility.

The home page also displays two curated lists:

-   The three most-liked boots.
-   The three newest boot products.

### Details Page

Users navigate from a boot card to its details page using React Router
links.

The details page reads `bootsId` from the URL through `useParams()`. It
fetches the selected boot, its likes, its comments, and profile
usernames from Supabase.

The page displays the boot information, like/unlike interaction,
comments, and owner-specific edit/delete actions. After successful
actions, the component refreshes the relevant data or navigates back to
the catalog/details page.

## 6. Data Source & Backend

**Backend Type:** Backend-as-a-Service (BaaS) -- Supabase.

Supabase provides:

-   Hosted PostgreSQL database.
-   Authentication and session management.
-   Remote data access through the Supabase JavaScript client.

The frontend uses the Supabase client initialized in
`supabaseClient.js`. Data is fetched from and persisted to the remote
database; the application does not rely on hardcoded boot products.

There is no separate custom Node.js/Express backend deployment in the
current application. The legacy `server-softuni/` directory is not used
by the Supabase-based frontend.

## 7. Data Operations (CRUD)

The main CRUD collection is `boots`, which is separate from the Users
collection.

### Create (INSERT)

-   An authenticated user opens `/boots/create`.
-   The user fills in the controlled boot form.
-   The form is validated before submission.
-   The application inserts the boot data into the Supabase `boots`
    table.
-   The current user's ID is stored in `user_id`.
-   After a successful insert, the user is redirected to `/boots`.

### Read (SELECT)

Boot data is fetched from Supabase in several places:

-   Home page: retrieves boots and likes to build the most-liked and
    newest sections.
-   Catalog: retrieves boot products and like counts.
-   Details page: retrieves one boot by its ID, along with its likes and
    comments.
-   Edit page: retrieves the selected boot and populates the edit form.
-   Profile page: retrieves the current user's created boots, likes, and
    comments.

### Update (UPDATE)

-   The owner opens the edit page for a boot product.
-   The existing record is fetched using its ID and displayed in the
    form.
-   The user changes the required fields and submits the form.
-   The application sends an update to the `boots` table, targeting the
    selected record by ID.
-   After a successful update, the user is redirected to the updated
    details page.

The UI only displays the edit action to the product owner. Supabase RLS
must enforce the same ownership restriction at database level.

### Delete (DELETE)

-   The owner selects Delete on the boot details page.
-   A confirmation modal asks the user to confirm the action.
-   The application sends a delete request for the selected boot and
    checks that a record was returned.
-   After successful deletion, the user receives a confirmation message
    and is redirected to the catalog.

The UI only displays the delete action to the product owner. Supabase
RLS must prevent deletion of records owned by other users.

### Additional interactions

-   Likes are stored in the `likes` table. A user can like a boot or
    remove their existing like.
-   Comments are stored in the `comments` table. Authenticated users can
    post comments.
-   A user can delete only their own comments through the owner check in
    the UI; database policies should enforce this restriction as well.

## 8. Forms & Validation

### Forms Used

-   Registration form.
-   Login form.
-   Create boot form.
-   Edit boot form.
-   Comment form.
-   Catalog search form.

The registration, login, create, edit, and comment forms use the custom
`useFormValidate` hook where applicable. Inputs are bound to React state
and use React event handlers.

### Validation Rules

Examples of validated fields:

1.  **Email**
    -   Required.
    -   Must match a valid email format.
    -   Must contain at least 6 characters.
2.  **Username**
    -   Required during registration.
    -   Must contain at least 3 non-whitespace characters.
3.  **Password**
    -   Required.
    -   Must contain at least 6 characters.
4.  **Password confirmation**
    -   Required.
    -   Must match the password field.
5.  **Boot model/title**
    -   Required.
    -   Must contain at least 3 characters.
6.  **Terrain type**
    -   Required.
7.  **Price**
    -   Required.
    -   Must be a positive number.
8.  **Image URL**
    -   Required.
    -   Must start with `http://` or `https://`.
9.  **Description**
    -   Required.
    -   Must contain at least 10 characters.

The validation functions are located in the `validators/` directory. The
custom form hook tracks values, validation errors, and touched fields,
and prevents the submit callback from running when validation errors
exist.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

The application uses React hooks across its components:

-   `useState` -- Manages component state such as form values, loading
    flags, boot data, likes, comments, search input, and modal
    visibility.
-   `useEffect` -- Performs data fetching, subscribes to authentication
    changes, and handles side effects.
-   `useContext` -- Reads shared authentication and modal state.
-   `useCallback` -- Keeps the logout handler stable between renders.
-   Custom hooks -- `useFormValidate` manages form state and validation.

React Router hooks are also used:

-   `useNavigate` -- Programmatic navigation after actions.
-   `useParams` -- Reads route parameters.
-   `useSearchParams` -- Reads catalog search parameters.

**Lifecycle example:** The Home component fetches boot and like data
when it mounts. It uses an `isMounted` flag to avoid updating state
after the component has unmounted. Its cleanup function changes the flag
when the component unmounts.

Another example is `UserProvider`, which subscribes to Supabase
authentication state changes when it mounts and unsubscribes when it
unmounts.

### Context API

Two React Context providers are used:

-   **UserContext:** Shares the current user, authentication status,
    loading status, and register/login/logout handlers. It is consumed
    by route guards, the header, profile, boot details, and
    authentication-related components.
-   **ModalContext:** Shares functions for displaying informational,
    success, error, and confirmation modals. It is consumed by
    components that need to display feedback or request confirmation.

Both providers wrap the application in `main.jsx`.

### Component Styling

The application uses external CSS files, including the global
`index.css` file and styles organized alongside the relevant
components/pages. Styling is implemented with standard CSS rather than a
component styling library.

## 10. Typical User Flow

1.  A visitor opens the home page and browses the newest and most-liked
    football boots.
2.  The visitor opens the catalog, searches by model or terrain type,
    and selects a boot to view its details.
3.  To create a product or interact with a boot, the visitor registers
    or logs in.
4.  The authenticated user creates a boot product, likes other users'
    boots, posts comments, and manages their own products through the
    details page and profile.

## 11. Error & Edge Case Handling

### Authentication Errors

-   Login errors are caught and displayed through a modal.
-   Registration errors returned by Supabase are displayed to the user.
-   Empty authentication fields are checked before submitting.
-   Route guards wait for the authentication state to load before
    redirecting.
-   Logout errors are caught and displayed through the modal system.

### Network or Data Errors

-   Supabase requests are checked for returned errors.
-   Data-fetching and mutation operations use `try/catch` blocks.
-   Error messages are displayed through the shared modal system.
-   Loading indicators are displayed while authentication or page data
    is being resolved.
-   Submission flags prevent duplicate create, comment, and like
    requests while an operation is in progress.
-   The `parseServerError` utility provides a shared way to process
    errors.

### Empty or Missing Data States

-   The home page displays an empty-state message when there are no boot
    products.
-   The catalog displays a message when no boots are available for the
    current search.
-   The comments section displays a message when a boot has no comments.
-   The profile page displays separate empty states for created boots,
    liked boots, and comments.
-   Loading components are shown while page data is being fetched.

------------------------------------------------------------------------



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
