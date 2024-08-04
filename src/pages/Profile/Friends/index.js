import React, { Suspense, lazy } from 'react';
import { Route, withRouter, NavLink, Switch } from 'react-router-dom';

import { FriendsContainer, Navbar } from './style';
import { getFriendCounts } from '../Hooks';
import { Spinner } from '../../../shared';
import Header from '../Header';

import './style.scss';

const Blocklist = lazy(() => import('./Blocklist'));
const Requests = lazy(() => import('./Requests'));
const Friend = lazy(() => import('./Friend'));
const People = lazy(() => import('./People'));

const Friends = ({ username, match: { url }, privacy, isMe, changePrivacy }) => {
  document.title = "Followers";
  const counts = getFriendCounts(username);
  return (
    <>
      <Header
        title="Followers"
        isMe={isMe}
        counts={counts.friends}
        privacy={privacy}
        changePrivacy={changePrivacy}
      />
      <FriendsContainer>
        {isMe() && (
          <Navbar>
            <li>
              <NavLink exact to={`${url}`}>
                Followers ({counts.friends})
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/requests`}>
                Requests ({counts.requests})
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/people`}>Suggestions</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/blocklist`}>
                Blocklist ({counts.blocklist})
              </NavLink>
            </li>
          </Navbar>
        )}
        <Switch>
          <Route
            exact
            path={`${url}`}
            component={() => (
              <Suspense fallback={<Spinner height={30} />}>
                <Friend username={username} />
              </Suspense>
            )}
          />
          {isMe() && (
            <>
              <Route
                exact
                path={`${url}/requests`}
                component={() => (
                  <Suspense fallback={<Spinner height={30} />}>
                    <Requests />
                  </Suspense>
                )}
              />
              <Route
                exact
                path={`${url}/people`}
                component={() => (
                  <Suspense fallback={<Spinner height={30} />}>
                    <People />
                  </Suspense>
                )}
              />
              <Route
                exact
                path={`${url}/blocklist`}
                component={() => (
                  <Suspense fallback={<Spinner height={30} />}>
                    <Blocklist />
                  </Suspense>
                )}
              />
            </>
          )}
        </Switch>
      </FriendsContainer>
    </>
  );
};

export default withRouter(Friends);
