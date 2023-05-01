function getSectionWrapperClassNames( activeIndex, sectionIndex )
{
  let classNames = "section-wrapper";

  if ( activeIndex === sectionIndex )
  {
    classNames += " active";
  }
  else if ( activeIndex > sectionIndex )
  {
    classNames += " hidden-left";
  }
  else
  {
    classNames += " hidden-right";
  }

  return classNames;
}

export default getSectionWrapperClassNames;