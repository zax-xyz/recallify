import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

export default styled(Link, {
  ...tw`text-[#2575d2] transition hover:underline`,
});
