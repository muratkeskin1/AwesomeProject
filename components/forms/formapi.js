import { TextField, Button, Box, FormControlLabel } from "@mui/material";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TextInput } from "react-native";
import { postform } from "./postform";
import Checkbox from "@mui/material/Checkbox";
import { Label } from "@mui/icons-material";
import Input from "@mui/material/Input";
import { postformatm } from "./postatmaddform";

const FormApp = () => {
  const [text, onChangeText] = React.useState("name");
  const [number, onChangeNumber] = React.useState(0);
  const [lat, onChangeLat] = React.useState(0.0);
  const [long, onChangeLong] = React.useState(0.0);
  const [state, setState] = React.useState({
    py: false,
    pc: false,
    ad: false,
  });
  const ariaLabel = { "aria-label": "description" };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { py, pc, ad } = state;
  return (
    <View style={{ }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="number"
          inputProps={{ min: 1 }}
          onChange={(event) => {
            onChangeNumber(event.target.value);
          }}
          value={number || " "}
          id="outlined-controlled"
          label="atm id"
          variant="outlined"
        />
        <Box>
          <FormControlLabel
            label="py"
            control={
              <Checkbox
                checked={py}
                onChange={handleChange}
                name="py"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <FormControlLabel
            label="pc"
            control={
              <Checkbox
                checked={pc}
                onChange={handleChange}
                name="pc"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <FormControlLabel
            label="ad"
            control={
              <Checkbox
                checked={ad}
                onChange={handleChange}
                name="ad"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        </Box>
        <Box>
          <TextField
            required
            id="standard-required-lat"
            label="Latitude"
            defaultValue="0.0"
            variant="standard"
            value={lat || " "}
            onChange={(event) => {
              onChangeLat(event.target.value);
            }}
          />
          <TextField
            required
            id="standard-required-long"
            label="Longitude"
            defaultValue="0.0"
            variant="standard"
            value={long || " "}
            onChange={(event) => {
              onChangeLong(event.target.value);
            }}
          />
        </Box>

        <Button onClick={() => postformatm(number, py, pc, ad, lat, long)} variant="contained">
          ekle
        </Button>
      </Box>
    </View>
  );
};

export default FormApp;
