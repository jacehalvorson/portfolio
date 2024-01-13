const games = [
   {
      teams: [
         {
            name: "DET",
            logo: "https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/atl.png",
            seed: 3
         },
         {
            name: "LAR",
            logo: "https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/atl.png",
            seed: 6
         }
      ],

      winner: HOME,
   },
   {
      teams: [
         {
            name: "TB",
            logo: "https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/atl.png",
            seed: 4
         },
         {
            name: "PHI",
            logo: "https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/atl.png",
            seed: 5
         }
      ],

      winner: HOME,
   },
];

  <div class="conference">   
  {
     games.map( ( game ) => {
        const teams = game.teams;

        return (
           <div class="game">
              {
                 teams.map( ( team ) => {
                 return (
                    <div class="team">
                       <img src={ team.logo } alt="logo" />
                       <h2>{ team.name }</h2>
                       <p>{ team.seed }</p>
                    </div>
                 );
              })}
           </div>
        );
  })}
  </div>