import { NavLink } from "react-router-dom";
import tw, { styled } from "twin.macro";

const Tab = styled(NavLink, {
  ...tw`flex flex-col`,
});

const NavBar = () => (
  <nav tw="bg-white p-4">
    <ul tw="flex justify-around">
      <li>
        <Tab to="/">Home</Tab>
      </li>
      <li>
        <Tab to="/receipts">Receipts</Tab>
      </li>
      <li>
        <Tab to="/profile">Profile</Tab>
      </li>
      <li>
        <Tab to="/settings">Settings</Tab>
      </li>
    </ul>
  </nav>
);

export default NavBar;
