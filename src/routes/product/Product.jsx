import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import HomeHeader from "../../components/homeHeader/HomeHeader";

const ProductPage = () => {
  const { productId } = useParams();

  const [data] = useFetch("product/" + productId);

  console.log(data.payload);

  // const procent = 100 - (100 * product.sale_price) / product.original_price;
  // console.log(procent + "% Chegirma");

  return (
    <div className="min-h-screen bg-gray-100">
      <HomeHeader />

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
            <div className="border-b border-gray-200 bg-white p-6 sm:px-20">
              <div className="mt-8 flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={data.payload?.product_images[0]}
                    alt={data.payload?.product_name}
                    className="h-auto w-full rounded-lg object-cover shadow-md"
                  />
                </div>

                <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {data.payload?.product_name}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {data.payload?.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold text-gray-900">
                      ${data.payload?.sale_price}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${data.payload?.original_price}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Category: {data.payload?.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {data.payload?.product_type}
                    </p>
                    <p className="text-sm text-gray-600">
                      In Stock: {data.payload?.number_in_stock}
                    </p>
                    <p className="text-sm text-gray-600">
                      Likes: {data.payload?.likes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
