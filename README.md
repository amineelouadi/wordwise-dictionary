# WordWise - Dictionary Web Application

WordWise is a modern dictionary web application that allows users to search for word definitions using the Free Dictionary API. The application provides detailed information about words, including their meanings, examples, phonetics, and audio pronunciations when available.

## Features

- **Word Search**: Look up definitions for any English word
- **Detailed Word Information**: View meanings, examples, phonetics, and parts of speech
- **Audio Pronunciation**: Listen to word pronunciations when available
- **Search History**: Track and revisit your recent searches
- **Dark/Light Theme**: Switch between dark and light modes for comfortable viewing

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **State Management**: React Query
- **Styling**: TailwindCSS with shadcn/ui components

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/amineelouadi/wordwise-dictionary.git
cd wordwise-dictionary
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

The application will start in development mode and will be available at [http://localhost:5000](http://localhost:5000).

## API Integration

WordWise uses the Free Dictionary API (https://api.dictionaryapi.dev/) to fetch word definitions. No API key is required for this service.

## Project Structure

The project follows a typical React + Express.js structure:

```
├── client/              # Frontend React application
│   ├── src/             # Source files
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions and configurations
│   │   ├── pages/       # Application pages
│   │   └── App.tsx      # Main App component
├── server/              # Backend Express.js server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # In-memory storage implementation
└── shared/              # Shared code between frontend and backend
    └── schema.ts        # Data models and validation schemas
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the application.

## License

This project is open source and available under the [MIT License](LICENSE).
