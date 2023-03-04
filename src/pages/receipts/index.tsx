import "twin.macro";

import Card from "components/Card";
import Input from "components/Input";
import ReceiptCard from "components/ReceiptCard";

const products = ["a", "b", "c", "d"];

const Receipts = () => {
  // Fetch then map the receipts.
  
  return (
    <>
      <header>
        <h1 tw="text-3xl font-bold my-2">Receipts</h1>
      </header>
      <section>
        <h2 tw="text-2xl font-bold my-3">View your previous receipts</h2>
      </section>
      <section>
        <ReceiptCard name="#1" date="14th February 2023" total="14.50" />
      </section>
    </>
  );
};
export default Receipts;
