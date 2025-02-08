import { useState, useEffect, useRef } from "react";

export const NavbarUseEffect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return {
    toggleMenu,
    isMobile,
    isOpen,
    setIsOpen,
  };
};

export const SidebarAdminUseEffect = () => {
  const [openAccount, setopenAccount] = useState(false);
  const [openChatbot, setopenChatbot] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setopenAccount(false);
        setopenChatbot(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return {
    openAccount,
    setopenAccount,
    openChatbot,
    setopenChatbot,
    dropdownRef,
  };
};
