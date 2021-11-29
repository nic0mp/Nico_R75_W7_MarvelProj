import React, {useState} from 'react'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {server_calls} from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import {HeroForm} from '../../components'


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'realName', headerName: 'Real Name', width: 130 },
    { field: 'name', headerName: 'Hero name', width: 130 },
    {
      field: 'cost_of_production',
      headerName: 'Production Cost',
      type: 'number',
      width: 140,
    },
    {
      field: 'series',
      headerName: 'Series',
      description: 'This is for the drones',
      sortable: false,
      width: 160,
     // valueGetter: (params: GridValueGetterParams) =>
       // `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];

  interface gridData{
    data:{
      id?:string;
    }
  }
  

  export const DataTable = () =>{
    let {heroData, getData} = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = ()=> {
      setOpen(true)
    }

    let handleClose = ()=> {
      setOpen(false)
    }

    let deleteData = async () =>{
      await server_calls.delete(`${gridData[0]}`)
      getData()
    }

    console.log(gridData)


      return(
          <div style={{height: 400, width: '100%' }}>
            <h2>Heroess in Database</h2>
            <DataGrid rows={heroData} columns={columns} 
                      pageSize={5} 
                      checkboxSelection
                      onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel);}} 
                      {...heroData}
                      />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
              <DialogTitle id='form-dialog-title'></DialogTitle>
              <DialogContent>
                <DialogContentText>Updating: {gridData[0]}</DialogContentText>
                  <HeroForm id = {`${gridData[0]}`}></HeroForm>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} style={{backgroundColor:'maroon'}}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </div>
      )
  }