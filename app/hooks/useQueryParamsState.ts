// Source: https://dev.to/kphr99/sync-react-state-with-url-search-parameters-using-usequeryparamsstate-hook-1pgi

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
// import { useLocation } from "react-router-dom";

type UseQueryParamsStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export const useQueryParamsState = <T>(
  param: string,
  initialState: T,
): UseQueryParamsStateReturnType<T> => {
  const { replace } = useRouter();
  const pathname = usePathname();

  // State for managing the value derived from the query parameter
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialState;

    // Parse query parameter value from the URL
    const searchParams = useSearchParams();
    const paramValue = searchParams.get(param);

    return paramValue !== null ? (JSON.parse(paramValue) as T) : initialState;
  });

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(useSearchParams());

    // Update the query parameter with the current state value
    if (value !== null && value !== "") {
      currentSearchParams.set(param, JSON.stringify(value));
    } else {
      // Remove the query parameter if the value is null or empty
      currentSearchParams.delete(param);
    }

    // Update the URL with the modified search parameters
    const newUrl = [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join("?");

    // Update the browser's history without triggering a page reload
    replace(`${pathname}?${currentSearchParams.toString()}`);
  }, [param, value, pathname]);

  return [value, setValue];
};
