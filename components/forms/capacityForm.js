import { TextField, Button, Box, FormControlLabel } from "@mui/material";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TextInput } from "react-native";
import { postform } from "./postform";
import Checkbox from "@mui/material/Checkbox";
import { Label, WindowSharp } from "@mui/icons-material";
import Input from "@mui/material/Input";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
//onchange ve handle metotları yazılıp güncelleme yapılacak
//değiştirilmeyen veriler aynı kalacak
async function update(
    mevcutBanknot10,
    mevcutBanknot20,
    mevcutBanknot50,
    mevcutBanknot100,
    mevcutBanknot200,
    capacityId,
    atmId
) {
    const url ="https://stajprojewebapi.azurewebsites.net/";
    const formData = new FormData();
    formData.append("mevcutBanknot10", mevcutBanknot10);
    formData.append("mevcutBanknot20", mevcutBanknot20);
    formData.append("mevcutBanknot50", mevcutBanknot50);
    formData.append("mevcutBanknot100", mevcutBanknot100);
    formData.append("mevcutBanknot200", mevcutBanknot200);
    formData.append("capacityId", capacityId);
    formData.append("atmId", atmId);
    await fetch(REACT_APP_WEB_API+"update/capacity", {
        method: "POST",
        body: formData,
    }).finally(() => {
       window.location.href="/table";
    });
}
export default function CapacityForm({ capacity }) {
    const [state, setState] = React.useState({
        mevcutBanknot10: capacity.mevcutBanknot10,
        mevcutBanknot20: capacity.mevcutBanknot20,
        mevcutBanknot50:  capacity.mevcutBanknot50,
        mevcutBanknot100:  capacity.mevcutBanknot100,
        mevcutBanknot200:  capacity.mevcutBanknot200,
    });
    const {
        mevcutBanknot10,
        mevcutBanknot20,
        mevcutBanknot50,
        mevcutBanknot100,
        mevcutBanknot200,
    } = state;

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <Box component="form" noValidate sx={{ mt: 1,borderRadius: 2}}>
            <strong>{capacity.capacityId}</strong>
            <TextField
                onChange={handleChange}
                value={mevcutBanknot10 || capacity.mevcutBanknot10}
                margin="normal"
                required
                fullWidth
                id="mevcutBanknot10"
                label="mevcutBanknot10"
                name="mevcutBanknot10"
                autoFocus
                
            />
            <TextField
                onChange={handleChange}
                value={mevcutBanknot20 || capacity.mevcutBanknot20}
                margin="normal"
                required
                fullWidth
                name="mevcutBanknot20"
                label="mevcutBanknot20"
                id="mevcutBanknot20"
            />
            <TextField
                onChange={handleChange}
                value={mevcutBanknot50 || capacity.mevcutBanknot50}
                margin="normal"
                required
                fullWidth
                id="mevcutBanknot50"
                label="mevcutBanknot50"
                name="mevcutBanknot50"
                autoFocus
    
            />
            <TextField
                onChange={handleChange}
                value={mevcutBanknot100 || capacity.mevcutBanknot100}
                margin="normal"
                required
                fullWidth
                name="mevcutBanknot100"
                label="mevcutBanknot100"
                id="mevcutBanknot100"
             
            />
            <TextField
                onChange={handleChange}
                value={mevcutBanknot200 || capacity.mevcutBanknot200}
                margin="normal"
                required
                fullWidth
                id="mevcutBanknot200"
                label="mevcutBanknot200"
                name="mevcutBanknot200"
       
                autoFocus
            />
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>
                    update(
                        mevcutBanknot10,
                        mevcutBanknot20,
                        mevcutBanknot50,
                        mevcutBanknot100,
                        mevcutBanknot200,
                        capacity.capacityId,
                        capacity.atmId
                    )
                }
            >
                update
            </Button>
        </Box>
    );
}
