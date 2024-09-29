# Use Node.js v20.14.0 as the base image
FROM node:20.14.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

RUN npm install -g corepack

RUN corepack enable

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 4173

# Command to run the application
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "4173"]