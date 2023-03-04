import "twin.macro";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "components/Navbar";
import Landing from "pages/landing";

const routes = [<Route path="/" element={<Landing />} />];

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
