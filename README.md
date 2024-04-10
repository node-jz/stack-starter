## Overview

The application is divided into three main packages:

1. **NestJS Backend:** Powers the server-side logic, including user management, goal tracking, and interaction with the AI-driven coaching system.
2. **SvelteKit Frontend:** Provides a dynamic and engaging user interface, enabling users to interact with their goals, journal entries, and philosophical content.
3. **Chrome Plugin:** If you are not building a Chrome plugin, you can delete this package.

## Getting Started

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your system.
- Install `pnpm` globally if you haven't already, using `npm install -g pnpm`.

### Installation

1. Using Docker Desktop or the CLI, start the database(s) in the Dockerfile, or start up your own local database(s).

2. Install all packages
- `pnpm install`

3. Start backend (from NestJS package)
- `pnpm run start dev:debug`

4. Start frontend (from SvelteKit package)
- `pnpm run start dev`