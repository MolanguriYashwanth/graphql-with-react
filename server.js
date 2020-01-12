const express = require("express");
const expressGraphQL = require('express-graphql');
const MyGraphQLSchema= require('./schema/schema');
const app = express();

app.use(
    '/graphql',
    expressGraphQL({
      schema: MyGraphQLSchema,
      graphiql: true,
    }),
  );
app.listen(4000,()=>{
    console.log("Listening");
})