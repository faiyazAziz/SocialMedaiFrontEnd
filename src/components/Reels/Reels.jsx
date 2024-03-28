import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './reels.css'; // Import CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reels = ({ short }) => {
    const [muted, setMuted] = useState(true);
    const [firstTime, setFirstTime] = useState(true);
    const navigate = useNavigate();
    const handleToggleMute = () => {
        setMuted(!muted);
    };



    const handleScrollUp = () => {
        console.log('Scrolled up');
        // Add your custom logic here
    };

    // Function to handle arrow down key press
    const handleArrowDown = async (event) => {
        if (event.key === 'ArrowDown') {
            console.log('Arrow down key pressed');
            // Add your custom logic here
            const res = await axios.get(`https://social-api-sdvi.onrender.com/account/get-random-id/`);
            if (res.status === 200) {
                console.log("res", res.data);
                navigate(`../shorts/${res.data.id}`);
            }
        }
    };

    useEffect(() => {
        const container = document.getElementById('reels');
        container.addEventListener('wheel', handleScrollUp);
        document.addEventListener('keydown', handleArrowDown);
        return () => {
            container.removeEventListener('scroll', handleScrollUp);
            document.removeEventListener('keydown', handleArrowDown);
        };
    }, []);

    return (
        <div className="reels-container" id='reels'>
            <div className="reel-container" onClick={handleToggleMute} >
                <ReactPlayer
                    url={short?.post_url}
                    className="reel-video"
                    width="100%"
                    height="90vh"
                    muted={muted}
                    playing={true}
                    loop={true}
                    controls={false}
                    onReady={() => { if (firstTime) { setMuted(false); setFirstTime(false) } }}
                />
                <div className="reel-info">
                    <div className="user-info">
                        <img src={short?.user?.profile_url} alt={short?.user?.name} className="profile-pic" />
                        <p className="user-name">{short?.user?.name}</p>
                    </div>
                    <div className="reel-details">
                        <p className="description">{short?.description}</p>
                        <p className="time">{short?.time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reels;
