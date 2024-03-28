import "./post.css"
import { Users }  from "../../dummyData";
import { useState } from "react";
import ReactPlayer from "react-player";

export default function Post(props) {
    const [like,setLike] = useState(props.post.like);
    const [isLiked,setIsLiked] = useState(false);

    const likeHandler=()=>{
        setLike(isLiked?like-1:like+1);
        setIsLiked(!isLiked);
    }
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={props.post.user.profile_url}
                        className="postProfileImg" />
                    <span className="postUserName">{props.post.user.name}</span>
                    <span className="postDate">{props.post.time}</span>
                </div>
                <div className="postTopRight">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className="postCenter">
                <span style={{marginBottom:'20px'}} className="postText">{props.post?.description}</span>
                {props.post.type==='image' ? (
                    <img src={props.post.post_url} className="postImg" />          
                ):(
                    <ReactPlayer url={props.post.post_url} controls />
                )}
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="png" src="/assets/like.png" onClick={likeHandler}/>
                    <img className="png" src="/assets/heart.png" onClick={likeHandler}/>
                    <span className="postLikeCounter">{props.post.likes} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{props.post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
