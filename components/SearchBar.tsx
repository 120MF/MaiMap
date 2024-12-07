"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { getSuggestion } from "@/lib/QMapSuggestion";
import { suggestion } from "@/types/suggestion";
import DrawerControlButton from "@/components/SearchBarComponents/DrawerControlButton";
import SuggestionCard from "@/components/SearchBarComponents/SuggestionCard";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 检测inputValue并搜索
  // 1s定时器防止多次触发
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

  // 点击搜索栏上的结果的回调函数
  function handleSuggestionClick(suggestion: suggestion) {
    setInputValue(suggestion.title);
    const { lat, lng } = suggestion.location;
    const params = new URLSearchParams(searchParams);

    if (suggestion.location) {
      params.set("lat", String(lat));
      params.set("lng", String(lng));
      params.delete("arcadeId");
    } else {
      params.delete("lat");
      params.delete("lng");
    }
    replace(`${pathname}?${params.toString()}`);
    setIsSuggestionsOpen(false);
  }

  function handleDrawerControlButtonClick() {
    setIsSuggestionsOpen((state) => !state);
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

        <DrawerControlButton
          handleClick={handleDrawerControlButtonClick}
          inputValue={inputValue}
          isSuggestionsOpen={isSuggestionsOpen}
        />
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
                  <SuggestionCard
                    key={index}
                    handleClick={handleSuggestionClick}
                    suggestion={suggestion}
                  />
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
