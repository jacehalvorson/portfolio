import React from 'react';

const Header = ( ) =>
{
  return (
      <header>
        <a className="fa-solid fa-house header-link" href="/"></a>
        <a className="fa-brands fa-github header-link" href="https://github.com/jacehalvorson"></a>
        <a className="header-link" href="/stat-table">Contact</a>

        <div id="header-right-side">
            <a className="fa fa-cog header-link" aria-hidden="true"></a>
            <a className="fa-solid fa-user header-link"></a>
        </div>
      </header>
  );
}

export default Header