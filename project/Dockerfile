# Stage 1: Build the Vite application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:stable-alpine
# Copy the built files from the 'build' stage's 'dist' folder
COPY --from=build /app/dist /usr/share/nginx/html
# Copy your custom Nginx config if you have one (optional but good practice)
# COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
