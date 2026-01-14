"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import useMeasure from "react-use-measure";
import * as Vaul from "vaul";
import { MenuItem, MenuProps } from "@/types/menu";
import {
  NavigationDirection,
  TRANSITION_DURATION,
  EASING_CONFIG,
  createNavigationAnimation,
} from "@/utils/animation";
import {
  locateMenuItems,
  createNavigationHandlers,
} from "@/utils/menuNavigation";

export function NestedDrawer({ isOpen, onClose, menuData }: MenuProps) {
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<NavigationDirection>(1);
  const [containerRef, containerBounds] = useMeasure();
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const activeMenuItems = useMemo(
    () => locateMenuItems(menuData, navigationHistory),
    [menuData, navigationHistory]
  );

  const isAtMainMenu = navigationHistory.length === 0;
  const navigationAnimation = createNavigationAnimation();

  const { proceedToNextLevel, returnToPreviousLevel } =
    createNavigationHandlers(
      setNavigationHistory,
      setSlideDirection,
      navigationHistory,
      onClose
    );

  const closeHandler = useCallback(() => {
    if (!isAtMainMenu) {
      returnToPreviousLevel();
    } else {
      onClose();
    }
  }, [isAtMainMenu, returnToPreviousLevel, onClose]);

  const onMenuInteraction = useCallback(
    (selectedItem: MenuItem) => {
      if (selectedItem.submenu && selectedItem.submenu.length > 0) {
        proceedToNextLevel(selectedItem.id);
        return;
      }

      if (selectedItem.onClick) {
        selectedItem.onClick();
        onClose();
      }
    },
    [proceedToNextLevel, onClose]
  );

  const keyboardNavigationHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeHandler();
      }
    },
    [closeHandler]
  );

  return (
    <Vaul.Root open={isOpen} onOpenChange={onClose}>
      <Vaul.Portal>
        <Vaul.Overlay
          className="fixed inset-0 z-10 bg-black/30"
          onClick={onClose}
        />
        <Vaul.Content
          className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[400px] overflow-hidden rounded-[20px] bg-white shadow-2xl outline-none sm:rounded-[24px] md:w-full"
          onKeyDown={keyboardNavigationHandler}
        >
          <motion.div
            animate={{ height: containerBounds.height }}
            transition={{ duration: 0.25, ease: EASING_CONFIG }}
          >
            <div ref={containerRef} className="relative">
              <AnimatePresence
                initial={false}
                mode="popLayout"
                custom={slideDirection}
              >
                <motion.div
                  key={navigationHistory.length}
                  custom={slideDirection}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={navigationAnimation}
                  transition={{
                    duration: TRANSITION_DURATION / 1000,
                    ease: EASING_CONFIG,
                  }}
                  className="overflow-hidden"
                >
                  <div
                    ref={drawerContentRef}
                    role="menu"
                    aria-label={
                      isAtMainMenu
                        ? "Menu"
                        : activeMenuItems[0]?.label || "Submenu"
                    }
                    className="p-3 sm:p-4 md:p-5"
                  >
                    <h2 className="sr-only">
                      {isAtMainMenu
                        ? "Navigation Menu"
                        : activeMenuItems[0]?.label || "Submenu"}
                    </h2>
                    {!isAtMainMenu && (
                      <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                        <button
                          type="button"
                          onClick={returnToPreviousLevel}
                          className="-ml-1 flex items-center gap-1.5 rounded-md p-1 text-xs font-medium text-gray-700 outline-none transition-colors hover:text-gray-900 focus-visible:ring-0 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:gap-2 sm:text-sm"
                          aria-label="Go back to previous menu"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span>Back</span>
                        </button>
                      </div>
                    )}

                    <div className="space-y-0.5 sm:space-y-1">
                      {activeMenuItems.map((menuItem) => {
                        const hasChildren = Boolean(menuItem.submenu?.length);
                        const MenuIcon = menuItem.icon;

                        return (
                          <button
                            type="button"
                            key={menuItem.id}
                            role="menuitem"
                            aria-haspopup={hasChildren ? "menu" : undefined}
                            aria-expanded={hasChildren ? false : undefined}
                            onClick={() => onMenuInteraction(menuItem)}
                            className="group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 outline-none transition-colors duration-150 hover:bg-gray-50 focus-visible:bg-gray-100 focus-visible:ring-0 focus-visible:ring-inset focus-visible:ring-blue-500 sm:gap-3 sm:px-3 sm:py-3"
                          >
                            {MenuIcon && (
                              <div className="mt-0.5 shrink-0">
                                <MenuIcon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-gray-900 sm:h-5 sm:w-5" />
                              </div>
                            )}

                            <div className="min-w-0 flex-1 text-left">
                              <div className="text-sm font-normal leading-tight text-black">
                                {menuItem.label}
                              </div>
                              {menuItem.description && (
                                <div className="mt-0.5 text-xs leading-relaxed text-gray-500">
                                  {menuItem.description}
                                </div>
                              )}
                            </div>

                            {hasChildren && (
                              <div className="mt-0.5 flex-shrink-0">
                                <ChevronRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600 sm:h-5 sm:w-5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}
