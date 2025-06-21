
Easterx Esports - Official Website

Welcome to the official GitHub repository for the Easterx Esports website! This platform serves as the central hub for our BGMI community, showcasing our journey, events, team, and more.
Live Website: https://easterxesports.vercel.app/ 

🌟 About Easterx Esports
Easterx Esports is a dynamic organization rooted in the Indian Battlegrounds Mobile India (BGMI) scene. Evolving from a competitive team to tournament architects, we are dedicated to fostering grassroots esports, building a vibrant gaming community, and providing a platform for players to shine.
✨ Website Features
Our website is designed to be an engaging and informative platform for our community and visitors:
 * Dynamic Homepage:
   * Engaging hero section with a Three.js particle background and an automated image slider.
   * Quick links to key sections like BGMI Events, Our Squad, and About Us.
 * Our Journey Page:
   * A detailed narrative of Easterx Esports' history and evolution.
   * Highlights of international and national tournament participation (PMWL, Red Bull M.E.O).
   * Showcase of organizational contributions, including LAN events like Citronics 2K24 & 2K25.
   * Insights into our community-building efforts and future vision.
 * Event Gallery Page:
   * Photo galleries from past events (currently featuring placeholders for Citronics 2K24 & 2K25).
   * Modern grid layout with hover effects and scroll-to-reveal animations for images.
 * Meet Our Squad Page:
   * Profiles of Easterx Esports competitive team members, including their roles, in-game IDs, and Instagram links.
 * BGMI Events & Highlights Section:
   * Information on past and upcoming tournaments and significant achievements.
 * Modern UI/UX:
   * Aesthetic and clean design reflecting the Easterx Esports brand.
   * Smooth animations, transitions, and scroll-to-reveal effects across all pages.
   * Fully mobile-responsive design for a seamless experience on all devices.
   * Animated preloader for a polished loading experience.
 * Interactive Elements:
   * Clear calls to action to join our Discord, contact us, and watch tournaments.
🛠️ Tech Stack
This website is built with a modern front-end stack:
 * React.js: A JavaScript library for building user interfaces.
 * Vite: A next-generation frontend tooling that provides an extremely fast development environment and optimized builds.
 * JavaScript (ES6+): Core programming language.
 * CSS3: For styling, including custom properties (variables), Flexbox, Grid, and animations (styled within the main App.jsx via a GlobalStyles component).
 * Three.js: For the hero section particle animation.
 * HTML5: Standard markup language.
 * Git & GitHub: For version control and repository hosting.
 * Vercel: For continuous integration and deployment.
🚀 Getting Started Locally
To run this project on your local machine, follow these steps:
 * Prerequisites:
   * Node.js (v18.x or later recommended)
   * npm or yarn
 * Clone the repository:
   git clone https://github.com/Priyank118/easterx-esports.git
cd easterx-esports

 * Install dependencies:
   npm install
# or
yarn install

 * Run the development server:
   npm run dev
# or
yarn dev

   This will start the Vite development server, typically at http://localhost:5173.
 * Build for production:
   To create an optimized production build (outputs to the dist folder):
   npm run build
# or
yarn build

   You can preview the production build locally with npm run preview.
📁 Project Structure (Simplified)
easterx-esports/
├── public/                # Static assets (images, fonts, robots.txt, etc.)
│   ├── images/
│   │   ├── Citronics2K24/ # (Ensure no spaces in actual folder names, e.g., Citronics2K24)
│   │   ├── Citronics2K25/ # (e.g., Citronics2K25)
│   │   └── ... (other site images like logo, hero backgrounds)
│   └── ...
├── src/
│   ├── App.jsx            # Main application component, includes all page logic and GlobalStyles
│   ├── main.jsx           # Entry point of the React application
│   └── vite-env.d.ts      # Vite TypeScript environment declarations
├── .gitignore
├── index.html             # Main HTML template for Vite
├── package.json
├── README.md              # This file
└── vite.config.js         # Vite configuration

(Note: Currently, all page components like GalleryPage, BgmiJourneyPage, etc., are defined within App.jsx. Consider refactoring these into separate files under a components/ or pages/ directory for better organization in the future.)
🌐 Deployment
This website is automatically deployed via Vercel whenever changes are pushed to the main (or specified production) branch on GitHub.
🤝 Contributing (Optional - Add if you're open to contributions)
We welcome contributions to the Easterx Esports website! If you'd like to contribute, please follow these steps:
 * Fork the repository.
 * Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name or git checkout -b fix/your-bug-fix.
 * Make your changes and commit them with clear, descriptive messages.
 * Push your changes to your forked repository.
 * Open a Pull Request to the main branch of this repository.
Please ensure your code follows the existing style and that any new features are well-tested.
🐛 Reporting Issues
If you find any bugs or have suggestions for improvements, please open an issue on the GitHub Issues page. Provide as much detail as possible, including steps to reproduce the bug or the context for your suggestion

We hope you enjoy the website and find it a valuable resource for all things Easterx Esports!
>>>>>>> 8f64fdaeabb8483cbdcf5cdad67c728c798737be
