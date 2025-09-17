# Stage 1: Build the application
FROM node:22-alpine AS build

RUN node -v

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

# Bust cache if dependencies change
RUN rm -rf node_modules
COPY . .

RUN npm install
# Copy the rest of the application code

# 🛠️ Fix: Increase memory for build process
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Expose app port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
