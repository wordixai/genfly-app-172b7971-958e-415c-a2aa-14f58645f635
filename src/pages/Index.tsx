import { Header } from "@/components/Header"
import { Stories } from "@/components/Stories"
import { Feed } from "@/components/Feed"

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Stories />
      <Feed />
    </div>
  )
}

export default Index