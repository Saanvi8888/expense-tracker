import React, { useState } from 'react'
import { LuImage, LuX } from 'react-icons/lu';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex flex-col md:flex-row items-start gap-5 mb-6'>

      <div
        className='flex items-center gap-4 cursor-pointer'
        onClick={() => setIsOpen(true)}
      >
       <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
            {icon ? (
                <span className="text-2xl">{icon}</span>
            ) : (
                <LuImage />
            )}
        </div>


        <p className=''>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className='absolute top-95 left-0 -translate-y-full z-50'>
          <button
            className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 z-50 cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData?.emoji || "");
              setIsOpen(false);
            }}
          />
        </div>
      )}

    </div>
  )
}

export default EmojiPickerPopup
