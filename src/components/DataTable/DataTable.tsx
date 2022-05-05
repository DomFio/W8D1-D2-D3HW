import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {serverCalls} from '../../api';
import { useGetData } from '../../custom-hooks';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Dialog
} from '@mui/material';
import { MarvelForm } from '../../components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 130 },
  {
    field: 'name',
    headerName: 'Hero',
    width: 150,
    editable: true,
  },
  {
    field: 'villans',
    headerName: 'Villains',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'super_power',
    headerName: 'Super Power',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
  {
    field: 'origin_summary',
    headerName: 'Origin',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'weakness',
    headerName: 'Weakness',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'movies',
    headerName: 'Movies',
    type: 'number',
    width: 110,
    editable: true,
  },
];

interface gridData{
  data:{
    id?:string;
  }
}

export const DataTable = () => {
  let { marvelData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () =>{
    setOpen(true);
  }
  let handleClose = () =>{
    setOpen(false);
  }

  let deleteData = async () =>{
    await serverCalls.delete(`${gridData[0]}`)
    getData();
  }

  console.log(gridData) //A list of id's from checked rows

    return (
      <div style={{ height: 400, width: '100%' }}>
          <h2>Drones In Inventory</h2>
        <DataGrid
          rows={marvelData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={newSelectionModel =>setData(newSelectionModel)}
          {...marvelData}
        />
        <Button onClick={handleOpen} color='primary'>Update</Button>
        <Button onClick={deleteData} color='warning'>Delete</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id="form-dialog-title">Update A Hero</DialogTitle>
          <DialogContent>
            <DialogContentText>Updating Marvel ID: {gridData[0]}</DialogContentText>
            <MarvelForm id={`${gridData[0]}`} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }