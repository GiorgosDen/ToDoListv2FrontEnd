# 📝 TaskMaster (ToDoListApp Front)
A flexible web app built with React and Tailwind CSS (component design part). This frontend serves as a core component of the Full-Stack [ToDoList v2 App](https://github.com/GiorgosDen/ToDOListv2).
---

## Tech Stack
* **Runtime:** React (Javascript)
* **Build Tool:** Vite
* **Design Library:** Tailwind CSS
* **HTTP Request:** Axios (Javascript Library)

---

## Security & Architecture
* **Token-Based Auth:** JSON Web Tokens (JWT) are used for user authorization to protect and manage user data.
* **Token duration:** Tokens expire after an hour.
* **HttpOnly Cookie:** Safe storage and access to JWTs.
* **Unique Identifiers:** User emails and IDs are strictly enforced as unique identifiers.

---

## Features & Functionalities
### User Management
* **Sign Up:** A form page allowing new users to register in the system and sends a verification email.
* **Verification:** An email arrives at the user's address after registration containing a verification link.
* **Login:** A form page allowing users to log in using an email and password and receives an access JWT (Auth).
* **Update:** A page that allows authorized users to update their profile information (in progress).
* **Deregister:** An authorized user can remove their account from the system.

### Task Management
* **Daily Task Management:** The app provides real-time state management for creating, completing, and deleting tasks.
* **Task Status Engine:** Automatic status calculation and appearance (Pending, Completed, Expired) based on due times.
* **Task Categories:** Organize tasks using system and custom categories (the custom categories are in progress).
* **Task Priorities:** Page to view detailed priority levels for tasks (in progress).

### Notification & Warnings
* **Privacy Policy & Terms of Service:** Indicative policy and terms researchable from sign-up page (written by Gemini).
* **Form Warnings:** Warnings appear on a form for invalid inputs.
* **Pop-Up Warnings:** A Pop-up shows up for server-side issues(Invalid login details, Sign Up email already used, Session expired, Cannot delete completed tasks, Server error) (in progress).

---

## Roadmap
1.  Finish Remaining Tasks
2.  Flexible design for Desktop screens

---

*Developed by Giorgos Den.*


