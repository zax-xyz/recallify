import { Icon } from "@ailibs/feather-react-ts";
import { NavLink } from "react-router-dom";
import tw, { styled } from "twin.macro";

import type { ComponentProps } from "react";

type TabProperties = {
  to: string;
  icon: ComponentProps<typeof Icon>["name"];
  name: string;
};
const tabs: TabProperties[] = [
  { to: "/", icon: "home", name: "Home" },
  { to: "/receipts", icon: "file", name: "Receipts" },
  { to: "/profile", icon: "user", name: "Profile" },
  { to: "/settings", icon: "settings", name: "Settings" },
];

const Tab = styled(NavLink, {
  ...tw`
    w-20 py-2 rounded-lg
    flex flex-col items-center gap-1
    text-[10px]
  `,

  "&.active": tw`
    text-[#7746df] bg-[#f6f1ff]
  `,
});

const NavBar = () => (
  <nav tw="fixed bottom-0 inset-x-0 bg-white py-2 px-4 shadow-2">
    <ul tw="flex justify-around">
      {tabs.map(({ to, icon, name }) => (
        <li key={to}>
          <Tab to={to}>
            <Icon name={icon} tw="h-[30px] w-[30px]" />
            {name}
          </Tab>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavBar;
