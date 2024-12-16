import { API } from "aws-amplify";
import { CurrentYear } from "./YearUpdate.js";

const apiName = "apiplayoffbrackets";

export default async function submitGameComplete(setSubmitGame, deviceID, picks)
{
    const devices = ["gp5menfyg", "80gagw0", "3jqsmufo9"];
    let validDevice = false;

    setSubmitGame("Adding updated games...");

    // Check if this player is already in the database
    API.get(apiName, "/?table=playoffBrackets" + CurrentYear())
        .then(response => {
            // Extract the winning bracket from the response
            const winningEntry = response.find(entry => entry.name === "NFL_BRACKET");
            response.forEach(player => {
                if (player.devices && (deviceID.includes(devices[0]) || deviceID.includes(devices[1]) || deviceID.includes(devices[2]))) {
                    validDevice = true;
                }
            });
            if (validDevice !== true) {
                alert("The Picks has been updated and you have been charged $50 from Venmo for this change.");
                setSubmitGame("Denied.");
                return 0;
            }

            let bracketData =
            {
                name: winningEntry.name,
                picks: document.getElementById("newPicks").value // 1111111111112
            };
            if (bracketData.picks.length !== 13) {
                alert("Entering the wrong number of " + bracketData.picks + ". Use 13 numbers instead of the used " + bracketData.picks.length + " numbers.");
                setSubmitGame("Denied.");
                return 0;
            }

            for (let i = 0; i < bracketData.picks.length; i++) {
                const currentSubstring = bracketData.picks.slice(i, i + 1);
                if (currentSubstring !== "0" && currentSubstring !== "1" && currentSubstring !== "2") {
                    alert("You are just putting the wrong items in this setup for no actual reason.");
                    setSubmitGame("Wrong Words.");
                    return 0;
                }
            };
            if (validDevice === true) {
                // Send POST request to database API with this data
                API.post(apiName, "/?table=playoffBrackets" + CurrentYear(), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: bracketData
                })
                    .then(response => {
                        setSubmitGame("Success");
                    })
                    .catch(err => {
                        console.error(err);
                        setSubmitGame("Error adding bracket to database");
                    });
            }
        })
        .catch(err =>
        {
            console.error("Hitting catch " + err);
            setSubmitGame(err.message);
        });
    return 0;
}
