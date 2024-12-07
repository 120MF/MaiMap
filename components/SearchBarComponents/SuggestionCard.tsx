import { Card, CardBody } from "@nextui-org/card";

import { suggestion } from "@/types/suggestion";

class SuggestionCardProps {
  suggestion: suggestion;
  handleClick: (arg0: suggestion) => void;
}

function SuggestionCard({ suggestion, handleClick }: SuggestionCardProps) {
  return (
    <Card
      isBlurred
      isHoverable
      isPressable
      className="min-h-28"
      radius="none"
      onClick={() => {
        handleClick(suggestion);
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
