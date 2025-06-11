import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const FolderView = () => {
    const { folderId } = useParams()
    const [bookmarks, setBookmarks] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/bookmark/folder/${folderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setBookmarks(res.data.bookmarks)
            } catch (error) {
                console.log("error fetching bookmarks", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBookmarks()
    }, [folderId])

    // Function to determine grid span based on URL length
    const getGridSpan = (url) => {
        const length = url.length
        if (length > 100) return 'lg:col-span-3 lg:row-span-2' // Extra large
        if (length > 70) return 'lg:col-span-2 lg:row-span-2'  // Large
        if (length > 40) return 'lg:col-span-2'                // Medium wide
        return 'lg:col-span-1'                                 // Small
    }

    // Function to get domain from URL
    const getDomain = (url) => {
        try {
            return new URL(url).hostname.replace('www.', '')
        } catch {
            return url
        }
    }

    // Function to get favicon URL
    const getFaviconUrl = (url) => {
        try {
            const domain = new URL(url).hostname
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
        } catch {
            return null
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-gray-300 rounded-2xl h-32"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-60 pt-11">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold  bg-clip-text text-black mb-2">
                        Your Bookmarks
                    </h1>
                    <p className="text-gray-600 ml-1.5">
                        {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} in this collection
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
                    {bookmarks.map((bookmark, index) => {
                        const gridSpan = getGridSpan(bookmark.url)
                        const domain = getDomain(bookmark.url)
                        const favicon = getFaviconUrl(bookmark.url)
                        
                        return (
                            <div
                                key={bookmark._id}
                                className={`
                                    ${gridSpan}
                                    group relative overflow-hidden rounded-2xl 
                                    bg-white/80 backdrop-blur-sm border border-white/20
                                    shadow-lg hover:shadow-2xl transition-all duration-300
                                    hover:scale-[1.02] hover:-translate-y-1
                                    cursor-pointer min-h-[120px]
                                `}
                                onClick={() => window.open(bookmark.url, '_blank')}
                            >
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Content */}
                                <div className="relative p-6 h-full flex flex-col justify-between">
                                    {/* Header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        {favicon && (
                                            <img 
                                                src={favicon} 
                                                alt={domain}
                                                className="w-8 h-8 rounded-lg shadow-sm flex-shrink-0"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
                                                {bookmark.title || "Untitled Bookmark"}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium">
                                                {domain}
                                            </p>
                                        </div>
                                    </div>

                                    {/* URL Display */}
                                    <div className="mt-auto">
                                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                            <p className="text-sm text-blue-700 break-all leading-relaxed">
                                                {bookmark.url}
                                            </p>
                                        </div>
                                        
                                        {/* URL Length Indicator */}
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`
                                                    w-2 h-2 rounded-full
                                                    ${bookmark.url.length > 100 ? 'bg-red-400' : 
                                                      bookmark.url.length > 70 ? 'bg-yellow-400' : 
                                                      bookmark.url.length > 40 ? 'bg-blue-400' : 'bg-green-400'}
                                                `}></div>
                                                <span className="text-xs text-gray-500">
                                                    {bookmark.url.length} chars
                                                </span>
                                            </div>
                                            
                                            {/* External Link Icon */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        )
                    })}
                </div>

                {/* Empty State */}
                {bookmarks.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookmarks found</h3>
                        <p className="text-gray-500">This folder doesn't contain any bookmarks yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FolderView