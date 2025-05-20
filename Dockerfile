# Use Alpine-based Node.js image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
