# Metadata and AI Chat Assistant Documentation

## Metadata Updates

The following metadata improvements have been made to enhance SEO and social media sharing:

### 1. Favicon Integration

The `favicon_io` assets have been integrated into the site with proper metadata references:

- Added favicon references in `app/layout.tsx`
- Updated paths to point to the correct location in the `public/favicon_io (1)` directory
- Incorporated Android Chrome icons and Apple Touch icon
- Updated the site manifest reference

### 2. OpenGraph and Twitter Card Metadata

Enhanced metadata for improved social media sharing:

- Added OpenGraph metadata for better Facebook/LinkedIn sharing
- Added Twitter Card metadata for better Twitter sharing
- Created placeholders and a script to generate visual preview images
- Updated theme color references

### 3. Additional SEO Improvements

- Added comprehensive keywords
- Added proper author information
- Added locale and canonical URL references
- Improved page titles and descriptions
- Added proper metadata formatting for accessibility

## AI Chat Assistant

A new AI Chat Assistant has been added to help users discover more about the developer:

### Features

- Floating chat button in the bottom-right corner
- Expandable chat interface with minimize/maximize functionality
- Pre-defined sample questions for quick engagement
- Simulated AI responses based on developer information
- Mobile-friendly design with responsive layout

### Technical Implementation

The component uses:

- HeroUI components for consistent design language
- Framer Motion for smooth animations
- React hooks for state management
- Responsive design principles
- Accessible UI elements with proper ARIA attributes

### How to Customize

To customize the AI assistant with your own information:

1. Edit the `developerInfo` object in `components/ai-chat-assistant.tsx`
2. Update the sample questions in the `sampleQuestions` array
3. Modify the response logic in the `generateResponse` function
4. Update the profile image path to your own image

### Usage

The AI Chat Assistant is automatically added to the homepage and will be available on all pages where you include the component. It provides an interactive way for visitors to learn about you and your work without having to scroll through the entire portfolio.

## Image Generation Script

A script for generating social media preview images is included:

1. Located at `scripts/generate-og-images.js`
2. Dependencies: `canvas`, `fs`, `path`, and `mkdirp`
3. Generates:
   - OpenGraph image (1200x630px)
   - Twitter Card image (800x800px)
4. Usage: `node scripts/generate-og-images.js`

## Next Steps

Consider the following future enhancements:

1. Add actual API integration for the chat assistant
2. Implement analytics to track common questions
3. Create dynamically generated OG images using Edge functions
4. Add more interactive elements to the chat experience
5. Implement browser notification support for returning visitors 