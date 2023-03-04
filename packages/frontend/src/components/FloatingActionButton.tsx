import React from "react";
import { Icon } from "@ailibs/feather-react-ts";
import tw, { styled } from "twin.macro";

const FloatingActionButton = () => {
  const handleCapture = (target: any) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];
      // TODO: Do something with file
    }
  };

  return (
    <>
      <label htmlFor="fab">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          tw="hidden"
          id="fab"
          onChange={e => handleCapture(e.target)}
        />
        <Icon
          name="plus"
          tw="w-[4rem] h-[4rem] absolute bottom-[8rem] right-[2rem] bg-[#FDFDFF] overflow-visible rounded-[50%] shadow-2 p-5"
        />
      </label>
    </>
  );
};

export default FloatingActionButton;
