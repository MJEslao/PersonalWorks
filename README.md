# PersonalWorks (Node.js Portfolio)

## Overview

PersonalWorks is a server-rendered portfolio application built with Node.js and Express. It showcases projects, services, and personal background through a lightweight and maintainable architecture.

This project is optimized for simplicity, fast deployment, and clean structure, making it suitable for both demonstration and extension into larger applications.

---

## Features

- Server-side rendering using EJS
- Clean routing with Express
- Modular folder structure
- Static asset management via Express middleware
- Vercel-ready deployment configuration
- Lightweight (no database dependency)

---

## Pages

- `/` – Home  
- `/about` – About  
- `/services` – Services  
- `/projects` – Projects  
- `/contact` – Contact  

---

## Tech Stack

- Node.js  
- Express.js  
- EJS  
- Express EJS Layouts  
- Morgan  

---

## Project Structure

```
project-root/
│
├── public/              # Static assets (CSS, JS, images)
├── routes/              # Route definitions
├── views/               # EJS templates
│   ├── layouts/
│   └── pages/
├── app.js               # Application entry point
├── vercel.json          # Deployment configuration
└── package.json
```

---

## Local Setup

Install dependencies:

```
npm install
```

Run the application:

```
npm start
```

Access locally:

```
http://localhost:3000
```

---

## Deployment

This project is deployed on Vercel.

- Automatic deployments via Git integration  
- No additional backend services required  
- Optimized for serverless environments  

---

## Design Considerations

- Removed database layer to simplify deployment and reduce overhead  
- Uses server-rendered pages instead of SPA for faster initial load  
- Structured for easy scalability (routes, views, assets separation)  
- Static-first approach with minimal runtime complexity  

---

## Future Enhancements

- Contact form integration (API or email service)  
- Improved UI/UX animations and transitions  
- Content management via JSON or headless CMS  
- Optional backend expansion (authentication, APIs)  

---

## Author

Mark Joshua Eslao
