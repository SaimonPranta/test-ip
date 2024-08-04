import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import promise from "redux-promise-middleware";

import notification from "./notification";
import messanger from "./messanger";
import posts from "./posts";
import site from "./site";
import auth from "./auth";
import chat from "./chat";
import group from "./group";
import { storyReducer } from "./Story";
import { NOTEReducer } from "./note/noteReducer";
import storeProducts from "./ecommerceStore/products";
import locker from "./locker";
import campaign from "./campaign";
import watch from "./watch";
import investor from "./investor";
import commercial from "./Commercial/index";



const history = createBrowserHistory();

export default createStore(
  combineReducers({
    auth,
    chat,
    posts,
    site,
    messanger,
    notification,
    NOTEReducer,
    group,
    storyReducer,
    router: connectRouter(history),
    storeProducts,
    locker,
    campaign,
    watch,
    investor,
    commercial
  }),
  compose(applyMiddleware(promise))
);
