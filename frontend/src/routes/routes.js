import React, { lazy, memo, Suspense } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const routesConfig = [
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("../Pages/Login/Login")),
  },
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../Pages/Dashboard/Dashboard")),
  },
  {
    path: "/collection",
    exact: true,
    component: lazy(() => import("../Pages/Collection/Collection")),
  },
  {
    path: "/collection/:collectionId?",
    exact: true,
    component: lazy(() => import("../Pages/Collection/Collection")),
  },
  {
    path: "/profile/:userId?",
    exact: true,
    component: lazy(() => import("../Pages/Profile/Profile")),
  },
  {
    path: "/card/:cardId?",
    exact: true,
    component: lazy(() => import("../Pages/Card/Card")),
  },
  {
    path: "/register",
    exact: true,
    component: lazy(() => import("../Pages/NewUser/NewUser")),
  },
  {
    path: "/users",
    exact: true,
    component: lazy(() => import("../Pages/Users/Users")),
  },
  {
    path: "/*",
    component: lazy(() => import("../Pages/NoMatchPage/NoMatchPage")),
  },
]; //end routes

const renderRoutes = (routes) => {
  if (!routes) {
    return null;
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Switch>
          {routes.map((route, i) => {
            return (
              <Route
                key={i}
                exact
                path={route.path}
                component={route.component}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

function Routes(token) {
  return renderRoutes(routesConfig);
}

export default memo(Routes);
