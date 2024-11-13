"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { getSuggestion } from "@/lib/QMapSuggestion";
import { suggestion } from "@/types/suggestion";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<suggestion[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const handler = setTimeout(async () => {
        try {
          const data = await getSuggestion(inputValue);

          setSuggestions(data);
          setIsLoading(false);
        } catch (error) {
          throw error;
        }
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [inputValue]);

  function handleSearch(input: { lat: any; lng: any }) {
    const { lat, lng } = input;
    const params = new URLSearchParams(searchParams);

    if (input) {
      params.set("lat", lat);
      params.set("lng", lng);
      params.delete("arcadeId");
    } else {
      params.delete("lat");
      params.delete("lng");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleFocus(state: boolean) {
    setIsFocus(state);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0 z-10">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"输入地点"}
        value={inputValue}
        onBlur={() =>
          setTimeout(() => {
            handleFocus(false);
          }, 100)
        }
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => handleFocus(true)}
      />
      {suggestions && suggestions.length > 0 && isFocus && !isLoading && (
        <ul className="absolute top-full left-0 w-full bg-background font-sans border border-gray-200 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => {
                setInputValue(suggestion.title);
                handleSearch(suggestion.location);
              }}
            >
              <div>{suggestion.title}</div>
              <div>{suggestion.address}</div>
            </li>
          ))}
        </ul>
      )}
      {isLoading && isFocus && (
        <ul className="absolute top-full left-0 w-full bg-background border border-gray-200 mt-1 rounded-md shadow-lg">
          <li className="px-4 py-2 bg-background cursor-not-allowed">
            加载中……
          </li>
        </ul>
      )}
    </div>
  );
}
