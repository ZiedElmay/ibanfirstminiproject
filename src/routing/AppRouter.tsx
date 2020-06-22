import React from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { NotFound } from "../components/not-found/NotFound";

const AppRouter:any = (props: { user: any; }) => {
  return (
    <>
      <Header />
      <main className="content">
        <div className="wrapper">
          <Switch>
            {
            routes.map((route: any) => {
              return route.private ? (
                <Route
                  key={route.path}
                  component={route.component}
                  path={route.path}
                  exact
                  user={props.user}
                  {...route}
                />
              ) : (
                <Route
                  key={route.path}
                  render={props => <route.component {...props} {...route} />}
                  path={route.path}
                  exact={route.exact}
                />
              );
            })}
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ((AppRouter));
