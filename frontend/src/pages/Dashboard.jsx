import {
  IconHome,
  IconBookmark,
  IconFolderOpen,
  IconUserCircle,
} from "@tabler/icons-react";
import logo from "../assets/logomento.png";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import { useUser } from "../hooks/userHook";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import SkeletonPage from "../components/ui/SkeletonPage";

export const Dashboard = () => {
  const user = useUser();
  if (!user) {
    return <div className="text-center text-white mt-10">Loading user...</div>;
  }

  return (
    <div className="h-screen">
      {/* Sidebar */}
      <aside className="fixed z-50">
        <Sidebar>
          <SidebarBody>
            <div>
              <img src={logo} alt="Logo" className="h-25 w-auto mt-0" />
            </div>
            <SidebarLink
              link={{
                href: "/dashboard",
                label: "Home",
                icon: <IconHome className="text-black" size={20} />,
              }}
            />
            <SidebarLink
              link={{
                href: "/bookmarks",
                label: "Bookmarks",
                icon: <IconBookmark className="text-black" size={20} />,
              }}
            />
            <SidebarLink
              link={{
                href: "/dashboard/folders",
                label: "Folders",
                icon: <IconFolderOpen className="text-black" size={20} />,
              }}
            />
            <SidebarLink
              className="absolute bottom-4 text-black text-md rounded-full p-1 transition-colors duration-200"
              link={{
                href: "/profile",
                label: `${user.name}`,
                icon: <IconUserCircle size={30} />,
              }}
            />
          </SidebarBody>
        </Sidebar>
      </aside>

      {/* Main content */}
      <main className="pl-[72px] flex flex-col justify-center items-center min-h-screen w-full">
        <Suspense fallback={<SkeletonPage />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
