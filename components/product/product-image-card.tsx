"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { isProductInCart } from "@/lib/cart";
import AddToCartButton from "../cart/cart-buttons/add-to-cart";
import { Button } from "../ui/button";

export interface Product {
  _id: string;
  name: string;
  category: {
    name: string;
    slug: string;
  };
  material: string;
  waterResistance: string;
  movementType: string;
  caseSize: string;
  images: { asset: { url: string } }[];
  description: string;
  price: number;
  offerPrice?: number;
  soldOut: boolean;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  noLink?: boolean;
  onClick?: () => void;
}

export default function ProductCard2({
  product,
  className = "",
  noLink = false,
  onClick,
}: ProductCardProps) {
  const { _id, name, images, price, offerPrice, soldOut } = product;
  const [isInCart, setIsInCart] = React.useState(false);

  React.useEffect(() => {
    setIsInCart(isProductInCart(_id));

    const handleCartUpdate = () => {
      setIsInCart(isProductInCart(_id));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [_id]);

  const cardContent = (
    <div
      onClick={noLink ? onClick : undefined}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden ${className}`}
      style={{
        cursor: noLink ? "pointer" : "default",
        minWidth: "220px", // prevents collapsing
      }}
    >
      {/* Sold Out Badge */}
      {soldOut && (
        <div className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full z-20">
          Sold Out
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-[3/4] bg-gray-50">
        <Image
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            soldOut ? "grayscale" : ""
          }`}
          src={images[0]?.asset.url || "/placeholder-image.jpg"}
          alt={name || "Luxury product"}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow justify-between p-4 text-center">
        <div>
          <h2 className="text-base font-semibold tracking-wide text-gray-900 line-clamp-1">
            {name || "Luxury Product"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Trendy Hub</p>

          {/* Price */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {offerPrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ₹ {offerPrice}
                </span>
                <span className="line-through text-sm text-gray-400">
                  ₹ {price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ₹ {price || "NA"}
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="mt-4">
          {!soldOut ? (
            <AddToCartButton product={product} />
          ) : (
            <Button
              className="w-full rounded bg-gray-200 text-gray-500"
              disabled
            >
              Sold Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return noLink ? cardContent : <Link href={`/p/${_id}`}>{cardContent}</Link>;
}
