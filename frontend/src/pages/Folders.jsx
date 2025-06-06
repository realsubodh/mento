import React, { useEffect, useState } from "react";
import { IconFolderFilled } from "@tabler/icons-react";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/folder/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log("✅ Folder data:", data);
        setFolders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch folders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse w-full px-6 pt-20">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-[20%] py-6">
      <h1 className="text-7xl font-semibold mb-5 text-black">Folders</h1>
      <div className="grid grid-row-2 sm:grid-row-2 md:grid-row-3 gap-6 cursor-pointer">
        {folders.map((folder) => (
          <div
            key={folder._id}
            className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
          >
            <IconFolderFilled size={35} className="text-[#C96342]" />
            <div>
              <h2 className="text-lg font-semibold text-black">{folder.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {folder.bookmarks.length} bookmarks
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Folders