import React, { useState } from "react";
import { API } from "aws-amplify";
import { CurrentYear } from "./YearUpdate.js";
//import { addBracketToTable } from "./playoff_bracket_utils";
import submitGameComplete from "./payment_game_win";
import { getOrCreateDeviceId } from "./playoff_bracket.jsx"

import "./PaymentGameWin.css";

const apiName = "apiplayoffbrackets";

function PaymentGameWin( )
{
    const [submitGame, setSubmitGame] = useState("");
    const [scores, setScores] = React.useState([]);
    const [scoresStatus, setScoresStatus] = React.useState("Loading brackets...");

    // Get the device ID which is common for a single person.
    const deviceId = getOrCreateDeviceId();

    React.useEffect(() =>
    {
        // Instead of fetching for the current year, fetch for 2025 temporarily.
        API.get( apiName, "/?table=playoffBrackets" + CurrentYear() )
            .then(response =>
            {
                // Extract the winning bracket from the response
                const winningEntry = response.find(entry => entry.name === "NFL_BRACKET");

                // Set scores variable to display list of entries
                setScores(winningEntry.picks);
                setScoresStatus("");
            })
            .catch(err =>
            {
                setScoresStatus("Error fetching brackets from database");
                console.error(scoresStatus + " " + err);
            });
    });

    return (
        <main id="playoff-bracket-entry">
            <h2>{CurrentYear()} Playoff Bracket</h2>
            <h2>Picks (NFL_BRACKET)</h2>
            <h4>---------AFC NFC AF NF A N S</h4>
            <h4>Line 1 - 234 234 1M 1M H H A</h4>
            <h4>Line 2 - 765 765 Lm Lm L L N</h4>
            <input type="text" id="newPicks" defaultValue={scores} />
            <button
                id="add-to-NFL-bracket"
                onClick={() => { submitGameComplete(setSubmitGame, deviceId); }}
            >
                Update NFL Bracket
            </button>

            <h2>{submitGame}</h2>
        </main>
     );
}


export default PaymentGameWin;
