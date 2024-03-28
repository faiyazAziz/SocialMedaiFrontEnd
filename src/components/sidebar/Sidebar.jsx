import "./sidebar.css"
import { Users } from "../../dummyData"
import Closefriend from "../closefriend/Closefriend"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { openSnackbar } from "../../redux/features/snackbarSlice"
import { useEffect } from "react"

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShortsClick = async () => {
        try {
            const res = await axios.get(`https://social-api-sdvi.onrender.com/account/get-random-id/`);
            if (res.status === 200) {
                console.log("res", res.data);
                navigate(`shorts/${res.data.id}`);
            }
        } catch (error) {
            console.log(error);
            dispatch(openSnackbar({
                message:"no shorts available now",
                severity:"error"
            }))
        }
    }
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <i class="fa-solid fa-rss" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-regular fa-message" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Chats</span>
                    </li>
                    <li className="sidebarListItem" onClick={handleShortsClick}>
                        <i class="fa-solid fa-circle-play" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Shorts</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-solid fa-user-group" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-solid fa-bookmark" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-regular fa-circle-question" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-solid fa-suitcase" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-regular fa-calendar-days" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <i class="fa-solid fa-graduation-cap" id="sidebarListIcon"></i>
                        <span className="sidebarListIemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <Closefriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}