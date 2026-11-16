# Joga Bonito Store - React Exam Project

A football boots catalog and community application built with React and
Supabase. Visitors can browse football boots, explore terrain-surface
information, and view individual product details. Registered users can
publish boots, edit or delete their own entries, like boots, and leave
comments.

The application uses Supabase for authentication and data storage. 
React is used to build the user interface and manage the client-side application.

-   **GitHub repository:**
    https://github.com/J-Nguyen-web/softuni-react-exam-football-boots
-   **Live application:** https://react-exam-joga-bonito.netlify.app

------------------------------------------------------------------------
## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Features](#2-features)
- [3. Technology Stack](#3-technology-stack)
- [4. Application Structure](#4-application-structure)
- [5. Backend and Database Overview](#5-backend-and-database-overview)
- [6. Installation and Configuration](#6-installation-and-configuration)
- [7. Deployment](#7-deployment)
- [8. Project Requirements and Implementation](#8-project-requirements-and-implementation)


### Functional Guide
- [1. Overview](#1-overview)
- [2. User Access & Permissions](#2-user-access-and-permissions)
- [3. Authentication & Session Handling](#3-authentication-and-session-handling)
- [4. Routing Structure](#4-routing-structure)
- [5. List → Details Flow](#5-list-to-details-flow)
- [6. Data Source & Backend](#6-data-source-and-backend)
- [7. Data Operations (CRUD)](#7-data-operations-crud)
- [8. Forms & Validation](#8-forms-and-validation)
- [9. React-Specific Techniques](#9-react-specific-techniques)
- [10. Typical User Flow](#10-typical-user-flow)
- [11. Error & Edge Case Handling](#11-error-and-edge-case-handling)
- [Conclusion](#conclusion)

------------------------------------------------------------------------
## 1. Project Overview
[Back to Contents](#table-of-contents)
<p></p>
</br>

**Application name:** Jogo Bonito Store

**Application category:** Football boots catalog / community web
application.

**Main purpose:** Joga Bonito Store allows football players and football
fans to browse a catalog of football boots and learn about the different
playing surfaces for which boots are designed. Users can create and
manage their own boot products, interact through likes,
and discuss using comments. The application combines product
discovery with user-generated content and account-based permissions.

## 2. Features
[Back to Contents](#table-of-contents)
<p></p>
</br>

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
-   User profile showing created boots, liked boots, comments and user-related activity.
-   Form validation, loading indicators, and frontend functionality that user can see and interact with
    error/confirmation modals.

------------------------------------------------------------------------

## 3. Technology Stack
[Back to Contents](#table-of-contents)
<p></p>
</br>

  ---------------------------------------------------------------------
  | Technology | Purpose |
  | --- | --- |
  | React 19 | Component-based user interface |
  | JavaScript (ES modules) | Application logic |
  | Vite | Development server and production build |
  | React Router | Client-side routing and route parameters |
  | Supabase | Hosted backend-as-a-service |
  | Supabase Auth | Registration, login, logout and session management |
  | Supabase PostgreSQL | Persistent application data |
  | `@supabase/supabase-js` | Communication with Supabase |
  | React Context API | Shared authentication and modal state |
  | CSS | Global component/page styling and responsive presentation |
  
------------------------------------------------------------------------

## 4. Application Structure
[Back to Contents](#table-of-contents)
</br>

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

The frontend is deployed to Netlify. Supabase is a Backend-as-a-Service (BaaS),
so the project does not require a separately deployed Node.js/Express API server.
The earlier SoftUni practice server was used during development exercises,
but the current application uses Supabase for its backend operations.

------------------------------------------------------------------------

## 5. Backend and Database Overview
[Back to Contents](#table-of-contents)
</br>


Supabase provides the backend services used by the application:

- Supabase Auth manages user accounts and authentication sessions.
- The PostgreSQL database stores boots, likes, comments, and public profile information.
- The Supabase client library allows the React application to perform database operations.
- Row Level Security (RLS) policies can enforce access restrictions at database level.

### Database tables

| Table | Purpose | Main columns used by the application |
|---|---|---|
| `boots` | Stores football boot products | `id`, `title`, `type`, `price`, `image`, `description`, `user_id` |
| `likes` | Stores user likes for boots | `id`, `boots_id`, `user_id` |
| `comments` | Stores comments associated with boots | `id`, `boots_id`, `user_id`, `message` |
| `profiles` | Stores public profile information | `id`, `username` |
| `auth.users` | Supabase-managed authentication accounts | `id` and Supabase-managed authentication fields |

### Table relationships

- A boot belongs to the user identified by `boots.user_id`.
- A like connects a user and a boot through `likes.user_id` and `likes.boots_id`.
- A comment connects a user and a boot through `comments.user_id` and `comments.boots_id`.
- A profile is associated with its authentication account through the profile ID and the user ID.

The application uses these identifiers to retrieve related data. 
For example, it uses a boot ID to retrieve its likes and comments, 
and a user ID to retrieve that user's products and activity.

### Profile creation

The application uses a database trigger associated with Supabase Auth 
to create a public profile when a new authentication account is created. 
The `handle_new_user` function takes the username from the user's 
registration metadata and inserts it into `public.profiles`. 
The trigger is named `on_auth_user_created`.

### Authentication and authorization

Registration and login are handled by Supabase Auth. The application 
stores and observes the current session through its user context.

The application also checks ownership before displaying controls for 
editing or deleting a boot. Database-level RLS policies provide 
the security boundary: frontend checks control the interface, 
while RLS must enforce permissions when a request reaches the database.

The configured `boots` policies include public read access 
and authenticated-user insert, update, and delete restrictions 
based on `auth.uid() = user_id`. For updates, the policy must check 
both the existing row with `USING` and the resulting row with `WITH CHECK`.

## 6. Installation and Configuration
[Back to Contents](#table-of-contents)
</br>


### Prerequisites

- Node.js
- npm
- A Supabase project with the required tables, authentication,
- trigger, and RLS policies configured

### Installation

Clone the repository:

```bash
git clone https://github.com/J-Nguyen-web/softuni-react-exam-football-boots.git
cd softuni-react-exam-football-boots
```

The Vite application is located in the `client` directory:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory 
and provide the Supabase project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISH_KEY=your_supabase_publishable_key

The Supabase client is initialized in `client/src/supabaseClient.js`.
```

Use the values from the Supabase project settings. 
Do not commit the `.env` file or expose secret/service-role keys in frontend code.

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## 7. Deployment 
[Back to Contents](#table-of-contents)
</br>


The frontend is deployed to Netlify from the GitHub repository.

The Netlify build configuration uses:

| Setting | Value |
|---|---|
| Branch | `main` |
| Base directory | `client` |
| Build command | `npm run build` |
| Publish directory | `dist` |

The Supabase URL and publishable key must also be configured as environment 
variables in the Netlify site settings. After changing environment variables, 
a new deployment is required so the production build can use the updated values.

## 8. Project Requirements and Implementation
[Back to Contents](#table-of-contents)
</br>


The project demonstrates the main requirements of the React application exam:

- A React single-page application with routing.
- Registration, login, logout, and persisted authentication state.
- A backend service using Supabase.
- CRUD operations for boot products.
- Ownership restrictions for modifying and deleting user-created products.
- Forms and input validation.
- Shared authentication state through Context.
- A deployed frontend application.

------------------------------------------------------------------------

### Security note

The interface checks record ownership before showing author-specific
actions. Supabase Row Level Security policies should also enforce
ownership at database level for `INSERT`, `UPDATE`, and `DELETE`
operations. Client-side checks alone are not a security boundary. Before
submission, verify that the policies on `boots`, `likes`, and `comments`
prevent users from modifying or deleting another user's records.

------------------------------------------------------------------------

# React Exam Functional Guide

## 1. Overview
[Back to Contents](#table-of-contents)
</br>


**Application Name:** Joga Bonito Store

**Application Category / Topic:** Football boots catalog and community
application.

**Main Purpose:**

Jogo Bonito Store is a single-page application for browsing football
boots and discovering information about different football playing
surfaces. Visitors can explore the catalog and view detailed information
about each pair of boots. Registered users can contribute their own
products, edit or remove their products, like boots, and post comments,
creating a small community around football footwear.

## 2. User Access and Permissions
[Back to Contents](#table-of-contents)
</br>


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

## 3. Authentication and Session Handling
[Back to Contents](#table-of-contents)
</br>


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
[Back to Contents](#table-of-contents)
</br>


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
  | Route | Page | Access |
  |---|---|---|
  | `/`|Home | Public |
  | `/boots`| Catalog | Public |
  | `/boots/details/:bootsId` | Boot details | Public |
  | `/terrains` | Terrain guide | Public |
  | `/size-guide`| Size guide | Public |
  | `/boots/create` | Create boot product | Protected |
  | `/boots/edit/:bootsId` | Edit boot product | Protected|
  | `/profile`| User profile| Protected| 
  | `/login`|Login|Guest only |
  | `/register`|Register|Guest only |
  | `/logout`|Logout action|Route is not wrapped in either route guard |
  
  -----------------------------------------------------------------------

The application has more than five client-side routes and uses URL
parameters for the boot details and edit pages.

The route table describes the intended access rules. 
The actual route configuration in `App.jsx` is the source of truth 
for the final submitted version.

### Nested & Parameterized Routes

The application uses nested route elements for route guards.
`ProtectedRoute` and `GuestRoute` render an `Outlet` for their child
routes.

Parameterized routes:

-   `/boots/details/:bootsId` -- Uses `useParams()` to identify the boot
    whose details should be loaded.
-   `/boots/edit/:bootsId` -- Uses `useParams()` to identify the boot to
    load into the edit form.
    
Example:
```jsx
<Route
    path="/boots/details/:bootsId"
    element={<BootsDetails />}
/>
```

The component reads the URL parameter with `useParams()`:

```js
const { bootsId } = useParams();
```

The value is then used to retrieve the corresponding boot from Supabase.

## 5. List to Details Flow
[Back to Contents](#table-of-contents)
</br>


### Boots Catalog

The catalog retrieves boot records from the `boots` table in Supabase 
and displays them to visitors.
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

The details page retrieves the selected boot using the `bootsId` route parameter. 
It also retrieves related information such as likes, comments, and profile usernames.

The page uses the boot's `user_id` to determine its creator and compare that 
ID with the currently authenticated user's ID.

Example ownership check:

```js
const isOwner = user?.id === boots?.user_id;
```

This comparison is used to decide whether the Edit and Delete controls should be displayed.

The details page also presents the boot's comments and like information. 
Related profile records are used to display the comment author's username.

The page displays the boot information, like/unlike interaction,
comments, and owner-specific edit/delete actions. After successful
actions, the component refreshes the relevant data or navigates back to
the catalog/details page.

## 6. Data Source and Backend
[Back to Contents](#table-of-contents)
</br>


**Backend Type:** Backend-as-a-Service (BaaS) -- Supabase.

Supabase provides:

-   Hosted PostgreSQL database.
-   Authentication and session management.
-   Remote data access through the Supabase JavaScript client.

Supabase is the application's backend. The React application communicates
with the PostgreSQL database using the Supabase client.

The main tables used by the application are:

| Table | Purpose | Main fields |
|---|---|---|
| `boots` | Boot products | `id`, `title`, `type`, `price`, `image`, `description`, `user_id` |
| `likes` | Likes associated with boots and users | `id`, `boots_id`, `user_id` |
| `comments` | Comments associated with boots and users | `id`, `boots_id`, `user_id`, `message` |
| `profiles` | Public profile information | `id`, `username` |

Supabase Auth separately manages authentication accounts in `auth.users`. The public `profiles` table stores the username used by the application.

The frontend uses the Supabase client initialized in
`supabaseClient.js`. Data is fetched from and persisted to the remote
database; the application does not rely on hardcoded boot products.

There is no separate custom Node.js/Express backend deployment in the
current application. The legacy `server-softuni/` directory is not used
by the Supabase-based frontend.

### How the tables are connected

- `boots.user_id` identifies the user who created a boot.
- `likes.user_id` identifies the user who liked a boot.
- `likes.boots_id` identifies the boot receiving the like.
- `comments.user_id` identifies the author of a comment.
- `comments.boots_id` identifies the boot to which the comment belongs.
- `profiles.id` corresponds to the authentication user's ID.

These IDs allow the application to retrieve related records. For example, the details page retrieves likes and comments for a particular boot, while the profile page retrieves records associated with the current user's ID.

### Data retrieval

The application uses Supabase queries to retrieve records from the relevant tables. It can request several related data sets together when a page needs more than one type of information.

For example, the boot details view needs the boot record, its likes, its comments, and profile information for comment authors.

### Database security

Row Level Security (RLS) is important because frontend restrictions alone cannot protect database records. A user could bypass a hidden button and attempt a request directly.

The configured `boots` policies include:

- Public read access.
- Insert access for authenticated users when `user_id` matches `auth.uid()`.
- Update access restricted to the record owner.
- Delete access restricted to the record owner.

For update policies, `USING` checks which existing rows can be updated, 
while `WITH CHECK` verifies that the resulting row still satisfies the ownership condition.

The application also uses ownership checks in the interface to avoid showing edit and delete actions to users who do not own the boot.

## 7. Data Operations (CRUD)
[Back to Contents](#table-of-contents)
</br>


The main CRUD collection is `boots`, which is separate from the Users
collection.

### Create (INSERT)

Authenticated users can create a boot through the create form. After validation, the application inserts the submitted values into the `boots` table.

-   An authenticated user opens `/boots/create`.
-   The user fills in the controlled boot form.
-   The form is validated before submission.
-   The application inserts the boot data into the Supabase `boots`
    table.
-   The current user's ID is stored in `user_id`.
-   After a successful insert, the user is redirected to `/boots`.

The current user's ID is included as `user_id`, which associates the new boot with its creator.

Example:

```js
await supabase
    .from('boots')
    .insert({
        title,
        type,
        price: Number(price),
        image,
        description,
        user_id: user.id
    });
```

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

-   Likes are stored in the `likes` table. A like record connects a user to a boot through `user_id`
    and `boots_id`. The application uses these values to determine whether the current user has liked
    a particular boot and to calculate or display like information.
-   Comments are stored in the `comments` table. Authenticated users can
    post comments.
-   A user can delete only their own comments through the owner check in
    the UI; database policies should enforce this restriction as well.

## 8. Forms and Validation
[Back to Contents](#table-of-contents)
</br>


The application validates input before sending data to Supabase. Validation helps prevent empty or incorrectly formatted values from being submitted.

The boot creation form uses reusable validation logic through the project's form-validation hook and validation function. Submission is guarded by a loading/sending state to prevent repeated submissions while a request is in progress.

Validation errors are displayed next to the relevant fields where the form supports inline validation. Errors returned by the backend are handled separately and can be presented through the application's modal/error mechanism.

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

## 9. React Specific Techniques
[Back to Contents](#table-of-contents)
</br>


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
[Back to Contents](#table-of-contents)
</br>


A typical guest-to-user flow is:

1. A visitor opens the home page.
2. The visitor browses the boots catalog.
3. The visitor opens a boot details page.
4. The visitor chooses to register or log in to access account-restricted actions.
5. Supabase Auth authenticates the user.
6. The user context updates to reflect the authenticated session.
7. The user can create a boot, like products, and add comments.
8. The user can open their profile to view account-related information.
9. The owner can edit or delete their own boot products.
10. The user logs out, and the application clears the authenticated state.

This flow demonstrates how routing, authentication, database operations, and conditional rendering work together.

## 11. Error and Edge Case Handling
[Back to Contents](#table-of-contents)
</br>


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

### Loading states

Data retrieval and form submissions can take time. Loading indicators and submission guards help communicate that work is in progress and prevent repeated submissions.

### Unauthorized actions

Hiding an edit or delete button is a user-interface measure, not a security boundary. Supabase RLS must reject requests that violate ownership rules.

### Empty results

The catalog, profile, likes, or comments may contain no records. The interface should handle empty collections without assuming that at least one record exists.

## Conclusion
[Back to Contents](#table-of-contents)
</br>


The football Boots Store Project demonstrates the development of a React single-page application integrated with Supabase as its backend service. It brings togeher user authentication, database operations, CRUD functionality, protected routes and user interactions within a single application.
The project applies the main concepts and techniques covered in the react course, including component-based architecture, React Hooks, Context API, routing, form handling, and communication with a backend service.

---

