import { Button } from '@heroui/button';

import IconAngleDown from '@/components/icons/IconAngleDown';
import IconAngleUp from '@/components/icons/IconAngleUp';
import IconSlashSquareFill from '@/components/icons/IconSlashSquareFill';

class DrawerControlButtonProps {
  inputValue: string | undefined;
  isSuggestionsOpen: boolean | undefined;
  handleClick: (() => void) | undefined;
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
