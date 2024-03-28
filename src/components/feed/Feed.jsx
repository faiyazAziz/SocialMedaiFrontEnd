import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import {Posts} from "../../dummyData.js"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { openSnackbar } from "../../redux/features/snackbarSlice.jsx"

export default function Feed() {
  const [posts,setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    getPosts();
  },[])

  const getPosts = async()=>{
    try {
      const response = await axios.get(`https://social-api-sdvi.onrender.com/account/posts/`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('socialmediatoken')}`
        }
      })
      if(response.status==200){
        console.log(response.data)
        setPosts(response.data)
      }
    } catch (error) {
      console.log(error)
      dispatch(openSnackbar({
        message: error.message,
        severity: "error"
      }))
    }
  }
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {posts.map((p)=>(
            <Post key={p.id} post={p}/>
        ))} 
      </div>
    </div>
  )
}
