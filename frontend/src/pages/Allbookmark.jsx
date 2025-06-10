import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const AllBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  
  const token = localStorage.getItem("token");

  // Fetch bookmarks
  useEffect(() => {
    const fetchAllBookmarks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://localhost:3000/api/v1/bookmark/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookmarks(res.data.bookmarks);
      } catch (error) {
        console.error("Failed to fetch all bookmarks", error);
        setError("Failed to load bookmarks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookmarks();
  }, [token]);

  // Utility functions
  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getUrlLength = (url) => url.length;

  const getGridSpan = (url) => {
    const length = getUrlLength(url);
    if (length > 100) return 'lg:col-span-2 lg:row-span-2';
    if (length > 70) return 'lg:col-span-2';
    if (length > 40) return 'md:col-span-2 lg:col-span-1';
    return '';
  };

  // Filtered and sorted bookmarks
  const processedBookmarks = useMemo(() => {
    let filtered = bookmarks.filter(bookmark =>
      bookmark.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDomain(bookmark.url).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "domain":
          return getDomain(a.url).localeCompare(getDomain(b.url));
        default:
          return 0;
      }
    });

    return sorted;
  }, [bookmarks, searchTerm, sortBy]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded-lg w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-300 rounded-2xl h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Stats */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-black bg-clip-text mb-2">
                All Bookmarks
              </h1>
              <p className="text-gray-600 text-lg ml-1">
                {processedBookmarks.length} bookmark{processedBookmarks.length !== 1 ? 's' : ''} in your collection
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search bookmarks, titles, or domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pr-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">By Title</option>
              <option value="domain">By Domain</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bookmarks Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
            {processedBookmarks.map((bookmark) => {
              const domain = getDomain(bookmark.url);
              const favicon = getFaviconUrl(bookmark.url);
              const gridSpan = getGridSpan(bookmark.url);
              
              return (
                <div
                  key={bookmark._id}
                  className={`
                    ${gridSpan}
                    group relative overflow-hidden rounded-2xl 
                    bg-white/80 backdrop-blur-sm border border-white/20
                    shadow-lg hover:shadow-2xl transition-all duration-500
                    hover:scale-[1.02] hover:-translate-y-1
                    cursor-pointer min-h-[180px]
                  `}
                  onClick={() => window.open(bookmark.url, '_blank')}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      {favicon && (
                        <img 
                          src={favicon} 
                          alt={domain}
                          className="w-8 h-8 rounded-lg shadow-sm flex-shrink-0 mt-1"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
                          {bookmark.title || "Untitled Bookmark"}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium truncate">
                          {domain}
                        </p>
                      </div>
                    </div>

                    {/* URL Display */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 mb-4">
                        <p className="text-sm text-gray-600 break-all leading-relaxed line-clamp-3">
                          {bookmark.url}
                        </p>
                      </div>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`
                            w-2 h-2 rounded-full
                            ${getUrlLength(bookmark.url) > 100 ? 'bg-red-400' : 
                              getUrlLength(bookmark.url) > 70 ? 'bg-yellow-400' : 
                              getUrlLength(bookmark.url) > 40 ? 'bg-blue-400' : 'bg-green-400'}
                          `}></div>
                          <span className="text-xs text-gray-500">
                            {formatDate(bookmark.createdAt)}
                          </span>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {processedBookmarks.map((bookmark) => {
              const domain = getDomain(bookmark.url);
              const favicon = getFaviconUrl(bookmark.url);
              
              return (
                <div
                  key={bookmark._id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => window.open(bookmark.url, '_blank')}
                >
                  <div className="p-6 flex items-center gap-4">
                    {favicon && (
                      <img 
                        src={favicon} 
                        alt={domain}
                        className="w-10 h-10 rounded-lg shadow-sm flex-shrink-0"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
                        {bookmark.title || "Untitled Bookmark"}
                      </h3>
                      <p className="text-blue-600 text-sm truncate mb-2">
                        {bookmark.url}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{domain}</span>
                        <span>•</span>
                        <span>{formatDate(bookmark.createdAt)}</span>
                        <span>•</span>
                        <span>{getUrlLength(bookmark.url)} characters</span>
                      </div>
                    </div>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {processedBookmarks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No bookmarks found" : "No bookmarks yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No bookmarks match "${searchTerm}". Try a different search term.`
                : "Start adding bookmarks to see them here."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookmarks;