import React, { lazy, memo, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const routesConfig = [
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("../Pages/Login/Login")),
  },
  {
    path: "/dashboard",
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
    component: lazy(() => import("../Pages/NoMatchPage/NoMatchPage")),
  },
]; //end routes

const renderRoutes = (routes) => {
  if (!routes) {
    return null;
  }

  return (
    <Suspense>
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
    </Suspense>
  );
};

function Routes() {
  return renderRoutes(routesConfig);
}

export default memo(Routes);
