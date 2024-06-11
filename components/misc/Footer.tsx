import Image from "next/image";
import Link from "next/link";
import React from "react";

import stripe from "../../public/stripe.svg";

const Footer = () => {
  return (
    <div className="w-full h-80  bg-gray-800 text-white flex flex-col justify-center items-center">
      <Link href="/" className="text-xl font-bold">
        <Image alt="stripeIcon" src={stripe} width={120} height={140} />
      </Link>
      <p className="pt-6 text-center">
        Copyright © 1998 - 2024 NeoTech®. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
