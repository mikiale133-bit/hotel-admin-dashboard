import { Bed, BookIcon, LayoutDashboard, Settings, User2 } from "lucide-react";
export const navitems = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard
  },
  {
    label: "Rooms",
    to: "/rooms",
    icon: Bed
  },
  {
    label: "Bookings",
    to: "/bookings",
    icon: BookIcon
  },
  {
    label: "Guests",
    to: "/guests",
    icon: User2
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings
  },
]