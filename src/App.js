import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import HomePageSkeleton from "./skeleton/HomePageSkeleton";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import { auto } from "./store/auth/action";
import ErrorBoundary from "./ErrorBoundary";
// import { Layout } from "./components";
import { Spinner } from "./shared";
import NotificationSkeleton from "./skeleton/Notification/NotificationSkeleton";
// import StoryUser from "./pages/Stories/StoryUser";
// import StoryDetails from "./pages/Stories";
// import StoryAdd from "./pages/Stories/AddStories/StoryAdd";
// import Notes from "./pages/Profile/Notes/NewNote/index";
import Maintenance from "./pages/Maintenance/index";
import NotFound from "./pages/NotFound/index";
// import ViewNote from './pages/Profile/Notes/NotePreview/NotePreview'
import Privacy from "./pages/home/Privacy/Privacy";
import Registration from "./pages/Registration/index";
import Career from "./pages/home/Career/Career";
import About from "./pages/home/About/About";
import Terms from "./pages/home/Terms/Terms";
import AdsRedirect from "./pages/adsRedirect/index";
import LayoutWithSideNav from "./components/Layouts/LayoutWithSideNav/index";
import UserAuthGard from "./gardes/UserAuthGard/index";
import PagesWrapper from "./pages/PagesWrapper";
import AddStory from "./pages/Stories/AddStory/index";
import AddReel from "./pages/Reels/AddReels/index";
import axios from "axios";
import { BACKEND_URL } from "./shared/constants/Variables";
import { addCommercial } from "./store/Commercial/actions";

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      height: "90vh",
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const HomePage = lazy(() => import("./pages/home/index"));
const NewsFeed = lazy(() => import("./pages/NewsFeed"));
const Profile = lazy(() => import("Profile/Profile"));
const Notes = lazy(() => import("Profile/Notes"));
const NewJob = lazy(() => import("Profile/NewJob"));
const ViewNote = lazy(() => import("Profile/ViewNote"));
const Education = lazy(() => import("Profile/Education"));
const Assistant = lazy(() => import("Profile/Assistant"));
const Employment = lazy(() => import("Profile/Employment"));
const Laboratory = lazy(() => import("Profile/Laboratory"));
const EditNote = lazy(() => import("Profile/EditNote"));
const Watch = lazy(() => import("Watch/Watch"));
const Store = lazy(() => import("Store/Store"));
const ProductDetails = lazy(() => import("Store/ProductDetails"));
const AllProducts = lazy(() => import("Store/AllProducts"));
const StoreCart = lazy(() => import("Store/StoreCart"));
const ProjectCategories = lazy(() => import("Store/ProjectCategories"));
const Checkout = lazy(() => import("Store/Checkout"));
const OrderDetails = lazy(() => import("Store/OrderDetails"));
const OrderSuccessful = lazy(() => import("Store/OrderSuccessful"));
const Campaigns = lazy(() => import("Campaigns/Campaigns"));
const CampaignDetails = lazy(() => import("Campaigns/CampaignDetails"));

const Shortener = lazy(() => import("Shortener/Shortener"));
const Locker = lazy(() => import("Locker/Locker"));
const Investor = lazy(() => import("Investor/Investor"));
const Mails = lazy(() => import("Mail/Mail"));
const Reports = lazy(() => import("Balance/Reports"));
const Balance = lazy(() => import("Balance/Balance"));
const Notifications = lazy(() => import("Notifications/Notifications"));
const Search = lazy(() => import("Search/Search"));
const SearchJob = lazy(() => import("Search/SearchJob"));

const Messenger = lazy(() => import("Messenger/Messenger"));

