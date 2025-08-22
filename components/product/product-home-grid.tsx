"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import Splash from "../utils/splash";
import ProductCard2 from "./product-image-card";
import { getShoesPaginated } from "@/lib/vehicleQueries"; // 👈 use paginated query

function ProductHomeGrid() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef<boolean>(false);

  const fetchVehicles = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const data: any = await getShoesPaginated(page, 6, ""); // 👈 fetch only 6 per page
      if (!data || !Array.isArray(data))
        throw new Error("Invalid product data");

      setVehicles((prev) => [...prev, ...data]);
      setHasMore(data.length === 6); // 👈 if less than 6, no more pages
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [page]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  if (loading && page === 1) return <Splash />;

  if (!vehicles || vehicles.length === 0) {
    return (
      <p className="font-bold text-sm">
        No Products Found, Please contact the Store for more Information.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-3 text-xl italic">The Trend.</h2>
      <div
        className="grid 
  grid-cols-1            /* 📱 mobile: single column */
  sm:grid-cols-2         /* 📱➡️ tablet: 2 columns */
  md:grid-cols-3         /* 💻 small desktop: 3 */
  lg:grid-cols-4         /* 🖥️ bigger desktop: 4 */
  xl:grid-cols-5         /* 🖥️ wide screens: 5 */
  gap-6"
      >
        {vehicles.map((p) => (
          <ProductCard2 key={p._id} product={p} />
        ))}
      </div>

      {/* Loader for infinite scroll */}
      <div ref={loaderRef} className="flex justify-center p-3">
        {loading && <p>Loading more products...</p>}
        {!hasMore && <p>No more products to load.</p>}
      </div>
    </div>
  );
}

export default ProductHomeGrid;
