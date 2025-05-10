# Apps-FT

A Next.js application with Material UI and Tailwind CSS.

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/               # Authentication-related pages
│   ├── (dashboard)/          # Dashboard and authenticated pages
│   ├── api/                  # API routes
│   └── layout.jsx            # Root layout
├── components/               # Reusable UI components
│   ├── common/               # Common components used across the app
│   ├── forms/                # Form-related components
│   ├── layout/               # Layout components
│   │   ├── dashboard/        # Dashboard layout components
│   │   └── navigation/       # Navigation components
│   └── ui/                   # Basic UI components
├── hooks/                    # Custom React hooks
├── lib/                      # Library code and third-party integrations
│   ├── apollo/               # Apollo client setup
│   ├── auth/                 # Authentication utilities
│   └── redux/                # Redux store and slices
├── styles/                   # Global styles and theme configuration
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install

# Run the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Guidelines

1. **Component Structure**: Components should be organized by their purpose and reusability
2. **State Management**: Use Redux for global state and React hooks for local state
3. **Styling**: Use a combination of Material UI components and Tailwind CSS for styling
4. **Routing**: Use Next.js App Router for page routing
5. **API Integration**: Use Apollo Client for GraphQL API integration

## Available Scripts

- `npm run dev`: Run the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code quality issues
- `npm run format`: Format code using Prettier

