import "twin.macro";

import FloatingActionButton from "components/FloatingActionButton";
import Transition from "components/Transition";
import tw from "twin.macro";
import ReceiptCard from "components/ReceiptCard";
import { trpc } from "client";
import { useCallback, useEffect, useState } from "react";

const Receipts = () => {
  document.title = "Receipts | Recallify";
  const [receipts, setReceipts] = useState([]);
  const { refetch: getReceipts } = trpc.getReceipts.useQuery();

  // Fetch then map the receipts.
  const performGetReceipts = useCallback(async () => {
    const { data: allReceipts } = await getReceipts();

    if (allReceipts?.receipts) {
      // setReceipts(allReceipts.receipts);
    }
  }, [getReceipts]);

  useEffect(() => {
    void performGetReceipts();
  }, [performGetReceipts]);

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
          {receipts.map(receipt => {
            return receipt;
            // return <ReceiptCard name={receipt} date={receipt.date} total={receipt.total} />;
          })}
        </section>
      </Transition>
      <FloatingActionButton />
    </>
  );
};
export default Receipts;
