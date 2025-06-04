import React, { useEffect, useState } from "react";
import { IconFolder } from "@tabler/icons-react";

const defaultFolders = ["YouTube", "Instagram", "Twitter"];

export const Folders = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    // You can later replace this with backend call
    setFolders(defaultFolders);
  }, []);

  return (
    <div className="w-full px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Your Folders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 border border-gray-200 hover:shadow-lg transition"
          >
            <IconFolder className="text-indigo-600" size={28} />
            <span className="text-lg font-medium text-gray-800">{folder}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
