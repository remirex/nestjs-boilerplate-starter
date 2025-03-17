# Installation Guide

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Clone Repository](#clone-repository)
  - [Environment Configuration](#environment-configuration)
  - [Install Dependencies](#install-dependencies)
  - [Database Setup](#database-setup)
  - [Run Application](#run-application)
  - [Verify Connection](#verify-connection)
  - [Manage MySQL Service](#manage-mysql-service)
- [Docker Setup](#docker-setup)
  - [Docker Commands](#docker-commands)

---

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: latest LTS version)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup Instructions

### Clone Repository

```sh
git clone --depth 1 https://github.com/remirex/nestjs-boilerplate-starter.git my-app
```

### Environment Configuration

Navigate to the project folder and set up the environment file:

```sh
cd my-app
cp .env.example .env
```

Modify `.env` with your MySQL configuration:

```ini
DB_HOST=localhost
MYSQL_TCP_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=mydb
```

### Install Dependencies

Run the following command to install all required dependencies:

```sh
npm install
```

### Database Setup

Ensure MySQL is running:

```sh
sudo systemctl status mysql
```

Since NestJS does **not** create the database automatically, create it manually:

```sh
mysql -u root -p -e "CREATE DATABASE mydb;"
```

### Run Application

Start the application in development mode:

```sh
npm run start:dev
```

If the connection is successful, NestJS will automatically create tables based on your entities.

### Verify Connection

Check if your application is running:

```sh
curl http://localhost:3000/hello
```

Alternatively, check the logs (if logging is enabled):

```sh
tail -f logs/app-[YEAR]-[MONTH]-[DATE]
```

e.g
```sh
tail -f logs/app-2025-03-17.log
```

### Manage MySQL Service

To stop MySQL:

```sh
sudo systemctl stop mysql
```

To restart MySQL:

```sh
sudo systemctl start mysql
```

## Docker Setup

For a quick setup using Docker, follow these steps:

1. Ensure you have Docker and Docker Compose installed.

2. Copy the `.env.example` file and rename it to `.env`.

3. Modify `.env` if needed.

4. Run the following command to build and start the services:

   ```sh
   npm run docker:build
   ```

5. Verify that the containers are running:

   ```sh
   docker ps
   ```

6. Access the application at:

   ```sh
   http://localhost:3000/hello
   ```

7. To stop the services, run:

   ```sh
   npm run docker:down
   ```

8. To restart the services, use:

   ```sh
   npm run docker:restart
   ```

9. To view logs in real-time:

   ```sh
   npm run docker:logs
   ```

10. To free up space by removing unused Docker images, containers, and volumes:

```sh
npm run docker:prune
```

### Docker Commands

The following scripts are available in `package.json` for managing Docker:

- **Build & Start Containers:** `npm run docker:build`
- **Start Containers:** `npm run docker:up`
- **Stop Containers:** `npm run docker:down`
- **Restart Containers:** `npm run docker:restart`
- **View Logs:** `npm run docker:logs`
- **Clean Up Docker Resources:** `npm run docker:prune`

These commands make it easier to manage your NestJS application using Docker. 🚀

---

GitHub: https://github.com/remirex/nestjs-boilerplate-starter
