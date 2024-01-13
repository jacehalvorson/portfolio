//List users and the path they pulled from the website.
const ShortPath = [
		{name: "Trent", path: "1211211112111", tiebreaker: 55}, 
		{name: "Dave", path: "1211211111112", tiebreaker: 45}, 
		{name: "Cami", path: "1211111212212", tiebreaker: 51},
		{name: "Paul", path: "1211211111121", tiebreaker: 48},
		{name: "Kade1", path: "1211111111211", tiebreaket: 41},
		{name: "Kade2", path: "1211111111111", tiebreaket: 41},
		{name: "Zack", path: "2211211211111", tiebreaket: 40},
		{name: "Jace", path: "1112211221111", tiebreaket: 58}
	];

// Update values of 1 (win) and 2 (lost) by winWeek1.  Future you will have to change winWeek2, winWeek3 and winWeek4.
const WinningGames = [
		{team: "49ers",  conference: "N", prediction: 1, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Cowboys", conference: "N", prediction: 2, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Lions", conference: "N", prediction: 3, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Buccaneers", conference: "N", prediction: 4, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Eagles", conference: "N", prediction: 5, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Rams", conference: "N", prediction: 6, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Packers", conference: "N", prediction: 7, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Ravens", conference: "A", prediction: 1, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Bills", conference: "A", prediction: 2, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Chiefs", conference: "A", prediction: 3, winWeek1: 1, winWeek2: 0, winWeek3: 1, winWeek4: 0},
		{team: "Texans", conference: "A", prediction: 4, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Browns", conference: "A", prediction: 5, winWeek1: 1, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Dolphins", conference: "A", prediction: 6, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0},
		{team: "Steelers", conference: "A", prediction: 7, winWeek1: 0, winWeek2: 0, winWeek3: 0, winWeek4: 0}]; 

function gameName(conference, prediction) {
	const winningPoints = WinningGames.find(team => team.conference.slice(0, 1) == conference.slice(0, 1) && team.prediction == prediction);
	return winningPoints.team;
}

function gameOpponent(weekDivision, conference, prediction) {
	if (weekDivision.slice(0, 1) == "W" || weekDivision.slice(0, 1) == "w") {
		// This is all the teams handle in the first week.
		if (prediction == 4)
			return 5;
		if (prediction == 5)
			return 4;
		if (prediction == 3)
			return 6;
		if (prediction == 6)
			return 3;
		if (prediction == 2)
			return 7;
		if (prediction == 7)
			return 2;
		if (prediction == 1)
			return 1;

		console.log("An invalid prediction was sent: conference " + conference  + " prediction " + prediction);
		process.exit();
	}
	else if (weekDivision.slice(0, 1) == "D" || weekDivision.slice(0, 1) == "d") {
		// In the second week, team 1 plays the winners from 1st week with the largest number.  The other 2 play.
		let wonTeams = [];
		WinningGames.forEach(winningPoints => 
		{
			if (winningPoints.conference == conference && winningPoints.winWeek1 == 1) {
				wonTeams = [...wonTeams, winningPoints.prediction];
			};
		});
		if (prediction == 1)
		{
			return Math.max.apply(Math, wonTeams);
		};
		if (prediction == Math.min.apply(Math, wonTeams))
		{
			var game = secondSmallest(wonTeams);
			return game;
		};
		if (prediction == secondSmallest(wonTeams))
		{
			var game = Math.min.apply(Math, wonTeams);
			return game;
		};
		if (prediction == Math.max.apply(Math, wonTeams))
		{
			return 1;
		};		
		
		const winningPoints = WinningGames.find(team => team.conference.slice(0, 1) == conference.slice(0, 1) && 
				team.prediction == prediction && team.winWeek1 == 2);
		return winningPoints.prediction;		
	}
	else if (weekDivision.slice(0, 1) == "C" || weekDivision.slice(0, 1) == "c") {
		// In the third week, the 2 players in each division play.
		let wonTeams = [];
		WinningGames.forEach(winningPoints => 
		{
			if (winningPoints.conference == conference && winningPoints.winWeek2 == 1) {
				wonTeams = [...wonTeams, winningPoints.prediction];
			};
		});
		if (prediction == Math.min.apply(Math, wonTeams))
		{
			return Math.max.apply(Math, wonTeams);
		};
		if (prediction == Math.max.apply(Math, wonTeams))
		{
			return Math.min.apply(Math, wonTeams);
		};

		const winningPoints = WinningGames.find(team => team.conference.slice(0, 1) == conference.slice(0, 1) && 
					team.prediction == prediction && team.winWeek2 == 2);
		return winningPoints.prediction;		
	}
	else if (weekDivision.slice(0, 1) == "S" || weekDivision.slice(0, 1) == "s") {
		// In the forth week, the last 2 teams play.
		let wonTeams = [];
		WinningGames.forEach(winningPoints => 
		{
			if (winningPoints.winWeek3 == 1) {
				wonTeams = [...wonTeams, {conference: winningPoints.conference, prediction: winningPoints.prediction}];
			};
		});
		const oppositeWin = wonTeams.find(team => team.conference.slice(0, 1) != conference.slice(0, 1));
		return oppositeWin.prediction;
	}
	console.log("Unknown weekDivision (" + weekDivision + ") just happened!");
	process.exit();
}

function secondSmallest(arr) {
   return [...arr].sort((a, b) => a - b)[1];
}

function secondLargest(arr) {
   return [...arr].sort((a, b) => b - a)[1];
}

function getBracket()
{
	// Check if our items where checked for all users.
	ShortPath.forEach(function (arrayPaths) {
		var footballChecks = arrayPaths.path;
		const footballPick = footballChecks.split("");
		
		let count = 0;
		footballPick.forEach(element => 
		{
			count++;
		});
		if (count != 13)
		{
			console.log("Wrong number of items chosen: " + footballChecks);
			process.exit();
		}
	});

	var bracket = [];

	// Grab all teams from the first week.
	ShortPath.forEach(function (arrayPaths) {
		var predWildAFC = [0, 0, 0];
		if (arrayPaths.path.slice(0, 1) == "1")
			predWildAFC[0] = 3; 
		else if (arrayPaths.path.slice(0, 1) == "2")
			predWildAFC[0] = 6; 
		if (arrayPaths.path.slice(1, 2) == "1")
			predWildAFC[1] = 4;
		else if (arrayPaths.path.slice(1, 2) == "2")
			predWildAFC[1] = 5;
		if (arrayPaths.path.slice(2, 3) == "1")
			predWildAFC[2] = 2;
		else if (arrayPaths.path.slice(2, 3) == "2")
			predWildAFC[2] = 7;

		var predWildNFC = [0, 0, 0];
		if (arrayPaths.path.slice(3, 4) == "1")
			predWildNFC[0] = 3; 
		else if (arrayPaths.path.slice(3, 4) == "2")
			predWildNFC[0] = 6; 
		if (arrayPaths.path.slice(4, 5) == "1")
			predWildNFC[1] = 4;
		else if (arrayPaths.path.slice(4, 5) == "2")
			predWildNFC[1] = 5;
		if (arrayPaths.path.slice(5, 6) == "1")
			predWildNFC[2] = 2;
		else if (arrayPaths.path.slice(5, 6) == "2")
			predWildNFC[2] = 7;

		var predDivAFC = [0, 0];
		var divAFCSecondLargest = secondLargest(predWildAFC);
		var divAFCSecondSmallest = secondSmallest(predWildAFC);
		if (arrayPaths.path.slice(6, 7) == "1") {
			predDivAFC[0] = 1;
		}
		else if (arrayPaths.path.slice(6, 7) == "2") {
			// Catch is highest in last week.
			predDivAFC[0] = Math.max.apply(Math, predWildAFC);
		};
		if (arrayPaths.path.slice(7, 8) == "1") {
			// Catch is second largest in last week.
			predDivAFC[1] = Math.min.apply(Math, predWildAFC);
		}
		else if (arrayPaths.path.slice(7, 8) == "2") {
			// Catch is second smallest in last week.
			predDivAFC[1] = divAFCSecondSmallest;
		};
		
		var predDivNFC = [0, 0];
		var divNFCSecondLargest = secondLargest(predWildNFC);
		var divNFCSecondSmallest = secondSmallest(predWildNFC);
		if (arrayPaths.path.slice(8, 9) == "1") {
			predDivNFC[0] = 1;
		}
		else if (arrayPaths.path.slice(8, 9) == "2") {
			// Catch is highest in last week.
			predDivNFC[0] = Math.max.apply(Math, predWildNFC);
		};
		if (arrayPaths.path.slice(9, 10) == "1") {
			// Catch is second largest in last week.
			predDivNFC[1] = Math.min.apply(Math, predWildNFC);
		}
		else if (arrayPaths.path.slice(9, 10) == "2") {
			// Catch is third smallest in last week.
			predDivNFC[1] = divNFCSecondSmallest;
		};
		
		var predChampionshipGameAFC = 0;
		if (arrayPaths.path.slice(10, 11) == "1") {
			// Catch is highest in champion week.
			predChampionshipGameAFC = Math.min.apply(Math, predDivAFC);
		}
		else if (arrayPaths.path.slice(10, 11) == "2") {
			// Catch is lowest in champion week.
			predChampionshipGameAFC = Math.max.apply(Math, predDivAFC);
		};

		var predChampionshipGameNFC = 0;
		if (arrayPaths.path.slice(11, 12) == "1") {
			// Catch is highest in champion week.
			predChampionshipGameNFC = Math.min.apply(Math, predDivNFC);
		}
		else if (arrayPaths.path.slice(11, 12) == "2") {
			// Catch is lowest in champion week.
			predChampionshipGameNFC = Math.max.apply(Math, predDivNFC);
		};

		var predSuperBowl = 0;
		var conferencePicked = "";
		if (arrayPaths.path.slice(12, 13) == "1") {
			// Catch is highest in superbowl week.
			predSuperBowl = predChampionshipGameAFC;
			conferencePicked = "A";
		}
		else if (arrayPaths.path.slice(12, 13) == "2") {
			// Catch is highest in superbowl week.
			predSuperBowl = predChampionshipGameNFC;
			conferencePicked = "N";
		}

		var user = arrayPaths.name;
		bracket.push({name: user, shortPath: arrayPaths.path, tiebreaker: arrayPaths.tiebreaker, pointsWon: 0, pointsAvailable: 0,
				superBowl: [ { conference: conferencePicked, teams: [predChampionshipGameNFC, predChampionshipGameAFC], prediction: predSuperBowl }], 
				championshipGameNFC: [ { teams: [Math.max.apply(Math, predDivNFC), Math.min.apply(Math, predDivNFC)], prediction: predChampionshipGameNFC }], 
				championshipGameAFC: [ { teams: [Math.max.apply(Math, predDivAFC), Math.min.apply(Math, predDivAFC)], prediction: predChampionshipGameAFC }],
				divisionalGamesNFC: [ { teams: [Math.max.apply(Math, predWildNFC), 1], prediction: predDivNFC[0] }, { teams: [divNFCSecondLargest, Math.min.apply(Math, predWildNFC)], prediction: predDivNFC[1] } ],
				divisionalGamesAFC: [{ teams: [Math.max.apply(Math, predWildAFC), 1], prediction: predDivAFC[0] }, { teams: [divAFCSecondLargest, Math.min.apply(Math, predWildAFC)], prediction: predDivAFC[1] } ],
				wildcardGamesNFC: [{ teams: [3, 6], prediction: predWildNFC[0] }, { teams: [4, 5], prediction: predWildNFC[1] }, { teams: [2, 7], prediction: predWildNFC[2] }],
				wildcardGamesAFC: [{ teams: [3, 6], prediction: predWildAFC[0] }, { teams: [4, 5], prediction: predWildAFC[1] }, { teams: [2, 7], prediction: predWildAFC[2] }]
		});
	});	

	// Add up the points for the first week.
	var progress = 0;
	WinningGames.forEach(winningPoints => 
	{
		if (winningPoints.winWeek1 == 1) {
			// Set up a loser after the winner has been saved.
			WinningGames.forEach(changeLoser => 
			{
				if (winningPoints.conference == changeLoser.conference 
						&& winningPoints.prediction == gameOpponent("Wild", "", changeLoser.prediction)) { 
					changeLoser.winWeek1 = 2;
					changeLoser.winWeek2 = 2;
					changeLoser.winWeek3 = 2;
					changeLoser.winWeek4 = 2;
				}
			});

			for (let object of bracket) {
				if (winningPoints.conference == "N" && winningPoints.prediction == object.wildcardGamesNFC[0].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference == "N" && winningPoints.prediction == object.wildcardGamesNFC[1].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference == "N" && winningPoints.prediction == object.wildcardGamesNFC[2].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference == "A" && winningPoints.prediction == object.wildcardGamesAFC[0].prediction) {
					object.pointsWon = object.pointsWon + 1;
				}
				if (winningPoints.conference == "A" && winningPoints.prediction == object.wildcardGamesAFC[1].prediction) {
					object.pointsWon = object.pointsWon + 1;
				};
				if (winningPoints.conference == "A" && winningPoints.prediction == object.wildcardGamesAFC[2].prediction) {
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
			if (winningPoints.winWeek2 == 1) {
				// Set up a loser after the winner has been saved.
				WinningGames.forEach(changeLoser => 
				{
					if (winningPoints.conference == changeLoser.conference 
							&& winningPoints.prediction == gameOpponent("Divisional", changeLoser.conference, changeLoser.prediction)) { 
						if (changeLoser.winWeek2 == 1) {
							console.log("Seems wrong for " + winningPoints.conference + " " + gameName(changeLoser.conference, changeLoser.prediction) + " " + winningPoints.prediction);
						};
						changeLoser.winWeek2 = 2;
						changeLoser.winWeek3 = 2;
						changeLoser.winWeek4 = 2;
					}
				});

				for (let object of bracket) {
					if (winningPoints.conference == "N" && winningPoints.prediction == object.divisionalGamesNFC[0].prediction) 
						object.pointsWon = object.pointsWon + 2;
					if (winningPoints.conference == "N" && winningPoints.prediction == object.divisionalGamesNFC[1].prediction) 
						object.pointsWon = object.pointsWon + 2;
					if (winningPoints.conference == "A" && winningPoints.prediction == object.divisionalGamesAFC[0].prediction) 
						object.pointsWon = object.pointsWon + 2;
					if (winningPoints.conference == "A" && winningPoints.prediction == object.divisionalGamesAFC[1].prediction) 
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
			if (winningPoints.winWeek3 == 1) {
				// Set up a loser after the winner has been saved.
				WinningGames.forEach(changeLoser => 
				{
					if (winningPoints.conference == changeLoser.conference 
							&& winningPoints.prediction == gameOpponent("Champion", changeLoser.conference, changeLoser.prediction)) { 
						changeLoser.winWeek3 = 2;
						changeLoser.winWeek4 = 2;
					}
				});

				for (let object of bracket) {
					if (winningPoints.conference == "N" && winningPoints.prediction == object.championshipGameNFC[0].prediction) 
						object.pointsWon = object.pointsWon + 4;
					if (winningPoints.conference == "A" && winningPoints.prediction == object.championshipGameAFC[0].prediction) 
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
			if (winningPoints.winWeek4 == 1) {
				// Set up a loser after the winner has been saved.
				WinningGames.forEach(changeLoser => 
				{
					if (winningPoints.conference != changeLoser.conference 
							&& winningPoints.prediction == gameOpponent("Superbowl", changeLoser.conference, changeLoser.prediction)) { 
						if (changeLoser.winWeek4 != 1)
							changeLoser.winWeek4 = 2;
					}
				});

				for (let object of bracket) {
					if (winningPoints.prediction == object.superBowl[0].prediction && winningPoints.conference == object.superBowl[0].conference)  {
						object.pointsWon = object.pointsWon + 8;
					};
				};
				progress = progress + 1;
			};
		});
	};	

	WinningGames.forEach(winningPoints => 
	{
		for (let object of bracket) {
			// Check for first week to see the pointsAvailable.
			if (winningPoints.conference == "N" && winningPoints.prediction == object.wildcardGamesNFC[0].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference == "N" && winningPoints.prediction == object.wildcardGamesNFC[1].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference == "N" && winningPoints.prediction == object.wildcardGamesNFC[2].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference == "A" && winningPoints.prediction == object.wildcardGamesAFC[0].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference == "A" && winningPoints.prediction == object.wildcardGamesAFC[1].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};
			if (winningPoints.conference == "A" && winningPoints.prediction == object.wildcardGamesAFC[2].prediction) {
				if (winningPoints.winWeek1 != 2) {
					object.pointsAvailable = object.pointsAvailable + 1;
				};
			};

			// Check for second week to see the pointsAvailable.
			if (winningPoints.conference == "N" && winningPoints.prediction == object.divisionalGamesNFC[0].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			if (winningPoints.conference == "N" && winningPoints.prediction == object.divisionalGamesNFC[1].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			if (winningPoints.conference == "A" && winningPoints.prediction == object.divisionalGamesAFC[0].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			if (winningPoints.conference == "A" && winningPoints.prediction == object.divisionalGamesAFC[1].prediction) {
				if (winningPoints.winWeek2 != 2) {
					object.pointsAvailable = object.pointsAvailable + 2;
				};
			};
			
			// Check for third week to see the pointsAvailable.
			if (winningPoints.conference == "N" && winningPoints.prediction == object.championshipGameNFC[0].prediction) {
				if (winningPoints.winWeek3 != 2) {
					object.pointsAvailable = object.pointsAvailable + 4;
				};
			};
			if (winningPoints.conference == "A" && winningPoints.prediction == object.championshipGameAFC[0].prediction) {
				if (winningPoints.winWeek3 != 2) {
					object.pointsAvailable = object.pointsAvailable + 4;
				};
			};

			// Check for forth week to see the pointsAvailable.
			if (winningPoints.conference == object.superBowl[0].conference && winningPoints.prediction == object.superBowl[0].prediction) {
				if (winningPoints.winWeek4 != 2) {
					object.pointsAvailable = object.pointsAvailable + 8;
				}
			};
		};
	});

	console.log(bracket);
	return bracket;
}

export default getBracket;