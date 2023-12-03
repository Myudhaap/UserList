import {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store"
import { getUser, selectUser } from '../store/User/UserSlice'

const UserDetail = () => {
  const {id} = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)
  
  useEffect(() => {
    dispatch(getUser(Number(id)))
  },[id])
  
  const pageFriends = user?.friends ?
      user.friends.map(friend => (
        <Link replace key={friend.id} to={`/user/${friend.id}`} className='user__list flex flex-col justify-between gap-2 text-sm bg-[rgba(255,255,255,.1)] p-2 min-h-[10rem] rounded-sm backdrop-blur-sm hover:cursor-pointer hover:bg-transparent hover:border transition ease-in-out duration-150'>
          <div>
            <span>Name: {friend.name}</span>
          </div>
          <div>
            <span>Username: {friend.username}</span>
          </div>
          <div>
            <span>Age: {friend.age}</span>
          </div>
          <div>
            <span>Nationality: {friend.nationality}</span>
          </div>
        </Link>
      ))
      :
      <h3>No Friends 🥲</h3>

  return (
    <div className='p-4'>
      <div className="section">
        <h2 className='text-2xl'>Detail User</h2>
        <hr className='bg-slate-700 h-[2px] mt-2 border-none'/>
        <div className='p-4'>
          <div className='mb-2 text-lg'>
            <span>Name: {user?.name}</span>
          </div>
          <div className='mb-2 text-lg'>
            <span>Username: {user?.username}</span>
          </div>
          <div className='mb-2 text-lg'>
            <span>Age: {user?.age}</span>
          </div>
          <div className='mb-2 text-lg'>
            <span>Nationality: {user?.nationality}</span>
          </div>
        </div>
      </div>
      <div className="section">
        <h2 className='text-2xl'>Friends</h2>
        <hr className='bg-slate-700 h-[2px] mt-2 border-none'/>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4'>
          {pageFriends}
        </div>
      </div>

    </div>
  )
}

export default UserDetail