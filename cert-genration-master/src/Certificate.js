import React, { useEffect, useState } from 'react'
import './certificate.css'
import logo from './logo.png'
import qr from './qr.png'
import ReactToPdf from 'react-to-pdf'

export default function Certificate({username, uid}) {
    

    const ref = React.createRef();
    
    const options = {
        orientation: 'landscape',
    };

    return (
        <div>
            <ReactToPdf targetRef={ref} filename={uid} options={options} >
                {({ toPdf }) => (
                    <button onClick={toPdf}>Generate pdf</button>
                )}
            </ReactToPdf>
            <div class="cert-div" ref={ref}>
                <div class="top-view">
                    <div class="scan-area">
                        <img src={qr} alt="qr-code" class="qr-code" />
                        <p class="qr-text">Scan Here to Verify Authenticity</p>
                    </div>
                    <div class="text-area">
                        <p class="cert-text">CERTIFICATE</p>
                        <p class="desc-text">OF PARTICIPATION</p>
                    </div>
                </div>
                <div class="cert-abt">
                    <p> THIS CERTIFICATE IS HEREBY PRESENTED TO </p>
                    <p class="cert-name" id="cert-name"> {username} </p>
                    <p> Verification ID (UUID): {uid}</p>
                </div>
                <div class="event-abt">
                    <p>For end-to-end participation in the</p>
                    <strong>
                        <p>The Event Name</p>
                    </strong>
                    <p>DATE</p>
                    <strong>
                        <p>26th August, 2022</p>
                    </strong>
                </div>
                <div class="org-abt">
                    <img src={logo} class="org-logo" />
                    <hr class="line" />
                    <strong>
                        <p class="org-text">ORGANIZED & HOSTED BY</p>
                    </strong>
                </div>
            </div>
        </div>
    )
}
