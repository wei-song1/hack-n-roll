"use client"

import React, { useState }from 'react';
import Popup from '../../Popup';
import Image from "next/image";

function test() {
    const [showPopUp, setShowPopUp] = useState(false)


    return (
        <div>
            <button onClick={() => setShowPopUp(prev => !prev)}>
                <Image
                    src="/banner.png"
                    alt="Vercel logomark"
                    width={100}
                    height={100}
                />
            </button>

            {/* Authenticator App Home Screen */}
            <Popup showPopUp={showPopUp} closePopUp={()=>setShowPopUp(false)}>
                <div className="w-90 h-160 bg-white rounded-lg shadow-lg">
                    <div className="w-90 h-14 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Image
                            className="dark:invert"
                            src="/hamburger-svgrepo-com.svg"
                            alt="Vercel logomark"
                            width={24}
                            height={24}
                        />
                        <label className="block text-center font-bold text-2xl">Authenticator</label>
                        <Image
                            className="dark:invert"
                            src="/magnifying-glass-backup-svgrepo-com.svg"
                            alt="Vercel logomark"
                            width={28}
                            height={28}
                        />
                        <Image
                            className="dark:invert"
                            src="/plus-large-svgrepo-com.svg"
                            alt="Vercel logomark"
                            width={28}
                            height={28}
                        />
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default test;
