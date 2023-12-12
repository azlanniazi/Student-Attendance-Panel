import { useEffect, useRef } from "react";

function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClick, true);

    return document.addEventListener("click", handleClick, true);
  }, [handler]);

  return ref;
}

export default useOutsideClick;
