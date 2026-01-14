import { MenuItem } from "@/types/menu";

export const locateMenuItems = (
  rootItems: MenuItem[],
  navigationPath: string[]
): MenuItem[] => {
  if (navigationPath.length === 0) return rootItems;

  let currentLevel: MenuItem[] = rootItems;
  for (const menuId of navigationPath) {
    const targetItem = currentLevel.find((item) => item.id === menuId);
    if (!targetItem?.submenu) return rootItems;
    currentLevel = targetItem.submenu;
  }
  return currentLevel;
};

export const createNavigationHandlers = (
  setNavigationHistory: React.Dispatch<React.SetStateAction<string[]>>,
  setSlideDirection: React.Dispatch<React.SetStateAction<1 | -1>>,
  navigationHistory: string[],
  onClose: () => void
) => {
  const proceedToNextLevel = (menuId: string) => {
    setSlideDirection(1);
    setNavigationHistory((previousPath) => [...previousPath, menuId]);
  };

  const returnToPreviousLevel = () => {
    if (navigationHistory.length > 0) {
      setSlideDirection(-1);
      setNavigationHistory((previousPath) => previousPath.slice(0, -1));
    }
  };

  const closeHandler = (isAtMainMenu: boolean) => {
    if (!isAtMainMenu) {
      returnToPreviousLevel();
    } else {
      onClose();
    }
  };

  return {
    proceedToNextLevel,
    returnToPreviousLevel,
    closeHandler,
  };
};
