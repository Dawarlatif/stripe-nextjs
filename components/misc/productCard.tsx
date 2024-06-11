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
import { Button } from "../ui/button";

interface ProductCardProps {
  id: string;
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
        <Button onClick={handleAddToCart} variant="custom">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
