const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
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

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                comapnyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post('http://localhost:3000/users', { firstName, age })
                    .then(function (response) {
                        return response.data;

                    })
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete(`http://localhost:3000/users/${args.id}`)
                    .then(function (response) {
                        return response.data;
                    })
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
                comapnyId: { type: GraphQLString },
                firstName: { type: GraphQLString },

            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/users/${args.id}`,args)
                    .then(function (response) {
                        return response.data;
                    })
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})

