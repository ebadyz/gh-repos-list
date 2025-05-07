# GitHub Repositories Explorer

A modern React application for exploring GitHub repositories, built with React 19, TanStack Router, React Query, and Chakra UI.

## 🌐 Live Demo

Check out the live demo: [https://gh-public-repos.netlify.app/](https://gh-public-repos.netlify.app/)

## 🚀 Features

- **Repository Search**: Search GitHub repositories with advanced filtering options
- **Sorting Options**: Sort repositories by stars, forks, or update date
- **Pagination**: Navigate through search results with a clean pagination interface
- **Repository Details**: View comprehensive information about repositories including:
  - Basic repository information
  - Language breakdown
  - Recent commits
  - README content with proper Markdown rendering

## 🛠️ Technologies

- [React 19](https://react.dev/) - UI Library
- [TanStack Router](https://tanstack.com/router) - Type-safe router for React
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
- [Chakra UI v3](https://chakra-ui.com/) - Component library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Axios](https://axios-http.com/) - HTTP client
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun (optional but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gh-repos-list.git
   cd gh-repos-list
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory with your GitHub API URL:

   ```
   VITE_API_BASE_URL=https://api.github.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   bun dev
   ```

5. Open your browser and navigate to http://localhost:3000

## 🧱 Project Structure

```
src/
├── api/              # API integration with GitHub
├── components/       # Reusable UI components
├── routes/           # Application routes and pages
├── service/          # Service layer (API client setup)
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── main.tsx          # Application entry point
└── styles.css        # Global styles
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
