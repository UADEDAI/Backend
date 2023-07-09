# Cinemapp Backend

Cinemapp is a backend application built with NestJS, Sequelize, and several other packages. This application supports JWT-based authentication, communicates with Google's services and more. It has also implemented Swagger for API documentation.

# API

API Documentation is being served with Swagger on [Backend API Docs](https://uadedai.github.io/Backend/ 'Swagger API Docs')

## Installation

Before installing, make sure you have [Node.js](https://nodejs.org/) installed on your machine.

Clone the repository:

```bash
git clone https://github.com/UADEDAI/Backend.git
```

Navigate to the project directory and install the dependencies:

```bash
cd Backend
npm install
```

Prepare Husky (for managing git hooks):

```bash
npm run prepare
```

# Environment variables

To run this project, you will need to set up your environment variables.

Create a .env file in the root directory of your project.

Copy the following content into the .env file and replace <value> with your actual values:

```bash
DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>
DB_USERNAME=<DB_USER>
DB_PASSWORD=<PASSWORD>
DB_NAME="Cinemapp"
JWT_SECRET=<JWT_SECRET>
CLIENT_ID=<CLIENT_ID>
CLIENT_SECRET=<YOUR_SECRET>
REDIRECT_URL=<URL>
REFRESH_TOKEN=<REFRESH_TOKEN>
EMAIL=<YOUR_EMAIL>
GOOGLE_MAPS_API_KEY=<GOOGLEMAPS_KEY>
FIREBASE_PRIVATE_KEY=<FIREBASE_KEY>
FIREBASE_PROJECT_ID=<PROJECT_ID>
FIREBASE_CLIENT_EMAIL=<YOUR_CLIENT>
```

# Database setup

Make sure you have MySQL installed and running on your machine. Run the following command to set up the database:

```bash
npm run db:install
```

# Running the app

For development mode:

```bash
npm run start:dev
```

For debug mode:

```bash
npm run start:debug
```

For production mode:

```bash
npm run start:prod
```

# Building the app

To build the app, use the following command:

```bash
npm run build
```

# Code Formatting

To format the codebase, use the following command:

```bash
npm run format
```

# Api documentation

This project uses Swagger to document the API. You can build the documentation with:

```bash
npm run doc:build
```

To serve the Swagger UI with your API documentation:

```bash
npm run doc:serve
```
