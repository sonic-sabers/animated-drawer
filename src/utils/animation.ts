export type NavigationDirection = 1 | -1;

export const TRANSITION_DURATION = 300;
export const EASING_CONFIG = [0.4, 0.0, 0.2, 1] as const;

export const createNavigationAnimation = () => ({
  enter: (direction: NavigationDirection) => ({
    x: `${110 * direction}%`,
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: NavigationDirection) => ({
    x: `${-110 * direction}%`,
    opacity: 0,
  }),
});
