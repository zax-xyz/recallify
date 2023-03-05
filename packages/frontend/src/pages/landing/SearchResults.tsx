import "twin.macro";

import { Link } from "react-router-dom";

import Card from "components/Card";

import type { ComponentProps } from "react";

type SearchResultsProps = {
  results: any[];
};

const SearchResults = ({
  results,
  ...props
}: Omit<ComponentProps<"div">, "results"> & SearchResultsProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div tw="flex flex-col gap-2" {...props}>
    <h2>Results for &quot;Fruits&quot;</h2>
    {results.length > 0 ? (
      <ul tw="flex flex-col gap-2">
        <li>
          {results.map(result => (
            <Link to="/product/1">
              <Card tw="flex gap-8 items-center">
                <img tw="w-28" src={result.image_url} alt="banana" />
                <div tw="flex flex-col gap-2">
                  <div>
                    <h3 tw="text-base font-normal my-0">{result.name}</h3>
                    <p tw="text-sm text-light-neutral-700">{result.origin}</p>
                  </div>

                  <div>
                    <h3 tw="text-base font-normal my-0">Recalled on</h3>
                    <p tw="text-sm text-light-neutral-700">{result.recall_date}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </li>
      </ul>
    ) : (
      <p tw="text-center">No results found</p>
    )}
  </div>
);

export default SearchResults;
