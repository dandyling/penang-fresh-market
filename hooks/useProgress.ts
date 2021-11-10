import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "../components/PageWrapper";

export const useProgress = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);

  const startProgress = () => {
    setIsLoading(true);
  };

  // Stop loader on page load
  const stopProgress = () => {
    setIsLoading(false);
  };

  useEffect(stopProgress, [stopProgress]);

  return {
    startProgress,
    stopProgress,
  };
};
