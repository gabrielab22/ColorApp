import React, { useCallback, useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import styled from '@emotion/styled'
import './App.css';

import * as Constants from './code/constants';

type StyledButtonProps = Omit<ButtonProps, "color"> & {
  color: string;
}

const StyledButton = styled(({ color, ...props }: StyledButtonProps) => <Button {...props} />)`
  border-radius: 35px;
  background-color: ${({ color }) => color};
  font-size: 18px;
  margin-top: 20px;
  :hover{
    background-color: ${({ color }) => color};
  }
`;

const StyledListItem = styled(ListItem)`
    border-radius: 35px;
    background-color: ${({ color }) => color};
    font-size: 18px;
`;

const StyledTextField = styled(TextField)`
    margin-right: 50px;
    margin-top: 15px;
  `;

const App = () => {
  const [color, setColor] = useState<string>("black");
  const [colorList, setColorList] = useState<string[]>([]);
  const [text, setText] = useState<string>('Click');


  const addColorToList = useCallback((color: string) => {
    if (color !== "#" && !colorList.includes(color)) {
      setColorList([...colorList, color]);
    }
  }, [colorList])


  const getColorFromArray = useCallback((data: any) => {
    if (data && data.colors && data.colors.length && data.colors[0].hex.length) {
      console.log("Data", data)
      setColor(`#` + data.colors[0].hex)
      addColorToList(`#` + data.colors[0].hex)
      setText(`#` + data.colors[0].hex)
    }
  }, [addColorToList])


  const randomColor = useCallback(async () => {
    await fetch(Constants.randomColorURL, { cache: 'no-cache' })
      .then(res => res.json())
      .then(data => {
        getColorFromArray(data)
      })
      .catch(err => {
        console.log("Error while fetching :(", err)
      });
  }, [getColorFromArray])

  return (
    <div className="App">

      <StyledTextField onChange={e => setText(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
      <StyledButton onClick={randomColor} variant="contained" color={color}>{text}</StyledButton>

      <List>
        {colorList.map((color, index) =>
          <StyledListItem
            key={index}
            color={color}>
            <ListItemText
              primary={color}
            />
          </StyledListItem>
          ,
        )}
      </List>
    </div >
  );
}

export default App;