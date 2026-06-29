import React from 'react'
import { createPortal } from "react-dom"

function AlertBox({ alertMessage, onResult }) {


    const handleSure = () => onResult(true)
    const handleCancel = () => onResult(false)


    const modelContent = (
    // backdrop
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center'>
        {/* Alert Box */}
        <div className='bg-[rgb(25,25,25)] p-[30px] w-[350px] rounded-[15px] flex flex-col gap-[30px]'>
            <div>
              <p className='text-[rgb(161,161,161)] font-bold'>{alertMessage}</p>
            </div>
            <div className='flex gap-[10px] justify-end'>
              <button onClick={handleCancel} className='text-[#21aa61] py-[10px] px-[20px] border-[1.5px] border-[rgb(51,51,51)] rounded-[40px] cursor-pointer'>Cancel</button>
              <button onClick={handleSure} className='font-semibold py-[10px] px-[20px] text-[#fb5061] bg-[#ff001917] rounded-[40px] cursor-pointer'>Sure</button>
            </div>
        </div>
    </div>
  )

  return createPortal(modelContent, document.getElementById('root'))
}

export default AlertBox
