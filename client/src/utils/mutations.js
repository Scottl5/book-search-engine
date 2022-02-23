import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBooks!) {
    saveBook(input: $input) {
      _id
      username
      bookCount
      savedBooks {
        _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

// export const DELETE_BOOK = gql`
// mutation deleteBook($user: $String!, $book: $string){
//     deleteBook(user: $user, book: $book) {
//         username
//     }
// }`;
