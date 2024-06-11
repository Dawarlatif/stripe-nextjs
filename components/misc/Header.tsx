"use client";
import React, { useState } from "react";
// import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import cartIcon from "../../public/cartIcon.svg";
import stripe from "../../public/stripe.svg";
import CartPopup from "./CartPopup";
import { useCart } from "@/contexts/cart-context";

const Header = () => {
  const { totalItems, state } = useCart();
  // console.log(state);
  const [showCartPopup, setShowCartPopup] = useState(false);
  return (
    <header className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        <Image alt="stripeIcon" src={stripe} width={120} height={140} />
      </Link>
      <div className="static">
        <button
          onClick={() => setShowCartPopup(!showCartPopup)}
          className="relative"
        >
          <Image alt="cartIcon" src={cartIcon} width={80} height={80} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
        {showCartPopup && <CartPopup />}
      </div>
    </header>
  );
};

export default Header;
