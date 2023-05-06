export function getSectionWrapperClassNames( activeIndex, sectionIndex )
{
  let classNames = "section-wrapper";

  if ( activeIndex > sectionIndex )
  {
    classNames += " hidden-left";
  }
  else if ( activeIndex < sectionIndex )
  {
    classNames += " hidden-right";
  }

  return classNames;
}

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