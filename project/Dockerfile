# Use the official Nginx image, which is a ready-to-use web server
FROM nginx:stable-alpine

# Copy all files from the current directory into the web server's public folder
COPY . /usr/share/nginx/html

# Expose port 80 (which Nginx uses by default)
EXPOSE 80
