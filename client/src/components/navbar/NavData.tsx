import { FaRegCalendarAlt, FaUsers, FaHorse } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

export const NavData = [
  {
    label: "Kalendar",
    Icon: FaRegCalendarAlt,
    path: "/",
  },
  {
    label: "Animatori",
    Icon: FaUsers,
    path: "/animators",
  },
  {
    label: "Maskote",
    Icon: FaHorse,
    path: "/mascotas",
  },
  {
    label: "Lokacije",
    Icon: MdMyLocation,
    path: "/locations",
  },
  {
    label: "Finansije",
    Icon: TbReportSearch,
    path: "/finance",
  },
];
