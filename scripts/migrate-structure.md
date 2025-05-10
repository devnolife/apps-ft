# Structure Migration Guide

This document provides guidance on migrating to the new project structure.

## Directory Mapping

| Old Location | New Location | Notes |
|--------------|--------------|-------|
| src/@core | src/components and src/lib | UI components go to components, utilities to lib |
| src/@layouts | src/components/layout | All layout components |
| src/@menu | src/components/layout/navigation | Menu and navigation components |
| src/libs | src/lib | Library integrations |
| src/store | src/lib/redux | Redux store and slices |
| src/configs | src/styles and src/lib | Theme configs to styles, other configs to lib |
| src/views | src/app | Page-specific components should be co-located with their pages |
| public/images/images | public/images | Remove duplicate directory |

## Migration Steps

1. **Components**:
   - Move reusable UI components to `src/components`
   - Organize by purpose (common, forms, layout, ui)
   - Co-locate component-specific styles with their components

2. **Hooks**:
   - Keep custom hooks in `src/hooks`
   - Ensure they follow the React hooks naming convention

3. **Library Code**:
   - Move third-party integrations to `src/lib`
   - Organize by the library or service they integrate with

4. **Styles**:
   - Move global styles to `src/styles`
   - Move theme configuration to `src/styles`

5. **Pages**:
   - Keep using the App Router in `src/app`
   - Co-locate page-specific components with their pages

6. **Assets**:
   - Clean up duplicate images
   - Organize images by purpose

## Import Path Updates

You'll need to update import paths throughout the codebase. Here are some examples:

```javascript
// Old
import { Button } from 'src/@core/components/Button';
import { useAuth } from 'src/hooks/useAuth';
import { store } from 'src/store';

// New
import { Button } from 'src/components/ui/Button';
import { useAuth } from 'src/hooks/useAuth'; // This one stays the same
import { store } from 'src/lib/redux';
```

## Gradual Migration

You don't need to migrate everything at once. Here's a suggested order:

1. Set up the new directory structure
2. Move utility functions and hooks (these have fewer dependencies)
3. Move library integrations
4. Move UI components
5. Update import paths
6. Clean up old directories

## Testing

After each migration step:

1. Run the application locally
2. Check for console errors
3. Test affected functionality
4. Run tests if available

