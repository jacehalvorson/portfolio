export function changeSectionIndex( sectionIndex, setSectionIndex, change, numSections )
{
  const previousSectionIndex = sectionIndex;

  if ( change === "next" && sectionIndex < ( numSections - 1 ) )
  {
    setSectionIndex( sectionIndex + 1 );
    document.getElementById( "home-arrow-left" ).classList.remove( "unclickable" );
    if ( ( previousSectionIndex + 1 ) === ( numSections - 1 ) )
    {
      document.getElementById( "home-arrow-right" ).classList.add( "unclickable" );
    }
  }
  else if ( change === "prev" && sectionIndex > 0 )
  {
    setSectionIndex( sectionIndex - 1 );
    document.getElementById( "home-arrow-right" ).classList.remove( "unclickable" );
    if ( ( previousSectionIndex - 1 ) === 0 )
    {
      document.getElementById( "home-arrow-left" ).classList.add( "unclickable" );
    }
  }
}