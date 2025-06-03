import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import { IconHome, IconBookmark, IconFolderOpen } from "@tabler/icons-react";
import logo from "../assets/logomento.png";
import { useUser } from "../hooks/userHook";

export const Dashboard = () => {
  const user = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="flex">
      <Sidebar>
        <SidebarBody>
          <div>
            <img src={logo} alt="Logo" className="h-25 w-auto mt-[-20px]" />
          </div>
          <SidebarLink
            link={{
              href: "/dashboard",
              label: "Home",
              icon: <IconHome className="text-white" size={20} />,
            }}
          />
          <SidebarLink
            link={{
              href: "/bookmarks",
              label: "Bookmarks",
              icon: <IconBookmark className="text-white" size={20} />,
            }}
          />
          <SidebarLink
            link={{
              href: "/folders",
              label: "Folders",
              icon: <IconFolderOpen className="text-white" size={20} />,
            }}
          />
          {user && (
            <div className="absolute bottom-4 left-4 text-white text-sm opacity-70">
              <strong>{user.name}</strong>
            </div>
          )}
        </SidebarBody>
      </Sidebar>

      <main className="p-6 flex-1">
        {user && (   // conditional render
          <h2 className="text-2xl font-semibold text-white">
            {getGreeting()}, {user.name.split(" ")[0]}
          </h2>
        )}
      </main>
    </div>
  );
};
