import { gql } from "@apollo/client"

export const MUTATION_ADD_USER = gql`
  mutation AddUser($input: CreateUserInput!){
    createUser(input: $input){
      id
      name
      username
      age
      nationality
    }
  }
`

export const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateInput!){
    updateUser(input: $input){
      id
      name
      username
      age
      nationality
    }
  }
`

export const MUTATION_DELETE_USER = gql`
  mutation DeleteUser($input: DeleteUserInput!){
    deleteUser(input: $input){
      id
    }
  }
`