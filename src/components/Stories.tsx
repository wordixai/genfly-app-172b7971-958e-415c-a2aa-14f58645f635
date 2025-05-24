import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

interface Story {
  id: string
  username: string
  avatar: string
  hasStory: boolean
  isViewed: boolean
}

const mockStories: Story[] = [
  { id: "1", username: "Your Story", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", hasStory: false, isViewed: false },
  { id: "2", username: "alice_wonder", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", hasStory: true, isViewed: false },
  { id: "3", username: "bob_builder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", hasStory: true, isViewed: true },
  { id: "4", username: "charlie_dev", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", hasStory: true, isViewed: false },
  { id: "5", username: "diana_photo", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", hasStory: true, isViewed: true }
]

export function Stories() {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4">
          {mockStories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1 cursor-pointer">
              <div className={`relative p-0.5 rounded-full ${
                story.id === "1" 
                  ? "bg-gray-200" 
                  : story.hasStory && !story.isViewed 
                    ? "bg-gradient-to-tr from-yellow-400 to-pink-600" 
                    : story.hasStory && story.isViewed
                      ? "bg-gray-300"
                      : "bg-gray-200"
              }`}>
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src={story.avatar} alt={story.username} />
                  <AvatarFallback>{story.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {story.id === "1" && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-600 max-w-[70px] truncate">
                {story.username}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}