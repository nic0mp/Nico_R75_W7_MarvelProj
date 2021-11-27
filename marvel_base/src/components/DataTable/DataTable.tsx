import react from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {server_calls} from '../../api';
import { useGetData } from '../../custom-hooks';

interface gridData{
  data:{
    id?:string;
  }
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'name', headerName: 'Drone name', width: 130 },
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
    let {droneData, getData} = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = ()=> {
      setOpen(true)
    }

    let deleteData = async () =>{
      await server_calls.delete(`${gridData[0]}`)
      getData()
    }

    console.log(gridData)


      return(
          <div style={{height: 400, width: '100%' }}>
            <h2>Drones in Inventory</h2>
            <DataGrid rows={droneData} columns={columns} 
                      pageSize={5} 
                      checkboxSelection
                      onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel);}} 
                      {...droneData}
                      />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
              <DialogTitle id='form-dialog-title'></DialogTitle>
              <DialogContent>
                <DialogContentText>Updating: {gridData[0]}</DialogContentText>
                  <DroneForm id = {`${gridData[0]}`}></DroneForm>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} style={{backgroundColor:'maroon'}}Cancel></Button>
              </DialogActions>
            </Dialog>
          </div>
      )
  }