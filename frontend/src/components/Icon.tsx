import { memo } from "react";
import {
  FaRegUser,
  FaTv,
  FaSignInAlt,
  FaUserTie,
  FaRobot,
  FaSearch,
  FaPencilAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { TbBrandDatabricks } from "react-icons/tb";
import {
  MdOutlineLastPage,
  MdCached,
  MdNotificationsActive,
} from "react-icons/md";
import clsx from "clsx";
import dynamic from "next/dynamic";

const Icons = {
  FaUser: dynamic(() => Promise.resolve(FaRegUser), { ssr: false }),
  FaTv: dynamic(() => Promise.resolve(FaTv), { ssr: false }),
  FaSearch: dynamic(() => Promise.resolve(FaSearch), { ssr: false }),
  FaSignInAlt: dynamic(() => Promise.resolve(FaSignInAlt), { ssr: false }),
  FaPencilAlt: dynamic(() => Promise.resolve(FaPencilAlt), { ssr: false }),
  FaBookBookmark: dynamic(() => Promise.resolve(FaBookBookmark), {
    ssr: false,
  }),
  FaUserTie: dynamic(() => Promise.resolve(FaUserTie), { ssr: false }),
  FaRobot: dynamic(() => Promise.resolve(FaRobot), { ssr: false }),
  FaCalendarAlt: dynamic(() => Promise.resolve(FaCalendarAlt), { ssr: false }),
  IoMdChatbubbles: dynamic(() => Promise.resolve(IoMdChatbubbles), {
    ssr: false,
  }),
  PiStudentFill: dynamic(() => Promise.resolve(PiStudentFill), { ssr: false }),
  MdOutlineLastPage: dynamic(() => Promise.resolve(MdOutlineLastPage), {
    ssr: false,
  }),
  TbBrandDatabricks: dynamic(() => Promise.resolve(TbBrandDatabricks), {
    ssr: false,
  }),
  MdNotificationsActive: dynamic(() => Promise.resolve(MdNotificationsActive), {
    ssr: false,
  }),
  MdCached: dynamic(() => Promise.resolve(MdCached), { ssr: false }),
  FiFileText: dynamic(() => Promise.resolve(FiFileText), { ssr: false }),
};

const Icon = memo(
  ({ name, className }: { name: keyof typeof Icons; className?: string }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) return null;

    return <IconComponent className={clsx(className)} />;
  }
);

Icon.displayName = "Icon";

export default Icon;
