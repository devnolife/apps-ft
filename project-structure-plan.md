# Project Structure Improvement Plan

## Current Issues
1. Mixed architectural patterns
2. Duplication in image assets
3. Non-standard folder naming with @ prefixes
4. Pages directory despite using App Router
5. Unclear separation between UI components, business logic, and data access

## New Structure

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

## Changes to Implement

1. **Consolidate Image Assets**
   - Remove duplicate images in public/images/images
   - Organize images by purpose (avatars, icons, illustrations, etc.)

2. **Reorganize Components**
   - Move components from @core, @layouts, @menu into the standard components directory
   - Separate UI components from page-specific components
   - Create a clear hierarchy of components

3. **Standardize Folder Naming**
   - Remove @ prefix from folder names
   - Use standard naming conventions

4. **Clean Up Routing**
   - Remove the pages directory if not needed
   - Ensure all routes are properly defined in the app directory

5. **Improve Code Organization**
   - Separate business logic from UI components
   - Create clear boundaries between different parts of the application
   - Implement consistent patterns across the codebase

6. **Documentation**
   - Add README files to key directories explaining their purpose
   - Document the overall architecture and organization

