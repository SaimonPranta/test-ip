import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PROMOTION_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';

const RejectedPromotionModal = ({ show, handleClose, report }) => {




  return (
    <div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
      >
        <Modal.Title className='header-title'>Rejection Modal</Modal.Title>

        <Modal.Body>
          <div className='rejection-modal-main-sections'>
            <h6>{report[0]?.report} </h6>            
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default RejectedPromotionModal
