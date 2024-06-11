"use client";
import { useEffect, useState } from "react";

import ProductCard from "@/components/misc/productCard";
import ListingPagination from "@/components/misc/ListingPagination";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  availabilityStatus: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${
        (currentPage - 1) * PAGE_SIZE
      }&select=id,title,price,description,availabilityStatus`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setProducts(data.products);
        if (data.total / PAGE_SIZE > 15) {
          setTotalPages(3);
        } else setTotalPages(Math.ceil(data.total / PAGE_SIZE));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-5">
        <div>
          <h1 className="text-center text-3xl font-bold py-10">
            Loading Products...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5">
      <div>
        <h1 className="text-center text-3xl font-bold py-10">Products</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              availabilityStatus={product.availabilityStatus}
              price={product.price}
            />
          ))}
        </div>
        <div className="flex items-center  justify-center my-10">
          <ListingPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
