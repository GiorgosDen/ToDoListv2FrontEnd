> 💡 **Looking for the live deployment?** This `main` branch contains the original cookie-based architecture. For the version adapted for iOS/Safari compatibility (using `localStorage` and deployed live on Vercel), please check out the [`portfolio-deployment` branch](https://github.com//GiorgosDen/ToDoListv2FrontEnd/tree/portfolio-deployment).

# 📝 TaskMaster (ToDoListApp Front)
A flexible web app built with React and Tailwind CSS (component design part). This frontend serves as a core component of the Full-Stack [ToDoList v2 App](https://github.com/GiorgosDen/ToDOListv2).
---
| Part Name | Link | Tech Stack |
| :--- | :--- | :--- |
| **Front-End App** | `this repo` | React, TailwindCSS |
| **Back-End API** | [View Repo](https://github.com/GiorgosDen/ToDOListv2BackEnd) | Node.js,Express,MySQL |

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
* **Email Update Security & Blacklisting:** When a user cancels an email update request, the attempted new email is recorded in the suspiciouslog table. If an email accumulates 3 suspicious log records, it is automatically added to the blacklist to prevent abuse.

---

## Features & Functionalities
### User Management
* **Sign Up:** A form page allowing new users to register in the system and sends a verification email.
* **Resend Sign Up Verification:** Option for users to request a new sign-up verification email.
* **Reset Password:** Recovery page allowing users to reset forgotten passwords via secure email tokens.
* **Login:** A form page allowing users to log in using an email and password and receive an access JWT (Auth).
* **Update Profile:** Protected view allowing authorized users to update profile details (such as full name, password with current verification, and email updates via verification email). `Note: Canceling an email update logs the new email to suspiciouslog, and hitting 3 logs automatically triggers blacklisting.`
- **Deregister:** Option to remove a user account from the system (the user deactivates it->the system deletes it after 48 hours).
- **Cancel Deregister:** Option to cancel account deactivation via email within a 24-hour window.

### Task Management
* **Daily Task Management:** The app provides real-time state management for creating, completing, and deleting tasks.
* **View Modes & Sorting:** Organize tasks by **Day / Week / Month / Total** view modes and sort them by **Time** or **State**.
* **Task Status Engine:** Automatic status calculation and appearance (Pending, Completed, Expired) based on due times.
* **Task Categories:** Organize tasks using system and custom categories (create, update, delete, user-owned).
* **Task Priorities:** View detailed priority levels for tasks.

### 📊 Task Statistics & Analytics
* **Core Metrics:** Real-time indicators for **Completed Tasks**, **Total Tasks**, and overall **Completion Rate**.
* **Task by Category:** Visualized as a **Pie Chart** showing the distribution of tasks across custom and system categories.
* **Completed vs. Total Progress:** Illustrated through a dynamic **Line Chart** tracking productivity trends over time.
* **Task by Priority:** Organized via a **Bar Chart** breaking down tasks by priority levels (Low, Medium, High).
* **Recent Activity:** Quick-access feed highlighting the **5 newest tasks** added to the system.

### Notification & Warnings
* **Privacy Policy & Terms of Service:** Accessible policies and terms on the sign-up page.
* **Form Warnings:** Inline validations for invalid user inputs.
* **Pop-Up Notifications:** Alerts for server-side responses (e.g., invalid login details, existing email sign-ups, expired sessions, restrictions on deleting completed tasks, or server errors).

---

*Developed by Giorgos Den.*


