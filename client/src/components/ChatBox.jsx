import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dummyChats } from '../assets/assets'
import { X, Loader2Icon, Send } from 'lucide-react'
import { clearChat } from '../app/features/chatSlice'
import { format } from 'date-fns'

const ChatBox = () => {
  const { listing, isOpen } = useSelector((state) => state.chat)
  const dispatch = useDispatch()

  const user = { id: 'user_2' }
  const messagesEndRef = useRef(null)

  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  const fetchChat = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setChat(dummyChats[0])
      setMessages(dummyChats[0].messages)
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    if (listing && isOpen) fetchChat()
  }, [listing, isOpen])

  useEffect(() => {
    if (!isOpen) {
      setChat(null)
      setMessages([])
      setNewMessage("")
      setIsLoading(true)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    setIsSending(true)

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        chatId: chat?.id,
        sender_id: user.id,
        message: newMessage,
        createdAt: new Date()
      }
    ])

    setNewMessage("")
    setIsSending(false)
  }

  if (!isOpen || !listing) return null

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center sm:p-4'>
      <div className='bg-white sm:rounded-lg shadow-2xl w-full max-w-2xl h-screen sm:h-[600px] flex flex-col overflow-hidden'>

        {/* Header */}
        <div className='bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 flex items-center justify-between shrink-0'>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold text-lg truncate'>{listing?.title}</h3>
            <p className='text-sm text-indigo-100 truncate'>
              {user.id === listing?.ownerId
                ? `Chatting with buyer (${chat?.chatUser?.name || 'Loading...'})`
                : `Chatting with seller (${chat?.chatUser?.name || 'Loading...'})`}
            </p>
          </div>
          <button
            onClick={() => dispatch(clearChat())}
            className='ml-4 p-1 hover:bg-white/20 rounded-lg transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100'>
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <Loader2Icon className="size-6 animate-spin text-indigo-600" />
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 pb-1 shadow-sm ${
                    message.sender_id === user.id
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className='text-sm break-word whitespace-pre-wrap'>
                    {message.message}
                  </p>
                  <p className={`text-[10px] mt-1 text-right ${
                    message.sender_id === user.id ? "text-indigo-200" : "text-gray-400"
                  }`}>
                    {format(new Date(message.createdAt), "MMM dd 'at' h:mm a")}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {chat?.listing?.status === "active" ? (
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <div className="flex items-end space-x-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(e)
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-32"
                rows={1}
              />
              <button
                disabled={!newMessage.trim() || isSending}
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg
                           disabled:opacity-50 transition-colors"
              >
                {isSending
                  ? <Loader2Icon className="w-5 h-5 animate-spin" />
                  : <Send className="w-5 h-5" />}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <p className="text-sm text-gray-600 text-center">
              {chat ? `Listing is ${chat?.listing?.status}` : "Loading Chat..."}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default ChatBox
