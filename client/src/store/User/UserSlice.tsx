import { type UserType } from "../../schema/typeData";
import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import { client } from "../../graphQl/apolloClient";
import { QUERY_ALL_USERS, QUERY_GET_USER } from "../../graphQl/query";
import { MUTATION_ADD_USER, MUTATION_DELETE_USER, MUTATION_UPDATE_USER } from "../../graphQl/mutation";
import {toast} from 'react-toastify'
import { RootState } from "../store";


type Toast = typeof toast;

type Data = {
  id?: number
  name?: string,
  username?: string,
  age?: number,
  nationality?: string,
}

type UserSlice = {
  users: UserType[],
  user?: UserType,
  loading?: boolean
  error?: string | null | unknown
}

const initialState: UserSlice = {
  users: [],
  user: {},
  loading: false,
  error: null
};

export const getAllUsers = createAsyncThunk(
  "Users/getAllUsers", 
  async (_,{rejectWithValue}) =>{

    try{

      const {data: {users}} = await client.query({
        query: QUERY_ALL_USERS,
      })
      
      return users
    }catch(e){

      if(e instanceof Error){
        return rejectWithValue(e.message)
      }

    }
  }
)

export const getUser = createAsyncThunk(
  'Users/getUser',
  async (id:number, {rejectWithValue}) => {
    try{
      const {data: {user}} = await client.query({
        query: QUERY_GET_USER,
        variables: {
          id
        }
      })

      return user
    }catch(e){
      if(e instanceof Error) return rejectWithValue(e.message)
    }
  }
)

export const addUser = createAsyncThunk(
  'Users/createUser',
  async (data: {formData: Data, toast: Toast}, {rejectWithValue}) => {
    try{
      const {data: user} = await client.mutate({
        mutation: MUTATION_ADD_USER,
        variables: {
          input: data.formData
        }
      })

      toast.success("Data Berhasil Ditambah...");

      return user.createUser
    }catch(e){
      if(e instanceof Error){
        toast.error('User gagal ditambah...')
        return rejectWithValue(e.message)
      }
    }
  }
)

export const updateUser = createAsyncThunk(
  "Users/updateUser",
  async(data: {editData: Data, toast: Toast}, {rejectWithValue}) => {
    try{
      await client.mutate({
        mutation: MUTATION_UPDATE_USER,
        variables: {
          input: {...data.editData}
        }
      })


      toast.success("Data berhasil diupdate...")

      return data.editData
    }catch(e){
      if(e instanceof Error){
        toast.error("Data gadal diupdate...")
        return rejectWithValue(e.message)
      }
    }
  }
)

export const deleteUser = createAsyncThunk(
  'Users/deleteUser',
  async(data: {id: number, toast: Toast}, {rejectWithValue}) => {
    try{
      await client.mutate({
        mutation: MUTATION_DELETE_USER,
        variables: {
          input: {id: data.id}
        }
      })

      toast.success('Data Berhasil Dihapus...')

      return data.id
    }catch(e){
      if(e instanceof Error) return rejectWithValue(e.message)
    }
  }
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.users = action.payload
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(getUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.user = action.payload
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(addUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.error = false
      state.loading = false
      state.users.push(action.payload)
    })
    
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.error = null
      state.loading = false
      state.users = state.users.map(user => {
        if(user.id === action.payload?.id) {
          return user = {
            id: user.id,
            ...action.payload,
            friends: user.friends,
            favoriteMovies: user.favoriteMovies,
          }
        }
        return user
      })
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    .addCase(deleteUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.error = null
      state.loading = false
      state.users = state.users.filter(user => user.id != action.payload)
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const selectUser = createSelector(
  [(state: RootState) => state.root.users.user],
  (user) => {
    return user
  }
)
// export const {getUsers, getUser} = userSlice.actions

export default userSlice.reducer;