import React, { useState } from 'react';
import './style.scss'
import { FaCamera, FaCircle } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';
import { el } from 'date-fns/locale';
import { HoverOver } from '../../../../Tools';
import { ImSpinner11 } from "react-icons/im";
import { RiCameraSwitchLine } from "react-icons/ri";
import axios from 'axios';
import { BACKEND_URL } from '../../../../../shared/constants/Variables';

const index = ({
    faceIdCard,
    setFaceIdCard,
    name,
    title,
    information,
    stream,
    setStream,
    warningDetector,
    warning,
    setWarning,
    input,
    user,
    activeField,
    setActiveField,
    isCameraOn,
    setIsCameraOn,
    disableProperty,
    setDisableProperty,
    setInput,
    handleInputChange
}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cameraFront, setCameraFront] = useState(false)
    const indexNumber = Object.keys(faceIdCard)?.indexOf(name)
    const prevElement = Object.keys(faceIdCard)[indexNumber - 1]
    const nextElement = Object.keys(faceIdCard)[indexNumber + 1]

    const tempImgSave = (imgFile) => {
        const formData = new FormData()
        // user?.username || input?.username 
        formData.append('data', JSON.stringify({ username: user?.username || input?.username }))
        formData.append('image', imgFile)
        axios.post(`${BACKEND_URL}/user/auth/temp/save-temp-img`, formData)
            .then(data => {

            })
            .catch(error => {
                (error)
            })
    }

    const getDisable = (name) => {
        if (disableProperty.includes(name)) {
            return 'disabled'
        }
        else {
            return ''
        }
    }


    const openDiv = async (name) => {
        if (disableProperty.find(f => f === name)) return
        if (!user?.username) {
            if (name === 'img' || name === 'back') {
                if (input?.nidNumber?.length < 4 || !input?.nidNumber) {
                    return setWarning('nidNumber')
                }
            }
        }
        if (faceIdCard[name].img) return
        await setActiveField(prev => {
            return {
                current: name,
                next: '',
            }
        })

        if (user?.verificationInfo?.status === 'Under Review') {
            setFaceIdCard(prev => {
                return {
                    ...prev,
                    [name]: {
                        ...prev[name],
                        click: true,
                    }
                }
            })
        }
        else {
            if (activeField.next === name) {
                setFaceIdCard(prev => {
                    return {
                        ...prev,
                        [name]: {
                            ...prev[name],
                            click: true,
                        }
                    }
                })
            }
        }
    }

    const openCamera = async () => {
        if (isCameraOn) return
        setActiveField({
            current: name,
            next: ''
        })
        setWarning('')
        try {
            await setFaceIdCard(prev => {
                return {
                    ...prev,
                    [name]: {
                        ...prev[name],
                        cameraOn: true
                    }
                }
            })
            await setIsCameraOn(true);
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            await setStream(videoStream);
            const videoElement = await document.getElementById('faceVideo');
            videoElement.srcObject = await videoStream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    const closeCamera = async () => {
        await stream.getTracks().forEach(track => track.stop());
        await setStream(null);
    };

    const convertAndDownload = async (url) => {
        const base64String = await url.split(',')[1]; // Extract the base64 data without the "data:image/png;base64," prefix
        const byteCharacters = await atob(base64String);
        const byteNumbers = await new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = await new Uint8Array(byteNumbers);
        const blob = await new Blob([byteArray], { type: 'image/png' });
        const file = await new File([blob], `${name}.png`, { type: 'image/png' });
        await setActiveField(prev => {
            return {
                current: name,
                next: name === 'front' ? 'back' : nextElement,
            }
        })
        await setFaceIdCard(prev => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    img: file,
                }
            }
        })
        await closeCamera();
        await tempImgSave(file)
    };

    const captureImage = () => {
        setIsCameraOn(false);
        const videoElement = document.getElementById('faceVideo');
        const canvasElement = document.createElement('canvas');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const context = canvasElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        const imageDataUrl = canvasElement.toDataURL('image/png');
        convertAndDownload(imageDataUrl);
    };

    const reOpenCamera = async () => {
        if (isCameraOn) return
        await setFaceIdCard(prev => {
            return {
                ...prev,
                [name]: {
                    ...prev[name],
                    img: null
                }
            }
        })
        await openCamera()
    }

    const switchCamera = async () => {
        try {
            if (stream) {
                // Stop the current stream
                await stream.getTracks().forEach((track) => track.stop());
                const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraFront ? 'environment' : 'user' } });
                setStream(newStream);
                const videoElement = await document.getElementById('faceVideo');
                videoElement.srcObject = await newStream;
                if (cameraFront) {
                    setCameraFront(false)
                }
                else {
                    setCameraFront(true)
                }
            }
        } catch (error) {
            console.error('Error switching camera:', error);
        }
    };

    return (
        <>
            <div
                onClick={() => openDiv(name)}
                className={`box-div ${warningDetector(name)} ${getDisable(name)}`}>
                {!faceIdCard[name].click && <FaCamera
                    className={'show-camera-icon'}>
                </FaCamera>}

                {faceIdCard[name].click && <div className='show-video-info-div'>
                    {
                        !faceIdCard[name].cameraOn
                            ? <div className='infoDiv'>
                                <div className='info'>{information.map((i, index) => <p key={index}><span>({index + 1})</span>{i}</p>)}</div>
                                <div className='btn-div'>
                                    <HoverOver title={'Click to open the camera'}>
                                        <button onClick={openCamera}>Ok</button>
                                    </HoverOver>
                                </div>
                            </div>
                            : <>
                                {faceIdCard[name].img
                                    ? <div className='img-div'>
                                        <img src={URL.createObjectURL(faceIdCard[name].img)} alt='' />
                                        <div>
                                            {user?.verificationInfo?.status === "Under Review" ?
                                                <>
                                                    {
                                                        <HoverOver title={'Capture the image again'}>
                                                            <button onClick={reOpenCamera} ><IoReload /></button>
                                                        </HoverOver>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {
                                                        activeField.current === name && <HoverOver title={'Capture the image again'}>
                                                            <button onClick={reOpenCamera} ><IoReload /></button>
                                                        </HoverOver>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                    : <div className='video-div'>
                                        <div className='camera-cng'>
                                            <HoverOver title={'Change camera'}>
                                                <button onClick={switchCamera} className='camera-cng'  ><RiCameraSwitchLine /></button>
                                            </HoverOver>
                                        </div>
                                        <video id="faceVideo" autoPlay />
                                        <div className='capture-img'>
                                            <HoverOver title={'Click to capture the image'}>
                                                <button onClick={captureImage} ><FaCamera /></button>
                                            </HoverOver>
                                        </div>
                                    </div>
                                }
                            </>
                    }
                </div>}
            </div>
            {name === 'front' &&
                <>
                    {!user?.nidNumber &&
                        <>
                            {faceIdCard[name].click &&
                                <div className='id-card-number-input-div'>
                                    <input
                                        onChange={handleInputChange}
                                        disabled={
                                            user.username
                                                ? false
                                                : faceIdCard?.img?.click || faceIdCard?.back?.click ? true : false
                                        }
                                        className={warningDetector('nidNumber')}
                                        name='nidNumber'
                                        placeholder='Enter Your National ID/SSN Number'
                                        type='text'
                                    />
                                    {/* <button>Add</button> */}
                                </div>
                            }
                        </>
                    }
                </>}
            <h3 className={`title ${getDisable(name)}`}>{title}</h3>
        </>
    );
};

export default index;