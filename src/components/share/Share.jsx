import { useState } from "react"
import "./share.css"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from '../../firebase';

import { useDispatch, useSelector } from "react-redux";
import UploadModal from "../UploadModal";
import axios from "axios";
import { openSnackbar } from "../../redux/features/snackbarSlice";


export default function Share() {
  const [openPopup, setOpenPopup] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const [postType, setPostType] = useState("image");
  const dispatch = useDispatch();

  const uploadFile = async (e) => {
    const storage = getStorage(app);
    console.log("yaha");
    const file = e.target.files[0];
    // setTimeout(() => {
    //   setFile(e.target.files[0]);
    // }, 1000)
    setFile(file ? true : false);

    console.log(file);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPostUrl(downloadURL)
          // console.log(postUrl);
        });
      }
    );
  }

  const handleUploadPost = async (e) => {
    e.preventDefault();
    console.log(desc);
    if (postUrl === "") {
      dispatch(openSnackbar({
        message: "try again",
        severity: "error"
      }))
      return;
    }
    let formData = new FormData();
    formData.append("description", desc);
    formData.append("post_url", postUrl);
    formData.append("type", postType);

    try {
      const res = await axios.post(`https://social-api-sdvi.onrender.com/account/add-post/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('socialmediatoken')}`,
          'Accept': '*/*'
        }
      })

      if (res.status === 200) {
        console.log(res.data);
        dispatch(openSnackbar({
          message: "Post Uploaded Successfully",
          severity: "success"
        }))
        setOpenPopup(false)
      }
    } catch (error) {

    }
    window.location.reload();
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={currentUser.profile_url} className="shareProfileImg" />
          <input placeholder={`What's in your mind, ${currentUser.name}?`} className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">

              <i className="fa-solid fa-images" style={{ color: "tomato" }} id="shareIcon"></i>
              <span className="shareOptionText" onClick={() => {
                setOpenPopup(true);
                setProgresspercent(0);
                // setFile(null);
              }}>
                photos& videos
              </span>
            </div>
            <div className="shareOption">
              <i className="fa-solid fa-tag" style={{ color: "blue" }} id="shareIcon"></i>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <i className="fa-solid fa-location-dot" style={{ color: "green" }} id="shareIcon"></i>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <i className="fa-solid fa-face-laugh" style={{ color: "goldenrod" }} id="shareIcon"></i>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
      <UploadModal openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <div>

          <form onSubmit={handleUploadPost}>
            <div>
              <label>Description:</label>
              <input
                type="text"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div>
              <select id="type" name="type" onChange={(e) => setPostType(e.target.value)}>
                <option value='image'>Image</option>
                <option value='video'>Video</option>
                <option value='shorts'>Shorts</option>
              </select>
            </div>
            <div>
              <label>Upload File:</label>
              <input type="file" onChange={uploadFile} />
            </div>
            {
              file && (
                <div className="progress-bg" style={{ height: "3px", backgroundColor: "gray", margin: "5px" }}>
                  <div className="progress" style={{ width: `${progresspercent}%`, backgroundColor: "#1877f2", height: "2.8px" }} />
                </div>
              )
            }


            <button type="submit">Upload</button>
          </form>
        </div>

      </UploadModal>
    </div>
  )
}
