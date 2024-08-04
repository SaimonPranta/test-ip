import React, { useState } from 'react';
import { Dialog, DialogContent, Zoom } from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';

function Call({ site: { supportPhone }, closeModal, close }) {
  const options = [
    { value: '', label: 'Select an issue' },
    { value: 'forgot', label: 'Forget Issue' },
    { value: 'verify', label: 'Verify Issue' },
    { value: 'loading', label: 'Loading Issue' },
    { value: 'ip', label: 'IP Issue' },
    { value: 'login', label: 'Login Issue' },
    { value: 'other', label: 'Other Issue' },
  ];
  const [selected, setSelected] = useState('');

  return (
    <Dialog className='Phne_Outer' maxWidth='sm' close={closeModal} TransitionComponent={Zoom} open fullWidth>
      <DialogContent>
        <div className='each_cn phone_outer o-h p-r'>
          <div className='select-option-for-call-us'>
            <Select
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              {options.map(({ value, label }, i) => (
                <Option key={i} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </div>
          <div style={{ flex: 1 }}>
            <div>
              <div className='online_out'>
                <div className='phone_inp'>{!!selected ? supportPhone : <span>&nbsp;</span>}</div>
                <span style={{ flex: '1 1 auto' }}></span>
                <div className='avlonl'>
                  {/* <div className='available'>16360</div> */}

                  {/* <div className='available'>Active</div>
                  <div className='show_online'></div> */}


                </div>
              </div>
            </div>
          </div>
        </div>
        <div onClick={close} className='close_support_chat'>
          &#10006;
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Select = styled('select')`
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  border: 1px solid #e4e4e4;
  background-color: #fff;
  padding: 5px 10px;
`;
const Option = styled('option')`
  padding: 10px;
`;

export default connect((store) => ({ site: store.site }))(Call);
