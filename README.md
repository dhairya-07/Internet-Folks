# Internet-Folks
Step 1: Enter your postgres password in the db.js file

Step 2: Create a database named - "internet_folks"

Step 3: run npm install

Step 4: run npm start

Step 5: Access any route as described in your postman documentation

### Special Request
I have created the models and also created associations among them still my sequelize queries are showing the error or associations not found, I have tried other ways to make this work but none seems to work
You can check the getMyOwnedCommunities handler in the controllers/communityController.js file where i have tried 3-4 different methods to achieve the functionality of expanding the owner field.I have discussed
it with many people and shared my code with them but none was able to find the error. I have tried creating the associations using just Community.belongsTo method but that throws --> User is not a subclass of 
sequelize.model. Similarly i have searched and tried multiple solutions but none worked. This is not an excuse rather a learning oppurtunity as to where I might be going so wrong. If you can just review my code
point out the mistake I would be really grateful.
All the models are in the models directory, all the controllers are in the controller directory and the code with the problem lies in controller/communityController/js
