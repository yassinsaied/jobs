// @react hooks
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
// @redux
import { useSelector, useDispatch } from 'react-redux';

// @age gride
import { AgGridReact } from 'ag-grid-react';
// import { faker } from '@faker-js/faker';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// @mui
import { Container, Grid } from '@mui/material';

import { allProfilesActions } from '../store/actions/profileAction';
import { updateAgGridData, updateCellData } from '../store/reducers/profileSlice';

const AllProfilesPage = () => {
  const dispatch = useDispatch();
  const { allProfile } = useSelector((state) => state.profile);
  const [datap, setDatap] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: '_id',
      headerName: 'Profile',
      hide: true,
    },
    {
      field: 'user.name',
      headerName: 'Name',
      // checkboxSelection: true,
      minWidth: 100,
      filter: 'agTextColumnFilter',
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'company',
      headerName: 'Company',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },

    {
      field: 'user.email',
      headerName: 'Email',
      minWidth: 150,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      minWidth: 50,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'location',
      headerName: 'Location',
      minWidth: 200,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'active',
      headerName: 'Active',
      minWidth: 50,
      filter: false,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      editable: true,

      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 50,
    }),

    []
  );

  const onGridReady = useCallback(() => {
    dispatch(allProfilesActions());
  }, [dispatch]);

  const onCellValueChanged = (event) => {
    const { rowIndex, colDef, newValue } = event;
    console.log(rowIndex, colDef.field, newValue);
    dispatch(updateCellData({ rowIndex, colId: colDef.field, newValue }));
  };

  // useEffect(() => {
  //   dispatch(updateAgGridData(datap));
  // }, [dispatch]);

  useEffect(() => {
    setDatap(allProfile);
  }, [allProfile]);

  const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted');
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    console.log('cellEditingStopped');
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={2}>
        <h2>AG Grid Implementation</h2>
        <div
          className="ag-theme-alpine"
          style={{
            height: '90vh',
            width: '100%',
          }}
        >
          <AgGridReact
            rowData={datap}
            columnDefs={columnDefs}
            rowSelection={'multiple'}
            defaultColDef={defaultColDef}
            pagination="true"
            paginationPageSize={10}
            onGridReady={onGridReady}
            // onCellValueChanged={onCellValueChanged}
            // onCellEditingStarted={onCellEditingStarted}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </Grid>
    </Container>
  );
};

export default AllProfilesPage;
