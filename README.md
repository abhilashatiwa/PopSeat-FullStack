# CineHouse

CineHouse is a movie ticket booking app. Users can browse upcoming shows, pick seats, pay with Stripe, and view their bookings. Admins can add showtimes from TMDB and review bookings from a dashboard.

## What it does

- Browse movies that have upcoming shows
- Choose a date, showtime, and seats
- Pay with Stripe Checkout
- See personal bookings and favorite movies
- Admin: add shows, view occupancy, and paid booking stats
- After payment, a confirmation email is sent
- Unpaid seat holds are released after 10 minutes

## Tech stack

| Area | Technology |
| --- | --- |
| Client | React, Vite, Tailwind CSS, Clerk |
| API | Express.js |
| Database | MongoDB (Mongoose) |
| Auth | Clerk |
| Payments | Stripe Checkout + webhooks |
| Background jobs | Inngest |
| Movies | TMDB API |
| Email | Nodemailer (Brevo SMTP) |

## Project structure

```text
client/    React frontend
server/    Express API, models, and Inngest functions
```

## Setup

You need two terminals: one for the API, one for the client.

### 1. Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
TMDB_API_KEY=
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Start the API:

```bash
npm run server
```

The API runs at `http://localhost:3000`.

### 2. Client

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_CURRENCY=$
VITE_BASE_URL=http://localhost:3000
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CLERK_PUBLISHABLE_KEY=
```

Start the UI:

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Admin access

Admin pages live under `/admin`. A Clerk user is treated as admin when `privateMetadata.role` is set to `admin` in the Clerk dashboard.

## Notes

- Seat maps are stored on each show document. Two people booking the same seat at the same moment is not locked in the database.
- Show reminder emails look for a `showTime` field that is not on the Show model, so that cron job does not send useful reminders yet.
- Inngest needs its local or hosted sync so Clerk user events, payment timeout jobs, and emails actually run.
