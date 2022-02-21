const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: [String]
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book!]
  }

  type Auth {
      token: ID!
      user: User
  }

  type Query {
      getUsers: [User]
      getSingleUser(_id: ID): User
  }
  
  type Mutation {
      createUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!) Auth
      addBook(user: String!, body: String!): Book
      deleteBook(user:String!, bookId: ID!); [User]
  }
`;

module.exports = typeDefs;
