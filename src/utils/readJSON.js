export function ReadJSONAndExecuteSetter( fileName, setterFunction )
{
  fetch( fileName )
    .then( response => response.json( ) )
    .then( json => { setterFunction( json ) } )
    .catch( err => console.error( err ) );
}