import { useDispatch } from "react-redux"
import { getAllUsers } from "./store/User/UserSlice"
import { AppDispatch } from "./store/store"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import UserDetail from "./pages/UserDetail"
import Layout from "./components/Layout";

function App() {
  const dispatch = useDispatch <AppDispatch>()
  useEffect(() => {
    dispatch(getAllUsers());
  }, [])
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick theme="dark"/>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/user">
              <Route path=":id" element={<UserDetail/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
