import { usePathname } from "next/navigation";
import { useRef } from "react";

export const hiddenNavbar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname() || "";

  return (
    pathname.startsWith("/account") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/404") ||
    pathname.startsWith("/e-learning") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/akademik")
  );
};

export const InputTypeNumber = () => {
  const inputnumber = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  return {
    inputnumber,
    handleInput,
  };
};
