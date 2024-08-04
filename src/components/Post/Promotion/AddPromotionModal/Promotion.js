import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BACKEND_URL, PROMOTION_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';

import './style.scss';

const PromotionModal = ({ show, handleClose, postId, setPStatus, setPeditStatus, media }) => {


    const [country, setCountry] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const [countryState, setCountryState] = useState([]);

    const [city, setCity] = useState([]);



    const [activeState, setActiveSate] = useState(false);
    const [activeCity, setActiveCity] = useState(false);
    const [goals, setGoals] = useState('');

    const [pricePerGoals, setPricePerGoals] = useState('');
    const [timePerGoals, setTimePerGoals] = useState('');
    const [vat, setVat] = useState('');

    const [day, setDay] = useState(0);
    const [budgest, setBudget] = useState(0);


    const [queries, setQueries] = useState({
        category_type: '',
        country: '',
        country_state: '',
        city: '',
        gender: "all",
        age: "all",
        adTitle: '',
        adUrl: '',
        description: ''
    });

    const [requiredFiled, setRequiredFiled] = useState({
        adsUrl: false,
        adsTitle: false,
        country: false,
        description: false,
        goals: false,
        categoryType: false
    })


    const [categoryType, setCategoryType] = useState([
        { name: 'Views', value: "views" },
        { name: 'Clicks', value: "clicks" },
        { name: 'Reactions', value: "reactions" },
        { name: 'Comments', value: "comments" },
        { name: 'Shares', value: "shares" },
        { name: 'Sales', value: "sales" }
    ]);
    const [gender, setGender] = useState([
        { name: 'All', value: "ALL" },
        { name: 'Male', value: "MALE" },
        { name: 'Female', value: "FEMALE" },
        { name: 'Others', value: "OTHERS" }
    ]);
    const [age, setAge] = useState([
        { name: 'All', value: "ALL" },
        { name: '18 - 30', value: 30 },
        { name: '31 - 40', value: 40 },
        { name: '41-50', value: 50 },
        { name: '51-60', value: 60 }
    ]);

    const handleOnCheckbox = () => {
        setIsChecked(!isChecked);
    };


    const onInputChange = (e) => {

        setQueries({
            ...queries,
            [e.target.name]: e.target.value
        })

        let body = {};

        switch (e.target.name) {
            case "category_type":
                body = {
                    type: "country",
                    category_type: e.target.value
                }

                axios.post(`${PROMOTION_URL}/category-price/get-all-country-state-city`, body,
                    { headers: userHeader() }
                ).then(({ data }) => {
                    setCountry(data?.allCountriesStateCity?.country)

                }).catch((err) => {
                    console.log("something went wrong!", err);
                })
                break;

            case "country":
                body = {
                    type: "state",
                    category_type: queries.category_type,
                    country: e.target.value
                }

                axios.post(`${PROMOTION_URL}/category-price/get-all-country-state-city`, body,
                    { headers: userHeader() }
                ).then(({ data }) => {
                    const result = data?.allCountriesStateCity?.state.filter(item => item != null && item != '');
                    setCountryState(result);
                    setActiveSate(true);
                    setPricePerGoals(data?.CategoryPrice?.price_per_goals);
                    setTimePerGoals(data?.CategoryPrice?.time_per_goals);
                    setVat(data?.CategoryPrice?.vat);
                }).catch((err) => {
                    console.log("something went wrong!", err);
                })

                // code block
                break;

            case "country_state":
                body = {
                    type: "city",
                    country_state: e.target.value,
                    category_type: queries?.category_type,
                    country: queries?.country
                }

                axios.post(`${PROMOTION_URL}/category-price/get-all-country-state-city`, body,
                    { headers: userHeader() }
                ).then(({ data }) => {
                    const result = data?.allCountriesStateCity?.city.filter(item => item != null && item != '');

                    setCity(result);
                    setPricePerGoals(data?.CategoryPrice?.price_per_goals);
                    setTimePerGoals(data?.CategoryPrice?.time_per_goals);
                    setVat(data?.CategoryPrice?.vat);
                }).catch((err) => {
                    console.log("something went wrong!", err);
                })

                setActiveCity(true);
                // code block
                break;

            case "city":
                console.log("city is just selected", e.target.value);

                body = {
                    type: "cityPrice",
                    country: queries?.country,
                    country_state: queries?.country_state,
                    city: e.target.value,
                    category_type: queries?.category_type
                }
                axios.post(`${PROMOTION_URL}/category-price/get-all-country-state-city`, body,
                    { headers: userHeader() }
                ).then(({ data }) => {
                    setPricePerGoals(data?.CategoryPrice?.price_per_goals);
                    setTimePerGoals(data?.CategoryPrice?.time_per_goals);
                    setVat(data?.CategoryPrice?.vat);
                }).catch((err) => {
                    console.log("something went wrong!", err);
                })

                break;

            case "goals":
                setGoals(e.target.value);

                // budgest = e.target.value * pricePerGoals;
                // day = e.target.value * timePerGoals;
                const makeDaysFromMinuties = Math.ceil(((e.target.value * timePerGoals) / 60) / 24);
                const totalBudgest = e.target.value * pricePerGoals;
                let temp;
                if (vat) {
                    temp = vat
                } else {
                    temp = 0
                }
                const totatlVat = totalBudgest * (temp / 100);

                setBudget(totalBudgest + totatlVat);
                setDay(makeDaysFromMinuties);
                break;

            default:
            // code block
        }


    }

    const handleModalClose = () => {
        setRequiredFiled({
            adsUrl: false,
            adsTitle: false,
            country: false,
            description: false,
            goals: false,
            categoryType: false
        })
        handleClose();
        handleOnCheckbox();
    }


    // add submissions to promotions
    const addsSubmission = () => {

        let mediaCategory;
        // if checke category of media
        if (media.length) {
            mediaCategory = media[0]?.types
        } else {
            mediaCategory = "text"
        }

        //Ads body 
        const body = {
            category: mediaCategory,
            add_type: queries?.category_type,
            country: queries?.country,
            country_state: queries?.country_state,
            city: queries?.city.trim(),
            age: queries?.age.trim(),
            gender: queries?.gender,
            postId: postId,
            target_people: goals,
            adUrl: queries.adUrl,
            adTitle: queries.adTitle.trim(),
            description: queries.description.trim()
        }

        const statusBody = {
            "promoteStatus": 1
        }

        //when url only supported link "Good morning".startsWith("Good"); // true



        // add_type equal to category type
        if (body.adTitle === '' && body.adUrl === '' && body.description === ''
            && body.country === '' && body.target_people === '' && body.add_type === '') {
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                description: true,
                goals: true,
                categoryType: true
            });
        } else if (body.adTitle === '' && body.adUrl === '' && body.description === ''
            && body.country === '' && body.target_people === '') {

            //left only add_type
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                description: true,
                goals: true
            });
        } else if (body.adTitle === '' && body.adUrl === '' && body.description === ''
            && body.country === '' && body.add_type === '') {

            //left only golas/target_people
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                description: true,
                categoryType: true
            });
        } else if (body.adTitle === '' && body.adUrl === '' && body.description === ''
            && body.target_people === '' && body.add_type === '') {

            //left only country
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                description: true,
                goals: true,
                categoryType: true
            });
        } else if (body.adTitle === '' && body.adUrl === '' && body.country === ''
            && body.target_people === '' && body.add_type === '') {

            //left only description 
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                goals: true,
                categoryType: true
            });

        } else if (body.adTitle === '' && body.description === '' && body.country === ''
            && body.target_people === '' && body.add_type === '') {

            //left only ads url
            setRequiredFiled({
                adsTitle: true,
                country: true,
                description: true,
                goals: true,
                categoryType: true
            });
        } else if (body.adUrl === '' && body.description === ''
            && body.country === '' && body.target_people === '' && body.add_type === '') {

            //left only ad title
            setRequiredFiled({
                adsUrl: true,
                country: true,
                description: true,
                goals: true,
                categoryType: true
            });

        } else if (body.adTitle === '' && body.adUrl === '' && body.description === ''
            && body.country === '') {

            //left two items(goals, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                description: true
            });
        } else if (body.adTitle === '' && body.adUrl === '' && body.description === ''
            && body.target_people === '') {

            //left two items (country, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                description: true,
                goals: true
            });

        } else if (body.adTitle === '' && body.adUrl === ''
            && body.country === '' && body.target_people === '') {

            //left two items (description, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                goals: true,
            });
        } else if (body.adTitle === '' && body.description === ''
            && body.country === '' && body.target_people === '') {

            //left two items (url , category_type)
            setRequiredFiled({
                adsTitle: true,
                country: true,
                description: true,
                goals: true
            });

        } else if (body.adUrl === '' && body.description === ''
            && body.country === '' && body.target_people === '') {

            //left two items (title, category_type)
            setRequiredFiled({
                adsUrl: true,
                country: true,
                description: true,
                goals: true
            })
        } else if (body.adTitle === '' && body.adUrl === ''
            && body.country === '' && body.add_type === '') {

            //left two items (description, goals)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
                categoryType: true
            })
        } else if (body.adTitle === '' && body.adUrl === ''
            && body.description === '' && body.add_type === '') {

            //left two items (country, goals)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                description: true,
                categoryType: true
            })

        } else if (body.adTitle === '' && body.description === ''
            && body.country === '' && body.add_type === '') {

            //left two items (url , goals)
            setRequiredFiled({
                adsTitle: true,
                country: true,
                description: true,
                categoryType: true
            })

        } else if (body.adUrl === '' && body.description === ''
            && body.country === '' && body.add_type === '') {

            //left two items (title, goals)
            setRequiredFiled({
                adsUrl: true,
                country: true,
                description: true,
                categoryType: true
            })
        } else if (body.adTitle === '' && body.adUrl === ''
            && body.target_people === '' && body.add_type === '') {

            // left two items (description, country )
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                goals: true,
                categoryType: true
            })
        } else if (body.adTitle === '' && body.description === ''
            && body.target_people === '' && body.add_type === '') {

            //left two items (adurl , country)
            setRequiredFiled({
                adsTitle: true,
                description: true,
                goals: true,
                categoryType: true
            })

        } else if (body.adUrl === '' && body.description === ''
            && body.target_people === '' && body.add_type === '') {

            // left two items (title, country)
            setRequiredFiled({
                adsUrl: true,
                description: true,
                goals: true,
                categoryType: true
            })
        } else if (body.adTitle === '' && body.country === ''
            && body.target_people === '' && body.add_type === '') {

            //left two items ( url, description)
            setRequiredFiled({
                adsTitle: true,
                country: true,
                goals: true,
                categoryType: true
            })

        } else if (body.adUrl === '' && body.country === ''
            && body.target_people === '' && body.add_type === '') {

            //left two items ( title, description)
            setRequiredFiled({
                adsUrl: true,
                country: true,
                goals: true,
                categoryType: true
            })

        } else if (body.description === '' && body.country === ''
            && body.target_people === '' && body.add_type === '') {

            //left two items ( title ,url)
            setRequiredFiled({
                country: true,
                description: true,
                goals: true,
                categoryType: true
            });
        } else if (body.adTitle === '' && body.adUrl === '' && body.description === '') {

            // left three items ( country, goals, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                description: true,
            });

        } else if (body.adTitle === '' && body.adUrl === '' && body.country === '') {

            //left three items (  description, goals, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                country: true,
            });

        } else if (body.adTitle === '' && body.description === '' && body.country === '') {

            //left three items( url ,goals,category_type) 
            setRequiredFiled({
                adsTitle: true,
                country: true,
                description: true
            });

        } else if (body.adUrl === '' && body.description === '' && body.country === '') {

            // left three items (  title, goals, categroy_type)
            setRequiredFiled({
                adsUrl: true,
                country: true,
                description: true
            });

        } else if (body.adTitle === '' && body.adUrl === '' && body.target_people === '') {

            // left three items (  description, country, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                goals: true,
            });

        } else if (body.adUrl === '' && body.description === '' && body.target_people === '') {

            //left three items (   title , country ,category_type)
            setRequiredFiled({
                adsUrl: true,
                description: true,
                goals: true,
            });

        } else if (body.adTitle === '' && body.description === '' && body.target_people === '') {

            //left three items (   url, country ,category_type)
            setRequiredFiled({
                adsTitle: true,
                description: true,
                goals: true,
            });

        } else if (body.adTitle === '' && body.country === '' && body.target_people === '') {
            //left three items (  url, descripton ,category_type)
            setRequiredFiled({
                adsTitle: true,
                country: true,
                goals: true,
            });
        } else if (body.adUrl === '' && body.country === '' && body.target_people === '') {
            //left three items (  title, descripton ,category_type)
            setRequiredFiled({
                adsUrl: true,
                country: true,
                goals: true,
            });
        } else if (body.description === '' && body.country === '' && body.target_people === '') {

            // left three items ( url,  title,  category_type)
            setRequiredFiled({
                country: true,
                description: true,
                goals: true,
            });

        } else if (body.adUrl === '' && body.country === '' && body.add_type === '') {

            // left three items ( country,  url,  category_type)
            setRequiredFiled({
                adsUrl: true,
                country: true,
                categoryType: true,
            });

        } else if (body.adTitle === '' && body.adUrl === '' && body.add_type === '') {

            //left three items (  descripton, country, goals)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true,
                categoryType: true
            });
        } else if (body.adTitle === '' && body.description === '' && body.add_type === '') {

            //left three items ( url, country, goals)
            setRequiredFiled({
                adsTitle: true,
                description: true,
                categoryType: true
            });

        } else if (body.adUrl === '' && body.description === '' && body.add_type === '') {

            //left three items ( title, country, goals)   
            setRequiredFiled({
                adsUrl: true,
                description: true,
                categoryType: true
            });

        } else if (body.adTitle === '' && body.target_people === '' && body.add_type === '') {

            //left three items ( url, description, country)
            setRequiredFiled({
                adsTitle: true,
                goals: true,
                categoryType: true
            });
        } else if (body.adUrl === '' && body.target_people === '' && body.add_type === '') {

            //left three items ( title, description, country)
            setRequiredFiled({
                adsUrl: true,
                goals: true,
                categoryType: true
            });
        } else if (body.country === '' && body.target_people === '' && body.add_type === '') {

            // left three items (url, title, descripton)
            setRequiredFiled({
                country: true,
                goals: true,
                categoryType: true
            });
        } else if (body.adTitle === '' && body.adUrl === '') {

            //left four items ( description, country, goals, category_type)
            setRequiredFiled({
                adsUrl: true,
                adsTitle: true
            });

        } else if (body.adTitle === '' && body.description === '') {

            //left four items (  url, country, goals, category_type)
            setRequiredFiled({
                adsTitle: true,
                description: true,
            });
        } else if (body.adTitle === '' && body.country === '') {

            //left  four items ( url, description, country, goals)
            setRequiredFiled({
                adsTitle: true,
                country: true,
            });

        } else if (body.adTitle === '' && body.target_people === '') {

            //left  four items ( url, description, country, goals)
            setRequiredFiled({
                adsTitle: true,
                goals: true
            });

        } else if (body.adTitle === '' && body.add_type === '') {

            //left  four items ( url, description, country, goals)
            setRequiredFiled({
                adsTitle: true,
                categoryType: true
            });

        } else if (body.adUrl === '' && body.description === '') {

            //left  four items (title, country, goals, category_type)
            setRequiredFiled({
                adsUrl: true,
                description: true,
            });

        } else if (body.adUrl === '' && body.country === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                adsUrl: true,
                country: true
            });

        } else if (body.adUrl === '' && body.target_people === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                adsUrl: true,
                goals: true
            });

        } else if (body.adUrl === '' && body.add_type === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                adsUrl: true,
                categoryType: true
            });

        } else if (body.description === '' && body.country === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                country: true,
                description: true,
            });

        } else if (body.description === '' && body.target_people === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                goals: true,
                description: true,
            });

        } else if (body.description === '' && body.add_type === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                description: true,
                categoryType: true
            });

        } else if (body.country === '' && body.target_people === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                country: true,
                goals: true
            });

        } else if (body.country === '' && body.add_type === '') {

            //left four items ( title, description, country, goals)
            setRequiredFiled({
                country: true,
                categoryType: true
            });

        } else if (body.target_people === '' && body.add_type === '') {

            // left four items ( title, url, description, country)
            setRequiredFiled({
                goals: true,
                categoryType: true
            });
        } else if (body.adTitle === '') {

            // left five items ( url, descripton, country, goals, category_type)
            setRequiredFiled({
                adsTitle: true
            });
        } else if (body.adUrl === '') {
            //left five items (title, descripton, country, goals, category_type)
            setRequiredFiled({
                adsUrl: true
            });
        } else if (body.description === '') {
            //left five items (  title, url, descripton, country, goals,)
            setRequiredFiled({
                description: true
            });
        } else if (body.country === '') {
            //left five items (  title, url, descripton, country, goals,)
            setRequiredFiled({
                country: true
            });
        } else if (body.target_people === '') {
            //left five items (  title, url, descripton, country, goals,)
            setRequiredFiled({
                goals: true
            });
        } else if (body.add_type === '') {
            setRequiredFiled({
                categoryType: true
            });
        } else {

            axios.post(`${PROMOTION_URL}/add/add-promotions`, body,
                { headers: userHeader() }
            ).then(({ data }) => {
                axios.post(`${BACKEND_URL}/promotion-app/change-status-user/${postId}`, statusBody,
                    { headers: userHeader() }
                ).then(({ data }) => {


                    setPStatus(data?.updatedDoc?.promoteStatus);
                    setPeditStatus(data?.updatedDoc?.editStatus);
                    //modal close
                    handleClose();

                }).catch((err) => {
                    console.log("something went wrong!", err);
                })


            }).catch((err) => {
                console.log("something went wrong!", err);
            })

        }


    }


    return (
        <div className='adds-modal -sections'>
            <Modal
                show={show}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={true}
                centered
            >

                {/* <Modal.Header closeButton> */}
                <Modal.Title className='header-title'>What's your campaign objective?</Modal.Title>
                {/* </Modal.Header> */}
                <Modal.Body>

                    <div className="add-modal-main-section">

                        <div className='title-sections'>
                            <label className="state-label">Title</label>
                            <input
                                name="adTitle"
                                type="text"
                                className={requiredFiled.adsTitle ? "title-input-field" : ''}
                                value={queries.adTitle}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='ads-url-sections'>
                            <label className="state-label">URL</label>
                            <input
                                name="adUrl"
                                type="text"
                                className={requiredFiled.adsUrl ? "url-input-field" : ''}
                                value={queries.adUrl}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='description-sections'>
                            <label className='state-label'>Description</label>

                            <textarea
                                className={requiredFiled.description ? "description-input-field" : ''}
                                id="message"
                                name="description"
                                value={queries.description}
                                onChange={onInputChange}
                            />
                        </div>


                        {/* here, traffic type in backend ads_type */}
                        <div className='category-sections'>
                            <label className="category-label" >Traffic Type</label>


                            <select onChange={onInputChange} name='category_type' className={requiredFiled.categoryType ? 'catgory-type-input' : ''} required>

                                <option >Select Type</option> : null

                                {categoryType?.map((categoryType, index) =>
                                    <option value={categoryType.value} key={index}>{categoryType.name}</option>
                                )}

                            </select>
                        </div>

                        <div className='country-sections'>
                            <label className="country-label">Country</label>

                            <select onChange={onInputChange} name='country' className={requiredFiled.country ? 'country-input-fields' : ''} required>
                                <option>Select Country</option>
                                {country?.map((country, index) =>
                                    <option value={country} key={index}>{country}</option>
                                )}

                            </select>
                        </div>
                        {
                            activeState ?
                                <div className='state-sections'>
                                    <label className="state-label">State (Optional)</label>
                                    <select onChange={onInputChange} name="country_state" required>
                                        <option>Select State</option>
                                        {countryState?.map((countryState, index) =>
                                            <option value={countryState} key={index}>{countryState}</option>
                                        )}
                                    </select>
                                </div> : ''
                        }

                        {
                            activeCity ?
                                <div className='city-sections'>
                                    <label className="state-label">City (Optional)</label>
                                    <select onChange={onInputChange} name="city" required>
                                        <option>Select City</option>
                                        {city?.map((city, index) =>
                                            <option value={city} key={index}>{city}</option>
                                        )}
                                    </select>
                                </div> : ''
                        }



                        <div className='goals-sections'>
                            <label className="state-label">Goals</label>
                            <input
                                name="goals"
                                type="number"
                                className={requiredFiled?.goals ? "goals-input-field" : ''}
                                value={goals}
                                // onChange={(e) => {
                                //     setGoals(e.target.value)
                                // }}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className='gender-sections'>
                            <label className="state-label">Gender</label>
                            <select onChange={onInputChange} name="gender">
                                {/* <option>Select Gender</option> */}
                                {gender?.map((gender, index) =>
                                    <option value={gender.value} key={index}>{gender.name}</option>
                                )}
                            </select>
                        </div>

                        <div className='age-sections'>
                            <label className="state-label">Age</label>
                            <select onChange={onInputChange} name="age">
                                {/* <option>Select Age</option> */}
                                {age?.map((age, index) =>
                                    <option value={age.value} key={index}>{age.name}</option>
                                )}
                            </select>
                        </div>

                        <div className='time-per-goals-sections'>
                            <label className="state-label">Days</label>
                            <input readOnly
                                // maxLength="66"
                                type="number"
                                className="time-per-goals-input-field"
                                value={day}
                            />
                        </div>

                        <div className='budget-per-goals-sections'>

                            <label className="state-label">Budget (inc Vat)</label>
                            <input readOnly
                                type="number"
                                className="time-per-goals-input-field"
                                value={budgest}
                            />
                            <div className='usd-symbol'>USD</div>
                            <div className='dolar-symbol'>$</div>

                        </div>

                        <div className='privacy-sections'>
                            <input
                                type="checkbox"
                                id='privacy'
                                checked={isChecked}
                                onChange={handleOnCheckbox}
                            /> <label htmlFor="privacy">By checking this box, I confirm that I have read, understand and agree to the <Link target='_blank' to='/privacy'>Terms of Agreement</Link> and Privacy Policy.</label>
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer className='footer-section'>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button onClick={addsSubmission}
                        disabled={isChecked ? false : true}
                        className='submit-btn'
                        variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default PromotionModal
