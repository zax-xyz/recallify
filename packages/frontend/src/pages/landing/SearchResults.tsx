import "twin.macro";

import { Link } from "react-router-dom";

import banana from "assets/banana.webp";
import Card from "components/Card";

import type { ComponentProps } from "react";

const SearchResults = (props: ComponentProps<"div">) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div tw="flex flex-col gap-2" {...props}>
    <h2>Results for &quot;Fruits&quot;</h2>
    <ul tw="flex flex-col gap-2">
      <li>
        <Link to="/product/1">
          <Card tw="flex gap-8 items-center">
            <img tw="w-28" src={banana} alt="banana" />
            <div tw="flex flex-col gap-2">
              <div>
                <h3 tw="text-base font-normal my-0">Banana Cavendish</h3>
                <p tw="text-sm text-light-neutral-700">Woolworths</p>
              </div>

              <div>
                <h3 tw="text-base font-normal my-0">Recalled on</h3>
                <p tw="text-sm text-light-neutral-700">14th February 2023</p>
              </div>
            </div>
          </Card>
        </Link>
      </li>
    </ul>
  </div>
);

export default SearchResults;
