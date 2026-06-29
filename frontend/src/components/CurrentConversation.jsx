import React, { useRef } from 'react'
import MyMsg from './MyMsgBox'
import OppMsgBox from './OppMsgBox'
import { useFormik } from 'formik'
import * as yup from "yup"
import { useState } from 'react'
import { useEffect } from 'react'

function CurrentConversation({ currentConversation, socket, currentUserId, messages, setMessages, currentConversationUserState }) {

  
    const [ currentConversationUser, setCurrentConversationUser ] = useState({})

    useEffect(() => {
      setCurrentConversationUser(currentConversation?.members?.find(member => member.id.toString() !== currentUserId.toString()))

    }, [currentConversation])



    const handleKeyDown = (event) => {
      if (event.key == 'Enter' && !event.shiftKey) {
        event.preventDefault()
        formik.handleSubmit()
      }
    }

    const formik = useFormik({
        initialValues: {
          message: ""
        },
        enableReinitialize: true,
        validationSchema: yup.object({
          message: yup.string().required()
        }) ,
        onSubmit: (value, actions) => {

          const messagePayload = {
            message: value.message,
            receiverId: currentConversationUser._id,
            conversationId: currentConversation._id
          }

          socket.emit("sending-message", messagePayload)
          actions.resetForm()
        }
      })

    useEffect(() => {

      fetch("http://localhost:4000/messages/all", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversationId: currentConversation.id })
      })
      .then(res => res.json())
      .then(data => {
        data.status ? setMessages(data.payload) : setMessages([])
      })
      .catch(err => console.log(err))

    }, [currentConversation])


    console.log(currentConversationUser)


  return (
    <>
        {/* Profile Info Div */}
          <div className='bg-[rgb(18,18,18)] px-[16px] py-[10px] flex items-center justify-between'>

            <div className='flex items-center grow'>
              <div className='h-[40px] w-[40px] rounded-[50%] shrink-0 overflow-hidden'>
                <svg className='text-[#21c063] bg-[#103529]' viewBox="0 0 48 48" height="40" width="40" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>default-contact-refreshed</title><path d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"></path></svg>
                {/* <img src={profileImage} className='h-[inherit] w-[inherit] object-cover object-center' alt="" /> */}
              </div>
              <div className='text-white ml-[15px] grow'>
                <p>{currentConversationUser?.name}</p>
                <p className='text-[12px]'>{currentConversationUser?.id === currentConversationUserState?.userId ? currentConversationUserState?.state : "offline"}</p>
              </div>
            </div>
            <div>
              <span className='text-white block p-[10px] rounded-[50%] cursor-pointer hover:bg-[rgb(46,46,46)] active:scale-[0.95] transition duration-150'>
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>ic-more-vert</title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="currentColor"></path></svg>
              </span>
            </div>
          </div>

          {/* Chats Div */}
          <div className='grow text-white overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(255,255,255,0.2)]'>
            { messages?.map((message, index) => {
              if (message.senderId.id == currentUserId) {
                return <MyMsg key={index} message={message.content} />
              }
              else {
                return <OppMsgBox key={index} message={message.content} time={message.createdAt} />
              }
            }) }
          </div>

          {/* Message Typing div */}
          <div className='m-[10px] mt-0'>
            <div className='flex bg-[rgb(30,30,30)] p-[5px] rounded-[30px]'>
              <span className='text-white p-[10px] rounded-[50%] hover:bg-[rgb(46,46,46)] cursor-pointer active:scale-[0.95] transition duration-150'>
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>plus-rounded</title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z" fill="currentColor"></path></svg>
              </span>
              <form className='flex w-full' onSubmit={formik.handleSubmit}>
                <textarea onChange={formik.handleChange} onKeyDown={handleKeyDown} value={formik.values.message} className='w-full outline-0 text-white pl-[8px] resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(255,255,255,0.2)] pt-[10px]' rows={1} type="text" name="message" placeholder='Type a message' id="message" />
                <button type='submit' className='bg-[#22d679] p-[10px] rounded-[50%]  cursor-pointer active:scale-[0.95] transition duration-150'>
                  <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>wds-ic-send-filled</title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" fill="currentColor"></path></svg>
                </button>
              </form>
            </div>
          </div>
            
      </>
  )
}

export default CurrentConversation
