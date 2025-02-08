import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as CiIcons from "react-icons/ci";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as CgIcons from "react-icons/cg";
import * as HiIcons from "react-icons/hi";
import * as PiIcons from "react-icons/pi";
import * as GiIcons from "react-icons/gi";

type IconSet = Record<string, React.ComponentType<React.ComponentProps<"svg">>>;
const useIcon: Record<string, IconSet> = {
  md: MdIcons,
  ai: AiIcons,
  fi: FiIcons,
  tb: TbIcons,
  ri: RiIcons,
  fa: FaIcons,
  fa6: Fa6Icons,
  ci: CiIcons,
  bs: BsIcons,
  fc: FcIcons,
  io: IoIcons,
  i05: IoIcons5,
  cg: CgIcons,
  hi: HiIcons,
  pi: PiIcons,
  gi: GiIcons,
};

export default useIcon;
