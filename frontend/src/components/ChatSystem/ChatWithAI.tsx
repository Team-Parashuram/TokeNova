import { MessageCircleCodeIcon, X } from "lucide-react"
import { useState } from "react"

const ChatWithAI = () => {
  const [open, setOpen] = useState(false)
  
  const toggleSidebar = () => {
    setOpen(!open)
  }

  return (
    <div className="relative">
      {/* AI Button */}
      <div 
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
        onClick={toggleSidebar}
      >
        <MessageCircleCodeIcon size={18} />
        <span>Ask AI</span>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-[45%] bg-white shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-xl">AI Assistant</h3>
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="border-t pt-6">
            <p className="text-gray-600 mb-4">Ask me anything about your code or project!</p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-96 overflow-auto">
              {/* Chat interface content would go here */}
              <p className="text-sm text-gray-500">Your conversation with the AI will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWithAI