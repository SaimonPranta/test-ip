import React from 'react'
import { Button, Modal } from 'react-bootstrap'

import "./style.scss"

const ReviewModal = ({ show, handleClose}) => {
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                {/* <Modal.Header closeButton> */}
                <Modal.Title className='header-title'>Review Processing</Modal.Title>
                {/* </Modal.Header> */}
                <Modal.Body>
                    <div className='review-modal-main-sections'>
                        <p>Your campaign has been successfully submitted. Further action will be communicated within 24 hours through Micple notice.</p>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReviewModal
