## Overview

The application is divided into three main packages:

1. **NestJS Backend:** Powers the server-side logic, including user management, goal tracking, and interaction with the AI-driven coaching system.
2. **SvelteKit Frontend:** Provides a dynamic and engaging user interface, enabling users to interact with their goals, journal entries, and philosophical content.
3. **Chrome Plugin:** If you are not building a Chrome plugin, you can delete this package.

This guide is tailored for developers embarking on a project utilizing a stack comprising NestJS, SvelteKit, and Tailwind CSS, backed by Postgres and Redis databases. It details the process from cloning a starter repository to setting up the environment for local development.

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- Install `pnpm` globally if you haven't already, using `npm install -g pnpm`.

### Getting Started

1. **Fork the Repository**

   - Use GitKraken or another Git management tool to fork the [stack-starter repository](https://github.com/node-jz/stack-starter) into your own new Git repository.

2. **Open the Project in VSCode**
   - Launch VSCode and opt to `Open Workspace`.
   - Navigate to and select the workspace file located in the parent directory of your forked branch.

### Setup Services and API Keys

#### Google Developer

1. Create a new OAuth Consent Screen.
2. Generate an OAuth2 credential.
3. For the callback URL, use `http://localhost:3001/auth/google/callback`. Remember to add the production URL when deploying.

#### OpenAI

1. Sign up for an OpenAI account and obtain an API key.
   - If not utilizing LLM, you may enter a placeholder in the environment variables.

### Customize Your Project

1. Update `package.json` with your project/repository name.
2. Rename `your-project.code-workspace` file to match your project name.
3. In the `packages/sveltekit` directory:
   - Copy `.env.template` to `.env`.
   - Update `PROJECT_NAME` in the `.env` file.
   - Modify `package.json`, changing `{ name: your-project-frontend }` to your project name.
4. In the `nestjs` package:
   - Copy `.dev.env.example` to `.dev.env` and adjust variables for your services.
   - For default Docker Postgres, use `postgresql://user:password@localhost:5432/postgres`.
   - Set Redis variables accordingly:
     ```
     REDIS_HOST=127.0.0.1
     REDIS_PORT=6379
     REDIS_USER=''
     REDIS_PASSWORD=''
     ```
   - Choose random strings for `JWT_SECRET_KEY` and `ENCRYPTION_KEY`.

### Initialize Docker

1. If not already installed, download and install Docker Desktop.
2. Build the environment with `docker-compose build`.
3. Use Docker Desktop to manually start the Postgres database and Redis.
4. Verify your database connection with DBeaver or a similar tool using the `DATABASE_URL`.

### Project Dependencies

- Execute `pnpm install` from the root directory to install dependencies for all packages simultaneously.

### Starting the Development Servers

#### Backend (NestJS)

- In the terminal, select NestJS and start in debug mode using `pnpm run start:debug`.

#### Frontend (SvelteKit)

- Open a new terminal, select SvelteKit, and launch in development mode with `pnpm run dev`.

### Accessing the Application

- Open your browser and navigate to the login page at `http://localhost:3000/login`.

Following these steps, your development environment should be ready. This guide aims to streamline the setup process, allowing you to focus on development.
