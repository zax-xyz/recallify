import tw from "twin.macro";

export default tw.input`
  px-3.5 py-3
  border border-light-neutral-200
  rounded-xl shadow-1
  placeholder:text-light-neutral-500 leading-none
  transition
  focus:(
    outline-none border-purple-500 ring ring-purple-300/50
  )
`;
