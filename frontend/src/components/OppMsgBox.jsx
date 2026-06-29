import React from 'react'

function OppMsgBox({ message, time }) {

  const currentTime = new Date(time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase()

  return (
    <div className='flex justify-start px-[60px] py-[2px]'>
        <svg className='text-[rgb(30,30,30)]' viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13" fill="currentColor"><title>tail-in</title><path opacity="0.13" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
        <div className='p-[6px] px-[9px] bg-[rgb(30,30,30)] rounded-[7px] rounded-tl-none relative'>
          <p className='text-[14px] mr-[50px] max-w-[500px] wrap-break-word'>{ message }</p>
          <p className='text-[12px] absolute right-[5px] bottom-0 text-[rgb(192,192,192)]'>{ currentTime }</p>
        </div>
    </div>
  )
}

export default OppMsgBox
