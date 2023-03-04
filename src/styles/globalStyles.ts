import tw, { globalStyles } from "twin.macro";

import { globalCss } from "../../stitches.config";

import type { TwStyle } from "twin.macro";

const customStyles = {
  body: tw`antialiased text-light-neutral-1000`,
  h1: tw`text-2xl font-bold my-4`,
  h2: tw`text-xl font-bold my-3`,
  h3: tw`text-base font-bold my-1`,
};

const styles = () => {
  globalCss(globalStyles as Record<string, TwStyle>)();
  globalCss(customStyles)();
};

export default styles;
