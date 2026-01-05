# 🎬 Movie Ticket Booking App

A modern, full-stack movie ticket booking application built with Next.js, Node.js, and PostgreSQL. Book movie tickets, select seats, and manage your reservations with ease.

![Movie Ticket App](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-13+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

<img width="2860" height="1424" alt="image" src="https://github.com/user-attachments/assets/60942bbb-f46d-4915-8db9-dab1cbfff23d" />




## ✨ Features

### 🎭 Core Functionality

- **Movie Discovery**: Browse trending and popular movies from TMDB API
- **Seat Selection**: Interactive theater seat selection with real-time availability
- **Ticket Booking**: Complete booking flow with user authentication
- **Booking History**: View and manage your past and upcoming reservations
- **QR Code Generation**: Digital tickets with QR codes for verification
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔐 Authentication & Security

- JWT-based authentication system
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- Session management with automatic token validation

### 🎨 User Experience

- Modern, cinema-themed dark UI design
- Smooth animations and transitions
- Loading states and error handling
- Hover effects and interactive components
- Toast notifications for user feedback

<img width="2880" height="2546" alt="image" src="https://github.com/user-attachments/assets/0a65e2d2-8b1b-42d6-9758-62adc6352ea0" />

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query + Zustand
- **Icons**: React Icons
- **Forms**: React Hook Form
- **QR Codes**: React QR Code

### Backend

- **Runtime**: Node.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Password Hashing**: bcrypt

### DevOps & Tools

- **Containerization**: Docker & Docker Compose
- **Git Hooks**: Husky
- **Commit Convention**: Conventional Commits
- **API Integration**: The Movie Database (TMDB)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Git installed

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/monorepo_movie_ticket.git
cd monorepo_movie_ticket
```

### 2. Environment Setup

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your actual values
# - Get TMDB API key from: https://www.themoviedb.org/settings/api
# - Generate JWT secret: openssl rand -hex 32
# - Set secure database credentials
```

### 3. Start with Docker

```bash
# Build and start all services
docker-compose up

# Or run in background
docker-compose up -d
```

### 4. Access the Application

- **Frontend**: http://localhost:3009
- **Backend API**: http://localhost:4007

## 📁 Project Structure

```
monorepo_movie_ticket/
├── frontend/                 # Next.js application
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   │   ├── atoms/          # Basic UI components
│   │   ├── molecules/      # Composite components
│   │   ├── organisms/      # Complex components
│   │   └── templates/      # Page templates
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   └── store/              # Zustand stores
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── domain/         # Business logic
│   │   ├── infrastructure/ # Data layer
│   │   └── presentation/   # HTTP layer
│   └── prisma/             # Database schema & migrations
└── docker-compose.yml      # Multi-container setup
```

## 🔧 Available Scripts

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Backend Development

```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
```

### Docker Commands

```bash
docker-compose up    # Start all services
docker-compose down  # Stop all services
docker-compose logs  # View logs
docker-compose build # Rebuild containers
```

## 🎯 Usage Guide

### 1. User Registration & Login

- Create an account or login with existing credentials
- Authentication tokens are stored securely

### 2. Browse Movies

- Explore trending and popular movies
- View detailed movie information, cast, and ratings

### 3. Book Tickets

- Select a movie and showtime
- Choose your preferred seats from the interactive theater layout
- Complete the booking process

### 4. Manage Bookings

- View booking history with ticket status
- Access digital tickets with QR codes
- Track upcoming and past reservations

## 🔐 Environment Variables

Key environment variables to configure:

```env
# Database
POSTGRES_DB=movie_ticket
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
DATABASE_URL=postgresql://postgres:password@postgres:5432/movie_ticket

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# TMDB API
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3/

# Application
BACKEND_PORT=4007
FRONTEND_PORT=3009
```

## 🧪 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Movies

- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/:id` - Get movie details

### Tickets

- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/user/:userId` - Get user tickets
- `GET /api/tickets/:id` - Get ticket details

### Seats

- `POST /api/seats/multiple` - Create multiple seats
- `GET /api/seats/ticket/:ticketId` - Get seats by ticket

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow commit conventions**: Use conventional commits (feat, fix, docs, etc.)
4. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Commit Message Format

```
<type>[optional scope]: <description>

Examples:
feat: add user authentication
fix: resolve seat selection bug
docs: update API documentation
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have questions or need help:

1. Check the [Issues](https://github.com/your-username/monorepo_movie_ticket/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Built with ❤️ for movie lovers everywhere** 🍿
