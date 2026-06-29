import React from 'react'

function MyMsg({ message }) {

    const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase()

  return (
    <div className='flex justify-end px-[60px] py-[2px]'>
        <div className='p-[6px] px-[9px] bg-[#144d37] rounded-[7px] rounded-tr-none relative'>
          <p className='text-[14px] mr-[50px] max-w-[500px] wrap-break-word'>{ message }</p>
          <p className='text-[12px] absolute right-[5px] bottom-0 text-[rgb(192,192,192)]'>{ currentTime }</p>
        </div>
        <svg className='text-[#144d37]' viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
    </div>
  )
}

export default MyMsg
