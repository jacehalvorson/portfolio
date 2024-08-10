import * as React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import "./shades_remote.css";

const ip_address = '10.0.0.219';

function ShadesRemote( )
{
    const [shadesState, setShadesState] = React.useState('');
    const [mode, setMode] = React.useState('');
    const [inhibitButtons, setInhibitButtons] = React.useState(false);
    
    const handleStateChange = ( event, newState ) =>
    {
        setInhibitButtons(true);
        fetch('http://' + ip_address + '/' + newState, {method: 'POST'})
        .then(response => {console.log(response)})
        .then(setShadesState(newState))
        .catch(err => {console.error('Error sending ' + newState + ' to ' + ip_address + '\n\n' + err)})
        .finally(() => {setInhibitButtons(false)});
    }

    const handleModeChange = ( event, newMode ) =>
    {
        setInhibitButtons(true);
        fetch('http://' + ip_address + '/mode/' + newMode, {method: 'POST'})
        .then(response => {console.log(response)})
        .then(setMode(newMode))
        .catch(err => {console.error('Error transitioning to ' + newMode + ' mode at ' + ip_address + '\n\n' + err)})
        .finally(() => {setInhibitButtons(false)});
    }
    
    React.useEffect( ( ) => {
        fetch('http://' + ip_address)
            .then(response => {response.json()})
            .then(data => {
                setShadesState(data.state);
                setMode(data.mode);
            })
            .catch(err => {
                console.error('Error reading shades state and mode from ' + ip_address + '\n\n' + err);
            });
    }, [ ] );

    return (
        <main id="shades-remote">
            <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                {/* title */}
                <h1 style={{textAlign: "center"}}>Shades Remote</h1>

                {/* Open/close control */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <h2 style={{lineHeight: 1}}>Current state:</h2>
                    <ToggleButtonGroup
                        value={shadesState}
                        exclusive
                        onChange={handleStateChange}
                        aria-label="shades state"
                    >
                        <ToggleButton value="open" aria-label="open shades" disabled={inhibitButtons}>
                            OPEN
                        </ToggleButton>
                        <ToggleButton value="close" aria-label="close shades" disabled={inhibitButtons}>
                            CLOSE
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                {/* Mode control */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <h2 style={{lineHeight: 1}}>Mode:</h2>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={handleModeChange}
                        aria-label="shades mode"
                    >
                        <ToggleButton value="normal" aria-label="normal mode" disabled={inhibitButtons}>
                            NORMAL
                        </ToggleButton>
                        <ToggleButton value="important" aria-label="important mode" disabled={inhibitButtons}>
                            IMPORTANT
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                {/* Alarm control */}
                <h2 style={{lineHeight: 1}}>Next Alarm: 7:00 AM</h2>
            </Stack>
        </main>
    );
}


export default ShadesRemote;
