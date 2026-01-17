"use client"

import React, { useState }from 'react';
import Popup from './Popup';
import Image from "next/image";

function Authenticator() {
    const [showPopUp, setShowPopUp] = useState(false)

    return (
        <div>
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
                        <div className="w-5"/>
                        <label className="block text-center font-bold text-2xl">Authenticator</label>
                        <div className="w-5"/>
                        <Image
                            className="dark:invert"
                            src="/magnifying-glass-backup-svgrepo-com.svg"
                            alt="Vercel logomark"
                            width={28}
                            height={28}
                        />
                        <div className="w-5"/>
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

            <div className="h-5" />

            <button onClick={() => setShowPopUp(prev => !prev)}>
                <Image
                    src="/AppIcon@2x.png"
                    alt="Vercel logomark"
                    width={84}
                    height={84}
                    className="rounded-3xl"
                />
            </button>
        </div>
    )
}

export default Authenticator;
