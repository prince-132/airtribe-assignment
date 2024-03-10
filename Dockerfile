# Use official Node.js image as base image
FROM node:14

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
