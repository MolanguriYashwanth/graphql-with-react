const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql;

const companyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                //http://localhost:3000/comapnies/2/users
                return axios.get(`http://localhost:3000/comapnies/${parentValue.id}/users`)
                    .then(function (response) {
                        return response.data;

                    })
            },
        }
    })
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: companyType,
            resolve(parentValue, args) {
                console.log(parentValue, args);
                return axios.get(`http://localhost:3000/comapnies/${parentValue.comapnyId}`)
                    .then(function (response) {
                        return response.data;

                    })
            },
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(function (response) {
                        return response.data;

                    })
            },
        },
        company: {
            type: companyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/comapnies/${args.id}`)
                    .then(function (response) {
                        return response.data;

                    })
            },
        }

    },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})

