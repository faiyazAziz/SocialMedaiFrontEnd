import { current } from "@reduxjs/toolkit"
import "./topbar.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function Topbar(){
    const {currentUser} = useSelector((state)=>state.user);
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="../">
                    <span className="logo">Lamasocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input placeholder="search for friend, post or videos" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <i class="fa-solid fa-user"></i>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <i class="fa-solid fa-message"></i>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <i class="fa-solid fa-bell"></i>
                        <span className="topbarIconBadge">5</span>
                    </div>
                </div>
                <img src={currentUser.profile_url} className="topbarImg"/>
            </div>    
        </div>
    )
}