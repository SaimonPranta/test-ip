import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import './style.scss'

const Index = ({ user }) => {

    const [copied, setCopied] = useState(false)


    const clickCopy = () => {
        navigator.clipboard.writeText(user.username)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }


    return (
        <span className='copied-div'>
            {copied && <p className='copied'>Copied</p>}

            <FiCopy
                onClick={clickCopy}
                className='copiedButton'
            />
        </span>
    );
};

export default Index;