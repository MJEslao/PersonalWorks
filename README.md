# PersonalWorks Node.js Conversion

This is a Node.js + Express conversion of your old Laravel 5.5 `PersonalWorks` project.

## What was converted

- Static pages:
  - `/`
  - `/about`
  - `/services`
- Blog post routes:
  - `GET /posts`
  - `GET /posts/create`
  - `POST /posts`
  - `GET /posts/:id`
- `posts` model with timestamps
- Frontend assets under `public/custom`
- Basic pagination equivalent to the Laravel version

## Stack used

- Express
- EJS
- Sequelize
- SQLite

## Why SQLite here

I used SQLite so the converted project can run immediately with almost no setup. If you want, this can be switched to MySQL or PostgreSQL later.

## Run locally

```bash
npm install
npm run seed
npm start
```

Then open:

```bash
http://localhost:3000
```

## Laravel to Node.js mapping

- `routes/web.php` -> `routes/pages.js` and `routes/posts.js`
- `app/Http/Controllers/*` -> `controllers/*`
- `app/Post.php` -> `models/Post.js`
- `resources/views/*.blade.php` -> `views/*.ejs`
- migration for `posts` -> Sequelize model + `sequelize.sync()`

## Not yet converted

These existed visually in the old project but did not have backend logic in Laravel either:

- Login form
- Register form
- Edit/update/delete posts
- User authentication

## Good next upgrades

- Add authentication with Passport or session-based login
- Replace SQLite with MySQL if you want parity with a production LAMP setup
- Split the app into MVC modules more strictly
- Add validation middleware
- Add tests with Jest + Supertest
