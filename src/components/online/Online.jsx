import React from 'react'
import "./online.css"

export default function Online(props) {
  return (
    <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
            <img src={props.user.profilePicture} className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{props.user.username}</span>
    </li>
  )
}
