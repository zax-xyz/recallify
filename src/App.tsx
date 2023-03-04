import "twin.macro";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// eslint-disable-next-line prettier/prettier
import NavBar from "components/Navbar";
import Landing from "pages/landing";
import Profile from "pages/profile";
import Receipts from "pages/receipts";

const routes = [
  <Route path="/" element={<Landing />} />,
  <Route path="/receipts" element={<Receipts />} />,
  <Route path="/profile" element={<Profile />} />,
];

const App = () => (
  <div tw="flex flex-col bg-gray-100 h-screen">
    <BrowserRouter>
      <main tw="flex flex-col gap-4 flex-1 p-9">
        <Routes>{routes}</Routes>
      </main>
      <NavBar />
    </BrowserRouter>
  </div>
);

export default App;
