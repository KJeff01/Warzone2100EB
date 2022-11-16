
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

const landingZoneList = [ "npPos1", "npPos2", "npPos3", "npPos4", "npPos5" ];
const landingZoneMessages = [ "C1A-C_LZ1", "C1A-C_LZ2", "C1A-C_LZ3", "C1A-C_LZ4", "C1A-C_LZ5" ];
const cyborgPatrolList = [
	"seCybPos1", "seCybPos2", "seCybPos3", "northCybPos1",
	"northCybPos2", "northCybPos3", "canyonCybPos1",
	"canyonCybPos2", "canyonCybPos3", "hillCybPos1",
	"hillCybPos2", "hillCybPos3", "1aCybPos1",
	"1aCybPos2", "1aCybPos3",
];
var index; //Current LZ (SE, N, canyon, south hill, road north of base)
var switchLZ; //Counter for incrementing index every third landing

//Check if all enemies are gone and win after 15 transports
function extraVictoryCondition()
{
	var enemies = enumArea(0, 0, mapWidth, mapHeight, ENEMIES, false);
	if (index === 5 && enemies.length === 0)
	{
		return true;
	}
}

//Makes a large group of ground units appear on map
function checkForGroundForces()
{
	if (index < 2 && switchLZ === 3)
	{
		//Amounts for the ground force
		const maxTanks = 16;
		const firstAmount = 10;

		var droidGroup1 = []; //Heavy cannon mantis track units
		var droidGroup2 = []; //Sensor and heavy mortar units
		var templates = [ cTempl.nphct, cTempl.npmsens, cTempl.npmorb ];

		for (let i = 0; i <= maxTanks; ++i)
		{
			if (i <= firstAmount)
			{
				droidGroup1[i] = templates[0];
			}
			if (i === firstAmount + 1)
			{
				droidGroup2[i - 1 - firstAmount] = templates[1];
			}
			else
			{
				droidGroup2[i - 1 - firstAmount] = templates[2];
			}
		}

		//What part of map to appear at
		var pos = (index === 0) ? camMakePos("reinforceSouthEast") : camMakePos("reinforceNorth");
		camSendReinforcement(NEW_PARADIGM, pos, droidGroup1, CAM_REINFORCE_GROUND, {
			data: {regroup: false, count: -1,},
		});
		camSendReinforcement(NEW_PARADIGM, pos, droidGroup2, CAM_REINFORCE_GROUND);
	}
}

//Sends a transport with cyborgs to an LZ three times before going to another
//New Paradigm transport appears fifteen times before mission win
function sendTransport()
{
	var position = camMakePos(landingZoneList[index]);
	switchLZ += 1;

	// (2 or 3 or 4) pairs of each droid template.
	// This emulates wzcam's droid count distribution.
	var count = [ 2, 3, 4, 4, 4, 4, 4, 4, 4 ][camRand(9)];

	var templates = [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybm ];

	var droids = [];
	for (let i = 0; i < count; ++i)
	{
		var t = templates[camRand(templates.length)];
		// two droids of each template
		droids[droids.length] = t;
		droids[droids.length] = t;
	}

	camSendReinforcement(NEW_PARADIGM, position, droids, CAM_REINFORCE_TRANSPORT, {
		entry: { x: 126, y: 36 },
		exit: { x: 126, y: 76 },
		message: landingZoneMessages[index],
		order: CAM_ORDER_PATROL,
		data: {
			pos:[
				camMakePos(cyborgPatrolList[(3 * index)]),
				camMakePos(cyborgPatrolList[(3 * index) + 1]),
				camMakePos(cyborgPatrolList[(3 * index) + 2]),
			],
			radius: 8,
			interval: camMinutesToMilliseconds(1),
			regroup: true,
			count: -1,
		}
	});

	checkForGroundForces();

	//Switch to a different LZ every third landing
	if (switchLZ === 3)
	{
		index += 1;
		switchLZ = 0;
	}

	if (index === 5)
	{
		removeTimer("sendTransport");
	}
}

function startTransporterAttack()
{
	sendTransport();
	setTimer("sendTransport", camChangeOnDiff(camMinutesToMilliseconds(1)));
}

function checkEnemyVtolArea()
{
	var pos = {x: 2, y: 2};
	var vtols = enumRange(pos.x, pos.y, 2, ULTSCAV, false).filter((obj) => (obj.prop === "Helicopter" || obj.prop === "V-Tol"));

	for (let i = 0, l = vtols.length; i < l; ++i)
	{
		if ((vtols[i].weapons[0].armed < 20) || (vtols[i].health < 20))
		{
			camSafeRemoveObject(vtols[i], false);
		}
	}
}

function helicopterAttack()
{
	var vtolRemovePos = {x: 2, y: 2};
	var vtolPositions = undefined; //to randomize the spawns each time
	var list = [
		cTempl.ScavChopNASDA, cTempl.HvyChopNASDA
	];
	var extras = {
		minVTOLs: (difficulty >= HARD) ? 4 : 2,
		maxRandomVTOLs: (difficulty >= HARD) ? 8 : 4
	};

	camSetVtolData(ULTSCAV, vtolPositions, vtolRemovePos, list, camChangeOnDiff(camSecondsToMilliseconds(30)), undefined, extras);
}

function eventStartLevel()
{
	camSetExtraObjectiveMessage(_("Destroy all New Paradigm reinforcements"));

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "SUB_1_7S", {
		callback: "extraVictoryCondition"
	});

	var startpos = getObject("startPosition");
	var lz = getObject("landingZone");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);

	setMissionTime(camChangeOnDiff(camHoursToSeconds(1)));

	// make sure player doesn't build on enemy LZs
	for (let i = 6; i <= 10; ++i)
	{
		var ph = getObject("NPLZ" + i);
		setNoGoArea(ph.x, ph.y, ph.x2, ph.y2, i - 4);
	}

	camCompleteRequiredResearch(CAM1AC_RES_NP, NEW_PARADIGM);
	camPlayVideos([{video: "MB1A-C_MSG", type: CAMP_MSG}, {video: "MB1A-C_MSG2", type: MISS_MSG}]);

	index = 0;
	switchLZ = 0;

	queue("startTransporterAttack", camSecondsToMilliseconds(10));
	queue("helicopterAttack", camSecondsToMilliseconds(10));
	setTimer("checkEnemyVtolArea", camSecondsToMilliseconds(1));
}
