import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface PostProps {
  id: string
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: Comment[]
  timeAgo: string
}

interface Comment {
  id: string
  username: string
  text: string
  timeAgo: string
}

export function Post({ username, avatar, image, caption, likes, comments, timeAgo }: PostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)

  return (
    <Card className="border-0 border-b border-gray-200 rounded-none">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">{username}</span>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Image */}
        <div className="aspect-square">
          <img 
            src={image} 
            alt="Post content" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <MessageCircle className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Send className="w-6 h-6" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Likes */}
          <div className="mb-2">
            <span className="font-semibold text-sm">{likes + (isLiked ? 1 : 0)} likes</span>
          </div>

          {/* Caption */}
          <div className="mb-2">
            <span className="font-semibold text-sm mr-2">{username}</span>
            <span className="text-sm">{caption}</span>
          </div>

          {/* Comments */}
          {comments.length > 0 && (
            <div className="space-y-1">
              {!showAllComments && comments.length > 2 && (
                <button 
                  className="text-gray-500 text-sm"
                  onClick={() => setShowAllComments(true)}
                >
                  View all {comments.length} comments
                </button>
              )}
              {(showAllComments ? comments : comments.slice(0, 2)).map((comment) => (
                <div key={comment.id} className="text-sm">
                  <span className="font-semibold mr-2">{comment.username}</span>
                  <span>{comment.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Time */}
          <div className="mt-2">
            <span className="text-gray-500 text-xs uppercase">{timeAgo}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}