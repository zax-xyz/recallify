import React from "react";
import { Icon } from "@ailibs/feather-react-ts";
import tw, { styled } from "twin.macro";

const StyledFloatingActionButton = styled.button({
  ...tw`w-[4.2rem] h-[4.2rem] flex justify-center items-center 
        text-purple-1000 bg-[#FDFDFF] rounded-[50%] shadow-2
        absolute bottom-[8rem] right-[2rem]`,
});

const FloatingActionButton = () => {
  return (
    <StyledFloatingActionButton>
      <Icon name="plus" tw="w-[1.5rem] h-[1.5rem]" />
    </StyledFloatingActionButton>
  );
};

export default FloatingActionButton;
