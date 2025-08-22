'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getAllCategories } from "@/lib/vehicleQueries";
import { toast } from "sonner";
import Splash from "../utils/splash";
import SearchBar from "../utils/search-box";

 function CategoryGrid({className,flex_col,buttonClass,heading,buttonOnclick}:any) {
  const [vehicles, setVehicles] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data: any = await getAllCategories();
        if (!data || !Array.isArray(data)) throw new Error("Invalid product data");
        setVehicles(data);
      } catch (err) {
        setError("Failed to fetch vehicles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  if (loading) return <Splash />;

  if (!vehicles || vehicles.length === 0) {
    return <p className="font-bold text-sm p-4">No Products Found, Please contact the Store for more Information.</p>;
  }

  const displayedVehicles = vehicles || [];
  
  return (
    <div className={`${className}`}>
   {!heading &&   <h2 className="mb-3 text-xl italic">For you.</h2>}
      <div className={`grid  grid-cols-2 md:flex  place-items-center w-full  gap-3`}>
        {displayedVehicles.map((cat: any) => (
          <>
            <Link href={`/products?category=${cat.slug.current}`} className="w-full">
              <Button onClick={buttonOnclick} className={`h-20 rounded max-w-[400px]  w-full text-2xl ${buttonClass}`}>
                {cat.name}
              </Button>
            </Link>
          </>
        ))}
       {!heading && <SearchBar cat={true}/>}
      </div>
    </div>
  );
}

export default CategoryGrid;
