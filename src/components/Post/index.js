import React, { Fragment, useEffect, useState } from "react";

import Reactions from "./Reactions";
import Comments from "./Comments";
import store from "../../store";
import Content from "./Content";

import {
  Post
} from "./style";
import User from "./User";


import axios from "axios";
import { BACKEND_URL, PROMOTION_URL } from "../../shared/constants/Variables";
import { userHeader } from "../../shared/functions/Token";

import PromotionModal from "./Promotion/AddPromotionModal/Promotion";
import PaymentModal from "./Promotion/PaymentModal/PaymentModal";
import ReviewModal from "./Promotion/ReviewModal/ReviewModal";
import ProcessingModal from "./Promotion/ProcessingModal/ProcessingModal";
import RejectedPromotionModal from "./Promotion/RejectPromotionModal/RejectedPromotionModal";
import ResubmitModal from "./Promotion/ResubmitModal/ResubmitModal";
import Tracker from "./Tracker/Tracker";

const Index = ({
  id,
  user,
  privacy,
  date,
  comments,
  totalComments,
  shares,
  contents,
  media,
  status,
  myreact,
  reacts,
  preview,
  reactions,
  loggedInUsername,
  promoteStatus,
  editStatus,
  promoteCount,
  total_views,
  total_clicks,
  total_engagement
}) => {
  const [active, setActive] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [location, setLocation] = useState("Bangladesh");
  const [ads, setAds] = useState();
  const [totaLBudgest, setTotaLBudgest] = useState()

  //here pstatus mean promote status 
  const [pStatus, setPStatus] = useState(promoteStatus);
  const [peditSatus, setPeditStatus] = useState(editStatus);
  const [report, setReport] = useState([]);




  //Promotion modal 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Payment modal requirement
  const [paymentModalShow, setPaymentModalShow] = useState(false);

  const handlePayemntModalClose = () => {
    setTotaLBudgest('')
    setPaymentModalShow(false);
  }
  const handlePayemntModalShow = async () => {
    await totalBudgest();
    setPaymentModalShow(true);
  }

  //Reviews Modal requirement
  const [reviewModalShow, setReviewModalShow] = useState(false);

  const handleReviewModalClose = () => setReviewModalShow(false);
  const handleReviewModalShow = () => setReviewModalShow(true);

  //Processing Modal requirements
  const [processingModalShow, setProcessingModalShow] = useState(false);

  const handleProcessingModalClose = () => setProcessingModalShow(false);
  const handleProcessingModalShow = () => setProcessingModalShow(true);

  // Rejected Modal Requirements
  const [rejectedModalShow, setRejectedModalShow] = useState(false);

  const hadleRejectedModalClose = () => setRejectedModalShow(false);
  const handleRejectedModalShow = () => {
    setRejectedModalShow(true);


    try {

      axios.get(`${PROMOTION_URL}/add/get-reports/${id}`,
        { headers: userHeader() }
      ).then(({ data }) => {
        setReport(data?.data);
      }).catch((err) => {
      })

    }
    catch (error) {
    }

  }


  // Promote Again
  const [repeat, setRepat] = useState(false);

  const handleRepeatClose = () => setRepat(false);

  const handleRepeatShow = () => {
    setRepat(true)

    axios.get(`${PROMOTION_URL}/add/get-ads/${id}`,
      { headers: userHeader() }
    ).then(({ data }) => {
      setAds(data.data[0]);
    }).catch((err) => {
    });

  };


  function isMe() {
    return store.getState().auth.user.id === user.id;
  }

  const totalBudgest = async () => {

    // here will be asynce and await 
    const { data } = await axios.get(`${PROMOTION_URL}/add/get-budgest/${id}`,
      { headers: userHeader() })

    setTotaLBudgest(data?.data?.budget);

  }



  return (

    <Post style={{ position: "relative" }} className=" fadeIn">

      <User
        content={contents[contents.length - 1]}
        edited={contents.length > 1}
        isMe={isMe}
        postId={id}
        user={user}
        date={date}
        media={media}
        status={status}
        privacy={privacy}
        editStatus={peditSatus}
        setPeditStatus={setPStatus}
        postStatus={pStatus}
      />

      <Content
        user={user}
        contents={contents}
        media={media}
        postId={id}
        preview={preview}
      />


      {/*  Here is the tracker */}
      {
        (isMe() && (pStatus === 5 || pStatus === 6 || pStatus === 13)) &&
        <Tracker
          views={total_engagement || 0}
          clicks={total_clicks || 0}
          engagement={total_engagement || 0}
        />

      }


      <Reactions
        setPromotion={setPromotion}
        setLocation={setLocation}
        promotion={promotion}
        postId={id}
        reacts={reacts}
        myreact={myreact}
        comments={totalComments}
        shares={shares}
        setActive={setActive}
        active={active}
        username={user.username}
        promoteStatus={pStatus}
        isMe={isMe}
        promoteCount={promoteCount}
        // handleShow={handleShow}
        handleShow={pStatus == 0 ? handleShow :
          pStatus == 1 ? handleReviewModalShow :
            pStatus == 3 ? handlePayemntModalShow :
              pStatus == 4 ? handleProcessingModalShow :
                pStatus == 10 ? handleRejectedModalShow :
                  pStatus == 11 ? handleRepeatShow :
                    null}
      />


      {active && (
        <Comments
          loggedInUsername={loggedInUsername}
          isMe={isMe}
          postId={id}
          comments={comments}
          totalComments={totalComments}
        />
      )}


      {/* New Promotion Modal */}

      {/* ----------------------------------------------------------------- Add For Promotoin Modal------------------------------------------------------------------------ */}
      <PromotionModal
        show={show}
        handleClose={handleClose}
        postId={id}
        media={media}
        setPStatus={setPStatus}
        setPeditStatus={setPeditStatus} />

      {/* ----------------------------------------------------------------- Review Modal------------------------------------------------------------------------ */}
      <ReviewModal show={reviewModalShow}
        handleClose={handleReviewModalClose} />

      {/* ----------------------------------------------------------------- Payment Modal------------------------------------------------------------------------ */}
      <PaymentModal
        show={paymentModalShow}
        setPStatus={setPStatus}
        handleClose={handlePayemntModalClose}
        total={totaLBudgest}
        postId={id} />

      {/* -------------------------------------------------------Processing Modal--------------------------------------------------------------------------------- */}
      <ProcessingModal
        show={processingModalShow}
        handleClose={handleProcessingModalClose} />


      {/* --------------------------------------------------------Rejected Promotion Modal---------------------------------------------------------------------------------- */}
      <RejectedPromotionModal
        show={rejectedModalShow}
        handleClose={hadleRejectedModalClose}
        report={report} />

      {/* -------------------------------------------------------Promote Again(Update Modal)  ------------------------------------------------------ */}

      <ResubmitModal
        show={repeat}
        handleClose={handleRepeatClose}
        ads={ads}
        postId={id}
        setPStatus={setPStatus}
        setPeditStatus={setPeditStatus}
      />


    </Post>

  );
};

export default Index;