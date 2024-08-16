"use client";

import type { ChangeEvent } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

function SearchBar() {
  interface Query {
    query: string;
  }

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<Query>({
    query: searchParams.get("query") || "",
  });

  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const updateSearchQuery = (updatedQuery: Query) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key as keyof Query]) {
        params.set(key, updatedQuery[key as keyof Query]);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    const updatedPath = queryString ? `/?${queryString}` : pathname;

    router.push(updatedPath);
  };

  useEffect(() => {
    updateSearchQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <form className="mb-4 w-full md:mb-0 md:w-1/4">
      <label className="hidden">Search</label>
      <input
        className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full text-black"
        id="query"
        name="query"
        placeholder="Search movies"
        type="text"
        value={searchQuery.query}
        onChange={handleInputChange}
      />
      <button className="hidden">Submit</button>
    </form>
  );
}

export default SearchBar;
