import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import "./shades_remote.css";
import { whistle } from 'fontawesome';

const ip_address = '10.0.0.219';

function sendPostRequest( parameter )
{
    const options = {
        method: 'POST'
    }

    fetch('http://' + ip_address + '/' + parameter, options)
        .then(response => {console.log(response)})
        .catch(err => {
            console.error('Error opening shades at ' + ip_address + '\n\n' + err);
        });
}

function ShadesRemote( )
{
    const [shadesState, setShadesState] = React.useState('Loading...');
    const [selected, setSelected] = React.useState(false);

    // useEffect( ( ) => {
    //     fetch('http://' + ip_address)
    //         .then(response => {console.log(response); return response.json();})
    //         .then(data => {
    //             setShadesState(data.state);
    //         })
    //         .catch(err => {
    //             console.error('Error reading shades state from ' + ip_address + '\n\n' + err);
    //         });
    // }, [ ] );

    return (
        <main id="shades-remote">
            <h1>Shades Remote</h1>
            <Stack spacing={2} direction="column">
                <Button variant="contained" onClick={(e) => {sendPostRequest('open')}}>Open</Button>
                <Button variant="contained" onClick={(e) => {sendPostRequest('close')}}>Close</Button>
                <h2>Important Mode:</h2>
                <ToggleButton
                    value="check"
                    selected={selected}
                    onChange={(e) => {setSelected(!selected)}}
                    sx={{
                        bgcolor: "black",
                        color: "white",
                        "&.Mui-selected": {
                            bgcolor: "white",
                            color: "black",
                        },
                        "&.Mui-selected:hover": {
                            bgcolor: "black",
                            color: "white",
                        }
                    }}
                >
                    <CheckIcon />
                </ToggleButton>
            </Stack>
            <h2>{shadesState}</h2>
        </main>
    );
}


export default ShadesRemote;
