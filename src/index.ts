const menu = document.getElementById( "menu" );

// Background scrolling animation
function setActiveIndex( index:number ): void
{
   if ( menu != null )
   {
      menu.dataset.activeIndex = index.toString( );
   }
}

var menuItems = document.getElementsByClassName( "card-wrapper" ) as HTMLCollectionOf<Element>;
for ( var i = 0; i < menuItems.length; i++ )
{
   (function( index )
   {
      menuItems[ index ].addEventListener( "mouseover", function(){ setActiveIndex( index ) } );
   })( i );
}

// Mouse tracker