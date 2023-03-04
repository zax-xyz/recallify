import tw from "twin.macro";

const Glow = tw.div`absolute rounded-full`;

const BackgroundGlow = () => (
  <div tw="fixed inset-0 z-[-1]">
    <Glow tw="w-[200px] h-[200px] top-[53%] left-[15%] bg-[#78a3e2]/[0.26] blur-[200px]" />
    <Glow tw="w-[172px] h-[172px] top-[47%] left-1/2 bg-[#8778e2]/[0.12] blur-[172px]" />
    <Glow tw="w-[156px] h-[156px] top-[36%] left-[13%] bg-[#d7b255]/[0.09] blur-[132px]" />
  </div>
);

export default BackgroundGlow;
