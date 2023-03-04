import "twin.macro";

type ReceiptCardProps = {
  name: string;
  date: string;
  total: string;
};

const ReceiptCard = ({ name, date, total }: ReceiptCardProps) => {
  return (
    <div tw="flex justify-between w-full bg-[#FDFDFF] rounded-md py-2.5 px-5 shadow-1">
      <div tw="flex flex-col">
        <p>Receipt {name}</p>
        <p tw="text-xs text-light-neutral-700">{date}</p>
      </div>
      <div tw="self-center flex justify-center items-center py-1 px-2.5 leading-tight rounded-full bg-[#ede8fe]">
        <p>${total}</p>
      </div>
    </div>
  );
};

export default ReceiptCard;
