FROM node:22

# Skip SSL verification for Alpine package manager (temporary fix)
RUN apk update --no-cache || true

# Set npm to not use strict SSL
RUN npm config set strict-ssl false

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

# Start the application
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]