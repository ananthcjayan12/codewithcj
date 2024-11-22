import { LayoutDashboard, User, FolderKanban, FileText, Home, Info, Image, Settings } from "lucide-react"

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: User,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Home Page",
    href: "/admin/home",
    icon: Home,
  },
  {
    title: "About Page",
    href: "/admin/about",
    icon: Info,
  },
  {
    title: "Media",
    href: "/admin/media",
    icon: Image,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
] as const 