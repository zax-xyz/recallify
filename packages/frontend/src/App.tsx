import "twin.macro";

import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BackgroundGlow from "components/BackgroundGlow";
import NavBar from "components/Navbar";
import PrivateRoute from "components/PrivateRoute";
import UserContext, { defaultUserState } from "contexts/UserContext";
import Login from "pages/Login";
import Register from "pages/Register";
import Landing from "pages/landing";
import ProductPage from "pages/product";
import Profile from "pages/profile";
import Receipts from "pages/receipts";
import Settings from "pages/settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { trpc } from "client";
import { httpBatchLink } from "@trpc/react-query";

const routes = [
  <Route
    key="/"
    path="/"
    element={
      <PrivateRoute>
        {" "}
        <Landing />{" "}
      </PrivateRoute>
    }
  />,
  <Route
    key="product"
    path="/product/:id"
    element={
      <PrivateRoute>
        <ProductPage />
      </PrivateRoute>
    }
  />,
  <Route
    key="receipts"
    path="/receipts"
    element={
      <PrivateRoute>
        <Receipts />
      </PrivateRoute>
    }
  />,
  <Route
    key="profile"
    path="/profile"
    element={
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    }
  />,
  <Route
    key="settings"
    path="/settings"
    element={
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    }
  />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
];

const App = () => {
  const [user, setUser] = useState(defaultUserState.user);
  const userContextValue = useMemo(() => ({ user, setUser }), [user]);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/rpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={userContextValue}>
          <div tw="flex flex-col h-screen">
            <BrowserRouter>
              <main tw="flex flex-col gap-4 flex-1 p-9 pb-28">
                <BackgroundGlow />
                <Routes>{routes}</Routes>
              </main>
              <NavBar hidden={!user.authenticated} />
            </BrowserRouter>
          </div>
        </UserContext.Provider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
