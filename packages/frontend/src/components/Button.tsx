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
  },
});

const Button = ({ text, ...props }: ButtonProps & ComponentProps<typeof StyledButton>) => (
  <StyledButton {...props}>{text}</StyledButton>
);

export default Button;
