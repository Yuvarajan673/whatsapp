import React, { useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import profileImage from "../assets/react.svg"
import chatBg from '../assets/chat-bg.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { io } from "socket.io-client"
import Toaster from '../components/Toaster'
import MyMsg from '../components/MyMsgBox'
import OppMsgBox from '../components/OppMsgBox'
import Sidebar from '../components/Sidebar'
import AlertBox from '../components/AlertBox'
import NewChatModal from '../components/NewChatModal'
import ChatWindow from '../layouts/ChatWindow'
import CurrentConversation from '../components/CurrentConversation'
import NoConversation from '../components/NoConversation'


function ChatPage() {

  const navigate = useNavigate()
  const location = useLocation()
  const [ messages, setMessages ] = useState([])
  const [showToaster, setShowToaster] = useState(false)
  const [ conversations, setConversations ] = useState([])
  const [ currentConversation, setCurrentConversation ] = useState({})
  const [ socket, setSocket ] = useState(null)
  const [ showNewChatModal, setShowNewChatModal ] = useState(false)
  const [ currentUserId, setCurrentUserId ] = useState('')
  const [ currentConversationUserState, setCurrentConversationUserState ] = useState('')
  
  
  
  const handleUserChat = (conversations) => setCurrentConversation(conversations)

  const handleShowNewChatModal = () => setShowNewChatModal(true)
  

  

  useEffect(() => {
    
    // Getting the all users profiles
    fetch("http://localhost:4000/conversations/all", { credentials: 'include' })
    .then(res => res.json())
    .then(data => setConversations(data.payload))
    .catch(err => console.log(err))
    
  }, [currentConversation ,messages])
  
  
  useEffect(()=> {

    // Setting the logged user's id on initial mount
    setCurrentUserId(location.state.userId)

    // Creating the WS Connection on initial mount

    const socket = io("http://localhost:4000", { withCredentials: true })
    socket?.on("connect", () => {
      console.log("Connected:", socket.id);
  });
    setSocket(socket)
    socket?.on('receive-message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data])
      })
    
    }, [])
    
    socket?.on("online-user", (user) => setCurrentConversationUserState(user))


  // Checking the Token existence on every rerender
  useEffect(() => {
      cookieStore.get("token").then(token => {
        if (!token) {
          navigate('/login', {
            state: {
              message: "Session Expired",
              isSuccess: false
            }
          })
        }
      })
  })



  return (
    <div className='h-screen flex'>
      {/* ============= Sidebar =============== */}
      <Sidebar socket={socket} />
      



      {/* ============= ContactList ============= */}
      <div className='h-screen bg-[rgb(18,18,18)] border-r-[1.5px] border-[rgb(49,49,49)] text-white pt-[20px] w-[430px]'>
        {/* Title */}
        <div className='px-[25px] py-[5px] flex items-center justify-between'>
          <div>
            <span>
              <svg viewBox="0 0 104 28" height="28" width="104" preserveAspectRatio="xMidYMid meet" fill="none"><title>wa-wordmark-refreshed</title><path d="m13.07 21.343-2.681-10.767h-.045L7.708 21.343H4.186L0 5.523h2.981L5.84 17.621h.05L8.973 5.523h2.828l2.997 12.098h.019L17.86 5.523h2.915l-4.252 15.82h-3.456zm21.602-9.771q.486-.732 1.24-1.173a5.4 5.4 0 0 1 1.696-.632c.626-.125 1.079-.188 1.713-.188q.863 0 1.749.122c.59.081.965.24 1.453.476q.729.356 1.194.987.466.63.466 1.672v5.96q0 .778.09 1.484.086.71.31 1.063H41.56a4 4 0 0 1-.144-.543 5 5 0 0 1-.078-.565 4.1 4.1 0 0 1-1.773 1.088 7.1 7.1 0 0 1-2.08.309c-.547 0-.891-.066-1.364-.2a3.5 3.5 0 0 1-1.24-.622 2.9 2.9 0 0 1-.83-1.064q-.3-.642-.3-1.529 0-.975.342-1.606.344-.632.886-1.01.544-.377 1.241-.563c.465-.126.769-.225 1.241-.3q.71-.108 1.395-.178c.458-.043 1.03-.109 1.384-.198q.532-.132.84-.389.31-.254.288-.742 0-.507-.167-.808-.165-.3-.443-.466c-.185-.11-.565-.183-.808-.221a5 5 0 0 0-.786-.055c-.622 0-1.246.132-1.6.398q-.532.4-.622 1.33h-2.827q.066-1.107.553-1.839zm6.034 4.442a5 5 0 0 1-.643.167q-.342.065-.72.111t-.752.11c-.236.045-.635.105-.863.178a2.1 2.1 0 0 0-.598.299q-.256.19-.41.476-.154.287-.155.732c0 .296.053.515.155.707a1.2 1.2 0 0 0 .422.455q.264.166.62.23.355.069.73.069c.621 0 1.43-.104 1.77-.311q.508-.31.753-.742.244-.43.3-.876.056-.44.056-.709v-1.173c-.134.119-.465.21-.663.276zm32.818-.899L71.26 8.523h-.076l-2.337 6.587 4.679.005zm-.816-9.592 5.913 15.82h-2.955l-1.43-4.215h-6.098l-1.482 4.215h-2.909l5.98-15.82zM86.179 18.97q.522-.308.842-.807.32-.498.455-1.164.13-.665.13-1.35.001-.686-.143-1.353a3.6 3.6 0 0 0-.476-1.185 2.64 2.64 0 0 0-.853-.841q-.52-.323-1.275-.323c-.502 0-.948.11-1.293.323q-.523.32-.843.83a3.5 3.5 0 0 0-.455 1.174q-.133.664-.132 1.374c0 .474.046.907.144 1.35q.144.664.464 1.163.323.5.853.808.532.31 1.284.311c.502 0 .949-.104 1.294-.31zm-4.074-9.082v1.463h.044q.575-.93 1.461-1.352c.59-.281 1.075-.42 1.784-.42.9 0 1.508.169 2.16.509q.975.509 1.616 1.352t.953 1.96q.309 1.12.31 2.338-.001 1.152-.31 2.217a5.7 5.7 0 0 1-.942 1.882 4.65 4.65 0 0 1-1.573 1.307c-.628.324-1.197.488-2.038.488-.709 0-1.198-.146-1.794-.433a3.7 3.7 0 0 1-1.475-1.273h-.043v5.43h-2.827V9.89h2.67zm16.278 9.082a2.5 2.5 0 0 0 .843-.807q.32-.498.454-1.164.131-.665.131-1.35a6.3 6.3 0 0 0-.144-1.353 3.6 3.6 0 0 0-.475-1.185 2.64 2.64 0 0 0-.853-.841q-.52-.323-1.275-.323c-.502 0-.948.11-1.293.323q-.524.32-.844.83a3.5 3.5 0 0 0-.454 1.174q-.133.664-.132 1.374c0 .474.046.907.144 1.35q.144.664.464 1.163.323.5.853.808.531.31 1.284.311c.502 0 .948-.104 1.294-.31zM94.31 9.889v1.463h.044q.575-.93 1.461-1.352c.59-.281 1.074-.42 1.783-.42.901 0 1.509.169 2.16.509q.976.509 1.616 1.352.642.843.954 1.96.308 1.12.309 2.338 0 1.152-.309 2.217a5.7 5.7 0 0 1-.942 1.882 4.64 4.64 0 0 1-1.573 1.307c-.628.324-1.197.488-2.038.488-.709 0-1.198-.146-1.795-.433a3.7 3.7 0 0 1-1.474-1.273h-.043v5.43h-2.828V9.89h2.671zm-38.355 8.705q.21.367.544.598.33.233.765.344c.287.074.874.11 1.185.11.221 0 .495-.026.74-.077.243-.051.587-.132.788-.243q.3-.165.498-.443c.133-.185.198-.444.198-.725 0-.428-.436-.898-1.064-1.134q-.94-.356-2.626-.709a15 15 0 0 1-1.339-.367 4.5 4.5 0 0 1-1.163-.553 2.7 2.7 0 0 1-.819-.865q-.31-.52-.31-1.274 0-1.107.433-1.816a3.2 3.2 0 0 1 1.142-1.119 5 5 0 0 1 1.595-.577 8.2 8.2 0 0 1 1.65-.165c.622 0 1.055.058 1.639.177a4.8 4.8 0 0 1 1.561.598q.687.421 1.14 1.117.456.699.542 1.762h-2.659c-.043-.605-.272-1.08-.686-1.292-.414-.215-1.046-.344-1.608-.344-.176 0-.664.04-.862.068s-.43.086-.6.158q-.255.112-.433.322c-.119.141-.177.392-.177.629q-.001.42.31.685.309.268.807.433.499.166 1.142.3c.428.089 1.167.295 1.608.4.458.104.739.227 1.175.375q.652.223 1.164.588.509.367.82.909.309.541.309 1.34 0 1.13-.453 1.896-.455.765-1.185 1.23c-.488.31-.88.39-1.508.515a10 10 0 0 1-1.917.188 8 8 0 0 1-1.781-.2 5.2 5.2 0 0 1-1.696-.664q-.742-.465-1.218-1.23c-.319-.509-.49-1.148-.522-1.917h2.66c0 .34.07.73.21.974zm-3.751-8.698v1.939H49.9v6.002q0 .799.264 1.064.266.266 1.064.267.266-.001.51-.023t.465-.067v2.273a7 7 0 0 1-.885.089q-.488.02-.954.021c-.486 0-.95-.033-1.383-.099a2.07 2.07 0 0 1-.998-.396 1.9 1.9 0 0 1-.635-.82 3.5 3.5 0 0 1-.274-1.396v-6.923H45.17V9.888h1.904V6.454l2.828.008v3.434zM24.65 5.523v5.902h.065c.398-.664 1.03-1.17 1.65-1.472.621-.305 1.27-.376 1.86-.376.841 0 1.202.114 1.74.342q.81.344 1.273.954.466.61.654 1.484.189.877.189 1.939v7.045h-2.815v-6.47q.001-1.419-.442-2.116c-.296-.466-.822-.81-1.572-.864-.967-.07-1.643.324-2.026.833-.385.51-.577 1.444-.577 2.611v6.004h-2.828V5.523z" fill="currentColor"></path></svg>
            </span>
          </div>

          {/* New Chat Button */}
          <div className='flex'>
            <span onClick={() => handleShowNewChatModal()} className='p-[10px] rounded-[50%] hover:bg-[rgb(40,40,40)] cursor-pointer active:scale-[0.95] duration-150'>
              <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>new-chat-outline</title><path d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z" fill="currentColor"></path></svg>
            </span>
            { showNewChatModal && <NewChatModal onClose={() => setShowNewChatModal(false)} setCurrentConversation={setCurrentConversation} />}
          </div>
        </div>

        {/* Search Bar */}
        <div className='px-[25px] pb-[20px]'>
          <div className='flex items-center bg-[rgb(46,46,46)] rounded-l-[30px] rounded-r-[30px] overflow-hidden mt-[10px] focus-within:outline-2 focus-within:outline-[#1daa61] focus-within:bg-[rgb(18,18,18)]'>
            <span className='pl-[15px] rounded-l-2xl text-[rgb(192,192,192)]'>
              <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>ic-search</title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="currentColor"></path></svg>
            </span>
            <input className='p-[10px] w-full bg-[rgb(46,46,46)] outline-0 focus:bg-[rgb(18,18,18)]' type="text" placeholder='Search conversations' />
          </div>
        </div>

        {/* Conversations List */}
        <div className='h-[695px] overflow-y-auto scrollbar-thin scrollbar-track-[rgb(18,18,18)] scrollbar-thumb-[rgb(46,46,46)] px-[15px]'>
            { conversations.length > 0 ? conversations.map((conversation) => {
              return (
              <div key={conversation?.id} onClick={() => handleUserChat(conversation)} className='flex items-center gap-[15px] p-[10px] hover:bg-[rgb(46,46,46)] cursor-pointer rounded-[10px]'>
                <div className='h-[49px] w-[49px] rounded-[50%] shrink-0 overflow-hidden'>
                  <svg className='text-[#21c063] bg-[#103529]' viewBox="0 0 48 48" height="49" width="49" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>default-contact-refreshed</title><path d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"></path></svg>
                  {/* <img src={profileImage} className='h-[inherit] w-[inherit] object-cover object-center' alt="" /> */}
                </div>
                <div className='w-full'>
                    <div className='flex justify-between'>
                      <p>{conversation?.members.find(member => member.id !== currentUserId)?.name}</p>
                      <p className='text-[12px] text-[#22d679] font-semibold'>{
                        new Date(conversation?.lastMessageAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
                        }</p>
                    </div>  
                    <div className='flex justify-between'>
                      <p className='text-[14px] text-[rgb(192,192,192)]'> {conversation?.lastMessageBy?.id == currentUserId ? "You": conversation?.lastMessageBy?.name} : {conversation?.lastMessage}</p>
                      <p className='text-[13px] text-[rgb(18,18,18)] font-semibold bg-[#22d679] h-[20px] w-[20px] text-center rounded-[50%]'>2</p>
                    </div>
                </div>              
            </div>)

            }) : <p className='text-[rgb(149,149,149)] text-center text-[15px]'>No Conversation Found</p> }         
              

            {/* End to End Encrypted Div */}
            <hr className='text-[#2b2b2b] mt-[20px]'/>
            <div className='py-[15px]'>
              <p className='text-[12px] flex items-center justify-center'>
                <svg viewBox="0 0 24 24" height="12" width="13" preserveAspectRatio="xMidYMid meet" fill="none"><title>lock-outline</title><path d="M6.793 22.4C6.29767 22.4 5.875 22.2237 5.525 21.8712C5.175 21.5187 5 21.095 5 20.6V11C5 10.505 5.17625 10.0813 5.52875 9.72875C5.88125 9.37625 6.305 9.2 6.8 9.2H7.4V6.8C7.4 5.472 7.86858 4.34 8.80575 3.404C9.74275 2.468 10.8761 2 12.2057 2C13.5352 2 14.6667 2.468 15.6 3.404C16.5333 4.34 17 5.472 17 6.8V9.2H17.6C18.095 9.2 18.5187 9.37625 18.8712 9.72875C19.2237 10.0813 19.4 10.505 19.4 11V20.6C19.4 21.095 19.2237 21.5187 18.871 21.8712C18.5183 22.2237 18.0943 22.4 17.599 22.4H6.793ZM6.8 20.6H17.6V11H6.8V20.6ZM12.2052 17.6C12.7017 17.6 13.125 17.4233 13.475 17.0698C13.825 16.7163 14 16.2913 14 15.7948C14 15.2983 13.8232 14.875 13.4697 14.525C13.1162 14.175 12.6912 14 12.1947 14C11.6982 14 11.275 14.1767 10.925 14.5302C10.575 14.8837 10.4 15.3087 10.4 15.8052C10.4 16.3017 10.5767 16.725 10.9302 17.075C11.2837 17.425 11.7087 17.6 12.2052 17.6ZM9.2 9.2H15.2V6.8C15.2 5.96667 14.9083 5.25833 14.325 4.675C13.7417 4.09167 13.0333 3.8 12.2 3.8C11.3667 3.8 10.6583 4.09167 10.075 4.675C9.49167 5.25833 9.2 5.96667 9.2 6.8V9.2Z" fill="currentColor"></path></svg>
                &nbsp; Your personal messages are&nbsp;<span className='text-[#25eb85] font-semibold'>end-to-end encrypted</span>
                </p>
            </div>
        </div>

      </div>



      {/* ============ Chats Window ============= */}
      <ChatWindow>
        {Object.keys(currentConversation).length > 0 ? <CurrentConversation currentConversation={currentConversation} socket={socket} currentUserId={currentUserId} messages={messages} setMessages={setMessages} currentConversationUserState={currentConversationUserState} /> : <NoConversation /> }
      </ChatWindow>

    </div>
  )
}

export default ChatPage
