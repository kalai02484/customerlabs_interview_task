import React, { useState } from 'react';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';
import SchemaDropdown from './SchemaDropdown';
import { BsTrashFill } from 'react-icons/bs';

const SaveSegmentPopup = ({ showPopup, handleClose }) => {

  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSchemaSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      const selectedSchema = availableSchemas.find(schema => schema.value === selectedValue);
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
      setAvailableSchemas(availableSchemas.filter(schema => schema.value !== selectedValue));
      setShowDropdown(false);
    }
  };

  const handleRemoveSchema = (value) => {
    const newSelectedSchemas = selectedSchemas.filter(schema => schema.value !== value);
    const removedSchema = selectedSchemas.find(schema => schema.value === value);
    setSelectedSchemas(newSelectedSchemas);
    setAvailableSchemas([...availableSchemas, removedSchema]);
  };


  const handleAddSchemaClick = () => {
    setShowDropdown(true);
  };

  const handleSegmentSave = async (e) => {
    e.preventDefault();
    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
    };

    //Change API ID
    const apiID = '09328f9d-0957-49d6-8bef-7df53e1b739e'

    //Due to CORs policy, I just bypassed with the below url
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://webhook.site/${apiID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(segmentData)
      });

      if (!response.ok) {
        throw new Error('Failed to save segment');
      }

      console.log('Segment saved successfully');
      handleClose();
    } catch (error) {
      console.error('Error saving segment:', error);
    }
  };

  return (
    <Offcanvas show={showPopup} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Saving Segment</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <Form onSubmit={handleSegmentSave} className="d-flex flex-column flex-grow-1">
          <Form.Group className="mb-3">
            <Form.Label>Enter the name of the Segment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of the Segment"
              value={segmentName}
              className='mb-2 form_control'
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <Form.Text className="text-muted">
              To save your segment, you need to add the schemas to build the query.
            </Form.Text>
          </Form.Group>


          <div className="flex-grow-1 mt-3">
            {selectedSchemas.map((schema, index) => (
              <div className='d-flex align-items-center'>
              <SchemaDropdown
                key={index}
                availableSchemas={[schema]}
                selectedValue={schema.value}
                disabled
              />
              <Button variant="link" size="lg" className="ms-2 mb-2 remove_btn" onClick={() => handleRemoveSchema(schema.value)}>
                  <BsTrashFill />
              </Button>
             </div>
            ))}

            
          {showDropdown && (
            <Form.Group className="mb-3 mt-2">
              <SchemaDropdown
                availableSchemas={availableSchemas}
                onSchemaSelect={handleSchemaSelect}
              />
            </Form.Group>
          )}

          
          {!showDropdown && availableSchemas.length > 0 && (
            <Button variant="link" onClick={handleAddSchemaClick}>
              +Add new schema
            </Button>
          )}

          </div>

          

          <Row className="mt-auto">
            <Col className="d-flex">              
              <Button variant="primary" type="submit"  className="me-2">
                Save Segment
              </Button>
              <Button variant="link" onClick={handleClose} className="cancel_btn">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SaveSegmentPopup;
