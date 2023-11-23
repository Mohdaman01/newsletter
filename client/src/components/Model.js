import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import BasicSelect from './DropDown';
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

const countries = [{
  name: 'All',
  value: ''
},
{
  name: 'India',
  value: 'in'
},
{
  name: 'USA',
  value: 'us'
},
{
  name: 'United Kingdom',
  value: 'gb',
},
{
  name: 'Japan',
  value: 'jp'
},
{
  name: 'France',
  value: 'fr'
},
{
  name: 'Australia',
  value: 'au'
},
{
  name: 'South Korea',
  value: 'kr'
},
{
  name: 'Brazil',
  value: 'br'
},
{
  name: 'Austria',
  value: 'at'
},
{
  name: 'Argentina',
  value: 'ar'
},
{
  name: 'United Arab Emirates',
  value: 'ae'
},
{
  name: 'Canada',
  value: 'ca'
},
{
  name: 'SwitzerLand',
  value: 'ch'
},
{
  name: 'China',
  value: 'cn'
},
{
  name: 'Colombia',
  value: 'co'
},
{
  name: 'Germany',
  value: 'de'
},
{
  name: 'Egypt',
  value: 'eg'
},
{
  name: 'France',
  value: 'fr'
},
{
  name: 'Greece',
  value: 'gr'
},
{
  name: 'Honk Kong',
  value: 'hk'
},
{
  name: 'Indonesia',
  value: 'id'
},
{
  name: 'Ireland',
  value: 'ir'
},
{
  name: 'Israel',
  value: 'il'
},
{
  name: 'Italy',
  value: 'it'
},
{
  name: 'Mexico',
  value: 'mx'
},
{
  name: 'Malaysia',
  value: 'my'
},
{
  name: 'Nigeria',
  value: 'ng'
},
{
  name: 'Netherlands',
  value: 'nl'
},
{
  name: 'Norway',
  value: 'no'
},
{
  name: 'NewZealand',
  value: 'nz'
},
{
  name: 'Philippines',
  value: 'ph'
},
{
  name: 'Poland',
  value: 'pl'
},
{
  name: 'Portugal',
  value: 'pt'
},
{
  name: 'Russia',
  value: 'ru'
},
{
  name: 'Saudi Arabia',
  value: 'sa'
},
{
  name: 'Sweden',
  value: 'se'
},
{
  name: 'Singapore',
  value: 'sg'
},
{
  name: 'Turkey',
  value: 'tr'
},
{
  name: 'Taiwan',
  value: 'tw'
},
{
  name: 'Ukraine',
  value: 'ua'
},
{
  name: 'South Africa',
  value: 'za'
}
]

const category = [
  {
    name: 'All',
    value: ''
  },
  {
    name: 'General',
    value: 'general'
  },
  {
    name: 'Business',
    value: 'business'
  },
  {
    name: 'Entertainment',
    value: 'entertainment'
  },
  {
    name: 'Health',
    value: 'health'
  },
  {
    name: 'Science',
    value: 'science'
  },
  {
    name: 'Sports',
    value: 'sports'
  },
  {
    name: 'Technology',
    value: 'technology'
  }
]

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const { setHomeNews, fetchData, setPageno } = React.useContext(HomeNewsContext);
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
    console.log(countryFilter);
    console.log(categoryFilter);
    setHomeNews([]);
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