import tw, { styled } from "twin.macro";

const Button = styled.button({
  ...tw`py-[5px] px-[12px] rounded-md cursor-pointer`,

  variants: {
    filled: {
      true: tw`bg-purple-800 text-[#F8F8F9] duration-100 ease-in-out
        hover:bg-purple-900 hover:shadow-2
      `,
    },
    isWarning: {
      true: tw`text-red-600 duration-100 ease-in-out hover:text-red-800`,
    },
    isSecondary: {
      true: tw`text-purple-800 font-bold w-fit
        hover:bg-purple-100 hover:duration-200 ease-in-out
      `,
    },
  },
});

export default Button;
