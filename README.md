
First install NodeJS:  
`$ brew install node`


After cloning the repository,  install these dependencies
```
  "dependencies": {
    
  }
  ```
running the following command:  
`$ npm install <dependency_name>`

Add your OpenWeather API key in .env_sample file:
` OPEN_WEATHER_API_KEY=YOUR_API_KEY`

To run the server:  
`$ node app.js`

Once the server is running, you should see this message:  
`Listening at http://localhost:3000`  

Finally, use the endpoints with Postman or Insomnia, they're in the router file.
