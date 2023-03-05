import tw from "twin.macro";

import { trpc } from "client";
import FloatingActionButton from "components/FloatingActionButton";
import ReceiptCard from "components/ReceiptCard";
import Transition from "components/Transition";

const Receipts = () => {
  document.title = "Receipts | Recallify";
  const { data: { receipts = [] } = {} } = trpc.getReceipts.useQuery();

  return (
    <>
      <Transition
        appear
        show
        enter={tw`transition duration-[600ms]`}
        enterFrom={tw`-translate-x-6 opacity-0`}
      >
        <header>
          <h1 tw="text-3xl font-bold my-2">Receipts</h1>
        </header>
        <section>
          <h2 tw="text-2xl font-bold my-3">View your previous receipts</h2>
        </section>
        <section>
          {receipts.map(receipt => (
            <ReceiptCard
              name={receipt.name}
              date={receipt.input_date}
              total={receipt.total_value}
            />
          ))}
        </section>
      </Transition>
      <FloatingActionButton />
    </>
  );
};
export default Receipts;
