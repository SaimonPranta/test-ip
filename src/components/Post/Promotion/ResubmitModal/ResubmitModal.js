import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BACKEND_URL, PROMOTION_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';

import './style.scss';

const ResubmitModal = ({ show, handleClose, ads, postId, setPStatus, setPeditStatus }) => {


    const resubmitFuncations = () => {
        let adsStatus = {
            status: 0
        }
        let postStatus = {
            promoteStatus: 1
        }


        try {

            axios.put(`${PROMOTION_URL}/add/update-ads/${ads?._id}`, adsStatus,
                { headers: userHeader() }
            );

            axios.post(`${BACKEND_URL}/promotion-app/change-status-user/${postId}`, postStatus,
                { headers: userHeader() }
            );

            setPStatus(1);
            setPeditStatus(false);
            handleClose();

        } catch (error) {
            console.log("Error comes from update and change status users ", error);
        }

    }

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Title className='header-title'>Resubmit</Modal.Title>

                <Modal.Body>
                    <div className='promote-modal-main-sections'>

                        {/* To do .. i need to discussion with sir about promote */}
                        <div className='category-sections'>
                            <label className="category-label">
                                <strong>Category Type: </strong> <span className=''>{ads?.category}</span>
                            </label>
                        </div>

                        <div className='country-sections'>
                            <label>
                                <strong>Country: </strong>
                                <span>{ads?.country}</span>
                            </label>
                        </div>

                        {
                            ads?.country_state ?
                                <div className='state-sections'>
                                    <label>
                                        <strong>State: </strong><span>{ads?.country_state}</span>
                                    </label>
                                </div>
                                : null

                        }

                        {
                            ads?.city ?
                                <div className='city-sections'>
                                    <label>
                                        <strong>City: </strong><span>{ads?.city}</span>
                                    </label>
                                </div>
                                : null
                        }


                        <div className='gender-sections'>
                            <label>
                                <strong>Gender: </strong> <span>{ads?.gender}</span>
                            </label>
                        </div>

                        <div className='goal-sections'>
                            <label>
                                <strong>Goals:  </strong> <span>{ads?.target_people}</span>
                            </label>
                        </div>

                        <div className='budgest-sections'>
                            <label>
                                <strong>Budgest: </strong> <span>{ads?.budget} USD</span>
                            </label>
                        </div>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}> Close</Button>
                    <Button variant='primary' onClick={() => resubmitFuncations()} >ReSubmit</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ResubmitModal;
