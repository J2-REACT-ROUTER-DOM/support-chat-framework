import { MessageSquare } from 'lucide-react'
const NoChatSelected = () => {
  return (
    // Creado con chatgpt
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <div className="rounded-full bg-muted p-6">
        <MessageSquare className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">No chat selected</h3>
      <p className="text-sm text-muted-foreground">
        Choose a conversation from the sidebar to start chatting
      </p>
    </div>
  )
}

export default NoChatSelected