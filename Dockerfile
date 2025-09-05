FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the application in dev mode
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]