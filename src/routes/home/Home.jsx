import React from "react";
import ProductCard from "../../components/card/Card";
import { useFetch } from "../../hooks/useFetch";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [data, loading] = useFetch("product/all");
  console.log(data);

  return (
    <div className="flex flex-col">
      <HomeHeader />
      <div className="flex min-h-screen w-full flex-wrap justify-center gap-4 py-10">
        {data.payload?.map((product) => (
          <NavLink className="flex" to={"product/" + product._id}>
            <ProductCard product={product} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home;
