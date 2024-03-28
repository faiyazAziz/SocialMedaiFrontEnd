import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"


export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="bithdayContainer">
          <img src="/assets/gift.png" className="birthdayImg" />
          <span className="birthdayText"><b>Amelia Kerr</b> and <b>3 other friends</b> have a bithday today</span>
        </div>
        <img src="/assets/ad.png" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u)=>(
            <Online key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
