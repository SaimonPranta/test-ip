import {
  LOCKER_ALL_FILES,
  LOCKER_ADD_FILES,
  LOCKER_MULTIPLE_PUBLISH_FILE,
  LOCKER_MULTIPLE_REMOVE_FILE,
  LOCKER_ALL_FOLDERS,
  LOCKER_MULTIPLE_FOLDER_PUBLISH_FILE,
  LOCKER_MULTIPLE_FOLDER_REMOVE_FILE,
} from "./action";

import folder_img from "../../assets/locker/folder.png";
// import folder_img from "../../../assets/locker/folder.png";


const folderFakeData = [
  {
      id: 1,
      img: folder_img,
      name: "Folder Name 1",
      userName: 'khalid_7487',
      premium: false,
      security: false,
      password: '',
      status: false,
      file: []

  },
  {
      id: 2,
      img: folder_img,
      userName: 'khalid_7487',
      name: "Folder Name 2",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 3,
      userName: 'khalid_7487',
      img: folder_img,
      name: "Folder Name 3",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 4,
      img: folder_img,
      userName: 'khalid_7487',
      name: "Folder Name asdsad aasdsad asdds a4",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 5,
      img: folder_img,
      name: "Folder Name",
      userName: 'khalid_7487',
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 6,
      img: folder_img,
      name: "Folder ",
      userName: 'khalid_7487',
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 7,
      img: folder_img,
      name: "Folder Name",
      userName: 'khalid_7487',
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 8,
      img: folder_img,
      name: "Folder Name",
      premium: false,
      userName: 'khalid_7487',
      security: false,
      password: '',
      file: []
  },
  {
      id: 9,
      img: folder_img,
      name: "Folder Name",
      premium: false,
      userName: 'khalid_7487',
      security: false,
      password: '',
      file: []
  },
  {
      id: 10,
      img: folder_img,
      userName: 'khalid_7487',
      name: "Folder Name",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 11,
      img: folder_img,
      userName: 'khalid_7487',
      name: "Folder Name",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 12,
      img: folder_img,
      userName: 'khalid_7487',
      name: "Folder Name",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 13,
      userName: 'khalid_7487',
      img: folder_img,
      name: "Folder Name",
      premium: false,
      security: false,
      password: '',
      file: []
  },
  {
      id: 14,
      userName: 'khalid_7487',
      img: folder_img,
      name: "Folder Name",
      premium: false,
      security: false,
      password: '',
      file: []
  }
]

const initialState = {
  files: [],
  folders: folderFakeData
};


const commonFunc = ( payload, folders ) =>{
  const { folderId, checkedList } = payload;
  const multipleFolderPublishFile = new Set(checkedList);
  const newFolder = folders.filter(folder => folder?.id === folderId);
  
  return { multipleFolderPublishFile,  newFolder }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCKER_ALL_FILES:
      return {
        ...state,
        files: state?.files,
      };
    case LOCKER_ADD_FILES:
      return {
        ...state,
        files: [...state?.files, ...action.payload],
      };
    case LOCKER_MULTIPLE_PUBLISH_FILE:
      const multiplePublishFile = new Set(action.payload);
      return {
        ...state,
        files: state?.files.map((file) => multiplePublishFile.has(file.id) ?  { ...file, "status": !file?.status } : file )
      };
    case LOCKER_MULTIPLE_REMOVE_FILE:
      const removeFiles = new Set(action.payload);
      return {
        ...state,
        files: state?.files.filter((file) => !removeFiles.has(file.id)),
      };
    case LOCKER_ALL_FOLDERS:
      return {
        ...state,
        folders: state?.folders,
      };
    case LOCKER_MULTIPLE_FOLDER_PUBLISH_FILE:
    { 
        const { multipleFolderPublishFile, newFolder} = commonFunc(action.payload,  state.folders);
        newFolder[0].file = newFolder[0].file.map((file) => multipleFolderPublishFile.has(file.id) ?  { ...file, "status": !file?.status } : file );
        return {
          ...state,
        };
    }
    case LOCKER_MULTIPLE_FOLDER_REMOVE_FILE:
    {
        const { multipleFolderPublishFile, newFolder} = commonFunc(action.payload,  state.folders);
        newFolder[0].file = newFolder[0].file.filter((file) => !multipleFolderPublishFile.has(file.id));
        return {
          ...state,
        };
    }

    
    default:
      return state;
  }
};
