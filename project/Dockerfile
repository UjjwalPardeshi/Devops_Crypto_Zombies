FROM alpine:latest

# Install curl and other basic tools
RUN apk add --no-cache curl

# Add a script that will redirect to your Netlify URL
COPY redirect.sh /redirect.sh
RUN chmod +x /redirect.sh

# Health check to make it appear active
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# This container does nothing but stay alive
CMD ["tail", "-f", "/dev/null"]