import React, { useEffect, useState } from "react";
import { Header, StoreDiv } from "./style";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
// } from "react-router-dom";
// import Admin from "./Admin/Admin";
// import Home from "./Home/Home";
// import Login from "./Login/Login";

// import { Provider, useDispatch, useSelector } from "react-redux";
// import store from "./reduxStore";
// import { logout } from "./actions/userActions";
// import Cart from "./Cart/Cart";
// import { BrowserRouter } from "react-router-dom";

function Store() {
  // let match = useRouteMatch();
  // const data = localStorage.getItem("login");

  // const dispatch = useDispatch();

  // // cart states custome
  // const [cart, setCart] = useState([]);

  // const logoutHandler = () => {
  //   localStorage.removeItem("login");
  // };

  // useEffect(() => {}, [dispatch]);
  return (
    <div>
      {/* //{" "}
      <Provider store={store}> */}
      <h1>store</h1>
      {/* <BrowserRouter>
        <StoreDiv style={{ height: "100%" }}>
          <Header>
            <Link to={`${match.url}/login`}>
              {data ? (
                <button onClick={logoutHandler}>logout</button>
              ) : (
                <button>login</button>
              )}
            </Link>
            <Link to={`${match.url}/admin`}>
              <button>admin</button>{" "}
            </Link>
            <Link to={`${match.url}/home`}>
              <button>Home</button>{" "}
            </Link>
          </Header>
          <div></div>
          <Switch>
            <Route exact path={`${match.url}/login`}>
              <Login routeprops={`${match.url}/admin`} />
            </Route>
            <Route exact path={`${match.url}/home`}>
              <Home
                cartLink={`${match.url}/cart`}
                setCart={setCart}
                cart={cart}
              />
            </Route>
            <Route exact path={`${match.url}/admin`}>
              <Admin />
            </Route>
            <Route exact path={`${match.url}/cart`}>
              <Cart cart={cart} />
            </Route>
          </Switch>
        </StoreDiv>
      </BrowserRouter> */}

      {/* //{" "}
    </Provider> */}
    </div>
  );
}

export default Store;

// projet targated goal was:

// complete the full e - commerce site within 10 days
// 24 shadin git fork -
// 25 mongoose aggregate
// 26 js concept and prototype, jonayed eishb callback, promise, async await
// 27 redux
// 28 typescript
// 29- react query
// 30 - angular/ tooltips
//tooltips
