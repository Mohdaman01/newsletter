import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ 
    filterName,
    filter,
    setFilter, 
    mapItems,
}) {
     

    return (
        <Box sx={{ width: 150, margin: '1rem'}}>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">{filterName}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label={filterName}
                    onChange={(e)=>setFilter(e.target.value)}
                >   
                    {mapItems.map((item)=>(
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    );
}