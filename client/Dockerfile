# Use an official Ubuntu base image
FROM ubuntu:20.04

# Set environment variables to avoid interactive prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies and curl
RUN apt-get update && \
    apt-get install -y \
    python3 \
    build-essential \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    curl

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the React app
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]