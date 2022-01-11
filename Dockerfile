FROM node:16-alpine

WORKDIR /srv

COPY . .
RUN ls -la 

EXPOSE 8080
CMD ["npm", "run", "entrypoint_docker"]
