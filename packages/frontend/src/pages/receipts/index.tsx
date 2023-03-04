import "twin.macro";

import FloatingActionButton from "components/FloatingActionButton";
import ReceiptCard from "components/ReceiptCard";

const Receipts = () => {
  // Fetch then map the receipts.

  return (
    <>
      <header>
        <h1 tw="my-2">Receipts</h1>
      </header>
      <section>
        <h2 tw="my-3">View your previous receipts</h2>
      </section>
      <section>
        <ReceiptCard name="#1" date="14th February 2023" total="14.50" />
      </section>
      <FloatingActionButton />
    </>
  );
};
export default Receipts;
