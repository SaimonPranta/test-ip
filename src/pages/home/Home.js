import React from 'react'
import styles from './home.module.css'
import {Link} from 'react-router-dom'
export default function Home() {
    return (
        <div>
            <h1>MICPLE</h1>
            <h3>Our mission is to organize the world’s information and make it universally accessible</h3>
            <Link to="/link-short"><b>Short your link</b></Link> <br/>
            <Link to="/file-upload"><b>Upload File</b></Link> <br/>
            <Link to="/ecommerce"><b>E-Commerce</b></Link>
        </div>
    )
}
