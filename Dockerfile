# Use an official Node.js runtime as a parent image
FROM node:latest

# Install dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    liblmdb-dev \
    libwxgtk3.2-gtk3-dev \
    libxxf86vm-dev \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies using pnpm
COPY package*.json ./
RUN pnpm install

# Copy source files
COPY . .

# Build TrustedQSL from source
WORKDIR /tmp
RUN curl -LO http://www.arrl.org/tqsl/tqsl-2.7.5.tar.gz && \
    tar xzf tqsl-2.7.5.tar.gz && \
    cd tqsl-2.7.5 && \
    mkdir build && cd build && \
    cmake -DCMAKE_INSTALL_PREFIX=/usr -DwxWidgets_CONFIG_EXECUTABLE='/usr/bin/wx-config' -DwxWidgets_wxrc_EXECUTABLE='/usr/bin/wxrc' ../ && \
    make && make install && \
    cd / && rm -rf /tmp/tqsl-2.7.5 /tmp/tqsl-2.7.5.tar.gz

# Restore working directory
WORKDIR /usr/src/app

# Build your Next.js app for production using pnpm
RUN pnpm build

# Set up Xvfb and start the application
CMD Xvfb :99 -screen 0 1024x768x16 & DISPLAY=:99 pnpm start
