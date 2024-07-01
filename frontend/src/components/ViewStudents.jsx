import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import UpdateSharpIcon from '@mui/icons-material/UpdateSharp';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/view")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const delValue = (id) => {
    axios.delete("http://localhost:3001/remove/" + id)
      .then((res) => {
        alert(res.data.message);
        setData(data.filter((item) => item._id !== id)); 
      })
      .catch((err) => console.log(err));
  };

  const updateValue = (val) => {
    console.log(val)
    navigate("/i",{state:{val}});
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" sx={{ padding: '1rem' }}>
        Data Table
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((val) => (
            <TableRow key={val._id}>
              <TableCell>{val.name}</TableCell>
              <TableCell>{val.age}</TableCell>
              <TableCell>{val.class}</TableCell>
              <TableCell>{val.department}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => delValue(val._id)}
                  startIcon={<DeleteForeverSharpIcon />} 
                  sx={{ mr: 1 }}
                >
                  Delete
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<UpdateSharpIcon />}
                  onClick={() => updateValue(val)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;