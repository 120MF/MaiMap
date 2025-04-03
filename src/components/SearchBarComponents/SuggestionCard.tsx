import { Card, CardBody } from '@heroui/card';

import type { suggestion } from '@/types/suggestion';

class SuggestionCardProps {
  suggestion!: suggestion;
  handleClick!: (arg0: suggestion) => void;
}

function SuggestionCard({ suggestion, handleClick }: SuggestionCardProps) {
  return (
    <Card
      isBlurred
      isHoverable
      isPressable
      className="min-h-28"
      radius="none"
      onPress={() => {
        if (handleClick) {
          handleClick(suggestion);
        }
      }}
    >
      <CardBody className="h-auto flex justify-center">
        <p className="text-xl block">{suggestion.title}</p>
        <p className="text-md block">{suggestion.address}</p>
      </CardBody>
    </Card>
  );
}

export default SuggestionCard;
