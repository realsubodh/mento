import {
    IconFolderPlus,
    IconBookmarkPlus,
  } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../hooks/userHook";
import { motion, AnimatePresence } from "framer-motion";  

const Home =()=>{
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
  
    const toggleDropdown = async () => {
      if (!showDropdown) {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You're not logged in.");
          return;
        }
    
        try {
          const res = await fetch("http://localhost:3000/api/v1/folder/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await res.json();
          console.log("Fetched folders:", data); // <- This should now log an array
    
          if (res.ok && Array.isArray(data)) {
            setFolders(data);
            setShowDropdown(true);
          } else {
            toast.error("Could not fetch folders.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          toast.error("Failed to fetch folders.");
        }
      } else {
        setShowDropdown(false);
      }
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
  
    return (
        <>
        <div className="flex flex-col items-center gap-6 max-w-md px-4 w-full relative">
          {user && (
            <div className="px-8 py-6 w-[600px] text-center">
              <h2 className="text-7xl font-semibold text-black  ">
                {getGreeting()}! {user?.name?.split(" ")[0] ?? ""}
              </h2>
            </div>
          )}
        </div>

        
        <div className="relative w-[600px] bg-white text-black rounded-3xl shadow-lg p-6 pt-8 pb-25 group">
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
              className="rounded-full p-1.5 hover:bg-blue-600 hover:text-white cursor-pointer"
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
                  className="absolute top-4 left-0 w-48 bg-white shadow-lg rounded-md z-50 "
                >
                  {folders.map((folder) => (
                    <div
                      key={folder._id}
                      onClick={() => handleFolderSelect(folder.name)}
                      className="px-4 py-2 hover:bg-gray-100  cursor-pointer text-black"
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
              className="rounded-full p-1.5 hover:bg-blue-600 hover:text-white cursor-pointer"
              title="Add Link"
            >
              <IconBookmarkPlus className="w-6 h-6" />
            </button>
          </div>
        </div></>
    )
}

export default Home