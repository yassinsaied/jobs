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
import { Container, Grid, Stack, Button, ButtonGroup } from '@mui/material';

import { allProfilesActions } from '../store/actions/profileAction';

import { updateAgGridData } from '../store/reducers/profileSlice';

function extractAndCreateObject(source, properties) {
  return properties.reduce((result, property) => {
    if (source[property] !== undefined) {
      result[property] = source[property];
    }
    return result;
  }, {});
}

const AllProfilesPage = () => {
  // Handel state

  const { allProfile, loading } = useSelector((state) => state.profile);

  const [datap, setDatap] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  // Handel AG grid

  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: '_id',
      headerName: 'Profile',
      hide: true,
    },
    {
      field: 'user._id',
      headerName: 'userId',
      hide: true,
    },
    {
      field: 'user.name',
      headerName: 'Name',
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

  const onRowValueChanged = useCallback((event) => {
    const data = event.data;
    const profileupdated = {
      userId: data.user._id,
      user: {
        name: data.user.name,
        email: data.user.email,
      },
      profile: {
        status: data.status && data.status,
        company: data.status && data.status,
        location: data.location && data.location,
        active: data.active && data.active,
        phone: data.phone && data.phone,
      },
    };
    // setUpdatedData([
    //   ...updatedData ,
    //   { }
    // ])

    console.log(data);
  }, []);

  useEffect(() => {
    if (allProfile === datap) {
      dispatch(allProfilesActions());
    }
  }, [allProfile]);

  useEffect(() => {
    setDatap(allProfile);
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={2}>
        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={3} sx={{ my: 3 }}>
          <ButtonGroup spacing={'20px'} aria-label="spacing button group">
            <Button color="success" variant="contained">
              Export
            </Button>
            <Button variant="contained" disabled={disabled}>
              Save
            </Button>
          </ButtonGroup>
        </Grid>

        <Stack
          className="ag-theme-alpine"
          style={{
            height: '90vh',
            width: '100%',
          }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={datap}
            columnDefs={columnDefs}
            rowSelection={'multiple'}
            defaultColDef={defaultColDef}
            pagination="true"
            paginationPageSize={10}
            editType={'fullRow'}
            onRowValueChanged={onRowValueChanged}
          />
        </Stack>
      </Grid>
    </Container>
  );
};

export default AllProfilesPage;
