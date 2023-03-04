import { Icon } from "@ailibs/feather-react-ts";
import tw, { styled } from "twin.macro";

import Card from "components/Card";
import Input from "components/Input";

const FadeGradient = styled.div({
  ...tw`fixed top-0 inset-x-0 h-60 -z-10`,
  background:
    "linear-gradient(180deg, #7746DF 0%, #7746DF 0.4%, rgba(119, 70, 223, 0.99763) 1.62%, rgba(119, 70, 223, 0.992) 3.68%, rgba(119, 70, 223, 0.981037) 6.59%, rgba(119, 70, 223, 0.962963) 10.37%, rgba(119, 70, 223, 0.936) 15.04%, rgba(119, 70, 223, 0.89837) 20.62%, rgba(119, 70, 223, 0.848296) 27.12%, rgba(119, 70, 223, 0.784) 34.56%, rgba(119, 70, 223, 0.703704) 42.96%, rgba(119, 70, 223, 0.60563) 52.34%, rgba(119, 70, 223, 0.488) 62.72%, rgba(119, 70, 223, 0.349037) 74.11%, rgba(119, 70, 223, 0.186963) 86.53%, rgba(119, 70, 223, 0) 100%)",
});

const Pill = tw.div`
  px-4 py-1.5 rounded-full
  bg-gradient-to-tr from-[#764AD3]/60 to-[#5D33B6]/60
  text-white
`;

const Detail = tw.div`text-[11px] text-neutral-700`;

const products = ["a", "b", "c", "d"];

const ProductsRow = ({ products }: { products: string[] }) => (
  <div tw="flex gap-4">
    {products.map(product => (
      <Card key={product} tw="flex items-center justify-center w-32 h-32 flex-shrink-0">
        {product}
      </Card>
    ))}
  </div>
);

const Landing = () => (
  <div tw="z-0">
    <FadeGradient />
    <header tw="flex flex-col items-center gap-6 pb-6">
      <Pill>Welcome back, Michelle</Pill>
      <div tw="relative mx-1 self-stretch text-light-neutral-1000">
        <div tw="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
          <Icon name="search" />
        </div>
        <Input
          tw="w-full pl-10 placeholder:text-light-neutral-1000"
          placeholder="Search for a product..."
        />
      </div>
      <div tw="flex items-center gap-2 px-4 py-2 mt-4 bg-red-100 text-red-1000 text-[11px] rounded-md">
        <Icon name="alert-triangle" tw="h-3.5 w-3.5" /> A product you recently purchased has been
        recalled.
      </div>
    </header>
    <section>
      <h2 tw="mb-0">Watched Products</h2>
      <Detail tw="mb-3">Last Updated: 9:41pm 4/03/23</Detail>
      <ProductsRow products={products} />
    </section>
    <section>
      <h2 tw="mb-0">Latest Recalled Products</h2>
      <Detail tw="mb-3">Last Updated: 9:41pm 4/03/23</Detail>
      <ProductsRow products={products} />
    </section>
    <section>
      <h2 tw="mb-0">Spending this Month</h2>
      <Detail tw="mb-3">Last Updated: 9:41pm 4/03/23</Detail>
    </section>
  </div>
);
export default Landing;
