import { type UserType } from '../schema/typeData'
import React from 'react'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { AppDispatch } from '../store/store'
import { deleteUser } from '../store/User/UserSlice'
import {Link} from "react-router-dom"


type Data = {
  id?: number
  name?: string,
  username?: string,
  age?: number,
  nationality?: string,
}

type PropsType = {
  user: UserType
  setIsEdit: React.Dispatch<boolean>
  setEditData: React.Dispatch<Data>
}

const User = ({user, setIsEdit, setEditData}: PropsType) => {
  const dispatch = useDispatch<AppDispatch>()

  const onClickDelete = (id: number) => {
    dispatch(deleteUser({id, toast}))
  }
  return (
    <article className="user__list flex flex-col justify-between gap-2 text-sm bg-[rgba(255,255,255,.1)] p-2 min-h-[10rem] rounded-sm backdrop-blur-sm hover:cursor-pointer hover:bg-transparent hover:border transition ease-in-out duration-150">
      <Link to={`/user/${user.id}`} key={user.id} className="flex flex-col gap-1">
        <h2>Name: {user.name}</h2>
        <h2>Username: {user.username}</h2>
        <h2>Age: {user.age}</h2>
        <h2>Nationality: {user.nationality}</h2>
        <h2>Friends: {user.friends ? user.friends.length : 0}</h2>
      </Link>
      <div className="flex justify-end items-end gap-2">
        <button className="hover:text-blue-700 transition-colors ease-in duration-150" onClick={() => {
          const {friends, favoriteMovies, ...data} = user
          setEditData(data)
          setIsEdit(true)
        }}>Edit</button>
        <button className="hover:text-red-700 transition-colors ease-in duration-150" onClick={() => onClickDelete(Number(user.id))}>Delete</button>
      </div>
    </article>
  )
}

export default User