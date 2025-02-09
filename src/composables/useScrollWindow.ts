export interface ScrollWindowUtils {
  autoScrollOnDrag: (event: DragEvent) => void;
  startScrolling: (speed: number) => void;
  stopScrolling: () => void;
}
export function useScrollWindow({
  scrollThresholld = 100,
  scrollSpeed = 10,
}: {
  scrollThresholld?: number;
  scrollSpeed?: number;
}): ScrollWindowUtils {
  let scrollInterval: number | null = null;

  const autoScrollOnDrag = (event: DragEvent) => {
    const { clientY } = event;
    const windowHeight = window.innerHeight;
    const topThreshold = scrollThresholld;
    const bottomThreshold = windowHeight - scrollThresholld;
    if (clientY < topThreshold) {
      startScrolling(-scrollSpeed);
    } else if (clientY > bottomThreshold) {
      startScrolling(scrollSpeed);
    } else {
      stopScrolling();
    }
  };

  const startScrolling = (speed: number) => {
    if (scrollInterval) return;
    scrollInterval = window.setInterval(() => {
      window.scrollBy(0, speed);
    }, 16);
  };
  const stopScrolling = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  };
  return {
    autoScrollOnDrag,
    startScrolling,
    stopScrolling,
  };
}
