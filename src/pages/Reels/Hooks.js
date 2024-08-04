import axios, { CancelToken } from "axios";
import { useEffect, useState } from "react";
import { userHeader } from "../../shared/functions/Token";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { set } from "date-fns";

export function getReels(render, setRender) {
  const [working, setWorking] = useState(true);
  const [reels, setReels] = useState([]);
  // const [error, setError] = useState("");
  useEffect(() => {
    setWorking(true);
    setReels({});
    //   setError("");
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/reel/get-reels`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setReels(data);
        setWorking(false);
      })
      .catch((err) => {
        //   if (axios.isCancel(error)) {
        //     return;
        //   } else {
        //     setError(err.response?.data?.message || "Something went wrong.");
        //     setWorking(false);
        //     return;
        //   }

        console.log(err);
      });
    return () => cancel();
  }, [render]);

  return { reels, working, setReels };
}

export function getReelReactions(id, completeReelReaction, index, type) {
  const [working, setWorking] = useState(true);
  const [reelReaction, setReelReaction] = useState([]);
  // const [error, setError] = useState("");
  useEffect(() => {
    setWorking(true);
    setReelReaction({});
    //   setError("");
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/reel/get-reel-reactions/${id}?type=${type}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setReelReaction(data);
        setWorking(false);
      })
      .catch((err) => {
        //   if (axios.isCancel(error)) {
        //     return;
        //   } else {
        //     setError(err.response?.data?.message || "Something went wrong.");
        //     setWorking(false);
        //     return;
        //   }

        console.log(err);
      });
    return () => cancel();
  }, [completeReelReaction, id, index]);

  return { reelReaction, working, setReelReaction };
}

export function getReelComments(id, render) {
  const [working, setWorking] = useState(true);
  const [reelComment, setReelComment] = useState([]);
  // const [error, setError] = useState("");
  useEffect(() => {
    setWorking(true);
    setReelComment({});
    //   setError("");
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/reel/get-reel-comments/${id}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setReelComment(data);
        setWorking(false);
      })
      .catch((err) => {
        //   if (axios.isCancel(error)) {
        //     return;
        //   } else {
        //     setError(err.response?.data?.message || "Something went wrong.");
        //     setWorking(false);
        //     return;
        //   }

        console.log(err);
      });
    return () => cancel();
  }, [id, render]);

  return { reelComment, working, setReelComment };
}

export function getCommentReactions(reelId, commentId, index) {
  const [working, setWorking] = useState(true);
  const [CommentReaction, setCommentReaction] = useState([]);
  // const [error, setError] = useState("");
  useEffect(() => {
    setWorking(true);
    setCommentReaction({});
    //   setError("");
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/reel/get-comment-reactions?reelId=${reelId}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setCommentReaction(data);
        setWorking(false);
      })
      .catch((err) => {
        //   if (axios.isCancel(error)) {
        //     return;
        //   } else {
        //     setError(err.response?.data?.message || "Something went wrong.");
        //     setWorking(false);
        //     return;
        //   }
        console.log(err);
      });
    return () => cancel();
  }, [reelId, index, commentId]);

  return { CommentReaction, working, setCommentReaction };
}
