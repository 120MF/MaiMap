"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { getSuggestion } from "@/lib/QMapSuggestion";
import { suggestion } from "@/types/suggestion";

import { BsSlashSquareFill } from "react-icons/bs";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      setIsSuggestionsOpen(true);
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
    setIsSuggestionsOpen(false);
  }

  return (
    <div className="relative flex flex-1 z-30">
      <div className="w-full flex">
        <Input
          label="输入地点"
          radius="none"
          size="sm"
          value={inputValue}
          variant="faded"
          onValueChange={setInputValue}
        />

        <Button
          disableAnimation={!inputValue}
          isIconOnly
          size="lg"
          radius="none"
          onClick={() => {
            setIsSuggestionsOpen((state) => !state);
          }}
        >
          {inputValue ? (
            isSuggestionsOpen ? (
              <FaAngleUp />
            ) : (
              <FaAngleDown />
            )
          ) : (
            <BsSlashSquareFill />
          )}
        </Button>
      </div>
      {suggestions &&
        suggestions.length > 0 &&
        !isLoading &&
        isSuggestionsOpen && (
          <div className="absolute top-full mt-1 w-full">
            <Card fullWidth isBlurred className="h-96" radius="sm">
              <CardHeader className="h-10">搜索结果</CardHeader>
              <CardBody className="custom-scrollbar px-0 py-0">
                {suggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    isBlurred
                    isHoverable
                    isPressable
                    className="min-h-28"
                    radius="none"
                    onClick={() => {
                      setInputValue(suggestion.title);
                      handleSearch(suggestion.location);
                    }}
                  >
                    <CardBody className="h-auto flex justify-center">
                      <p className="text-xl block">{suggestion.title}</p>
                      <p className="text-md block">{suggestion.address}</p>
                    </CardBody>
                  </Card>
                ))}
              </CardBody>
            </Card>
          </div>
        )}
      {isLoading && (
        <ul className="absolute top-full left-0 w-full bg-background border border-gray-200 mt-1 rounded-md shadow-lg">
          <li className="px-4 py-2 bg-background cursor-not-allowed">
            加载中……
          </li>
        </ul>
      )}
    </div>
  );
}
