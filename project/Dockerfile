# Stage 1: Build the Vite application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
# ==> CHANGED to npm ci for a clean install
RUN npm ci 
COPY . .
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf # Uncomment if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
