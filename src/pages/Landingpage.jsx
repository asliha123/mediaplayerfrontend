import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Landingpage() {

  // function defenition 
  // redirect from one page to another page we can use hook ie, useNavigate()
  const navigate=useNavigate()

    const handlenavigate=()=>{
              

      navigate('/home')
    }

  return (
    <>
       <Row>

          <Col></Col>

          <Col  lg={6}>
            <h1>Welcome Videooooo.com</h1>
            <p style={{textAlign:'justify'}}>Where user can use their favourite videoes. User can upload any youtube videoes by copy and paste their url in to videooo.com will allow to add and remove thier uploaded videoes and also arrange them in different categories by drag and drop it is free try it now!!!</p>

            <button onClick={handlenavigate} className='btn btn-success'>Click Here To Know More</button>
          </Col>
           <Col lg={5}>
              <img src="https://www.impactbnd.com/hubfs/how-to-upload-a-video-youtube.jpg"  alt="no image" className='img-fluid' />

           </Col>
       </Row>



    </>
  )
}

export default Landingpage
