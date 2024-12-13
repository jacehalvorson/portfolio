import { CurrentYear } from "./YearUpdate.js";

// Update values of 1 (win) and 2 (lost) by winWeek1.  Future you will have to change winWeek2, winWeek3 and winWeek4.
const WinningGames_OLD = [
		{team: "49ers",  conference: "N", prediction: 1, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Cowboys", conference: "N", prediction: 2, winWeek1: 2, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Lions", conference: "N", prediction: 3, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Buccaneers", conference: "N", prediction: 4, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Eagles", conference: "N", prediction: 5, winWeek1: 2, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Rams", conference: "N", prediction: 6, winWeek1: 2, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Packers", conference: "N", prediction: 7, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Ravens", conference: "A", prediction: 1, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Bills", conference: "A", prediction: 2, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Chiefs", conference: "A", prediction: 3, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Texans", conference: "A", prediction: 4, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Browns", conference: "A", prediction: 5, winWeek1: 2, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Dolphins", conference: "A", prediction: 6, winWeek1: 2, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Steelers", conference: "A", prediction: 7, winWeek1: 2, winWeek2: 0, winWeek3: 0, winWeek4: 0}];

// This list needs to keep the data in AWS so this codeline be removed.
// Every year the teams can then be modified based on how they did.
function getTeamName(year, conference, seed)
{
   if ( conference === "N" )
   {
      switch ( seed )
      {
         case 1:
			  return "Vikings";
         case 2:
			  return "49ers";
         case 3:
			  return "Commanders";
         case 4:
			  return "Saints";
         case 5:
			  return "Packers";
         case 6:
			  return "Lions";
         case 7:
			  return "Bears";
         default:
            return "";
      }
   }
   else if (conference === "A")
   {
      switch (seed)
      {
         case 1:
            return "Ravens";
         case 2:
            return "Bills";
         case 3:
            return "Chiefs";
         case 4:
            return "Texans";
         case 5:
            return "Browns";
         case 6:
            return "Dolphins";
         case 7:
            return "Steelers";
	  }
   }

   console.error( "Unable to find logo for team with seed " + seed + " in conference " + conference );
   return "";
}

function logoFilename(teamName)
{
	return "images/teams/" + teamName + "-logo.png";
}
	
function gameOpponent(weekDivision, conference, prediction, winningGames) {
	if (weekDivision.slice(0, 1) === "W" || weekDivision.slice(0, 1) === "w") {
		// This is all the teams handle in the first week.
		if (prediction === 4)
			return 5;
		if (prediction === 5)
			return 4;
		if (prediction === 3)
			return 6;
		if (prediction === 6)
			return 3;
		if (prediction === 2)
			return 7;
		if (prediction === 7)
			return 2;
		if (prediction === 1)
			return 1;

		console.log("An invalid prediction was sent: conference " + conference  + " prediction " + prediction);
		return [];
	}
	else if (weekDivision.slice(0, 1) === "D" || weekDivision.slice(0, 1) === "d") {
		// In the second week, team 1 plays the winners from 1st week with the largest number.  The other 2 play.
		let wonTeams = [];
		var game;
		winningGames.forEach(winningPoints => 
		{
			if (winningPoints.conference === conference && winningPoints.winWeek1 === 1) {
				wonTeams = [...wonTeams, winningPoints.prediction];
			};
		});
		if (prediction === 1)
		{
			return Math.max.apply(Math, wonTeams);
		};
		if (prediction === Math.min.apply(Math, wonTeams))
		{
			game = secondSmallest(wonTeams);
			return game;
		};
		if (prediction === secondSmallest(wonTeams))
		{
			game = Math.min.apply(Math, wonTeams);
			return game;
		};
		if (prediction === Math.max.apply(Math, wonTeams))
		{
			return 1;
		};		
		
		const winningPoints = winningGames.find(team => team.conference.slice(0, 1) === conference.slice(0, 1) && 
			team.prediction === prediction && team.winWeek1 === 2);
		return winningPoints.prediction;		
	}
	else if (weekDivision.slice(0, 1) === "C" || weekDivision.slice(0, 1) === "c") {
		// In the third week, the 2 players in each division play.
		let wonTeams = [];
		winningGames.forEach(winningPoints => 
		{
			if (winningPoints.conference === conference && winningPoints.winWeek2 === 1) {
				wonTeams = [...wonTeams, winningPoints.prediction];
			};
		});
		if (prediction === Math.min.apply(Math, wonTeams))
		{
			return Math.max.apply(Math, wonTeams);
		};
		if (prediction === Math.max.apply(Math, wonTeams))
		{
			return Math.min.apply(Math, wonTeams);
		};

		const winningPoints = winningGames.find(team => team.conference.slice(0, 1) === conference.slice(0, 1) && 
					team.prediction === prediction && team.winWeek2 === 2);
		return winningPoints.prediction;		
	}
	else if (weekDivision.slice(0, 1) === "S" || weekDivision.slice(0, 1) === "s") {
		// In the forth week, the last 2 teams play.
		let wonTeams = [];
		winningGames.forEach(winningPoints => 
		{
			if (winningPoints.winWeek3 === 1) {
				wonTeams = [...wonTeams, {conference: winningPoints.conference, prediction: winningPoints.prediction}];
			};
		});
		const oppositeWin = wonTeams.find(team => team.conference.slice(0, 1) != conference.slice(0, 1));
		return oppositeWin.prediction;
	}
	console.log("Unknown weekDivision (" + weekDivision + ") just happened!");
	return [];
}

function secondSmallest(arr) {
   return [...arr].sort((a, b) => a - b)[1];
}

function secondLargest(arr) {
   return [...arr].sort((a, b) => b - a)[1];
}

function pretendPick(weekDivision, smallList, footballNumber, pickList)
{
	if (weekDivision.slice(0, 1) === "W" || weekDivision.slice(0, 1) === "w") {
		if (footballNumber === 2 || footballNumber === 3 || footballNumber === 4) {
			pickList = pickList.substring(0, smallList - 1) + "1" + pickList.substring(smallList);
		}
		else if (footballNumber === 5 || footballNumber === 6 || footballNumber === 7) {
			pickList = pickList.substring(0, smallList - 1) + "2" + pickList.substring(smallList);
		}
	}
	else if (weekDivision.slice(0, 1) === "D" || weekDivision.slice(0, 1) === "d") {
	}
	else if (weekDivision.slice(0, 1) === "C" || weekDivision.slice(0, 1) === "c") {
	}
	else if (weekDivision.slice(0, 1) === "S" || weekDivision.slice(0, 1) === "s") {
	}

	console.log("pretendPick = List " + smallList + " footballNumber " + footballNumber + " " + pickList);
	return pickList;
}

function getWinningGames(pickList)
{
	var year = CurrentYear();
	
	// Start with all 0s (unpicked)
	var winningGames = [
		{team: getTeamName(year, "N", 1), conference: "N", prediction: 1, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "N", 2), conference: "N", prediction: 2, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "N", 3), conference: "N", prediction: 3, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "N", 4), conference: "N", prediction: 4, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "N", 5), conference: "N", prediction: 5, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "N", 6), conference: "N", prediction: 6, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "N", 7), conference: "N", prediction: 7, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 1), conference: "A", prediction: 1, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 2), conference: "A", prediction: 2, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 3), conference: "A", prediction: 3, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 4), conference: "A", prediction: 4, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 5), conference: "A", prediction: 5, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 6), conference: "A", prediction: 6, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: getTeamName(year, "A", 7), conference: "A", prediction: 7, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0}
	];

	var NFCWeek1 = [0, 0, 0];
	var holdWeek = 0;
	// NFC wildcard
	[[3, 6], [4, 5], [2, 7]].forEach((teams, index) => {
		if (pickList[index + 3] === "1") {
			winningGames[teams[0] - 1].winWeek1 = 1;
			NFCWeek1[holdWeek] = teams[0];
		}
		else if (pickList[index + 3] === "2") {
			winningGames[teams[1] - 1].winWeek1 = 1;	
			NFCWeek1[holdWeek] = teams[1];
		}
		holdWeek = holdWeek + 1;
	});

	var AFCWeek1 = [0, 0, 0];
	holdWeek = 0;
	// AFC wildcard
	[[3, 6], [4, 5], [2, 7]].forEach((teams, index) => {
		if (pickList[index] === "1") {
			winningGames[teams[0] + 6].winWeek1 = 1;
			AFCWeek1[holdWeek] = teams[0];
		}
		else if (pickList[index] === "2") {
			winningGames[teams[1] + 6].winWeek1 = 1;	
			AFCWeek1[holdWeek] = teams[1];
		}
		holdWeek = holdWeek + 1;
	});

	// NFC divisional
	var NFCWeek2_1 = [1, 0];
	NFCWeek2_1[1] = Math.max.apply(Math, NFCWeek1);
	var NFCWeek2_2 = [0, 0];
	NFCWeek2_2[0] = Math.min.apply(Math, NFCWeek1);
	NFCWeek2_2[1] = secondSmallest(NFCWeek1);
	[NFCWeek2_1, NFCWeek2_2].forEach((teams, index) => {
		if (pickList[index + 8] === "1") {
			winningGames[teams[0] - 1].winWeek2 = 1;
		}
		else if (pickList[index + 8] === "2") {
			winningGames[teams[1] - 1].winWeek2 = 1;
		}
	});

	// AFC divisional
	var AFCWeek2_1 = [1, 0];
	AFCWeek2_1[1] = Math.max.apply(Math, AFCWeek1);
	var AFCWeek2_2 = [0, 0];
	AFCWeek2_2[0] = Math.min.apply(Math, AFCWeek1);
	AFCWeek2_2[1] = secondSmallest(AFCWeek1);
	[AFCWeek2_1, AFCWeek2_2].forEach((teams, index) => {
		if (pickList[index + 6] === "1") {
			winningGames[teams[0] + 6].winWeek2 = 1;
		}
		else if (pickList[index + 6] === "2") {
			winningGames[teams[1] + 6].winWeek2 = 1;
		}
	});

	// NFC championship
	const nfcChampionshipTeams =
		[...winningGames]
		.filter(team => team.winWeek2 === 1 && team.conference === "N")
		.map(team => team.prediction);

	if (pickList[11] === "1") {
		winningGames[nfcChampionshipTeams[0] - 1].winWeek3 = 1;
	}
	else if (pickList[11] === "2") {
		winningGames[nfcChampionshipTeams[1] - 1].winWeek3 = 1;
	}

	// AFC championship
	const afcChampionshipTeams =
		[...winningGames]
		.filter(team => team.winWeek2 === 1 && team.conference === "A")
		.map(team => team.prediction);
	
	if (pickList[10] === "1") {
		winningGames[afcChampionshipTeams[0] + 6].winWeek3 = 1;
	}
	else if (pickList[10] === "2") {
		winningGames[afcChampionshipTeams[1] + 6].winWeek3 = 1;
	}

	// Super bowl
	const superBowlTeams =
		[...winningGames]
		.filter(team => team.winWeek3 === 1)
		.map(team => team.prediction);

	if (pickList[12] === "1") {
		// AFC wins
		winningGames[superBowlTeams[1] + 6].winWeek4 = 1;
	}
	else if (pickList[12] === "2") {
		// NFC wins
		winningGames[superBowlTeams[0] - 1].winWeek4 = 1;
	}

	return winningGames;
}

