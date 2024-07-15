import React from 'react';
import { Form } from 'react-bootstrap';

const SchemaDropdown = ({ availableSchemas, onSchemaSelect, selectedValue, disabled }) => {
  return (
    <Form.Select onChange={onSchemaSelect} value={selectedValue || ''} disabled={disabled} className='form_select'>
      {!selectedValue && <option value="">Add schema to Segment</option>}
      {availableSchemas.map((schema) => (
        <option key={schema.value} value={schema.value}>{schema.label}</option>
      ))}
    </Form.Select>
  );
};

export default SchemaDropdown;
