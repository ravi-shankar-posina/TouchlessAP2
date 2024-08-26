# Stage 1: Build the React app
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ libcairo-dev libjpeg-turbo-dev pango-dev giflib-dev

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=builder /app/build ./build

# Install a simple HTTP server to serve the React app
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]