const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: [String]
    bookId: String!
    image: String
    link: String
    title: String!
    description: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  input savedBooks {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }

  type Query {
    getUsers: [User]
    getSingleUser(_id: ID): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBooks!): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
