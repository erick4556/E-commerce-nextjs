import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ productsData, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h1>Best Selling</h1>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'; //Sanity query. Agarrar todos los productos del dashboard de sanity
  const productsData = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]'; //Sanity query. Agarrar todos los productos del dashboard de sanity
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData },
  };
};

export default Home;
