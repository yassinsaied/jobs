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

      valueGetter: (params) => {
        return params.data.user.name;
      },
      valueSetter: (params) => {
        console.log(params.data.user.name);
        params.data.user.name = params.newValue;
        dispatch(allProfilesActions());
        return true;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => {
        return params.data.status;
      },
      valueSetter: (params) => {
        params.data.status = params.newValue;
        return true;
      },
    },
    {
      field: 'user.email',
      headerName: 'Email',
      minWidth: 100,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => {
        return params.data.user.email;
      },
      valueSetter: (params) => {
        params.data.user.email = params.newValue;
        return true;
      },
    },
    {
      field: 'phone',
      headerName: 'Phone',
      minWidth: 50,
      filter: 'agTextColumnFilter',
      valueGetter: (params) => {
        return params.data.phone;
      },
      valueSetter: (params) => {
        params.data.phone = params.newValue;
        return true;
      },
    },
    {
      field: 'skills',
      headerName: 'Skills',
      minWidth: 300,
      filter: false,
      valueParser: (params) => String(params.newValue),
      valueGetter: (params) => {
        return params.data.skills;
      },
      valueSetter: (params) => {
        params.data.skills = params.newValue;
        return true;
      },
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

  const onGridReady = useCallback(
    (params) => {
      // fetch('http://127.0.0.1:5000/api/profiles')
      //   .then((resp) => resp.json())
      //   .then((data) => {
      //     dispatch(updateAgGridData(data));
      //     setDatap(allProfile);
      //   });
      dispatch(allProfilesActions());
      setDatap(allProfile);
    },
    [dispatch]
  );

  const onCellValueChanged = (event) => {
    const { rowIndex, colDef, newValue } = event;
    console.log(rowIndex, colDef.field, newValue);
    dispatch(updateCellData({ rowIndex, colId: colDef.field, newValue }));
  };

  useEffect(() => {
    dispatch(updateAgGridData(datap));
  }, [dispatch]);

  const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted');
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    console.log('cellEditingStopped');
  }, []);

  // const onCellValueChanged = useCallback((event) => {
  //   console.log('Data after change is', event.data);
  // }, []);

  // useEffect(() => {
  //   dispatch(allProfilesActions());
  // }, []);

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
