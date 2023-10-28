import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    if (!props.visibility){
        return null
    }
  return (
    
    <Stack spacing={2} direction="row">
        <Button onClick={() => {
            props.func()
        }}
        variant={props.choice=="text"?"text":props.choice=="contained"?"contained":"outlined"}>{props.text}</Button>
    </Stack>
  );
}