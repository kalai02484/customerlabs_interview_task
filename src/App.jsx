import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import SaveSegmentPopup from './components/SaveSegmentPopup';

function App() {

  const [showPopup, setShowPopUp] = useState(false);

  const handleClose = () => setShowPopUp(false);
  const handleShow = () => setShowPopUp(true);

  return (
    <>
    <Container fluid className='h-100'>
      <Row className='h-100 d-flex'>
        <Col>
          <Button className="popup_btn" variant="secondary" onClick={handleShow}>
            Save Segment
          </Button>
        </Col>
      </Row>
    </Container>     

    
    {
      showPopup && (
        <SaveSegmentPopup showPopup={showPopup} handleClose={handleClose} />
      )
    }    

    </>
  );
}

export default App;
