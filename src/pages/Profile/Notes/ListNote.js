import { Avatar, IconButton, List, Menu, MenuItem } from "@material-ui/core";
import {
  Delete,
  Edit,
  Info,
  Lock,
  People,
  Public,
  Title,
} from "@material-ui/icons";
import { NoteCover } from "../../../assets/profile";
import React from "react";
import { When } from "../../../components";
import { Buttons } from "../../../components/Group/style";
import { HoverOver } from "../../../components/Tools";
import { DeleteDialog } from "./Dialogs";
import NoteActionPoper from "./Poper/Poper";
import { Item } from "./style";

function ListNote({
  username,
  setReadId,
  myWindow,
  anchorEl,
  isMe,
  notes,
  setEditId,
  setEditModal,
  setDeleteModal,
  editNote,
  deleteModal,
  deleteNote,
  deleting,
  setAnchorEl,
}) {
  return (
    <div>
      <List>
        {notes.map((note) => (
          <div style={{ padding: "5px" }}>
            <Item
              style={{ padding: "px", border: "1px solid #e4e4e4" }}
              key={note.id}
            >
              <Avatar variant="square" src={NoteCover} alt={note.title} />
              <Info>
                <Title
                  component="h2"
                  onClick={() => {
                    setReadId(note.id);
                    myWindow("viewNote", note.id);
                  }}
                >
                  {note.title}
                </Title>
                <p>
                  <small>
                    <When date={note.date} />
                  </small>
                </p>
              </Info>
              <NoteActionPoper
                username={username}
                note={note}
                setEditId={setEditId}
                setEditModal={setEditModal}
                isMe={isMe}
                setDeleteModal={setDeleteModal}
                editNote={editNote}
                deleteModal={deleteModal}
                deleteNote={deleteNote}
                deleting={deleting}
              />
              <Buttons>
                <HoverOver title="Privacy">
                  <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    disabled={!isMe()}
                  >
                    {note.privacy === "private" ? (
                      <Lock />
                    ) : note.privacy === "friends" ? (
                      <People />
                    ) : (
                      <Public />
                    )}
                  </IconButton>
                </HoverOver>
                {isMe() && (
                  <IconButton
                    onClick={() => {
                      // editNote();
                      setEditModal(true);
                      setEditId(note.id);
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
                {isMe() && (
                  <IconButton onClick={() => setDeleteModal(true)}>
                    <Delete />
                  </IconButton>
                )}
              </Buttons>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={origin}
                keepMounted
                transformOrigin={origin}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => editNote(note.id, { privacy: "public" })}
                >
                  Public
                </MenuItem>
                <MenuItem
                  onClick={() => editNote(note.id, { privacy: "friends" })}
                >
                  Followers
                </MenuItem>
                <MenuItem
                  onClick={() => editNote(note.id, { privacy: "private" })}
                >
                  Only me
                </MenuItem>
              </Menu>
              {/* eitar change er dorkr nai  */}
              <DeleteDialog
                open={deleteModal}
                close={() => setDeleteModal(false)}
                working={deleting}
                action={() => deleteNote(note.id)}
              />
            </Item>
          </div>
        ))}
      </List>
    </div>
  );
}

export default ListNote;
