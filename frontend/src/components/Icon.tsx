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
import { IoMdChatbubbles, IoIosArrowForward } from "react-icons/io";
import { BsClipboard2DataFill } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { FiFileText, FiCalendar, FiFolder, FiDatabase } from "react-icons/fi";
import { TbBrandDatabricks, TbBook, TbReportAnalytics } from "react-icons/tb";
import {
  MdOutlineLastPage,
  MdCached,
  MdNotificationsActive,
  MdOutlineDashboard,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
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
  IoIosArrowForward: dynamic(() => Promise.resolve(IoIosArrowForward), {
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
  HiMenuAlt3: dynamic(() => Promise.resolve(HiMenuAlt3), { ssr: false }),
  BsClipboard2DataFill: dynamic(() => Promise.resolve(BsClipboard2DataFill), {
    ssr: false,
  }),
  TbBook: dynamic(() => Promise.resolve(TbBook), {
    ssr: false,
  }),
  FiCalendar: dynamic(() => Promise.resolve(FiCalendar), {
    ssr: false,
  }),
  TbReportAnalytics: dynamic(() => Promise.resolve(TbReportAnalytics), {
    ssr: false,
  }),
  FiFolder: dynamic(() => Promise.resolve(FiFolder), {
    ssr: false,
  }),
  MdOutlineDashboard: dynamic(() => Promise.resolve(MdOutlineDashboard), {
    ssr: false,
  }),
  FiDatabase: dynamic(() => Promise.resolve(FiDatabase), {
    ssr: false,
  }),
  MdOutlineNotificationsActive: dynamic(
    () => Promise.resolve(MdOutlineNotificationsActive),
    {
      ssr: false,
    }
  ),
};

const Icon = memo(
  ({
    name,
    className,
    size,
    onClick,
  }: {
    name: keyof typeof Icons;
    className?: string;
    size?: number;
    onClick?: () => void;
  }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) return null;

    return (
      <IconComponent
        className={clsx(className)}
        size={size}
        onClick={onClick}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
