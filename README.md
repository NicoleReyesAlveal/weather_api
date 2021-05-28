
First install NodeJS:  
`$ brew install node`


After cloning the repository,  install the dependencies
```
  "dependencies": {
    "body-parser": "^1.19.0",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jest": "^27.0.1",
    "mongodb": "^3.6.8",
    "mongoose": "^5.12.11",
    "response-time": "^2.3.2"
  }
  ```
running the following command:  
`$ npm install <dependency_name>`
or run `$npm i` for short

Add your OpenWeather API key in .env_sample file:
` OPEN_WEATHER_API_KEY=YOUR_API_KEY`

For Mongodb, create the Docker container with the following command: 
`$ docker run -d  --name mongo-db  -p 27888:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo`

Build the container with: 
`$ docker-compose up -d`

To run the server:  
`$ node listen.js`

Once the server is running, you should see this message:  
`Listening at http://localhost:3000`  

To run the tests:
`$ npm run test`

Finally, use the endpoints with Postman or Insomnia, they're in the routers folder.
