"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

import Delete from "../../public/delete.svg";
import Image from "next/image";

const CartPopup = () => {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } as any });
  };

  return (
    <div className="absolute right-16 bg-slate-50 h-96  w-[400px] min-w-80 bg-red rounded-lg shadow-lg z-10">
      {state.items.length === 0 ? (
        <div className=" text-black h-full	flex justify-center items-center">
          Your cart is empty
        </div>
      ) : (
        <div className=" flex flex-col justify-between text-black h-full">
          <ul className="w-full h-4/5 overflow-y-scroll p-4 ">
            {state.items?.map((item) => (
              <li
                key={item.id}
                className="flex w-full min-h-10 max-h-12 justify-between items-center py-4"
              >
                <span className="text-md ">
                  {item.title}{" "}
                  <span className="font-bold">({item.quantity})</span>
                </span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  <Image
                    alt="delete icon"
                    src={Delete}
                    width={20}
                    height={20}
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="h-1/5 bg-slate-200 w-full flex justify-between p-4 rounded-lg">
            <Link
              className="bg-blue-300 text-white px-4 py-2 rounded-md"
              href="/"
            >
              Go to Cart
            </Link>
            {/* <Image alt="clear cart" src={} width={30} height={30} /> */}
            <Link
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              href="/"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
