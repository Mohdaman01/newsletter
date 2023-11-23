import * as React from 'react';
import { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { AccountContext } from '../context/AccountProvider';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import BasicModal from './Model';
import { Link } from 'react-router-dom';
import { HomeNewsContext } from '../context/NewsProvider';


const settings = ['Logout'];

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar(props) {

  const { account, setAccount } = useContext(AccountContext);

  const { setHomeNews, searchNewsData, setSearchNews, fetchData, setPageno } = useContext(HomeNewsContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [tosearch, setToSearch] = React.useState('');


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleSearch = async (e) => {
    e.preventDefault();

    await searchNewsData(tosearch);

  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleLogOut = () => {
    setAnchorElUser(null);

    localStorage.removeItem('loginTokken');
    setAccount(null);
    return;
  }


  return (
    <AppBar position="static" style={{
      "position": "fixed"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NewspaperIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            onClick={() => {
              setSearchNews([]);
              setPageno(1);
              setHomeNews([]);
              fetchData();
            }}
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NewsFix
          </Typography>





          <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>

            {localStorage.getItem('loginTokken') === null ?

              <Button variant='contained' ><Link to='/login' style={{textDecoration: 'none', color: 'white'}} >Login</Link></Button>
              :
              <Box style={{display: 'flex'}}>
                <Search onSubmit={e => handleSearch(e)} style={{ marginLeft: "auto" }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={tosearch}
                    onChange={(e) => setToSearch(e.target.value)}
                  />
                </Search>
                <div style={{ display: 'flex' }}>
                  <BasicModal />
                  <Tooltip title="Open settings" style={{ marginLeft: '2rem' }} >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={account.picture} />
                    </IconButton>
                  </Tooltip>
                </div>


                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleLogOut}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;