# Portfolio-Redeploy Frontend App (v2)

## Branch Purpose:
This branch contains the project's frontend files adapted to bypass strict cross-site tracking and cookie policies on iOS devices and browsers like Safari (where cookies between two different domains are blocked). These updates integrate an Axios client with request/response interceptors to manage JWT storage via `localStorage` and transmit them securely via the `Authorization` header.

- **Main Branch:** Contains the original project logic and cookie-based architecture.
- **Portfolio-Deployment Branch:** Deployed live on Vercel, communicating with the Render backend using header-based authentication to ensure full compatibility across all mobile and desktop browsers.

## Alternative approaches:
Alternative approaches considered included purchasing a custom domain to unify the site under a single root domain or migrating to Firebase. However, this deployment branch successfully preserves the goal of a JavaScript-based full-stack project while maintaining a zero-cost publishing model.

---
*Developed by Giorgos Den.*
