import React from 'react'

function Spinner() {
  return (
    // BackDrop Div
    <div className='bg-[rgba(0,0,0,0.3)] fixed h-full w-full flex justify-center items-center'>
        {/* Spinner Div */}
       <div className='h-[40px] w-[40px] border-5 border-t-transparent rounded-[50%] border-[#127944] animate-[spin_1s_linear_infinite]'></div>
    </div>
  )
}

export default Spinner
