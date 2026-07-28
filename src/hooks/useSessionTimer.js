import { useEffect, useRef } from "react";

export default function useSessionTimer({ isRunning, minutes, onTick }) {
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (!isRunning || minutes <= 0) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      onTickRef.current();
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, minutes]);
}
