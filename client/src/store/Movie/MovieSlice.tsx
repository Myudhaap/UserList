import { createSlice } from "@reduxjs/toolkit"

export type movie = {
  id: number,
  name: string,
  yearOfPublication: number,
  isInTheater: boolean
}

export type Movies = movie[]

const initState:Movies = []

const movieSlice = createSlice({
  name: "movies",
  initialState: initState,
  reducers:{

  }
})

export default movieSlice.reducer