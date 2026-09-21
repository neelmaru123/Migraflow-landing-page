# Migraflow Landing Page & Authentication

Standalone frontend repository for **Migraflow**'s landing page, user sign in, and user registration.

## Architecture

Built with Next.js 14 (App Router), Tailwind CSS, Redux Toolkit, TanStack Query, Lucide Icons, and Spline 3D.

- **`/`**: High-performance landing page featuring 3D Spline hero canvas, dynamic scroll light guide, interactive multi-source database migration topology, feature highlights, and workflow pipeline.
- **`/login`**: Split-screen sign-in with email/password authentication and Google OAuth option.
- **`/register`**: Split-screen account creation with validation and Google OAuth option.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Cyberpunk / Glassmorphism Design System
- **State Management**: [@reduxjs/toolkit](https://redux-toolkit.js.org/) & [react-redux](https://react-redux.js.org/)
- **Server Cache / Mutations**: [@tanstack/react-query](https://tanstack.com/query)
- **3D Graphics**: [@splinetool/react-spline](https://spline.design/)
- **Icons**: [lucide-react](https://lucide.dev/)
- **Forms & Notifications**: `react-hook-form`, `react-hot-toast`

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env.local` (or copy from `.env.example`):

```env
# Migraflow Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Target platform app/dashboard URL (post-login/register redirect destination)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or whichever port Next.js assigns if port 3000 is occupied).

### 4. Production Build

```bash
npm run build
npm run start
```
