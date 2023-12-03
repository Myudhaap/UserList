import {combineReducers} from '@reduxjs/toolkit'
import UsersReducer from "./User/UserSlice"
import MoviesReducer from "./Movie/MovieSlice"

const rootReducer = combineReducers({
  users: UsersReducer,
  movies: MoviesReducer
})

export default rootReducer