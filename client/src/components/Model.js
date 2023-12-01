import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import BasicSelect from './DropDown';
import countries from '../constants/country';
import category from '../constants/category';
import { HomeNewsContext } from '../context/NewsProvider';

const style = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '390px',
  maxWidth: "400px",
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const { setHomeNews, fetchData, setPageno,setSearchNews } = React.useContext(HomeNewsContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [countryFilter, setCountryFilter] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');


  const handleFilterChange = (filterType, value) => {

    localStorage.setItem(`${filterType}Filter`, value);

  };


  const handleApply = () => {

    handleFilterChange("Country", countryFilter);
    handleFilterChange("Category", categoryFilter);
    
    setHomeNews([]);
    setSearchNews([]);
    setPageno(1);
    fetchData();
    setOpen(!open);

  }


  return (
    <div>
      <Button style={{marginLeft:'2rem'}} variant='contained' onClick={handleOpen}>Filters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '100%'}} >
            <BasicSelect filterName='Country' filter={countryFilter} setFilter={setCountryFilter} mapItems={countries} />
            <BasicSelect filterName='Category' filter={categoryFilter} setFilter={setCategoryFilter} mapItems={category} />
          </div>


          <Button style={{width: '5rem', marginTop: 'auto'}} onClick={() => handleApply()}>Apply</Button>
        </Box>
      </Modal>
    </div>
  );
}