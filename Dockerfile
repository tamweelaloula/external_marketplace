# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Increase memory for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build Next.js app
RUN npm run build

# ----------------------------
# Stage 2: Serve the application
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary files from build stage
COPY --from=build /app ./

# Expose app port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
