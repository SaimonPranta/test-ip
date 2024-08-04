import React from 'react'
import { Button, Modal } from 'react-bootstrap'

import "./style.scss"

const ProcessingModal = ({show, handleClose}) => {
    return (
        <div>
            <Modal
                show={show}
                onHide= {handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                <Modal.Title className='header-title'>Payment Processing</Modal.Title>

                <Modal.Body>
                    <div className='processing-modal-main-sections'>
                        <p>Your payment has been successfully submitted. Within 24 hours our team will verify your payment and notify you through an update notice.</p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ProcessingModal
