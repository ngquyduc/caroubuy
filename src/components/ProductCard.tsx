"use client";

import { Product } from "@/app/types";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <div
      className="cursor-pointer card w-72 bg-base-100 shadow-xl"
      onClick={() => console.log(props.product.title)}
    >
      <div className="card-body">Author</div>
      <figure>
        <Image
          priority={false}
          src={props.product.images[0]}
          alt={props.product.category || "Product Image"}
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">{props.product.title}</h2>
        <p>S${props.product.price}</p>
        <p>{props.product.condition}</p>
      </div>
    </div>
  );
};
