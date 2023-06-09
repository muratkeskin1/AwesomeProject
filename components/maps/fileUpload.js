import React, { useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
function FileUpload() {
  const url ="https://stajprojewebapi.azurewebsites.net/";
  const [file, setFile] = useState(null);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    try {
      const response = await axios.post(REACT_APP_WEB_API+'postimage', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    finally{
      alert("dosya gönderildi başarıyla.")
    }
    console.log(file);
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Dosya Yükleme Sayfası
        </Typography>
        <input type="file" onChange={handleFileUpload} />
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
          Yükle
        </Button>
      </Paper>
    </Container>
  );
}
export default FileUpload;
