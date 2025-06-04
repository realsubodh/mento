import {
  IconHome,
  IconBookmark,
  IconFolderOpen,
  IconUserCircle,
  IconFolderPlus,
  IconBookmarkPlus,
} from "@tabler/icons-react";
import logo from "../assets/logomento.png";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import { useUser } from "../hooks/userHook";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export const Dashboard = () => {
  const user = useUser();

  const [link, setLink] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleFolderSelect = (name) => {
    setSelectedFolder(name);
    setShowDropdown(false);
  };

  const handleAddLink = async () => {
    if (!link || !selectedFolder) {
      toast.error("Please enter a link and choose a folder.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/bookmark/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          url: link,
          folderName: selectedFolder,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Link added successfully!");
        setLink("");
        setSelectedFolder(null);
      } else {
        toast.error( "Failed to add link.");
      }
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/folder/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setFolders(data.folders || []);
      } catch (err) {
        toast.error("Failed to fetch folders.");
        console.error("Fetch error:", err);
      }
    };

    fetchFolders();
  }, []);

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
            <SidebarLink
              className="absolute bottom-4 text-white text-md rounded-full p-1 transition-colors duration-200"
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
        <div className="flex flex-col items-center gap-6 max-w-md px-4 w-full relative">
          {user && (
            <div className="px-8 py-4 w-[600px] text-center">
              <h2 className="text-7xl text-black font-semibold">
                {getGreeting()}, {user.name.split(" ")[0]}
              </h2>
            </div>
          )}
        </div>

        
        <div className="relative w-[600px] bg-white text-black rounded-2xl shadow-lg p-4 pt-5 pb-20 group">
          {/* Input Field */}
          <input
            id="linkInput"
            type="text"
            className="w-full bg-transparent text-md focus:outline-none placeholder:text-gray-500 break-normal"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste your link here..."
          />

          {/* Bottom Left: Choose Folder */}
          <div className="absolute bottom-2 left-4">
            <button
              onClick={toggleDropdown}
              className="hover:text-indigo-800"
              title="Choose Folder"
            >
              <IconFolderPlus className="w-6 h-6" />
            </button>

            {/* Dropdown with Framer Motion */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-10 left-0 w-48 bg-white shadow-lg rounded-md z-50 border"
                >
                  {folders.map((folder) => (
                    <div
                      key={folder._id}
                      onClick={() => handleFolderSelect(folder.name)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    >
                      {folder.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Right: Add Link */}
          <div className="absolute bottom-2 right-4">
            <button
              onClick={handleAddLink}
              className="hover:text-green-800"
              title="Add Link"
            >
              <IconBookmarkPlus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
