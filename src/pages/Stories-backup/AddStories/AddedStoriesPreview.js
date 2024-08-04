import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { ImCross } from "react-icons/im";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";

function AddedStoriesPreview({
  responseData,
  setResponseData,
  storyList,
  storyImageId,
  value,
  setValue,
  username
}) {

  console.log("username username", username)

  const [deletedArray, setDeletedAraay] = useState(null);
  // const [responseData, setResponseData] = useState([]);
  const [responseFullData, setResponseFullData] = useState([]);

  const restOfArrayValue = storyList.filter((item) => {
    return item.numberIndex !== deletedArray;
  });

  // console.log(restOfArrayValue, "restOfArrayValue");

  const deleteHandler = (id) => {
    setValue(value - 1);
    axios
      .delete(`${BACKEND_URL}/stories/story/${id}`)
      .then(() => console.log("Delete successful"));
  };

  useEffect(() => {
    const restOfArrayValue3 = axios
      .get(`${BACKEND_URL}/stories/${storyImageId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        // console.log("story data ", res.data);

        const draftedStoryes = res.data.uploadedImage.filter(
          (singleStory) => singleStory.saved === "draft"
        );
        setResponseData(draftedStoryes);
      })
      .catch((err) => console.error(err));

    // console.log("restOfArrayValue3", restOfArrayValue3);
  }, [value]);
  useEffect(() => {}, [deleteHandler  ]);
  // }, [responseData]);

  // console.log("responseData one", responseData);

  return (
    <div style={{ display: "flex" }}>
      {responseData.map((story, index) => (
        <div  key={index} className="storyPreviewMainDiv" style={{}}>
          {/* <p>{story?.image}</p> */}
          <img
            style={{
              margin: "0px 5px",
              maxWidth: "100px",
              width: "100px",
              minWidth: "100px",
              border: "1px solid #e4e4e4",
              height: "150px",
            }}
            // alt={story?.image}
            src={
              story?.image
                ? `http://127.0.0.1:2300${story?.image}&userName=${username}`
                : `${story?.background}`
            }
          />
          <br />
          
          <div
            // className="closeBtn"
            style={{ width: "100%", textAlignLast: "center" }}
            >
            <span
              className="CrossStory "
              onClick={() => deleteHandler(story.id)}
            >
              <RiDeleteBin2Line />
            </span>
          </div>
          
        </div>
      ))}

      {/* <img alt={responseData} src={`http://127.0.0.1:2300/${responseData}`} /> */}

      {/* {responseData.length > 0 ? (
        responseData.map((story, index) => (
          <SingleStore
            data={responseData[0]}
            key={index}
            setDeletedAraay={setDeletedAraay}
            index={index}
            story={story}
          />
        ))
      ) : (
        <div style={{ padding: "10px" }}>
          <p
            style={{
              color: "transparent",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            x
          </p>

          <div
            style={{
              height: "15vh",
              width: "80px",
              margin: "1%",
              backgroundColor: "#fff",
              color: "grey",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "5px",
              display: "flex",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
            }}
          >
            {" "}
            <GrAdd />{" "}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default AddedStoriesPreview;

function SingleStore({ data, story, setDeletedAraay }) {
  const DeleteHandler = (idNo) => {
    setDeletedAraay(idNo);
  };
  useEffect(() => {}, []);
  return (
    <div style={{ padding: "10px", position: "relative" }}>
      {/* <img src={story.image.name} alt={story.image.name} /> */}
      <p
        style={{ textAlign: "center", fontSize: "20px", color: "red" }}
        onClick={() => {
          DeleteHandler(story.numberIndex);
        }}
      >
        {" "}
        x
      </p>
      <div
        onClick={() => console.log("clicked", story)}
        className="singlePreview"
        style={{
          height: "15vh",
          width: "80px",
          color: "white",
          backgroundImage: `url(${story})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "5px",
          display: "flex",
        }}
      >
        {/* <p>{story}</p> */}
      </div>
    </div>
  );
}
