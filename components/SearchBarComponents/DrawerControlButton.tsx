import { Button } from "@nextui-org/button";

import IconAngleUp from "@/components/icons/IconAngleUp";
import IconAngleDown from "@/components/icons/IconAngleDown";
import IconSlashSquareFill from "@/components/icons/IconSlashSquareFill";

class DrawerControlButtonProps {
  inputValue: string;
  isSuggestionsOpen: boolean;
  handleClick: () => void;
}

function DrawerControlButton({
  inputValue,
  isSuggestionsOpen,
  handleClick,
}: DrawerControlButtonProps) {
  return (
    <Button
      isIconOnly
      disableAnimation={!inputValue}
      radius="none"
      size="lg"
      onClick={handleClick}
    >
      {inputValue ? (
        isSuggestionsOpen ? (
          <IconAngleUp />
        ) : (
          <IconAngleDown />
        )
      ) : (
        <IconSlashSquareFill />
      )}
    </Button>
  );
}

export default DrawerControlButton;