function getPlayerBracket(player)
{
	var footballChecks = String(player.picks);
	var predWildAFC = [0, 0, 0];

	if (footballChecks.slice(0, 1) === "1")
		predWildAFC[0] = 3; 
	else if (footballChecks.slice(0, 1) === "2")
		predWildAFC[0] = 6; 
	if (footballChecks.slice(1, 2) === "1")
		predWildAFC[1] = 4;
	else if (footballChecks.slice(1, 2) === "2")
		predWildAFC[1] = 5;
	if (footballChecks.slice(2, 3) === "1")
		predWildAFC[2] = 2;
	else if (footballChecks.slice(2, 3) === "2")
		predWildAFC[2] = 7;

	var predWildNFC = [0, 0, 0];
	if (footballChecks.slice(3, 4) === "1")
		predWildNFC[0] = 3; 
	else if (footballChecks.slice(3, 4) === "2")
		predWildNFC[0] = 6; 
	if (footballChecks.slice(4, 5) === "1")
		predWildNFC[1] = 4;
	else if (footballChecks.slice(4, 5) === "2")
		predWildNFC[1] = 5;
	if (footballChecks.slice(5, 6) === "1")
		predWildNFC[2] = 2;
	else if (footballChecks.slice(5, 6) === "2")
		predWildNFC[2] = 7;

	var predDivAFC = [0, 0];
	var divAFCSecondLargest = secondLargest(predWildAFC);
	var divAFCSecondSmallest = secondSmallest(predWildAFC);
	if (footballChecks.slice(6, 7) === "1") {
		predDivAFC[0] = 1;
	}
	else if (footballChecks.slice(6, 7) === "2") {
		// Catch is highest in last week.
		predDivAFC[0] = Math.max.apply(Math, predWildAFC);
	};
	if (footballChecks.slice(7, 8) === "1") {
		// Catch is second largest in last week.
		predDivAFC[1] = Math.min.apply(Math, predWildAFC);
	}
	else if (footballChecks.slice(7, 8) === "2") {
		// Catch is second smallest in last week.
		predDivAFC[1] = divAFCSecondSmallest;
	};
	
	var predDivNFC = [0, 0];
	var divNFCSecondLargest = secondLargest(predWildNFC);
	var divNFCSecondSmallest = secondSmallest(predWildNFC);
	if (footballChecks.slice(8, 9) === "1") {
		predDivNFC[0] = 1;
	}
	else if (footballChecks.slice(8, 9) === "2") {
		// Catch is highest in last week.
		predDivNFC[0] = Math.max.apply(Math, predWildNFC);
	};
	if (footballChecks.slice(9, 10) === "1") {
		// Catch is second largest in last week.
		predDivNFC[1] = Math.min.apply(Math, predWildNFC);
	}
	else if (footballChecks.slice(9, 10) === "2") {
		// Catch is third smallest in last week.
		predDivNFC[1] = divNFCSecondSmallest;
	};
	
	var predChampionshipGameAFC = 0;
	if (footballChecks.slice(10, 11) === "1") {
		// Catch is highest in champion week.
		predChampionshipGameAFC = Math.min.apply(Math, predDivAFC);
	}
	else if (footballChecks.slice(10, 11) === "2") {
		// Catch is lowest in champion week.
		predChampionshipGameAFC = Math.max.apply(Math, predDivAFC);
	};

	var predChampionshipGameNFC = 0;
	if (footballChecks.slice(11, 12) === "1") {
		// Catch is highest in champion week.
		predChampionshipGameNFC = Math.min.apply(Math, predDivNFC);
	}
	else if (footballChecks.slice(11, 12) === "2") {
		// Catch is lowest in champion week.
		predChampionshipGameNFC = Math.max.apply(Math, predDivNFC);
	};

	var predSuperBowl = 0;
	var conferencePicked = "";
	if (footballChecks.slice(12, 13) === "1") {
		// Catch is highest in superbowl week.
		predSuperBowl = predChampionshipGameAFC;
		conferencePicked = "A";
	}
	else if (footballChecks.slice(12, 13) === "2") {
		// Catch is highest in superbowl week.
		predSuperBowl = predChampionshipGameNFC;
		conferencePicked = "N";
	}

	var user = player.name;
	return {
		name: user,
		picks: footballChecks,
		tiebreaker: player.tiebreaker,
		pointsWon: 0,
		pointsAvailable: 0,
		gamePlaying: [],
		superBowl: [ { conference: conferencePicked, teams: [predChampionshipGameNFC, predChampionshipGameAFC], prediction: predSuperBowl }], 
		championshipGameNFC: [ { teams: [Math.max.apply(Math, predDivNFC), Math.min.apply(Math, predDivNFC)], prediction: predChampionshipGameNFC }], 
		championshipGameAFC: [ { teams: [Math.max.apply(Math, predDivAFC), Math.min.apply(Math, predDivAFC)], prediction: predChampionshipGameAFC }],
		divisionalGamesNFC: [ { teams: [Math.max.apply(Math, predWildNFC), 1], prediction: predDivNFC[0] }, { teams: [divNFCSecondLargest, Math.min.apply(Math, predWildNFC)], prediction: predDivNFC[1] } ],
		divisionalGamesAFC: [{ teams: [Math.max.apply(Math, predWildAFC), 1], prediction: predDivAFC[0] }, { teams: [divAFCSecondLargest, Math.min.apply(Math, predWildAFC)], prediction: predDivAFC[1] } ],
		wildcardGamesNFC: [{ teams: [3, 6], prediction: predWildNFC[0] }, { teams: [4, 5], prediction: predWildNFC[1] }, { teams: [2, 7], prediction: predWildNFC[2] }],
		wildcardGamesAFC: [{ teams: [3, 6], prediction: predWildAFC[0] }, { teams: [4, 5], prediction: predWildAFC[1] }, { teams: [2, 7], prediction: predWildAFC[2] }]
	};
}

