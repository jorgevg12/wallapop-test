import { useEffect } from "react";

//Hook make for disable scroll in body when modal is open or when is loading data.
export default function useNoScroll(isActive: boolean) {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isActive]);
}
