import {useState} from "react";
import "./shades_remote.css";

const ip_address = '10.0.0.219';
const port = '1024';

function ShadesRemote( )
{
    const [shadesState, setShadesState] = useState(0);

    const getShadesState = () => {
        fetch('http://' + ip_address + ':' + port)
            .then(response => {console.log(response); return response.json();})
            .then(data => {
                setShadesState(data.state);
            })
            .catch(err => {
                console.error('Error reading shades state from ' + ip_address + ':' + port + '\n\n' + err);
            });
    }

    return (
        <main id="shades-remote">
            <h1>Shades Remote</h1>
            <button onClick={getShadesState}>Connect</button>
            <button>Open</button>
            <button>Close</button>
            <button>Enable important mode</button>
            <button>Disable important mode</button>
            <h2>{shadesState}</h2>
        </main>
    );
}

export default ShadesRemote;
