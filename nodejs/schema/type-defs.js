export const typeDefs = `

  type User{
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query{
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: String = "BRAZIL"
  }

  input UpdateInput{
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String = "BRAZIL"
  }

  input DeleteUserInput{
    id: ID!
  }

  type Mutation{
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateInput!): User
    deleteUser(input: DeleteUserInput!): User
  }

  # make enum type
  # enum Nationality {
  # Indonesia
  # Brazil
  # }

`;
