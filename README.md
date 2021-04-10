# social-network-api

## Screenshot:
![](src/screenshot.png)

## Description:
- This is a API for a social network that uses a NoSQL database SO THAT website can handle large amounts of unstructured data
- GIVEN a social network API
- WHEN user enters the command to invoke the application THEN the server is started and the Mongoose models are synced to the MongoDB database
- WHEN user opens API GET routes in Insomnia Core for users and thoughts THEN the data for each of these routes is displayed in a formatted JSON
- WHEN user tests API POST, PUT, and DELETE routes in Insomnia Core THEN he/she is able to successfully create, update, and delete users and thoughts in the database
- WHEN user test API POST and DELETE routes in Insomnia Core THEN user is able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.
- A virtual friendCount is created that retrieves the length of the user's friends array field on query.
- A virtual reactionCount is created that retrieves the length of the thought's reactions array field on query.
- Reaction Schema is created as the reaction field's subdocument schema in the Thought model.
- Removing a user, removes associated thoughts from thoughts collections.
- Creating a new thought push the created thought's _id to the associated user's thoughts array field.
- Custom javascript created to format date and time which is set by get method in the createdAt fields in both Thought and Reaction Schema.

## Technical description: 
- mongoDB (mongoose) and Sequelize is used.

## Walkthrough video:
- Part-1: https://drive.google.com/file/d/1-R7f4N7iajrwD2ntem9jrJ-IWy2RJoLB/view
- Part-2: https://drive.google.com/file/d/1GAaqtburM0A_DFkUi3xMkggdIG_TXad7/view
- Part-3: https://drive.google.com/file/d/13MoP53-uYABkJ1Zpz_BWklJI7Au33Vy9/view
