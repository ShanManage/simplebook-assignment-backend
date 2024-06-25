# SIMPLEBOOKS-ASSIGNMENT-FRONTEND
This repository contains the source code relates to simplebooks take home assignment (Back-End). 

This is a [Node.js](https://nodejs.org/en) project.

## Application structure
Source of the application is structured according to the following structure.

- `src` - Root directory which contains project source
    - `controllers` - Contains the logic for handling HTTP requests and responses
    - `middleware` - Middleware functions for handling request preprocessing, including authentication
    - `models` - Defines the data structures used in the application
    - `routes` - Defines the API endpoints and routing logic
- `.env.example` - ENV configuration example file. This reflect all required environment configurations
- `.gitignore` - Specifies which files and directories should be ignored by Git
- `config.js` - Application configuration file that loads environment variables
- `firebase.js` - Firebase configuration and initialization
- `index.js` - Entry point of the application
- `package.json` - NPM packages and configuration file.
- `project-key.js` - Service account key

## Setting up the development environment.

#### Recommended IDE
Visual Studio Code is recommended for local development.

#### Install dependencies

> [!IMPORTANT]
> node version 18.x.x has been used and tested in the dev environment. Not encourage to use any lower version.


Execute below NPM script in the root directory to install required dependencies.

```bash
npm install
```

#### Environment configuration
Read **.env.example** to find all the required env configurations. Strongly recommended to update the .env.example file if there is any change added to env configurations.

#### Firebase configuration
Read **project-key.js** to find all the required firebase configurations and replaced values from your private key.

## Starting the development server

> [!IMPORTANT]
> Prerequisite for the development environment should be configured properly before apply any changes to the application source code. (Refer the **"Setting up the development environment"** section. )

Run the development server with:

```bash
npm start
```