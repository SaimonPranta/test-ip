import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import "./style.scss"
import { BACKEND_URL } from '../../constants/Variables';
import { userHeader } from '../../../shared/functions/Token'
import axios from 'axios'
import { getUrl } from "../../../shared/functions"
// const adsList = [
//     {
//         img: "https://backend.www.micple.com/web/media/campaign/1831671697603898592.jpeg",
//         title: "sf sdf asdf saf sdf sssssssssdfsda sdf sdaf as",
//         dec: "sdfsdf sadf sadf asdf sdf34wr5fsa fasf wae4rfsac asdf sdf sdf sdaf sadf sadf ",
//     },
//     {
//         img: "https://backend.www.micple.com/web/media/campaign/1831671697603898592.jpeg",
//         title: "sf sdf asdf saf sdf sssssssssdfsda sdf sdaf as",
//         dec: "sdfsdf sadf sadf asdf sdf34wr5fsa fasf wae4rfsac asdf sdf sdf sdaf sadf sadf ",
//     },
//     {
//         img: "https://backend.www.micple.com/web/media/campaign/1831671697603898592.jpeg",
//         title: "sf sdf asdf saf sdf sssssssssdfsda sdf sdaf as",
//         dec: "sdfsdf sadf sadf asdf sdf34wr5fsa fasf wae4rfsac asdf sdf sdf sdaf sadf sadf ",
//     },
//     {
//         img: "https://backend.www.micple.com/web/media/campaign/1831671697603898592.jpeg",
//         title: "sf sdf asdf saf sdf sssssssssdfsda sdf sdaf as",
//         dec: "sdfsdf sadf sadf asdf sdf34wr5fsa fasf wae4rfsac asdf sdf sdf sdaf sadf sadf ",
//     },
//     {
//         img: "https://backend.www.micple.com/web/media/campaign/1831671697603898592.jpeg",
//         title: "sf sdf asdf saf sdf sssssssssdfsda sdf sdaf as",
//         dec: "sdfsdf sadf sadf asdf sdf34wr5fsa fasf wae4rfsac asdf sdf sdf sdaf sadf sadf ",
//     },
// ]

const Index = () => {
    const [adsList, setAdsList] = useState([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/ads/sidenav-ads`, { headers: userHeader() })
            .then(({data}) => {
                console.log("data ===========>>>>", data)
                if(data.data){
                    setAdsList(data.data)
                }
            })
    }, [])

    return (
        <div className='side-ads-section'>
            <div className='inner-section'>
                <div className='ads-list'>
                    {
                        [...adsList].map((ads, index) => { 
                            return <Link key={index} to="/" className='ads-cart'>
                                <div className='img-container'>
                                    <img src={getUrl(ads.mediaUrl, ads?.user?.username)} />
                                </div>
                                <div className='description-container'>
                                    <h6>{ads.title}</h6>
                                </div>
                                <div className='sponsored'>
                                    <p>Sponsored</p>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Index;