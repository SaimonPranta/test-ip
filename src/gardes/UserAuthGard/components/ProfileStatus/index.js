import React from 'react';
import './style.scss'
import ClickToCopy from "../ClickToCopy/index";
import { FaInfoCircle } from 'react-icons/fa';

const Index = ({ user }) => {
    const { banned, approved, rejected, username } = user

    return (
        <div className='alert-main-container'>
            <div className='alert-container-1'>
                <h3>
                    {banned && 'Your profile has been banned'}
                    {rejected && 'Your application has been rejected'}
                    {!approved && !banned && !rejected && 'Your application in under review'}
                    {approved && !banned && !rejected && user?.verificationInfo?.status === 'Processing' && 'Your application in under review'}
                </h3>
                <div className='content'>
                    {!approved && !banned && !rejected && (
                        <div className='main-1'>
                            <FaInfoCircle className='icon' />
                            <div>
                                <h5>Dear {username} <ClickToCopy user={user} /></h5>
                                <p> You'll get a response within 3 business days.</p>
                            </div>
                        </div>
                    )}
                    {banned && (
                        <div className='main-2'>
                            <FaInfoCircle className='icon' />
                            <div>
                                <h5>Dear {username} <ClickToCopy user={user} /></h5>
                                <p>Please contact our support.</p>
                            </div>
                        </div>
                    )}
                    { rejected && (
                        <div className='main-3'>
                            <FaInfoCircle className='icon' />
                            <div>
                                <h5>Dear {username} <ClickToCopy user={user} /></h5>
                                <p>Please contact our support.</p>
                            </div>
                        </div>
                    )}
                     {approved && !banned && !rejected && user?.verificationInfo?.status === 'Processing' && (
                        <div className='main-1'>
                            <FaInfoCircle className='icon' />
                            <div>
                                <h5>Dear {username} <ClickToCopy user={user} /></h5>
                                <p> You'll get a response within 3 business days.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;