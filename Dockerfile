# Use an official Node.js runtime as a parent image
FROM node:latest

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies using pnpm
COPY package*.json ./

RUN pnpm install

# Bundle app source
COPY . .

# Build your Next.js app for production using pnpm
RUN pnpm build

# Start the application
CMD ["pnpm", "start"]
