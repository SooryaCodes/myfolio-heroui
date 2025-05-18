# MyFolio - Developer Portfolio Template

<p align="center">
  <img src="public/images/demo-preview.png" alt="MyFolio Preview" width="800"/>
</p>

> A modern, customizable portfolio template for developers built as part of the HeroUI Hackathon.

## 🏆 HeroUI Hackathon Project

This project was created for the HeroUI Hackathon in the **Portfolio Track**. MyFolio showcases the power and flexibility of HeroUI components to create a stunning developer portfolio template.

## ✨ Features

- 📱 **Fully Responsive** - Looks great on any device
- 🌓 **Dark/Light Mode** - Supports both themes with smooth transitions
- 🏃‍♂️ **Smooth Animations** - Beautiful scroll animations and interactions
- 🧩 **Modular Structure** - Easy to customize and extend
- 📊 **Project Showcase** - Highlight your best work with interactive cards
- 💼 **Experience Timeline** - Display your professional journey
- 🛠️ **Skills Section** - Showcase your technical expertise
- 📝 **Blog Integration** - Share your knowledge with the world
- 🤖 **AI Chat Assistant** - Interactive chatbot for visitors to learn about you
- 📬 **Contact Form** - Let potential clients reach out to you
- 🧠 **SEO Optimized** - Get found on search engines

## 🖼️ Preview

<p align="center">
  <img src="public/images/dark-mode.png" alt="Dark Mode" width="400"/>
  <img src="public/images/light-mode.png" alt="Light Mode" width="400"/>
</p>

<p align="center">
  <img src="public/images/mobile-view.png" alt="Mobile View" width="250"/>
  <img src="public/images/projects-section.png" alt="Projects Section" width="550"/>
</p>

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework for production
- [HeroUI v2](https://heroui.com/) - Modern UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [GSAP](https://greensock.com/gsap/) - Advanced animations
- [react-lenis](https://github.com/studio-freight/react-lenis) - Smooth scrolling
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## 📂 Project Structure

```
myfolio/
├── app/                    # Next.js app directory
│   ├── about/              # About page
│   ├── blog/               # Blog page
│   ├── contact/            # Contact page
│   ├── docs/               # Documentation
│   ├── marketplace/        # Marketplace page
│   ├── pricing/            # Pricing page
│   ├── projects/           # Projects page
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── components/             # Reusable components
│   ├── sections/           # Main page sections
│   │   ├── about.tsx       # About section
│   │   ├── blog-section.tsx # Blog section
│   │   ├── contact.tsx     # Contact section
│   │   ├── experience.tsx  # Experience section
│   │   ├── footer.tsx      # Footer section
│   │   ├── hero.tsx        # Hero section
│   │   ├── marketplace.tsx # Marketplace section
│   │   ├── playground.tsx  # Playground section
│   │   ├── projects.tsx    # Projects section
│   │   ├── services.tsx    # Services section
│   │   ├── skills.tsx      # Skills section
│   │   └── testimonials.tsx # Testimonials section
│   ├── ai-chat-assistant.tsx # AI Chat Assistant component
│   ├── custom-cursor.tsx   # Custom cursor component
│   ├── floating-navbar.tsx # Floating navigation bar
│   ├── interactive-card.tsx # Interactive card component
│   ├── magnetic-button.tsx # Magnetic button component
│   ├── navbar.tsx          # Main navigation bar
│   ├── parallax-section.tsx # Parallax scrolling component
│   ├── scroll-animations.tsx # Scroll animation utilities
│   └── theme-switch.tsx    # Theme toggle switch
├── public/                 # Static assets
│   ├── images/             # Image assets
│   ├── favicon_io (1)/     # Favicon assets for better SEO
│   └── logos/              # Logo assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── scripts/                # Utility scripts
│   └── generate-og-images.js # OpenGraph image generator
└── datas/                  # Data for the portfolio
```

## 📋 Key Sections

The portfolio template includes the following key sections:

1. **Hero** - Eye-catching introduction with animated elements
2. **About** - Personal information and background
3. **Projects** - Showcase of your work with interactive cards
4. **Skills** - Visual representation of your technical expertise
5. **Experience** - Timeline of your professional journey
6. **Services** - What you offer to clients
7. **Testimonials** - Feedback from clients and colleagues
8. **Blog** - Integration with your blog posts
9. **Playground** - Interactive demonstrations of your skills
10. **Marketplace** - Products or services you offer
11. **Contact** - Form for potential clients to reach out
12. **AI Chat** - Interactive assistant to engage with visitors

## 🤖 AI Chat Assistant

The portfolio includes an interactive AI Chat Assistant that helps visitors learn more about you without having to scroll through the entire site.

### Features

- Floating chat button that's accessible from anywhere on the site
- Minimizable chat window with smooth animations
- Pre-defined sample questions for visitors to quickly learn about you
- Simulated AI responses based on your information
- Mobile-friendly design with responsive layout

### Customization

You can easily customize the AI assistant by editing the `components/ai-chat-assistant.tsx` file:

1. Update the `developerInfo` object with your personal information
2. Modify the sample questions in the `sampleQuestions` array
3. Customize the response logic in the `generateResponse` function
4. Change the appearance by tweaking the styling attributes

This feature enhances user engagement and provides a modern, interactive way for potential clients to get to know you better.

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/SooryaCodes/myfolio-heroui.git

# Navigate to the project directory
cd myfolio-heroui

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
# Build the project
npm run build
# or
yarn build
# or
pnpm build

# Start the production server
npm start
# or
yarn start
# or
pnpm start
```

## 🎨 Customization

### Personal Information

Edit the data files in the `datas` directory to update your personal information:

- `about.ts` - About section content
- `experience.ts` - Professional experience
- `projects.ts` - Your portfolio projects
- `skills.ts` - Technical skills
- `testimonials.ts` - Client testimonials

### Theme Customization

Modify the theme in `tailwind.config.js` to match your personal brand:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your primary color palette
        },
        // Additional custom colors
      },
      // Other theme customizations
    },
  },
  // ...
};
```

## 📱 Responsive Design

The portfolio template is fully responsive and works well on all devices:

- **Desktop** - Full-featured experience with advanced animations
- **Tablet** - Optimized layout with adjusted components
- **Mobile** - Streamlined interface with touch-friendly elements

## 🌐 Deployment

This project can be easily deployed to Vercel, the platform created by the makers of Next.js:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSooryaCodes%2Fmyfolio-heroui)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [HeroUI](https://heroui.com/) for organizing the hackathon and providing the UI components
- [Next.js](https://nextjs.org/) team for the amazing framework
- All open-source contributors whose work made this possible

---

<p align="center">
  Made with ❤️ for the HeroUI Hackathon
</p>
