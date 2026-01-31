# Logistics & Shipment Management Dashboard

A modern, responsive dashboard built with React and Tailwind CSS for managing shipments, carriers, and fleet operations.

---

## Getting Started

Follow these steps to get your development environment up and running.

### 1. Prerequisites
* **Node.js** (v16.0 or higher)
* **npm** or **yarn**
* A backend server (API) running on `http://localhost:5000` (or your configured port)

### 2. Frontend Setup
1.  Navigate to the frontend directory:
    `cd frontend`
2.  Install dependencies:
    `npm install`
3.  Start the development server:
    `npm start`

*The app will be available at `http://localhost:3000`.*

### 3. Backend Setup
1.  Navigate to the backend directory:
    `cd backend`
2.  Install dependencies:
    `npm install`
3.  Start the server:
    `npm run dev`

---

## Tech Stack

### Frontend
* **React.js**: Library for building the UI.
* **Tailwind CSS**: Utility-first CSS framework for styling.
* **Lucide React**: Icon library for a clean, modern look.
* **State Management**: React Hooks (useState, useEffect).

### Backend (Commonly paired)
* **Node.js & Express**: Server-side logic.
* **Database**: PostgreSQL.

---

## Mobile Optimization

This dashboard is fully optimized for mobile devices:
* **SubNavbar**: Features a slide-out hamburger menu for mobile and click-based dropdowns for desktop.
* **ShipmentGrid**: Uses horizontal scrolling and column consolidation to fit complex data on small screens.
* **ShipmentTile**: High-contrast, touch-friendly cards for the mobile list view.

---