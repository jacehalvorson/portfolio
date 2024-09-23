import "./shades_remote.css";

const ip_address = '10.0.0.219';
const port = '1024';

const connectToWebSocket = () => {
    const socket = new WebSocket('ws://' + ip_address + ':' + port);
    socket.addEventListener("open", (event) =>
    {
        console.log('Connected to WebSocket');
    });
    socket.addEventListener("message", (event) =>
    {
        console.log('Message from server: ', event.data);
    });
    socket.addEventListener('close', () => {
        console.log('Disconnected from WebSocket');
    });
    socket.addEventListener('error', (err) => {
        console.log(err);
    });
}

function ShadesRemote( )
{
    return (
        <main id="shades-remote">
            <h1>Shades Remote</h1>
            <button onClick={connectToWebSocket}>Connect</button>
            <button>Open</button>
            <button>Close</button>
            <button>Enable important mode</button>
            <button>Disable important mode</button>
        </main>
    );
}

export default ShadesRemote;
