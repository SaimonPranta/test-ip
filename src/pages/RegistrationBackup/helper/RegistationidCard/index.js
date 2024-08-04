import React, { useEffect, useState } from 'react';
import './style.scss'
import { FaCamera, FaCircle, FaDotCircle, FaInfoCircle } from 'react-icons/fa'
import CardDiv from './CardDiv';
import { faceIdCardInformation, gestureInformation, backSideInformation, frontSideInformation } from './helper/constant';
import { auto } from '../../../../store/auth/action';

const Index = ({
    warningDetector,
    handleInputChange,
    input,
    setInput,
    currentCamera,
    setCurrentCamera,
    currentClick,
    setCurrentClick,
    faceIdCard,
    setFaceIdCard,
    warning,
    setWarning,
    user,
    activeField,
    setActiveField,
    disableProperty,
    setDisableProperty,
}) => {

    const [stream, setStream] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);

    return (
        <div className='div-main-container '>
            <div className='small-div-container '>
                {faceIdCardInformation.map((info, index) =>
                    <div key={index} className='child-div'>
                        <CardDiv
                            faceIdCard={faceIdCard}
                            setFaceIdCard={setFaceIdCard}
                            name={info.name}
                            title={info.title}
                            information={info.information}
                            stream={stream}
                            setStream={setStream}
                            warningDetector={warningDetector}
                            warning={warning}
                            setWarning={setWarning}
                            input={input}
                            user={user}
                            activeField={activeField}
                            setActiveField={setActiveField}
                            isCameraOn={isCameraOn}
                            setIsCameraOn={setIsCameraOn}
                            disableProperty={disableProperty}
                            setDisableProperty={setDisableProperty}
                            setInput={setInput}
                            handleInputChange={handleInputChange}
                        />
                    </div>)}
            </div>



            <div className='large-div-container'>

                {/* id card front side */}
                <div className='child-1'>
                    <CardDiv
                        faceIdCard={faceIdCard}
                        setFaceIdCard={setFaceIdCard}
                        name={'front'}
                        title={'National ID/SSN (Front Side)'}
                        information={frontSideInformation}
                        stream={stream}
                        setStream={setStream}
                        warningDetector={warningDetector}
                        warning={warning}
                        setWarning={setWarning}
                        input={input}
                        user={user}
                        activeField={activeField}
                        setActiveField={setActiveField}
                        isCameraOn={isCameraOn}
                        setIsCameraOn={setIsCameraOn}
                        disableProperty={disableProperty}
                        setDisableProperty={setDisableProperty}
                        setInput={setInput}
                        handleInputChange={handleInputChange}
                    />
                </div>

                {/* Hint Confirmation */}
                <div className='child-2 '>
                    <CardDiv
                        faceIdCard={faceIdCard}
                        setFaceIdCard={setFaceIdCard}
                        name={'img'}
                        title={'Hint Confirmation'}
                        information={gestureInformation}
                        stream={stream}
                        setStream={setStream}
                        warningDetector={warningDetector}
                        warning={warning}
                        setWarning={setWarning}
                        input={input}
                        user={user}
                        activeField={activeField}
                        setActiveField={setActiveField}
                        isCameraOn={isCameraOn}
                        setIsCameraOn={setIsCameraOn}
                        disableProperty={disableProperty}
                        setDisableProperty={setDisableProperty}
                        setInput={setInput}
                        handleInputChange={handleInputChange}
                    />
                </div>

                {/* id card back side */}
                <div className='child-3'>
                    <CardDiv
                        faceIdCard={faceIdCard}
                        setFaceIdCard={setFaceIdCard}
                        name={'back'}
                        title={'National ID/SSN (Back Side)'}
                        information={backSideInformation}
                        stream={stream}
                        setStream={setStream}
                        warningDetector={warningDetector}
                        warning={warning}
                        setWarning={setWarning}
                        input={input}
                        activeField={activeField}
                        setActiveField={setActiveField}
                        isCameraOn={isCameraOn}
                        user={user}
                        setIsCameraOn={setIsCameraOn}
                        disableProperty={disableProperty}
                        setDisableProperty={setDisableProperty}
                        setInput={setInput}
                        handleInputChange={handleInputChange}

                    />
                </div>
            </div>

        </div>
    );
};

export default Index;