function getBrackets(ShortPath, winningPicks, userChoosePicks = "")
{
	var error = false;	
	var bracket = [];

	// Turn "1111111111111" into ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
	const pickList = String(winningPicks).split("");
	
	var userPickNumber = 0;
	for (let userPickItem of userChoosePicks) 
	{
		if (winningPicks[userPickNumber] === "0") 
		{
			pickList[userPickNumber] = userPickItem;
		}
		userPickNumber = userPickNumber + 1;
	}
	const WinningGames = getWinningGames(pickList);
	
	// Grab all teams from the first week.
	ShortPath.forEach(function (player) {
		if (player.picks === null || player.picks.length === 0) {
			console.log("Error with picks for " + player.name + " - " + player.picks);
			error = true;
			return;
		}

		bracket.push(getPlayerBracket(player));
	});	
	if (error) return [];

	// Add up the points for the first week.
	var progress = 0;
	WinningGames.forEach(winningPoints => 
	{
		if (winningPoints.winWeek1 === 1) {
			// Set up a loser after the winner has been saved.
			WinningGames.forEach(changeLoser => 
			{
				if (winningPoints.conference === changeLoser.conference 
						&& winningPoints.prediction === gameOpponent("Wild", "", changeLoser.prediction, WinningGames)) { 
					changeLoser.winWeek1 = 2;
					changeLoser.winWeek2 = 2;
					changeLoser.winWeek3 = 2;
					changeLoser.winWeek4 = 2;
				}
			});

			for (let object of bracket) {
				if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[0].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[1].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[2].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[0].prediction) {
					object.pointsWon = object.pointsWon + 1;
				}
				if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[1].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[2].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
			};
			progress = progress + 1;
		};
	});

	// Grab all teams from the second week.
	if (progress >= 6) {
		// Add up the points for the second week.
		WinningGames.forEach(winningPoints => 
		{
			if (winningPoints.winWeek2 === 1) {
				// Set up a loser after the winner has been saved.
				WinningGames.forEach(changeLoser => 
				{
					if (winningPoints.conference === changeLoser.conference 
							&& winningPoints.prediction === gameOpponent("Divisional", changeLoser.conference, changeLoser.prediction, WinningGames)) { 
						if (changeLoser.winWeek2 === 1) {
							console.log("Seems wrong for " + winningPoints.conference + " " + getTeamName(CurrentYear(), changeLoser.conference, changeLoser.prediction.winningGames) + " " + winningPoints.prediction);
						};
						changeLoser.winWeek2 = 2;
						changeLoser.winWeek3 = 2;
						changeLoser.winWeek4 = 2;
					}
				});

				for (let object of bracket) {
					if (winningPoints.conference === "N" && winningPoints.prediction === object.divisionalGamesNFC[0].prediction) 
						object.pointsWon = object.pointsWon + 2;
					if (winningPoints.conference === "N" && winningPoints.prediction === object.divisionalGamesNFC[1].prediction) 
						object.pointsWon = object.pointsWon + 2;
					if (winningPoints.conference === "A" && winningPoints.prediction === object.divisionalGamesAFC[0].prediction) 
						object.pointsWon = object.pointsWon + 2;
					if (winningPoints.conference === "A" && winningPoints.prediction === object.divisionalGamesAFC[1].prediction) 
						object.pointsWon = object.pointsWon + 2;
				};
				progress = progress + 1;
			};
		});
	};	

	// Grab all teams from the third week.
	if (progress >= 10) {
		// Add up the points for the third week.
		WinningGames.forEach(winningPoints => 
		{
			if (winningPoints.winWeek3 === 1) {
				// Set up a loser after the winner has been saved.
				WinningGames.forEach(changeLoser => 
				{
					if (winningPoints.conference === changeLoser.conference 
							&& winningPoints.prediction === gameOpponent("Champion", changeLoser.conference, changeLoser.prediction, WinningGames)) { 
						changeLoser.winWeek3 = 2;
						changeLoser.winWeek4 = 2;
					}
				});

				for (let object of bracket) {
					if (winningPoints.conference === "N" && winningPoints.prediction === object.championshipGameNFC[0].prediction) 
						object.pointsWon = object.pointsWon + 4;
					if (winningPoints.conference === "A" && winningPoints.prediction === object.championshipGameAFC[0].prediction) 
						object.pointsWon = object.pointsWon + 4;
				};
				progress = progress + 1;
			};
		});
	};	

	// Grab all teams from the forth week.
	if (progress >= 12) {
		// Add up the points for the forth week.
		WinningGames.forEach(winningPoints => 
		{
			if (winningPoints.winWeek4 === 1) {
				// Set up a loser after the winner has been saved.
				WinningGames.forEach(changeLoser => 
				{
					if (winningPoints.conference != changeLoser.conference 
							&& winningPoints.prediction === gameOpponent("Superbowl", changeLoser.conference, changeLoser.prediction, WinningGames)) { 
						if (changeLoser.winWeek4 != 1)
							changeLoser.winWeek4 = 2;
					}
				});

				for (let object of bracket) {
					if (winningPoints.prediction === object.superBowl[0].prediction && winningPoints.conference === object.superBowl[0].conference)  {
						object.pointsWon = object.pointsWon + 8;
					};
				};
				progress = progress + 1;
			};
		});
	};	

	var gamesPlayingNow1 = 0;
	var gamesPlayingNow2 = 0;
	var gamesPlayingNow3 = 0;
	var gamesPlayingNow4 = 0;
	WinningGames.forEach(winningPoints => 
	{
		if (winningPoints.winWeek1 === 1) {
			gamesPlayingNow1 = gamesPlayingNow1 + 1;
		}
		if (winningPoints.winWeek2 === 1) {
			gamesPlayingNow2 = gamesPlayingNow2 + 1;
		}
		if (winningPoints.winWeek3 === 1) {
			gamesPlayingNow3 = gamesPlayingNow3 + 1;
		}
		if (winningPoints.winWeek4 === 1) {
			gamesPlayingNow4 = gamesPlayingNow4 + 1;
		}
	})

	WinningGames.forEach(winningPoints => 
	{
		for (let object of bracket) {
			// Check for first week to see the pointsAvailable.
			if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[0].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[1].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[2].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[0].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[1].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[2].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};

			// Check for second week to see the pointsAvailable.
			if (winningPoints.conference === "N" && winningPoints.prediction === object.divisionalGamesNFC[0].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			if (winningPoints.conference === "N" && winningPoints.prediction === object.divisionalGamesNFC[1].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			if (winningPoints.conference === "A" && winningPoints.prediction === object.divisionalGamesAFC[0].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			if (winningPoints.conference === "A" && winningPoints.prediction === object.divisionalGamesAFC[1].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			
			// Check for third week to see the pointsAvailable.
			if (winningPoints.conference === "N" && winningPoints.prediction === object.championshipGameNFC[0].prediction) {
				if (winningPoints.winWeek3 != 2) {
					object.pointsAvailable = object.pointsAvailable + 4;
				};
			};
			if (winningPoints.conference === "A" && winningPoints.prediction === object.championshipGameAFC[0].prediction) {
				if (winningPoints.winWeek3 != 2) {
					object.pointsAvailable = object.pointsAvailable + 4;
				};
			};

			// Check for forth week to see the pointsAvailable.
			if (winningPoints.conference === object.superBowl[0].conference && winningPoints.prediction === object.superBowl[0].prediction) {
				if (winningPoints.winWeek4 != 2) {
					object.pointsAvailable = object.pointsAvailable + 8;
				}
			};

			if (gamesPlayingNow1 < 6) {
				// Check for first week to see if these are still running this weekend.
				if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[0].prediction) {
					if (winningPoints.winWeek1 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							weekDivision: "Wildcard",
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Wild", "", winningPoints.prediction, WinningGames),
							smallList: 4,
							numberOrder: 5
						});
					};
				};
				if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[1].prediction) {
					if (winningPoints.winWeek1 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							weekDivision: "Wildcard",
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Wild", "", winningPoints.prediction, WinningGames),
							smallList: 6,
							numberOrder: 6
						});
					};
				};
				if (winningPoints.conference === "N" && winningPoints.prediction === object.wildcardGamesNFC[2].prediction) {
					if (winningPoints.winWeek1 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							weekDivision: "Wildcard",
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Wild", "", winningPoints.prediction, WinningGames),
							smallList: 5,
							numberOrder: 4
						});
					};
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[0].prediction) {
					if (winningPoints.winWeek1 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							weekDivision: "Wildcard",
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Wild", "", winningPoints.prediction, WinningGames),
							smallList: 1,
							numberOrder: 2
						});
					};
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[1].prediction) {
					if (winningPoints.winWeek1 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							weekDivision: "Wildcard",
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Wild", "", winningPoints.prediction, WinningGames),
							smallList: 3,
							numberOrder: 3
						});
					};
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.wildcardGamesAFC[2].prediction) {
					if (winningPoints.winWeek1 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							weekDivision: "Wildcard",
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Wild", "", winningPoints.prediction, WinningGames),
							smallList: 2,
							numberOrder: 1
						});
					};
				};
			}
			else if (gamesPlayingNow2 < 4) {
				// Check for second week to see if these are still running this weekend.
				if (winningPoints.conference === "N" && winningPoints.prediction === object.divisionalGamesNFC[0].prediction) {
					if (winningPoints.winWeek2 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Divisional", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 4
						});
					};
				};
				if (winningPoints.conference === "N" && winningPoints.prediction === object.divisionalGamesNFC[1].prediction) {
					if (winningPoints.winWeek2 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Divisional", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 3
						});
					};
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.divisionalGamesAFC[0].prediction) {
					if (winningPoints.winWeek2 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Divisional", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 2
						});
					};
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.divisionalGamesAFC[1].prediction) {
					if (winningPoints.winWeek2 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Divisional", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 1
						});
					};
				};
			}
			else if (gamesPlayingNow3 < 2) {
				if (winningPoints.conference === "N" && winningPoints.prediction === object.championshipGameNFC[0].prediction) {
					if (winningPoints.winWeek3 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Champion", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 2
						});
					};
				};
				if (winningPoints.conference === "A" && winningPoints.prediction === object.championshipGameAFC[0].prediction) {
					if (winningPoints.winWeek3 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Champion", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 1
						});
					};
				};
			}
			else if (gamesPlayingNow4 < 1) {
				if (winningPoints.conference === object.superBowl[0].conference && winningPoints.prediction === object.superBowl[0].prediction) {
					if (winningPoints.winWeek4 === 0) {
						object.gamePlaying.push({
							game: winningPoints.team,
							winNumber: winningPoints.prediction,
							loseNumber: gameOpponent("Superbowl", winningPoints.conference, winningPoints.prediction, WinningGames),
							numberOrder: 1
						});
					}
				};
			}
		};
	});

	return bracket;
}

export { getBrackets, getTeamName, logoFilename, pretendPick };

