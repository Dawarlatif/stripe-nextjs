"use client";
import React from "react";
import { useCart } from "@/contexts/cart-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  availabilityStatus: string;
  price: number;
}

const ProductCard = ({
  id,
  title,
  description,
  availabilityStatus,
  price,
}: ProductCardProps) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    // Dispatch an action to add the product to the cart
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        title,
        description,
        availabilityStatus,
        price,
      },
    });
  };

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{availabilityStatus}</p>
      </CardContent>
      <CardFooter className=" justify-between">
        <p>
          {price} <span className="font-bold">USD</span>
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
