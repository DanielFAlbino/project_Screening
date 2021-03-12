import React, { Fragment, lazy, Suspense, memo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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
    component: lazy(() =>
      import("../Pages/CollectionDetails/CollectionDetails")
    ),
  },
  {
    path: "/profile/:userId?",
    exact: true,
    component: lazy(() => import("../Pages/ProfileDetails/ProfileDetails")),
  },
  {
    path: "/card/:cardId?",
    exact: true,
    component: lazy(() => import("../Pages/CardDetails/CardDetails")),
  },
  {
    path: "/card/",
    exact: true,
    component: lazy(() => import("../Pages/Card/Card")),
  },
  {
    exact: true,
    path: "*",
    component: lazy(() => import("../Pages/NoMatchPage/NoMatchPage")),
  },
]; //end routes

const renderRoutes = (routes, user) => {
  if (!routes) {
    return null;
  }

  return (
    <Suspense>
      <Switch>
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const RouteComponent = Route;

          return (
            <RouteComponent
              key={route.path || i}
              path={route.path}
              exact={route.exact}
              showFor={route.showFor}
              user={user}
            >
              {(props) => (
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes, user)
                  ) : (
                    <Component user={user} {...props} />
                  )}
                </Layout>
              )}
            </RouteComponent>
          );
        })}
      </Switch>
    </Suspense>
  );
};

function Routes({ user }) {
  return renderRoutes(routesConfig, user);
}

export default memo(Routes);
