import {useState, useEffect} from "react";
import "./shades_remote.css";

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
    const [shadesState, setShadesState] = useState('Loading...');

    useEffect( ( ) => {
        fetch('http://' + ip_address)
            .then(response => {console.log(response); return response.json();})
            .then(data => {
                setShadesState(data.state);
            })
            .catch(err => {
                console.error('Error reading shades state from ' + ip_address + '\n\n' + err);
            });
    }, [ ] );

    return (
        <main id="shades-remote">
            <h1>Shades Remote</h1>
            <button onClick={(e) => {sendPostRequest('open')}}>Open</button>
            <button onClick={(e) => {sendPostRequest('close')}}>Close</button>
            <button onClick={(e) => {sendPostRequest('important_mode_on')}}>Enable important mode</button>
            <button onClick={(e) => {sendPostRequest('important_mode_ff')}}>Disable important mode</button>
            <h2>{shadesState}</h2>
        </main>
    );
}


export default ShadesRemote;
