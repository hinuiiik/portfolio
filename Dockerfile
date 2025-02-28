# Use an official Node.js runtime as a parent image
FROM node:latest

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies using pnpm
COPY package*.json ./
RUN pnpm install

# Copy source files
COPY . .

# Build your Next.js app for production using pnpm
RUN pnpm build

# Set up Xvfb and start the application
CMD ["sh", "-c", "pnpm start"]

