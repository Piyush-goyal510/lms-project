# Ridgeline LMS (frontend prototype)

Plain React (no TypeScript, no Redux) + Vite. All data is in-memory mock data in
`src/data.js` — there's no backend, so refreshing the page resets progress.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  data.js                 mock courses/users + helper functions
  index.css               all styling
  App.jsx                 role switching + top-level view routing
  main.jsx                React entry point
  components/
    Catalog.jsx            course catalogue + "My Courses"
    CourseDetail.jsx        curriculum sidebar, video player, quiz, certificate
    Dashboard.jsx            student progress dashboard
    Instructor.jsx          curriculum builder + analytics
    Admin.jsx                approvals, user management, revenue
```

## What's real vs. simulated

- **Real**: React state management, sequential lesson unlocking, the 90%-watched
  completion rule, quiz auto-grading, curriculum builder (add/rename/reorder/delete
  sections & lessons), role-based views.
- **Simulated**: video "playback" is a timer that counts up watched seconds — there's
  no actual video file. Analytics numbers on the instructor view are generated from a
  simple formula, not real student data.

## Turning this into the full MERN capstone

The project brief calls for Node + Express + MongoDB + JWT role middleware +
Cloudinary/S3 for video + Stripe/Razorpay for payments. To get there:

1. Move `src/data.js`'s shape into MongoDB schemas (Course, Section, Lesson, User,
   Enrollment, Progress).
2. Replace the in-memory `useState` calls in `App.jsx` with API calls
   (`fetch`/`axios`) to an Express server, likely via a small `src/api.js` module.
3. Re-implement the "watched >= 90%" and role checks **server-side** — right now
   they're only enforced in the UI, which is exactly the gap the brief's interview
   question calls out ("how is a role enforced end to end?").
4. Swap the simulated video timer for a real `<video>` element with a
   `timeupdate` listener, periodically POSTing progress to the server.
