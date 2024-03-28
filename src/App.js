import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useSelector, useDispatch } from "react-redux";
import ToastMessage from "./components/utils/ToastMessage";
import showShorts from "./pages/ShowShorts/showShorts";
import { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const {open, message, severity} = useSelector((state)=>state.snackbar)
  const getRandonId = async ()=>{
    const id = axios.get("https://social-api-sdvi.onrender.com/account/get-random-id/");
    console.log(id);
    setId(id);
  }
  useEffect(()=>{
    getRandonId();
  },[])
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login}></Route>
        <Route path="/register" Component={Register}></Route>
        <Route path="/shorts/:id" Component={showShorts} />
      </Routes>

      {open && <ToastMessage open={true} message={message} severity={severity}  />}
    </>
  )
}

export default App;
// module.exports(App);
