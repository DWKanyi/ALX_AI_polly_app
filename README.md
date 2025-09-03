# Next.js Polling App

This is a polling application built with Next.js and Shadcn components. The app allows users to register, log in, create polls, and view existing polls.

## Features

- User authentication (login and registration)
- Create new polls
- View existing polls
- Responsive design using Shadcn components

## Folder Structure

```
nextjs-polling-app
├── src
│   ├── app
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   ├── register
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── polls
│   │   │   ├── create
│   │   │   │   └── page.tsx
│   │   │   ├── view
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components
│   │   ├── ui
│   │   │   └── button.tsx
│   │   └── navbar.tsx
│   ├── lib
│   │   └── auth.ts
│   ├── styles
│   │   └── globals.css
│   └── types
│       └── index.ts
├── public
│   └── favicon.ico
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd nextjs-polling-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3010` to view the application.

## Technologies Used

- Next.js
- TypeScript
- Shadcn components
- Tailwind CSS (if applicable)

## Contributing

Feel free to submit issues or pull requests for any improvements or features you'd like to see!

## Development Ports
- Main Development: http://localhost:3000
- Docker Compose: http://localhost:3010