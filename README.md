# Mascots

Goal of this MERN app is automatisation process of booking events for parties, defining animators who is going and mascots they are wearing. Keeping track of mascots quantities.

## Features

### Admin features:

- CRUD animators (with all the informations)
- CRUD events
- CRUD of event locations
- CRUD of mascots
- GET financial reports

### Animators features:

- READ the calendar
- UPDATE events:
  1. Confirming event day before, keep track who confirmed it
  2. Confirmation of money taking from event

### Event feature:

- Sending informations to animators when a new event is created

## Tech

### Frontend:

- React
- TypeScript
- MUI
- React Full Calendar
- TanStack Queary
- Axios
- React Hook Form
- Yup
- Jest

### Backend:

- Express
- TypeScript
- Yup
- Helmet
- Jest

## Installation And Development

### Backend

Install the dependencies and devDependencies and start the server.

```sh
cd server
npm i
npm run dev
```

### Frontend

Install the dependencies and devDependencies and start the client.

```sh
cd client
npm i
npm run dev
```
