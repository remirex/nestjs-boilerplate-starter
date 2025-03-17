# Use a lightweight Node.js LTS base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (optimizes caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application in watch mode (use nodemon for hot-reloading)
CMD ["npm", "run", "start:dev"]
