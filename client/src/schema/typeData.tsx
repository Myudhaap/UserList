export type UserType = {
  id?: number,
  name?: string,
  username?: string,
  age?: number,
  nationality?: string,
  friends?: UserType[]
  favoriteMovies?: MovieType[]
}

export type UserList = UserType[]

export type MovieType = {
  id?: number,
  name?: string,
  yearOfPublication?: string,
  isInTheaters?: boolean
}

export type MovieListType = MovieType[]
