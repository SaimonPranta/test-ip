import React from "react";
import { IoMdAdd } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

function AddMonthButton({ MonthList }) {
  const [addEditBtn, setAddEditBtn] = React.useState(false);
  const [editIcon, setEditIcon] = React.useState(true);
  const [editIconID, setEditIconID] = React.useState(null);
  const [albInputName, setAlbInputName] = React.useState("");

  const addAlbumHandler = (e) => {
    MonthList.push(albInputName);
  };
  const saveAlbumName = () => {
    setAddEditBtn(false);
  };
  return (
    <div className="addAlb" style={{ padding: "5px" }}>
      <div
        style={{
          border: "1px solid #e4e4e4",
          padding: "8px",
          height: " 97px",
          width: " 197px",
          borderRadius: " 4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <IoMdAdd
          onClick={addAlbumHandler}
          style={{ marginLeft: "35%", fontSize: "50px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            placeholder="Create Album"
            onChange={(e) => setAlbInputName(e.target.value)}
            disabled={!addEditBtn}
            style={{
              width: "120px",
              height: "26px",
            }}
          />
          {addEditBtn ? (
            <FaSave
              onClick={saveAlbumName}
              style={{
                fontSize: "25px",
                border: "1px solid #e4e4e4",
              }}
            />
          ) : (
            <MdModeEdit
              onClick={() => setAddEditBtn(true)}
              style={{
                fontSize: "25px",
                border: "1px solid #e4e4e4",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMonthButton;
