import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import ReactToPdf from 'react-to-pdf'

import './verify.css'
import './certificate.css'

import Certificate from './Certificate';
import logo from './logo.png'
import qr from './qr.png'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Verify() {
  const [uid, setUid] = useState("")
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  })

  const [popup, setPopup] = useState(false)
  const [popupErr, setPopupErr] = useState(false)

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const ref = React.createRef();

  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [9, 6.3]
  };


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ u_id: uid })
  };

  const verify = () => {
    fetch(
      "https://certs.thirdeyedata.io/verify/", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          setUserData(json.data)
          setIsOpen(true);
          setPopupErr(false)
        } else if (json.status == 400) {
          setUserData({
            name: '',
            email: ''
          })
          setPopupErr(true)
        }
      })
  }

  return (
    <div className="container" style={{ paddingTop: '10%' }}>
      <div className="container main">
        <form>
          <label className="up-text" for="uid">Verify Your Certificate Id</label><br /><br />
          <input style={{ textAlign: 'center' }} className="input" type="text" id="uid" name="uid" onChange={(e) => setUid(e.target.value)} value={uid} /><br /><br />
        </form>
        <div className="btn" onClick={() => verify()}>
          <span className="sub">Verify</span>
        </div>
      </div>
      {popup &&
        <div id="pop-up" className="container pop-up">
          {/* <span style={{ fontWeight: '800' }}>Verifed</span>
          <div style={{ textAlign: 'left' }}>
            <span>Name: {userData.username}</span><br />
            <span>UUID: {uid}</span><br />
            <span>Email ID: {userData.email}</span>
          </div><br />
          <div id="ok_btn">
            <span className="btn" onClick="refresh()">OK</span>
          </div> */}
          <br />
        </div>
      }
      {
        popupErr &&
        <div id="pop-up-err" className="container pop-up_2">
          <span style={{ fontWeight: '800' }}>Sorry, this certificate id is not valid!</span>
        </div>
      }
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div style={{ fontWeight: '800' }}>Verifed</div>
        <div>
          <div class="cert-div" ref={ref} x={.5} y={.5} scale={1.0}>
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
              <p class="cert-name" id="cert-name"> {userData.username} </p>
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
        <br />
        <div className=''>
          <button onClick={closeModal} className="btn"> Close</button>
          <ReactToPdf targetRef={ref} filename={uid} options={options} >
            {({ toPdf }) => (
              <button onClick={toPdf} className="btn">Downlaod pdf</button>
            )}
          </ReactToPdf>
        </div>
      </Modal>
    </div>
  )
}
