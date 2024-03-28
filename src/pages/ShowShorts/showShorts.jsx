import React, { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./showShorts.css";
import Reels from '../../components/Reels/Reels';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowShorts = () => {
        const [short, setShort] = useState(null);
        const { id } = useParams();
        // console.log(id);
        const getSetShort = async () => {
            const res = await axios.get(`https://social-api-sdvi.onrender.com/account/get-random-short/${id}/`);
            if (res.status === 200) {
                setShort(res.data);
                // console.log(res.data);
            }
        }

        useEffect(() => {
            getSetShort();
        }, )
        return (
            <div>
                <Topbar />
                <div className='showShortsContainer' style={{display:"flex",width:"100%"}}>
                <Sidebar />
                <Reels short={short} />
                </div>
            </div>
        )
    }

export default ShowShorts

