import tw, { styled } from "twin.macro";

import banana from "assets/banana.webp";

const Header = styled("header", {
  ...tw`flex flex-col gap-1`,

  "& h2": tw`text-base font-bold mt-1 mb-0`,
  "& p": tw`mt-0 text-light-neutral-700`,
});

const Tag = styled.div({
  ...tw`py-1 px-2 rounded-lg text-sm`,

  variants: {
    color: {
      green: tw`text-[#317f67] bg-[#daf0e9]`,
      purple: tw`text-[#7561af] bg-[#ede8fe]`,
    },
  },
});

const ProductPage = () => (
  <div tw="flex flex-col gap-2 [p]:text-sm">
    <Header>
      <div tw="flex flex-col items-center self-center gap-2 mb-2">
        <h1>Banana Cavendish</h1>
        <img tw="w-48 p-4 bg-white rounded-lg shadow-1" src={banana} alt="banana" />
      </div>

      <section>
        <h2>Manufacturer/Supplier</h2>
        <p>Woolworths</p>
      </section>

      <section>
        <h2>Recalled on</h2>
        <p>14th February 2023</p>
      </section>

      <section>
        <h2>Recalled Locations</h2>
        <p>Woolworths across Australia</p>
      </section>

      <div tw="flex gap-2 py-1">
        <Tag color="green">Food</Tag>
        <Tag color="purple">Front of store</Tag>
      </div>
    </Header>

    <div tw="flex flex-col gap-2 [h2]:mb-0.5">
      <section>
        <h2>Reason for recall</h2>
        <p>
          Testing has shown traces of hard plastic in the product.​ This may cause injury if
          consumed.
        </p>
      </section>

      <section>
        <h2>Additional Details</h2>
        <p>
          Food products containing hard plastic may cause illness/injury if consumed.​ Please
          consult a medical professional imediately if ingested. Consumers should not eat this
          product and should return the product to the place of purchase for a full refund.​
        </p>
      </section>

      <section>
        <h2>Product Alternatives</h2>
        <p>This product does not have alternatives</p>
      </section>
    </div>
  </div>
);

export default ProductPage;
