import React from "react";
import "twin.macro";

type ReceiptCardProps = {
  name: string;
  date: string;
  total: string;
};

const ReceiptCard = ({ name, date, total }: ReceiptCardProps) => {
  return (
    <div tw="flex justify-between w-full bg-[#FDFDFF] text-[#323E4D] rounded-md py-[10px] px-[20px] shadow-[0px 4px 4px rgba(0, 0, 0, 0.05)]">
      <div tw="flex flex-col">
        <p>Receipt {name}</p>
        <p tw="text-[#59697D]">{date}</p>
      </div>
      <div tw="flex justify-center items-center py-[3px] px-[8px] rounded-[12px] bg-[#ede8fe]">
        <p>${total}</p>
      </div>
    </div>
  );
};

export default ReceiptCard;
