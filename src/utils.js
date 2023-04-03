export function ReadJSONAndExecuteSetter( fileName, setterFunction )
{
  fetch( fileName )
    .then( response => response.json( ) )
    .then( json => { setterFunction( json ) } )
    .catch( err => console.error( err ) );
}

export async function getStatTable( ) {
  try
  {
    const url = 'https://www.pro-football-reference.com/years/2022/passing.htm#passing';
    const response = await fetch( url );
    const html = await response.text( );

    const parser = new DOMParser( );
    const parsedHtml = parser.parseFromString( html, 'text/html' );
    const table = parsedHtml.querySelector( 'table' );
    console.log( table );
    return table;
  }
  catch ( error )
  {
    console.error( 'Error: Could not get stat table - ' + error );
  }
}