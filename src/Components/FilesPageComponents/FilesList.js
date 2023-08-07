import React, { useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { getUserDdb } from '../DynamoDBFunctions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CsvLogo from '../../Images/CsvLogo.png';

const FilesList = () => {
  const [filesFromDdb, setFilesFromDdb] = useState([]);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('updatedAt');
  const [order, setOrder] = useState('desc');

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      const fetchData = async () => {
        try {
          const fileResult = await getUserDdb(user.username);
          setFilesFromDdb(fileResult.data.getUser.files.items);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    }
  }, [user, authStatus]);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    // For date sorting
    if (property === 'updatedAt') {
      const sortedFiles = filesFromDdb.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return isAsc ? dateA - dateB : dateB - dateA;
      });
      setFilesFromDdb(sortedFiles);
    } else if (property === 'title') {
      // For title sorting
      const sortedFiles = filesFromDdb.sort((a, b) => {
        return isAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      });
      setFilesFromDdb(sortedFiles);
    } else {
      // For other columns sorting
      const sortedFiles = filesFromDdb.sort((a, b) => {
        return isAsc ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property]);
      });
      setFilesFromDdb(sortedFiles);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = filesFromDdb.map((row) => row.id);
      setSelected(newSelectedIds);
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelectedIds = newSelectedIds.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelectedIds);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sortable and selectable table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < filesFromDdb.length}
                  checked={filesFromDdb.length > 0 && selected.length === filesFromDdb.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'file'}
                  direction={orderBy === 'file' ? order : 'asc'}
                  onClick={() => handleSortRequest('file')}
                >
                  File
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={() => handleSortRequest('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'owner'}
                  direction={orderBy === 'owner' ? order : 'asc'}
                  onClick={() => handleSortRequest('owner')}
                >
                  Owner
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'updatedAt'}
                  direction={orderBy === 'updatedAt' ? order : 'asc'}
                  onClick={() => handleSortRequest('updatedAt')}
                >
                  Last Modified Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filesFromDdb.map((row) => {
              const isItemSelected = selected.indexOf(row.id) !== -1;
              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={(event) => handleRowClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div className='file-type-layout'>
                        <img className='files-type-logo' src={CsvLogo} alt="csv logo" />
                        <b>Pipeline Detail</b>
                    </div>
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>Me</TableCell>
                  <TableCell>{formatDate(row.updatedAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FilesList;
