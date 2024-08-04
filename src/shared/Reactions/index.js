import React from 'react';
import { Popover, Box } from '@material-ui/core';
import styled from 'styled-components';

import Reactions from '../../components/Layout/Onlinebar/Reactions';

export default ({ open, close, onReact }) => {
  return (
    <Popover
      open={!!open}
      anchorEl={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={close}
    >
      <Box style={{width:'350px', height:'400px'}}>
        {Reactions.map((item) => (
          <Emoji key={item.name} alt='' src={item.icon} onClick={() => onReact(item.name)} />
        ))}
      </Box>
    </Popover>
  );
};
const Emoji = styled('img')`
  width: 50px;
  height: 50px;
  cursor: pointer;
  padding: 5px;
`;
