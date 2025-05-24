import { Post } from "./Post"
import { useEffect, useState, useCallback } from "react"
import { Loader2 } from "lucide-react"

interface PostData {
  id: string
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: Array<{
    id: string
    username: string
    text: string
    timeAgo: string
  }>
  timeAgo: string
}

const mockPosts: PostData[] = [
  {
    id: "1",
    username: "alice_wonder",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    caption: "Beautiful sunset at the beach! 🌅 #sunset #beach #nature",
    likes: 142,
    comments: [
      { id: "1", username: "bob_builder", text: "Amazing shot! 📸", timeAgo: "2h" },
      { id: "2", username: "charlie_dev", text: "Wish I was there!", timeAgo: "1h" }
    ],
    timeAgo: "3 hours ago"
  },
  {
    id: "2",
    username: "bob_builder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
    caption: "Coffee and code ☕️ Perfect morning combo #coding #coffee #developer",
    likes: 89,
    comments: [
      { id: "3", username: "diana_photo", text: "That setup looks clean!", timeAgo: "30m" }
    ],
    timeAgo: "5 hours ago"
  },
  {
    id: "3",
    username: "charlie_dev",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=600&fit=crop",
    caption: "New project launch! 🚀 Excited to share what we've been working on",
    likes: 234,
    comments: [
      { id: "4", username: "alice_wonder", text: "Congratulations! 🎉", timeAgo: "1h" },
      { id: "5", username: "bob_builder", text: "Can't wait to try it out", timeAgo: "45m" },
      { id: "6", username: "diana_photo", text: "Looks amazing!", timeAgo: "20m" }
    ],
    timeAgo: "8 hours ago"
  },
  {
    id: "4",
    username: "diana_photo",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    caption: "Mountain hiking adventure! The view was absolutely breathtaking 🏔️",
    likes: 156,
    comments: [
      { id: "7", username: "charlie_dev", text: "Epic adventure!", timeAgo: "2h" }
    ],
    timeAgo: "12 hours ago"
  },
  {
    id: "5",
    username: "alice_wonder",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=600&fit=crop",
    caption: "Homemade pasta night! 🍝 Nothing beats fresh ingredients",
    likes: 98,
    comments: [],
    timeAgo: "1 day ago"
  }
]

export function Feed() {
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const startIndex = page * 3
    const endIndex = startIndex + 3
    const newPosts = mockPosts.slice(startIndex, endIndex)
    
    if (newPosts.length === 0) {
      setHasMore(false)
    } else {
      setPosts(prev => [...prev, ...newPosts])
      setPage(prev => prev + 1)
    }
    
    setLoading(false)
  }, [page, loading, hasMore])

  useEffect(() => {
    loadMorePosts()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMorePosts])

  return (
    <div className="max-w-md mx-auto">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          You've reached the end!
        </div>
      )}
    </div>
  )
}