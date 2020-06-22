import React from 'react'
import Loader from "../../loading.gif";

function Loading() {
    return (
        <div className="loading">
            <div className="wrapper">
                <img src={Loader} alt="loader"/>
                <p>loading...</p>
            </div>
        </div>
    )
}

export default Loading
