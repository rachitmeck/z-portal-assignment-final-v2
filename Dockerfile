# Use an official Node.js runtime as the base image
# FROM node:18, using alpine for less size
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application code to the container
COPY . .

EXPOSE 4001

# Define the command to run your application
CMD ["node", "app.js"]
