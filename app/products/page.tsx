"use client";
import React, { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { getShoesPaginated, searchShoes } from "@/lib/vehicleQueries";
import Loading from "@/components/utils/loading";
import ProductCard2 from "@/components/product/product-image-card";

const LIMIT = 12;

 function ProductList() {
  const [items, setItems] = useState<any[]>([]);
  const [view, setView] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const categorySlug = searchParams.get("category") || undefined;

  // Initial + category change
  const initFetch = useCallback(async () => {
    try {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      setItems([]);
      setView([]);

      const data = (await getShoesPaginated(1, LIMIT, categorySlug)) || [];
      setItems(data);
      setView(data);
      setHasMore(data.length === LIMIT);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initFetch();
  }, [initFetch]);

  // Search
  useEffect(() => {
    const run = async () => {
      if (!searchTerm) {
        setView(items);
        setHasMore(true); // allow pagination again when search cleared
        return;
      }
      setSearchLoading(true);
      try {
        const res = (await searchShoes(searchTerm)) || [];
        setView(res);
        setHasMore(false); // disable infinite scroll while searching
      } catch (e) {
        console.error("Error searching:", e);
      } finally {
        setSearchLoading(false);
      }
    };
    run();
  }, [searchTerm, items]);

  // Load more
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || !!searchTerm) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const next = (await getShoesPaginated(nextPage, LIMIT, categorySlug)) || [];
      if (next.length > 0) {
        setItems((p) => [...p, ...next]);
        setView((p) => [...p, ...next]);
        setPage(nextPage);
        setHasMore(next.length === LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Error loading more:", e);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, searchTerm, page, categorySlug]);

  // Observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      {
        threshold: 0,          // trigger as soon as it appears
        rootMargin: "400px 0px" // prefetch before reaching the bottom
      }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  if (loading) return <Loading />;
  if (error) {
    toast(error);
    return null;
  }

  return (
    <div className="md:mx-28 mx-4">
      {searchTerm && <h2 className="mt-5 font-bold">Search results for {searchTerm}.</h2>}
      {searchLoading && <Loading />}

      {!searchLoading && view.length === 0 ? (
        <div className="flex flex-col justify-center max-w-96 mx-auto space-y-4">
          <p className="text-center text-lg text-muted-foreground font-bold mt-6">
            Couldn't find what you're looking for? Contact us via WhatsApp.
          </p>
          <Link href={`https://wa.me/${site.phone}?text=${encodeURIComponent("Hi")}`} target="_blank">
            <div className="flex justify-center">
              <Button className="mx-auto bg-green-500 text-white hover:bg-green-600">
                Chat via WhatsApp
              </Button>
            </div>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 mt-6">
            {view.map((p) => (
              <ProductCard2 key={p._id} product={p} />
            ))}
          </div>

          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-8">
              {loadingMore ? <Loading /> : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
}

