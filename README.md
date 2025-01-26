# Forum Frontend Setup Guide

## Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Backend server running (see backend README.md file)

## Installation

```bash
# Clone repository
git clone https://github.com/FatDino789/cvwo-forum.git

# Install dependencies
npm install
```

## Running the Application

```bash
# Start development server
npm run dev

# Application will run at http://localhost:5173
```

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- shadcn/ui components

## Project Structure

```
src/
    ├── assets/          # Static assets, profile icons, colors
    ├── components/      # Reusable React components
    ├── database/        # TypeScript database types
    ├── infrastructure/  # API functions, contexts
    ├── sections/        # Page layout components
    ├── App.css          # Global styles
    └── App.tsx          # Root component
```
