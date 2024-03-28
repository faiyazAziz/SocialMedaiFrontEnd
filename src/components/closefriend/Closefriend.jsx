import React from 'react'
import "./closefriend.css"

export default function Closefriend(props) {
  return (
    <li className="sidebarFriend">
        <img src={props.user.profilePicture} className="sidebarFriendImg" />
        <span className="sidebarFrienName">{props.user.username}</span>
    </li>          
  )
}
