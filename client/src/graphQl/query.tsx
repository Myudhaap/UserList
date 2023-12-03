import {gql} from "@apollo/client"

export const QUERY_ALL_USERS= gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
      friends {
        username
      }
      favoriteMovies {
        name
      }
    }
  }
`

export const QUERY_GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id){
      id
      name
      username
      age
      nationality
      friends {
        id
        name
        username
        age
        nationality
      }
      favoriteMovies {
        name
        yearOfPublication
      }
    }
  }
`

export const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`

export const QUERY_GET_MOVIE = gql`
  query GetMovie($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`
