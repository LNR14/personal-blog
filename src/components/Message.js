import React from "react"

const Message = ({type}) =>{
        const message = {
            saved:"Post has been saved",
            updated:"Post has been updated",
            deleted:"Post has been deleted"
        };
        return(
            <div className={`App-message ${type}`}>
                <p className="container">
                    <strong>{message[type]}</strong>

                </p>

            </div>
        );
    }

export default Message