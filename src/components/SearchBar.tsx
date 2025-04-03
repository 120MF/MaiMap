'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import { useEffect, useState } from 'react';

import DrawerControlButton from '@/components/SearchBarComponents/DrawerControlButton';
import SuggestionCard from '@/components/SearchBarComponents/SuggestionCard';
import { getSuggestion } from '@/lib/QMapSuggestion.ts';
import type { suggestion } from '@/types/suggestion';

import { useMap } from '@/stores/useMap.tsx';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const update_center = useMap((state) => state.update_center);

  // 检测inputValue并搜索
  // 1s定时器防止多次触发
  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      setIsSuggestionsOpen(true);
      const handler = setTimeout(async () => {
        const data = await getSuggestion(inputValue);

        setSuggestions(data);
        setIsLoading(false);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
    setSuggestions([]);
    setIsLoading(false);
  }, [inputValue]);

  // 点击搜索栏上的结果的回调函数
  function handleSuggestionClick(suggestion: suggestion) {
    setInputValue(suggestion.title);
    const { lat, lng } = suggestion.location;

    if (suggestion.location) {
      update_center([lng, lat]);
    }
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
                {suggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.title}
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
