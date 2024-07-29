import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[250px] overflow-hidden rounded bg-white shadow-lg">
      <img
        className="h-44 w-full object-contain transition hover:scale-105"
        src={product.product_images[0]}
        alt={product.product_name}
      />
      <div className="px-2 py-1">
        <div className="mb-2 text-xl font-bold">{product.product_name}</div>
        <p className="cardInfo mb-2 text-base text-gray-700">
          {product.description}
        </p>
        <p className="text-sm text-gray-600">Category: {product.category}</p>
        <p className="text-sm text-gray-600">Type: {product.product_type}</p>
      </div>
      <div className="px-2 pb-2 pt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700">
          ${product.sale_price}
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700 line-through">
          ${product.original_price}
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-green-200 px-2 py-1 text-sm font-semibold text-green-700">
          In Stock: {product.number_in_stock}
        </span>
      </div>
      <div className="px-2 pb-4">
        <span className="text-sm text-gray-600">Likes: {product.likes}</span>
      </div>
    </div>
  );
};

export default ProductCard;
