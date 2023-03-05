import { Icon } from "@ailibs/feather-react-ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import tw, { styled } from "twin.macro";

import { trpc } from "client";

const Header = styled("header", {
  ...tw`flex flex-col gap-1`,

  "& h2": tw`text-base font-bold mt-1 mb-0`,
  "& p": tw`mt-0 text-light-neutral-700`,
});

const ShareBtn = styled("button", {
  ...tw`
    fixed bottom-32 right-8
    w-16 h-16 p-5
    bg-[#fdfdff] text-purple-1000 rounded-full shadow-2
    overflow-visible
    transition-[bottom] duration-200 ease-out
  `,

  variants: {
    hidden: {
      true: tw`bottom-0 ease-in`,
    },
  },
});

const ProductPage = () => {
  const id = useParams<{ id: string }>().id!;
  const { data, isError } = trpc.getRecalledProduct.useQuery({ id });

  const [shareHidden, setShareHidden] = useState(false);
  const touchStart = useRef<number | null>(null);

  const share = useCallback(() => {
    if (data === undefined) {
      return;
    }

    void navigator.share({
      title: document.title,
      text: `${data.product.name} recalled!`,
      url: window.location.href,
    });
  }, [data]);

  useEffect(() => {
    const onScroll = (e: WheelEvent) => {
      setShareHidden(e.deltaY > 0);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStart.current === null) {
        touchStart.current = e.touches[0].clientY;
      } else {
        setShareHidden(e.touches[0].clientY - touchStart.current < 0);
        touchStart.current = null;
      }
    };

    document.addEventListener("wheel", onScroll);
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);

    return () => {
      document.removeEventListener("wheel", onScroll);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  if (isError) {
    return <p tw="m-auto">An error has occurred :(</p>;
  }

  if (!data) {
    return (
      <svg
        tw="m-auto animate-spin h-10 w-10 text-light-neutral-1000"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle tw="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          tw="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  }

  const { product } = data;

  return (
    <>
      <div tw="flex flex-col gap-2 [p]:text-sm">
        <Header>
          <div tw="flex flex-col items-center self-center gap-2 mb-2">
            <h1>{product.name}</h1>
            <img tw="w-48 p-4 bg-white rounded-lg shadow-1" src={product.image_url} alt="banana" />
          </div>

          <section>
            <h2>Origin</h2>
            <p>{product.origin}</p>
          </section>

          <section>
            <h2>Recalled on</h2>
            <p>{product.recall_date}</p>
          </section>
        </Header>

        <div tw="flex flex-col gap-2 [h2]:mb-0.5">
          <section>
            <h2>Product Information</h2>
            <p>{product.product_info}</p>
          </section>

          <section>
            <h2>Reason For Recall</h2>
            <p>{product.problem}</p>
          </section>

          <section>
            <h2>What to Do</h2>
            <p>{product.what_to_do}</p>
          </section>
        </div>
      </div>
      <ShareBtn hidden={shareHidden} onClick={share}>
        <Icon name="share-2" />
      </ShareBtn>
    </>
  );
};

export default ProductPage;
