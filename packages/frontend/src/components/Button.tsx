import tw, { styled } from "twin.macro";

const Button = styled.button({
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

export default Button;
