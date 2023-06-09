export function changeSectionIndex( sectionIndex, setSectionIndex, change, numSections )
{
  const previousSectionIndex = sectionIndex;

  if ( change === "next" && sectionIndex < ( numSections - 1 ) )
  {
    setSectionIndex( sectionIndex + 1 );
    document.getElementById( "home-slider-button-left" ).classList.remove( "unclickable" );
    if ( ( previousSectionIndex + 1 ) === ( numSections - 1 ) )
    {
      document.getElementById( "home-slider-button-right" ).classList.add( "unclickable" );
    }
  }
  else if ( change === "prev" && sectionIndex > 0 )
  {
    setSectionIndex( sectionIndex - 1 );
    document.getElementById( "home-slider-button-right" ).classList.remove( "unclickable" );
    if ( ( previousSectionIndex - 1 ) === 0 )
    {
      document.getElementById( "home-slider-button-left" ).classList.add( "unclickable" );
    }
  }
}