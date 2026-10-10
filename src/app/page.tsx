import MostLessProduct from "@/components/MostLessProduct";
import MostHighProduct from "@/components/MostHighProduct";
import Banner from "@/components/Banner";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Banner />
      <Suspense fallback={null}>
        <MostHighProduct />
      </Suspense>
      <MostLessProduct />
    </>
  );
}
