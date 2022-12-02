
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
var totalPasses;

//Check if all enemies are gone and win after 15 transports
function extraVictoryCondition()
{
	var enemies = enumArea(0, 0, mapWidth, mapHeight, ENEMIES, false);
	if (totalPasses === 2 && enemies.length === 0)
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
		var tankAssaultAmount = 10;
		var artilleryAmount = 6;

		var droidGroup1 = []; //Heavy cannon mantis track units
		var droidGroup2 = []; //Heavy mortar units

		let body = ["Body45ABT", "Body88MBT", "Body88MBT", "Body121SUP"];
		let prop = ["HalfTrackGM", "HalfTrackNAS", "hover01NAS", "tracked01NAS", "tracked01GM" ];
		let weap = ["Rocket-Pod-Quad", "Rocket-LtA-T-Quad", "MG3Mk1-Aslt",
				"Cannon5VulcanMk1-Gat", "Rocket-Pod-MRA-Quad",
				"Rocket-Pod-Arch-Quad", "Rocket-Arch-Hvy-Aslt-Gat", "Rocket-BB-AR"
		];
		let templates = generateRandomTemplates(body, prop, weap, true);

		for (let i = 0; i <= tankAssaultAmount; ++i)
		{
			droidGroup1.push(templates[camRand(templates.length)]);
		}

		weap = ["Mortar2Mk1-Ram", "Mortar2Mk1-Ram", "Mortar2Mk1-Ram", "Rocket-MRL-Homing-Hvy"];
		templates = generateRandomTemplates(body, prop, weap, true);

		for (let i = 0; i <= artilleryAmount; ++i)
		{
			droidGroup2.push(templates[camRand(templates.length)]);
		}

		weap = ["SensorTurret1Mk1", "SensorTurret1Mk1", "SensorTurret1Mk1"];
		if (difficulty >= INSANE)
		{
			weap.push("Sensor-WideSpec"); //Why not. Why shouldn't I do this.
		}
		templates = generateRandomTemplates(body, prop, weap, true);
		droidGroup2.push(templates[0]);

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

	var count = 8 + camRand(3);

	let body = ["CyborgLightNAS"];
	let prop = ["CyborgLegsNAS"];
	let weap = ["Cyb-Wpn-Cannon-Sniper", "CyborgRocket", "Cyb-Wpn-Rocket-Sunburst-Arch",
		"Cyb-Wpn-Rocket-Sunburst", "Cyb-Wpn-Grenade", "CyborgFlamer01"
	];
	let templates = generateRandomTemplates(body, prop, weap, true);

	var droids = [];
	for (let i = 0; i < count; ++i)
	{
		droids.push(templates[camRand(templates.length)])
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
			regroup: false,
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
		index = 0;
		totalPasses += 1;
	}

	if (totalPasses === 2)
	{
		removeTimer("sendTransport");
		camSetVtolSpawnStateAll(false);
	}
}

function startTransporterAttack()
{
	sendTransport();
	setTimer("sendTransport", camChangeOnDiff(camMinutesToMilliseconds(1)));
}

function checkEnemyVtolArea()
{
	var pos = {x: 1, y: 1};
	var vtols = enumRange(pos.x, pos.y, 2, NEW_PARADIGM, false);

	for (let i = 0, l = vtols.length; i < l; ++i)
	{
		if ((vtols[i].weapons[0].armed < 100) || (vtols[i].health < 100))
		{
			camSafeRemoveObject(vtols[i], false);
		}
	}
}

function helicopterAttack()
{
	var vtolRemovePos = {x: 1, y: 1};
	var vtolPositions = undefined; //to randomize the spawns each time
	let body = ["Body45ABT", "Body88MBT", "Body88MBT", "Body121SUP"];
	let prop = ["V-TolNAS", "V-TolNAS", "V-TolNAS", "Helicopter"];
	let weap = ["Rocket-VTOL-TopAttackHvy", "Rocket-VTOL-LtA-T", "Rocket-MRL-VTOL", "Rocket-VTOL-BB" ];
	let list = generateRandomTemplates(body, prop, weap, true);
	var extras = {
		minVTOLs: (difficulty >= HARD) ? 4 : 3,
		maxRandomVTOLs: (difficulty >= HARD) ? 5 : 3
	};

	camSetVtolData(NEW_PARADIGM, vtolPositions, vtolRemovePos, list, camChangeOnDiff(camSecondsToMilliseconds(30)), undefined, extras);
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

	setMissionTime(camChangeOnDiff(camHoursToSeconds(2)));

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
	totalPasses = 0;

	camSetExpState(true);
	camSetExpLevel((difficulty >= HARD) ? 3 : 2);

	queue("startTransporterAttack", camSecondsToMilliseconds(10));
	queue("helicopterAttack", camSecondsToMilliseconds(10));
	setTimer("checkEnemyVtolArea", camSecondsToMilliseconds(1));
}
