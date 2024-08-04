import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


//payment method images
import { PayoneerLogo, AdvcashLogo, Copy } from '../../../../assets/payment';
import { BACKEND_URL, PROMOTION_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { HoverOver } from '../../../Tools';

import "./style.scss";

const PaymentModal = ({ show, handleClose, postId, setPStatus, total }) => {

    const [paymentType, setPaymentType] = useState([
        { name: "Payoneer", value: "payoneer", thumb: PayoneerLogo },
        { name: "Advcash", value: "advcash", thumb: AdvcashLogo },
        { name: "Perfect Money", value: "perfect_money", thumb: AdvcashLogo },
        { name: "Payeer", value: "payer", thumb: AdvcashLogo },
    ]);

    const [imageAnimated, setImageAnimated] = useState(false);

    const [receiverValue, setReceiverValue] = useState('');

    const [queries, setQueries] = useState({
        payment_type: '',
        transcation_id: '',
        notes: ''
    });

    const onInputChange = (e) => {

        setQueries({
            ...queries,
            [e.target.name]: e.target.value
        })

        if (e.target.value == "payoneer") {
            setReceiverValue("Payment@micple.com");
        } else if (e.target.value == "advcash") {
            setReceiverValue("U291787780376");
        } else if (e.target.value == "perfect_money") {
            setReceiverValue("U38368011");
        } else if (e.target.value == "payer") {
            setReceiverValue("P1070034590");
        }


    }


    // Payment Submit by users
    const paymentSubmit = async () => {

        let body = {
            postId: postId,
            card_type: queries.payment_type,
            transcation_id: queries.transcation_id,
            notes: queries.notes
        }

        let statusbody = {
            // here protesatus 4 mean Ads in procesing moode
            promoteStatus: 4
        }


        try {

            await axios.post(`${PROMOTION_URL}/payment/payment-for-adds`, body,
                { headers: userHeader() }
            )


            await axios.post(`${BACKEND_URL}/promotion-app/change-status-user/${postId}`, statusbody,
                { headers: userHeader() }
            )

            //modal is closed here
            handleClose();

            //changing the status for rendening 
            setPStatus(4);


        } catch (error) {
            console.log("Error comes from try catch", error);
        }


    }
 
    return (
        <div className='payment-modal-sections'>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={true}
                centered
            >
                {/* <Modal.Header closeButton> */}
                <Modal.Title className='header-title'>Make Ready Payment</Modal.Title>
                {/* </Modal.Header> */}
                <Modal.Body>
                    <div className="payment-modal-main-section">

                        <div className='total-budget'>
                            <label className='total-budgest-label'>Total Budget</label>
                             {/* <span>${total}</span> */}
                            <input readOnly defaultValue={total}/>

                            <div className='usd-symbol'>USD</div>
                            <div className='dolar-symbol'>$</div>
                        </div>

                        <div className='Payment-method-sections'>
                            <label className="category-label">Payment Type</label>

                            <select onChange={onInputChange} name='payment_type'>
                                <option>Select Payment Method</option>
                                {paymentType?.map((paymentType, index) =>

                                    <option value={paymentType.value} key={index}>
                                        {/* <img src={paymentType.thumb} alt={paymentType.name}/> */}
                                        {paymentType.name}
                                    </option>
                                )}

                            </select>
                        </div>

                        <div className='payment-method-sections'>
                            <label className="state-label">Receiver Number</label>
                            <span>
                                <input readOnly
                                    type="text"
                                    className="time-per-goals-input-field"
                                    defaultValue={receiverValue}
                                />

                                <HoverOver title={imageAnimated ? "copied" : "copy"}>
                                    <img className={imageAnimated ? 'animated-img' : null}
                                        onClick={() => {
                                            setImageAnimated(true);
                                            navigator.clipboard.writeText(receiverValue);
                                        }}
                                        src={Copy} alt="copied-image" />
                                </HoverOver>

                            </span>
                        </div>
                        <span className='purpose-of-ads'>Must be use this purpose "Micple Ads Payment" </span>

                        <div className='transaction-sections'>
                            <label className="state-label">Transaction ID</label>
                            <textarea
                                name="transcation_id"
                                type="number"
                                onChange={onInputChange}
                                className="city-input-field"
                            />
                        </div>

                        <div className='notes-sections'>
                            <label className="state-label">Notes</label>
                            <textarea
                                name="notes"
                                type="text"
                                className="city-input-field"
                                onChange={onInputChange}
                            />
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={addsSubmission} variant="primary">Submit</Button> */}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={paymentSubmit} variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default PaymentModal
