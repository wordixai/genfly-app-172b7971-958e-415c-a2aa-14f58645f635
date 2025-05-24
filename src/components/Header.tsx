import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Send } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          SocialFeed
        </h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Heart className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}