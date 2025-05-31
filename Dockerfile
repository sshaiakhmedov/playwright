# Use ARM-compatible Node.js base image with Playwright
FROM mcr.microsoft.com/playwright:v1.18.1

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright dependencies (if not already in base image)
RUN npx playwright install

# Copy the rest of the files
COPY . .

# Expose ports (if needed)
EXPOSE 3000

# Default command
CMD ["npm", "test"]