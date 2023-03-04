import tw, { globalStyles } from "twin.macro";

import { globalCss } from "../../stitches.config";

import type { TwStyle } from "twin.macro";

const customStyles = {
  body: tw`antialiased text-light-neutral-1000 bg-[#fbfaff]`,
  h1: tw`text-3xl font-bold my-4`,
  h2: tw`text-xl font-bold my-3`,
  h3: tw`text-base font-bold my-1`,
  'input[type="checkbox"]': tw`
    rounded shadow-1
    border-light-neutral-300 text-purple-600
    focus:(border-purple-300 ring ring-offset-0 ring-purple-200/50)
  `,
};

const styles = () => {
  globalCss(globalStyles as Record<string, TwStyle>)();
  globalCss(customStyles)();
};

export default styles;
