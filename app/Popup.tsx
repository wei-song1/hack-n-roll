import React, { ReactNode } from "react";

interface PopUpProps {
    showPopUp: boolean;
    closePopUp: () => void;
    children: ReactNode;
}

function PopUp({ showPopUp, closePopUp, children }: PopUpProps) {
    if (!showPopUp) return null;

    return (
        <div className="PopUp">
            {children}
        </div>
    );
}

export default PopUp;