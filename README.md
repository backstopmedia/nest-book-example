# nest-book-example

## Starting the development environment

### With Docker

We provide a Docker Compose file to get you up and running as fast as possible. Just run `docker-compose up` on your command line and you'll be able to access your Nest.js app on http://localhost:3000.

Also, we are using Nodemon to make sure the Node.js app is restarted automatically whenever you save any file.

#### Running migration 

To execute your migration, first get the id of the app container  
- `docker ps` take the id of the app container  

And then execute the command in the container  
- `docker exec -it [ID] npm run migrate up`