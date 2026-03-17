<!-- @format -->

# Cosmic Planner Hub ✨

Welcome to the Cosmic Planner Hub! Your personal space for planning and productivity, wrapped in a beautiful, gamified, and cosmic-themed interface. This application is designed to make organizing your tasks, subjects, and personal milestones an engaging and visually delightful experience.

![Cosmic Planner Hub Screenshot](https://i.imgur.com/example.png)
_(Image placeholder: A screenshot of the application's dashboard would go here, showcasing the various widgets and charts.)_

---

## 🚀 Key Features

- **Stunning Cosmic Theme**: A beautiful pastel color palette with seamless **Light & Dark Mode** support.
- **Gamified Dashboard**: A central command center that provides an at-a-glance overview of your progress with stats like Streaks, XP Points, and Tasks Completed.
- **Todo Management System**: A full-featured task management module with CRUD operations, progress tracking, and gamification elements. Complete with stats widgets, trophy rewards, and interactive progress charts.
- **Confetti Celebrations**: Special celebratory animations when you complete all tasks for a fun, engaging experience.
- **Data Visualization**: Interactive charts powered by **Recharts** to visualize your weekly progress and task distribution.
- **Synchronized Widgets**: Components like "Quick Notes" and "Study Gallery" are synchronized across different pages using React Context for a seamless experience.
- **Loving Space**: A dedicated page to track important milestones and memories in your relationships.
- **Breadcrumb Navigation**: Easy navigation with breadcrumb component across all pages.
- **Interactive Components**: A suite of custom, reusable UI components including a beautiful date picker, dialogs, and cards.
- **Fully Responsive**: A mobile-first design that ensures a great user experience on all devices, from desktops to smartphones.

---

## 🛠️ Tech Stack

This project is built with a modern and robust stack, focusing on type safety, performance, and developer experience.

- **Core**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework.
- **Routing**: [React Router](https://reactrouter.com/) for client-side routing.
- **UI Components**: Built using primitives from [Radix UI](https://www.radix-ui.com/) for accessibility and customizability.
- **Icons**: [Lucide React](https://lucide.dev/) for a beautiful and consistent icon set.
- **Charts**: [Recharts](https://recharts.org/) for creating beautiful and responsive charts.
- **Date Management**: [date-fns](https://date-fns.org/) for reliable date manipulation.
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for elegant and simple toast notifications.
- **Animations**: [react-confetti](https://www.npmjs.com/package/react-confetti) for celebration effects.
- **State Management**: React Context for shared state between components.

---

## 📂 Project Structure

The project follows a feature-based directory structure to keep the codebase organized, scalable, and easy to maintain.

```
src/
├── components/
│   ├── dashboard_management/  # Dashboard-specific components
│   ├── home_management/      # Homepage-specific components
│   ├── loving_management/    # Loving/Relationship management components
│   ├── todo_management/      # Todo/Task management components
│   ├── layout/               # App layout (Sidebar, Header, etc.)
│   └── ui/                   # Reusable, generic UI components (Button, Card, Breadcrumb, etc.)
├── contexts/                 # React Context providers (ThemeProvider, ShareStateProvider, TodoProvider)
├── hooks/                    # Custom hooks (useTheme, useShareState, useTodo, useTodoContext)
├── layouts/                  # Main application layout component
├── lib/                      # Utility libraries (e.g., cn for classnames)
├── pages/                    # Page-level components mapped to routes
├── types/                    # TypeScript type definitions
├── utils/                    # General utility functions
├── App.tsx                   # Main application component with routing
└── main.tsx                  # Application entry point
```

---

## ⚡ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Running

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/cosmic-planner-hub.git
    cd cosmic-planner-hub
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Run the development server:**

    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## 🌟 Recent Updates

### v1.0.3 (Latest)
- ✨ **Todo Management Feature**: Fully implemented task management system with CRUD operations
- 🎨 **Gamified Todo Dashboard**: Stats widgets, trophy rewards, and progress charts
- 🎉 **Confetti Celebrations**: Special animations when completing all tasks
- 🍞 **Breadcrumb Navigation**: Improved navigation experience across all pages
- 🔧 **UI Improvements**: Enhanced layouts and user experience
- 📦 **New Dependencies**: Added react-confetti for celebration effects

### Previous Updates
- Relationship milestone tracking with edit functionality
- Responsive layouts and improved sidebar navigation
- Window size detection for responsive animations

## 🌟 Future Enhancements

- **Backend Integration**: Connect to a full backend service with a database to persist user data.
- **User Authentication**: Implement user sign-up, login, and profile management.
- **More Planner Modules**: Add dedicated pages for a full-featured Habit Tracker and Notes.
- **Customization**: Allow users to customize themes, widget layouts, and gamification settings.

---

&copy; 2025 Cosmic Planner Hub
