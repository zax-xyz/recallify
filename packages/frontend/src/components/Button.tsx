import React, { ComponentProps } from "react";
import tw, { styled } from "twin.macro";

type ButtonProps = {
  text: string;
};

const StyledButton = styled.button({
  ...tw`py-[5px] px-[12px] rounded-md`,

  variants: {
    filled: {
      true: tw`bg-purple-800 text-[#F8F8F9]`,
    },
    isWarning: {
      true: tw`text-red-600`,
    },
    isSecondary: {
      true: tw`text-purple-800 font-bold w-fit
        hover:bg-purple-100 hover:duration-200 ease-in-out
      `
    }
  },
});

const Button = ({ text, ...props }: ButtonProps & ComponentProps<typeof StyledButton>) => (
  <StyledButton {...props}>{text}</StyledButton>
);

export default Button;
