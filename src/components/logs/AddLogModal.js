import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions'; // what - this is a prop
import M from 'materialize-css/dist/js/materialize.min.js';

// bring in addLog() prop (from logActions)
const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  //Clear Fields
  const clearFields = () => {
    setMessage('');
    setTech('');
    setAttention(false);
  };

  const onSubmit = () => {
    // check if data was entered in both fields
    if (message === '' || tech === '') {
      M.toast({ html: 'Plese enter a message and tech' });
      // create the newLog ( add data to correct variables? doesn't look like we're doing this atm )
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };
      // send the newLog to the addLog method

      addLog(newLog);
      // what?
      M.toast({ html: `Log added by ${tech}` });
      clearFields();
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input_field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <option value='John Doe'>John Doe</option>
              <option value='Sam Smith'>Sam Smith</option>
              <option value='Sara Wilson'>Sara Wilson</option>
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close blue waves-effect waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

// what - why is this lower case 'p'?
AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

export default connect(null, { addLog })(AddLogModal);
