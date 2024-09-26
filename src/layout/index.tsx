import React from "react";

// redux
import { Route, Routes } from "react-router-dom";
import AuthPages from "@src/configs/router.config/AuthPages";
import PublicPages from "@src/configs/router.config/PublicPages";
import { ReactElement } from "react";
import { RouteProps } from "react-router-dom";
import PublicRoute from "@src/security/PublicRoute";
import SpinnerLayout from "./Layouts/SpinnerLayout";
import MainMenu from "./Components/MainMenu";
import PrivateRoute from "@src/security/PrivateRoute";
import OnlineChecker from "@src/components/ui/OnlineChecker";

interface Meta {
  layout: string;
  publicRoute?: boolean;
}

interface RouteConfig extends Omit<RouteProps, "meta"> {
  path: string;
  element: ReactElement;
  meta?: Meta;
}

interface LayoutProps { }

const Layout: React.FC<LayoutProps> = () => {
  const routers: RouteConfig[] = [...AuthPages, ...PublicPages];

  return (
    <>
      <Routes>
        {routers.map((route: RouteConfig, i: number) => (
          <Route
            key={i}
            path={route.path}
            element={
              <>
                {route?.meta?.publicRoute ? (
                  <PublicRoute>
                    <SpinnerLayout>
                      {route?.meta?.layout === "vertical" ? (
                        <>
                          <MainMenu />
                          {route.element}
                        </>
                      ) : (
                        route.element
                      )}
                    </SpinnerLayout>
                  </PublicRoute>
                ) : (
                  <PrivateRoute>
                    <SpinnerLayout>
                      <OnlineChecker />
                      {route?.meta?.layout === "vertical" ? (
                        <>
                          <MainMenu />
                          {route.element}
                        </>
                      ) : (
                        route.element
                      )}
                    </SpinnerLayout>
                  </PrivateRoute>
                )}
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default Layout;
