# Weather Project

A modern weather application built with React, TypeScript, Vite, and Tailwind CSS.  
It shows current weather, hourly/daily forecasts, air pollution data, and includes an interactive map for selecting locations.

---

## Features

- Current weather conditions
- Hourly and daily forecasts
- Air pollution data
- Interactive map for selecting locations
- City search via geocoding
- Light/Dark mode support
- Loading skeletons for smooth UX

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Leaflet
- Zod
- Open-Meteo API
- MapTiler

---

## Setup

```bash
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file:

VITE_MAPTILER_KEY=your_key_here

---

## APIs Used

- Open-Meteo Weather API
- Open-Meteo Geocoding API
- Open-Meteo Air Quality API
- MapTiler Tiles API

---

## Notes

- All API responses are validated using Zod
- Map click updates selected location
- Built as a learning project from a YouTube tutorial
