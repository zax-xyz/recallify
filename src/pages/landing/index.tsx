import "twin.macro";

import Card from "components/Card";
import Input from "components/Input";

const products = ["a", "b", "c", "d"];

const ProductsRow = ({ products }: { products: string[] }) => (
  <div tw="flex gap-6">
    {products.map(product => (
      <Card key={product} tw="flex items-center justify-center w-24 h-24 flex-shrink-0">
        {product}
      </Card>
    ))}
  </div>
);

const Landing = () => (
  <>
    <header>
      <h1>Welcome Back</h1>
      <Input tw="w-full" placeholder="Search for a product..." />
    </header>
    <section>
      <h2>Products being watched</h2>
      <ProductsRow products={products} />
    </section>
    <section>
      <h2>Latest Recalled Products</h2>
      <ProductsRow products={products} />
    </section>
    <section>
      <h2>Spending this Month</h2>
    </section>
  </>
);
export default Landing;
