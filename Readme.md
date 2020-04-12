Using GraphQL

1)Need to hookup node server to graphQL
2)Need to prepare a schema to be used and hook up it up with expressGraphQL server
3)We can avoid circular reference of objects by using arrow functions for fields to get executed
4)We can use fragments to avoid duplicate repeating query columns
5)we can to mutate data that get resolved using mutations

To start a json-server:
use json-server --watch db.json
to start graph1l:
npm start

Fragments:
Inorder to seperate repeated columns to find we can use fragments

query findUsers{
user1:user(id:"2"){
  id,
  firstName,
  company {
   		...getCompanyDetails

  }
}
  user2:user(id:"6"){
  id,
  firstName,
  company {
		...getCompanyDetails
  }
}
}
fragment getCompanyDetails on Company{
     id,
    name,
    users {
      id
    }
}

mutation{
  deleteUser(id:"I0igpZn"){
    id
  }
}



mutation{
  addUser(firstName:"Sai Test",age:5){
    firstName,
    age
  }
}

{
  user(id:"4"){
    id,firstName,age,company{
      id,
      name,
      description
    }
  }
}

{
 company(id:"1"){
  name,
  id,
  description,
  users {
    firstName
  }
}
}