function handelRightClick(event) {
  event.preventDefault();
}

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    store.dispatch(auto());
    axios.get(`${BACKEND_URL}/pages`).then(({ data }) => {
      if (data.data) {
        setPages(data.data);
      }
    });
  }, []);

  document.addEventListener("contextmenu", handelRightClick);

  const reactAlertOptions = {
    timeout: 5000,
    position: positions.TOP_RIGHT,
  };

  return (
    <Provider store={store}>
      <ReactAlertProvider template={AlertTemplate} {...reactAlertOptions}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Suspense fallback={<HomePageSkeleton />}>
                  <HomePage />
                </Suspense>
              )}
            />
            <Route exact path="/signup" component={() => <Registration />} />
            {/* <Route exact path="/story/:storyId" component={StoryDetails} />
            <Route exact path="/StoryAdd/:storyImageId" component={StoryAdd} />
            <Route exact path="/me/:userId" component={StoryUser} /> */}
            <Route exact path="/stories/create" component={AddStory} />
            <Route exact path="/reels/create" component={AddReel} />

            <Route
              path="/new-note"
              component={() => (
                <Suspense>
                  <Notes />
                </Suspense>
              )}
            />
            <Route
              path="/business/:id/create-job"
              component={() => (
                <Suspense>
                  <NewJob />
                </Suspense>
              )}
            />
            <Route
              path="/edit-note/:NoteUserName/:EditedNoteId"
              component={() => (
                <Suspense fallback={<Spinner height={100} />}>
                  <EditNote />
                </Suspense>
              )}
            />
            <Route
              path="/:userNameFromNote/n/:readI"
              component={() => (
                <Suspense fallback={<Spinner height={100} />}>
                  <ViewNote />
                </Suspense>
              )}
            />

            {pages.length > 0 &&
              pages.map((page) => {
                return (
                  <Route
                    exact
                    path={`/${page.route}`}
                    component={() => <PagesWrapper page={page.content} />}
                  />
                );
              })}

            <Route
              exact
              path="/layout"
              component={() => <LayoutWithSideNav />}
            />
            <Route
              exact
              path="/S/:customLink"
              component={() => <AdsRedirect />}
            />
            {/* <Layout> */}
            <UserAuthGard>
              <LayoutWithSideNav>
                <Switch>
                  <Route
                    path="/foods"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <div></div>
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/locker"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Locker />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/clothes"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <div></div>
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/residences"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <div></div>
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/educations"
                    component={() => (
                      <Suspense>
                        <Education />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/assistants"
                    component={() => (
                      <Suspense>
                        <Assistant />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/employments"
                    component={() => (
                      <Suspense>
                        <Employment />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/laboratories"
                    component={() => (
                      <Suspense>
                        <Laboratory />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/treatments"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <div></div>
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />

                  <Route
                    path="/stores/product/:productId"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <ProductDetails />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores/products"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <AllProducts />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores/carts"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <StoreCart />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores/categories"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <ProjectCategories />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores/checkout"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Checkout />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores/order-details"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <OrderDetails />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores/order-successful"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <OrderSuccessful />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/stores"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Store />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/watch"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Watch />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/campaigns"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Campaigns />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />

                  <Route
                    path="/investors"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Investor />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/mail"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Mails />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />

                  <Route
                    path="/notifications"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<NotificationSkeleton />}>
                          <Notifications />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/search"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<></>}>
                          <Search />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  {/*  <Route*/}
                  {/*  path="/search-job/:id"*/}
                  {/*  component={() => (*/}
                  {/*    <RemoteWrapper>*/}
                  {/*      <Suspense fallback={<></>}>*/}
                  {/*        <SearchJob />*/}
                  {/*      </Suspense>*/}
                  {/*    </RemoteWrapper>*/}
                  {/*  )}*/}
                  {/*/>*/}
                  {/*  <Route*/}
                  {/*  path="/user-resume"*/}
                  {/*  component={() => (*/}
                  {/*    <RemoteWrapper>*/}
                  {/*      <Suspense fallback={<></>}>*/}
                  {/*        <UserResume />*/}
                  {/*      </Suspense>*/}
                  {/*    </RemoteWrapper>*/}
                  {/*  )}*/}
                  {/*/>*/}
                  <Route
                    path="/messenger"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Messenger />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/newsfeed"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <NewsFeed />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/shareplaces"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Maintenance />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/lookingfor"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Maintenance />
                      </Suspense>
                    )}
                  />

                  <Route
                    path="/laboratorys"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Maintenance />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/asistant"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Maintenance />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/feature"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Maintenance />
                      </Suspense>
                    )}
                  />
                  <Route
                    path="/vr"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Maintenance />
                      </Suspense>
                    )}
                  />
                  {/* <Route
                    path="/reports"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Reports />
                      </Suspense>
                    )}
                  /> */}
                  <Route
                    path="/balance"
                    component={() => (
                      <Suspense fallback={<Spinner height={100} />}>
                        <Balance />
                      </Suspense>
                    )}
                  />
                  <Route path="/improvefutures" component={() => <></>} />
                  <Route
                    path="/C/:campaignId"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <CampaignDetails />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route
                    path="/:username"
                    component={() => (
                      <RemoteWrapper>
                        <Suspense fallback={<Spinner height={100} />}>
                          <Profile />
                        </Suspense>
                      </RemoteWrapper>
                    )}
                  />
                  <Route path="*" component={() => <NotFound />} />
                </Switch>
              </LayoutWithSideNav>
            </UserAuthGard>
            {/* </Layout> */}
          </Switch>
        </BrowserRouter>
      </ReactAlertProvider>
    </Provider>
  );
}

export default App;
