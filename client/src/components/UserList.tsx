import {useState} from 'react';
import {Modal} from 'react-responsive-modal'
import {type UserType} from '../schema/typeData'
import User from "./User";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addUser, updateUser } from '../store/User/UserSlice';
import {toast} from 'react-toastify'

type FormData = {
  id?: number
  name?: string,
  username?: string,
  age?: number,
  nationality?: string,
}

const initForm = {name: "", username: "", age: 0, nationality: ""}

const UserList = (): React.ReactNode => {
  const [modal, setModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>(initForm)
  const [editData, setEditData] = useState<FormData>(initForm)
  const {users, loading, error} = useSelector((state: RootState) => state.root.users)
  const dispatch = useDispatch<AppDispatch>()
  
  if(loading) return <h1>DATA IS LOADING...</h1>

  if(error) console.log(error)

  const pageContent = users.length ? users?.map((user: UserType) => {
          return (
            <User user={user} key={user.id} setIsEdit={setIsEdit} setEditData={setEditData}/>
          )
        })
      :
        <h2 className='text-2xl'>Users not Found !</h2>    

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name] : (name === "age" ? Number(value) : value)
    })
  }

  const onChangeEdit = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = event.target
    setEditData({
      ...editData,
      [name] : (name === "age" ? Number(value) : value)
    })
  }

  const onSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(addUser({formData, toast}))

    setModal(false)
    setFormData(initForm)
  }

  const onSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser({editData, toast}))

    setIsEdit(false)
    setFormData(initForm)
  }

  const content = (
    <section className="user py-8 px-4">
      <h1 className="user__title text-3xl text-center mb-4 underline underline-offset-8">User List</h1>
      <button className="bg-blue-700 py-2 px-2 mb-4 rounded-sm hover:opacity-75 transition" onClick={() => setModal(true)}>
      Create User
      </button>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pageContent}
      </div>

    {isEdit && 
      <Modal open={isEdit} onClose={() => setIsEdit(false)} center>
        <form className='addUser px-4 py-6 flex flex-col gap-2' onSubmit={onSubmitUpdate}>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="text" name='name' placeholder='Name...' onChange={onChangeEdit} value={editData?.name}/>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="text" name='username' placeholder='Username...' onChange={onChangeEdit} value={editData?.username}/>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="number" name='age' placeholder='Age...' onChange={onChangeEdit} value={editData?.age}/>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="text" name='nationality' placeholder="Nationality..." onChange={onChangeEdit} value={editData?.nationality}/>
          <button type='submit' className='text-white bg-blue-700 p-2 mt-2 rounded-sm hover:opacity-75 transition'>Edit</button>
        </form>
      </Modal>
    }

    {modal &&
      <Modal open={modal} onClose={() => setModal(false)} center>
        <form className='addUser px-4 py-6 flex flex-col gap-2' onSubmit={onSubmitAdd}>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="text" name='name' placeholder='Name...' onChange={onChange} value={formData?.name}/>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="text" name='username' placeholder='Username...' onChange={onChange} value={formData?.username}/>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="number" name='age' placeholder='Age...' onChange={onChange} value={formData?.age}/>
          <input className='py-1 px-2 border-2 rounded-sm text-black' type="text" name='nationality' placeholder="Nationality..." onChange={onChange} value={formData?.nationality}/>
          <button type='submit' className='text-white bg-blue-700 p-2 mt-2 rounded-sm hover:opacity-75 transition'>Create</button>
        </form>
      </Modal>
    }
    </section>
  )

  return content
}

export default UserList