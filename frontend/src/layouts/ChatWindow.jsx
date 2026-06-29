import React from 'react'

function ChatWindow({ children }) {
  return (
    <div className="grow-[2.3] bg-[url('src/assets/chat-bg.jpg')] bg-[rgb(118,118,118)] bg-cover bg-blend-multiply bg-center flex flex-col">
        {children}
    </div>
  )
}

export default ChatWindow
