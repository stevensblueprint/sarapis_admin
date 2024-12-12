FROM node:22 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM busybox:1.35
RUN adduser -D static
USER static
WORKDIR /home/static
COPY --from=build-stage /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
