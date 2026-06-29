import React, { useEffect, useState } from 'react'

function NewChatModal({ onClose, setCurrentConversation }) {


    const [ users, setUsers ] = useState([])


    const handleClick = (userId) => {
        fetch("http://localhost:4000/conversations/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id: userId})
        }).then(res => res.json())
        .then(data => {
            onClose()
            setCurrentConversation(data.payload)
            // window.location.reload()
        })
        .catch(err => console.log(err))
    }   

    const fetchUsers = (searchText) => {
        fetch("http://localhost:4000/users/search", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({searchText: searchText})
        })
        .then(res => res.json())
        .then(data => setUsers(data.payload))
        .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const searchText = e.target.value
        fetchUsers(searchText)
    }

    useEffect(() => fetchUsers(""), [])

    const handleClose = () => onClose()

  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center'>
        <div className='bg-[rgb(25,25,25)] rounded-[30px] p-[30px] w-[500px] h-[500px] flex flex-col gap-y-[10px] relative'>
            <span onClick={() => handleClose()} className='absolute right-[20px] top-[20px] hover:bg-[#ffffff3f] p-[5px] rounded-[50%] cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20" /></svg>
            </span>
            {/* Modal Title */}
            <div>
                <h1 className='text-center'>New Chat</h1>
            </div>

            {/* Search Bar */}
            <div>
                <input onChange={(e) => handleChange(e)} className='bg-[rgb(49,49,49)] w-full rounded-[50px] px-[20px] py-[10px] focus:outline-2 focus:bg-[rgb(18,18,18)] focus:outline-[#21aa61]' type="text" placeholder='Search...' />
            </div>

            {/* Contact List */}
            <div className='overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgb(46,46,46)]'>
                { users.length > 0 ?  users?.map((user) => {
                    return ( <div onClick={() => handleClick(user.id)} key={user.id} className='flex items-center gap-[15px] p-[10px] hover:bg-[rgb(46,46,46)] cursor-pointer rounded-[10px]'>
                    <div className='h-[49px] w-[49px] rounded-[50%] shrink-0 overflow-hidden'>
                      <svg className='text-[#21c063] bg-[#103529]' viewBox="0 0 48 48" height="49" width="49" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>default-contact-refreshed</title><path d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"></path></svg>
                      {/* <img src={profileImage} className='h-[inherit] w-[inherit] object-cover object-center' alt="" /> */}
                    </div>
                    <div className='w-full'>
                        <div className='flex justify-between'>
                          <p>{user?.name}</p>
                        </div>
                    </div>              
                    </div>)
                }) : <p className='text-[rgb(149,149,149)] text-center mt-[150px]'>No Users Found</p>}
            </div>
        </div>
    </div>
  )
}

export default NewChatModal
