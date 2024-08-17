"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const defaultText = searchParams.get("query")?.toString() || "";

  // Might be able to get the same functionality with a ref instead of state.
  const [inputText, setInputText] = useState(defaultText);
  const pathname = usePathname();
  const { replace } = useRouter();
  // Debounce with useEffect.

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (inputText) {
        params.set("query", inputText);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
      // setSearchTerm(inputText);
      console.log(inputText);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputText]);

  function handleChange(term: string) {
    setInputText(term);
  }

  // TODO: Update example with useRef
  // Debounce with useRef
  // const timer = useRef<ReturnType<typeof setTimeout> | null>();
  // function handleSearch(term: string) {
  //   if (timer.current) {
  //     clearTimeout(timer.current);
  //   }

  //   timer.current = setTimeout(() => {
  //     timer.current = null;
  //     console.log(term);
  //     setSearchTerm(term);
  //   }, 500);
  // }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // onChange={(e) => handleSearch(e.target.value)}
        onChange={(e) => handleChange(e.target.value)}
        // Difers from the tutorial in that we are using a debounced solution.
        // defaultValue={searchParams.get("query")?.toString()}
        value={inputText}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
