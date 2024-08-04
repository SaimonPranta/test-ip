
import { useState, useEffect } from "react";
import axios, { CancelToken } from "axios";

import { BACKEND_URL } from "../../shared/constants/Variables";
import { userHeader } from "../../shared/functions/Token";

export function getProfile(username) {

  const [working, setWorking] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    setWorking(true);
    setProfile({});
    setError("");
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/${username}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setProfile(data);
        setWorking(false);
        // console.log("profile all :>> ", data);
      })
      .catch((err) => {
        if (axios.isCancel(error)) {
          return;
        } else {
          setError(err.response?.data?.message || "Something went wrong.");
          setWorking(false);
          return;
        }
      });
    return () => cancel();
  }, [error, username]);

  return { profile, working, error, setProfile };
}
export function getAbout(username) {
  const [working, setWorking] = useState(true);
  const [about, setAbout] = useState({});
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/about/${username}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setAbout(data);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
    return () => cancel();
  }, [username]);
  return { about, working, setAbout };
}

export function getAdditionalInformation(username) {
  const [additionalInformation, setAdditionalInformation] = useState({});


  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/about/aditional-information/${username}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setAdditionalInformation(data?.user);

      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }

        throw error;
      });
    return () => cancel();
  }, [username]);

  return { additionalInformation, setAdditionalInformation };
}

export function getFriends(username) {
  const [working, setWorking] = useState(true);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/friends/${username}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setFriends(data);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
    return () => cancel();
  }, [username]);
  return { friends, working, setFriends };
}
export function getFriendCounts(username) {
  const [counts, setCounts] = useState({
    friends: 0,
    requests: 0,
    blocklist: 0,
    follows: 0,
  });
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/friends/counts/${username}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data: { friends = 0, requests = 0, blocklist = 0, follows = 0 } }) => {
        setCounts({
          friends,
          requests,
          blocklist,
          follows
        });
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        throw error;
      });
    return () => cancel();
  }, [username]);
  return counts;
}
export function getFriendReq(tab) {
  const [working, setWorking] = useState(true);
  const [requests, setRequests] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/friends/requests`,
      params: { tab },
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setRequests(data.requests);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
    return () => cancel();
  }, [tab]);
  return { working, requests, counts, setRequests, setCounts };
}
export function getPeople() {
  const [working, setWorking] = useState(true);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/friends/people`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setPeople(data);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
    return () => cancel();
  }, []);
  return { working, people, setPeople };
}
export function getBlocklist() {
  const [list, setList] = useState([]);
  const [working, setWorking] = useState(true);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/friends/blocklist`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setList(data);
        setWorking(false);
      })
      .catch((error) => {
        setWorking(false);
        if (axios.isCancel(cancel)) {
          return;
        }
        throw error;
      });
    return () => cancel();
  }, []);
  return { list, setList, working };
}
export function getMedia(username, name) {

  const [working, setWorking] = useState(true);
  const [media, setMedia] = useState([]);
  const [counts, setCounts] = useState(0);

  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/media/${username}/${name}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setMedia(data.media);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });

  }, [username, name]);

  return { media, counts, working, setCounts, setMedia };
}
export function getGroups(username) {
  const [working, setWorking] = useState(true);
  const [groups, setGroups] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/groups/${username}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setGroups(data.groups);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
  }, [username]);
  return { groups, counts, working, setGroups, setCounts };
}
export function getNotes(username, sortBy) {
  const [working, setWorking] = useState(true);
  const [notes, setNotes] = useState([]);
  const [counts, setCounts] = useState(0);
  const [noteSortBy, setNoteSortBy] = useState(0);

  console.log("user ", username)


  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/notes/${username}?sortBy=${sortBy}`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setNotes(data.notes);
        setCounts(data.counts);
        setWorking(false);
        setNoteSortBy(data?.noteSortBy)
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
    // }, [username, notes]);
  }, [username, sortBy]);

  // dependency er modher notes add korle effect kaz korbe but netwrk HR ashbe
  return { notes, counts, noteSortBy, working, setNotes, setCounts };
}
export function getActivities() {
  const [working, setWorking] = useState(true);
  const [activity, setActivity] = useState([]);
  const [counts, setCounts] = useState(0);
  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: `${BACKEND_URL}/profile/activity`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setActivity(data.activities);
        setCounts(data.counts);
        setWorking(false);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setWorking(false);
        throw error;
      });
    return () => cancel();
  }, []);
  return { activity, counts, working, setActivity, setCounts };
}
export function getFriendSugGroup(search, excepts = []) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    let cancel;
    setResults([]);
    const exceptionals = excepts.map((i) => i.id);
    axios({
      method: "GET",
      url: `${BACKEND_URL}/groups/friends?search=${search}${exceptionals.length > 0 ? "&excepts=" + exceptionals.join(",") : ""
        }`,
      headers: userHeader(),
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setResults(data);
      })
      .catch((error) => {
        if (axios.isCancel(cancel)) {
          return;
        }
        setResults([]);
        throw error;
      });
    return () => cancel();

  }, [search]);
  return results;
}
