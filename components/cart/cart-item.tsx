// components/CartItem.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface CartItemProps {
  item: {
    _id: string;
    name: string; // Updated from productName to name
    category: {
      name: string;
      slug: string;
    };
    images: { asset: { url: string } }[];
    offerPrice?: number;
    price: number;
    selectedSize?: number; // Optional selected size
    freeProduct?: {
      _id: string;
      name: string; // Updated from productName to name
      category: {
        name: string;
        slug: string;
      };
      images: { asset: { url: string } }[];
      selectedSize?: number; // Optional selected size
    } | null;
  };
  onRemove?: () => void; // Callback for removing the item
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div key={item._id}>
      {/* Main Product */}
      <div
        className={`flex items-center w-full gap-4 ${
          !item.freeProduct
            ? "rounded-3xl border"
            : "rounded-t-3xl border border-b-0"
        } bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950`}
      >
        {/* Product Image */}
        <div className="relative w-20 h-20 rounded-md overflow-hidden">
          {item.images && (
            <Link href={`/p/${item._id}`}>
              <Image
                src={item.images[0]?.asset.url || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </Link>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <Link href={`/p/${item._id}`}>
            <h3 className="text-lg font-medium">{item.name}</h3>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            {item.category.name}
          </p>
          {item.selectedSize && (
            <p className="text-sm text-muted-foreground">
              Size: {item.selectedSize}
            </p>
          )}
        </div>

        {/* Remove Button */}
        <div className="flex items-center gap-2">
          {onRemove && (
            <Button variant="secondary" size="icon" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Price */}
        <div className="text-right font-medium">
          ₹{item.offerPrice || item.price}
        </div>
      </div>

      {/* Free Product */}
      {item.freeProduct && (
        <div className="flex relative items-center gap-4 rounded-b-3xl border-2 border-bw border-dashed p-4 shadow-sm">
          {/* Free Product Image */}
          <div className="relative w-20 h-20 rounded-md overflow-hidden">
            <Link href={`/p/${item.freeProduct._id}`}>
              <Image
                src={
                  item.freeProduct.images[0]?.asset.url || "/placeholder.svg"
                }
                alt={item.freeProduct.name}
                fill
                className="object-cover"
              />
            </Link>
          </div>

          {/* Free Product Badge */}
          <div className="absolute -top-2 -right-1">
            <Badge>Free Product</Badge>
          </div>

          {/* Free Product Details */}
          <div className="flex-1">
            <Link href={`/p/${item.freeProduct._id}`}>
              <h3 className="text-lg font-medium">{item.freeProduct.name}</h3>
            </Link>
            <p className="text-gray-500">{item.freeProduct.category.name}</p>
            {item.freeProduct.selectedSize && (
              <p className="text-sm text-muted-foreground">
                Size: {item.freeProduct.selectedSize}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}