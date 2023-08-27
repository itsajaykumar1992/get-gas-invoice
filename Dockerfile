# Use a suitable Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose any necessary ports (if your app listens on a specific port)
EXPOSE 3000

# Run the application
CMD ["node", "App.js"]  
