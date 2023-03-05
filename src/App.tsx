import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './App.css';

import * as Constants from './code/constants';

const App = () => {
  const [color, setColor] = useState<string>("black");
  const [colorList, setColorList] = useState<string[]>([]);


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
      <Button variant="contained" onClick={randomColor}
        style={{
          borderRadius: 35,
          backgroundColor: color,
          padding: "18px 36px",
          fontSize: "18px"
        }}
      >{color}</Button>

      <List>
        {colorList.map((color, index) =>
          <ListItem style={{
            borderRadius: 35,
            backgroundColor: color,
            fontSize: "18px"
          }}
            key={index}
            color={color}>
            <ListItemText
              primary={color}
            />
          </ListItem>
          ,
        )}
      </List>
    </div >
  );
}

export default App;