
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

const landingZoneList = [ "NPLZ1", "NPLZ2", "NPLZ3", "NPLZ4", "NPLZ5" ];
const landingZoneMessages = [ "C1CA_LZ1", "C1CA_LZ2", "C1CA_LZ3", "C1CA_LZ4", "C1CA_LZ5" ];
var blipActive;
var lastLZ, lastHeavy;
var totalTransportLoads;

//See if we have enough structures on the plateau area and toggle
//the green objective blip on or off accordingly.
function baseEstablished()
{
	//Now we check if there is stuff built here already from cam1-C.
	var total = camCountStructuresInArea("buildArea") +
				camCountStructuresInArea("buildArea2") +
				camCountStructuresInArea("buildArea3") +
				camCountStructuresInArea("buildArea4") +
				camCountStructuresInArea("buildArea5");
	if (total >= 7)
	{
		if (blipActive)
		{
			blipActive = false;
			hackRemoveMessage("C1CA_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
		}
		return true;
	}
	else
	{
		if (!blipActive)
		{
			blipActive = true;
			hackAddMessage("C1CA_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);
		}
		return false;
	}
}

// a simple extra victory condition callback
function extraVictoryCondition()
{
	const MIN_TRANSPORT_RUNS = 30;
	var enemies = enumArea(0, 0, mapWidth, mapHeight, ENEMIES, false);
	// No enemies on map and at least 31 New Paradigm transport runs.
	if (baseEstablished() && (totalTransportLoads > MIN_TRANSPORT_RUNS) && !enemies.length)
	{
		return true;
	}
	// otherwise returns 'undefined', which suppresses victory;
	// returning 'false' would have triggered an instant defeat
}

function sendTransport()
{
	// start with light forces
	if (!camDef(lastHeavy))
	{
		lastHeavy = true;
	}
	var list = [];
	var i = 0;
	// Randomly find an LZ that is not compromised
	if (camRand(100) < 10)
	{
		for (i = 0; i < landingZoneList.length; ++i)
		{
			var lz = landingZoneList[i];
			if (enumArea(lz, CAM_HUMAN_PLAYER, false).length === 0)
			{
				list.push({ idx: i, label: lz });
			}
		}
	}
	//If all are compromised (or not checking for compromised LZs) then choose the LZ randomly
	if (list.length === 0)
	{
		for (i = 0; i < 2; ++i)
		{
			var rnd = camRand(landingZoneList.length);
			list.push({ idx: rnd, label: landingZoneList[rnd] });
		}
	}
	var picked = list[camRand(list.length)];
	lastLZ = picked.idx;
	var pos = camMakePos(picked.label);

	// (2 or 3 or 4) pairs of each droid template.
	// This emulates wzcam's droid count distribution.
	var count = [ 2, 3, 4, 4, 4, 4, 4, 4, 4 ][camRand(9)];

	var templates;
	if (lastHeavy)
	{
		lastHeavy = false;
		templates = [ cTempl.nppod, cTempl.nphmg, cTempl.npmrl, cTempl.npsmc, cTempl.npltat ];
	}
	else
	{
		lastHeavy = true;
		templates = [ cTempl.npsmct, cTempl.npmor, cTempl.npsmc, cTempl.npmmct, cTempl.npmrl, cTempl.nphmg, cTempl.npsbb, cTempl.npltat ];
	}

	var droids = [];
	for (i = 0; i < count; ++i)
	{
		var t = templates[camRand(templates.length)];
		// two droids of each template
		droids[droids.length] = t;
		droids[droids.length] = t;
	}

	camSendReinforcement(NEW_PARADIGM, pos, droids, CAM_REINFORCE_TRANSPORT, {
		entry: { x: 126, y: 36 },
		exit: { x: 126, y: 76 },
		message: landingZoneMessages[lastLZ],
		order: CAM_ORDER_ATTACK,
		data: { regroup: true, count: -1, pos: "buildArea" }
	});

	totalTransportLoads += 1;
}

function startTransporterAttack()
{
	let attackTime = camMinutesToMilliseconds(1.5);
	if (difficulty >= HARD)
	{
		attackTime = camMinutesToMilliseconds(0.5);
	}
	sendTransport();
	setTimer("sendTransport", attackTime);
}

function checkEnemyVtolArea()
{
	var pos = {x: 2, y: 2};
	var vtols = enumRange(pos.x, pos.y, 3, ULTSCAV, false);

	for (let i = 0, l = vtols.length; i < l; ++i)
	{
		if (vtols[i].weapons[0].armed < 100)
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
		cTempl.ScavChop, cTempl.HvyChop, cTempl.ScavChopNASDA, cTempl.HvyChopNASDA
	];
	var extras = {
		minVTOLs: (difficulty >= HARD) ? 3 : 2,
		maxRandomVTOLs: (difficulty >= HARD) ? 5 : 4
	};

	camSetVtolData(ULTSCAV, vtolPositions, vtolRemovePos, list, camChangeOnDiff(camSecondsToMilliseconds(40)), undefined, extras);
}

function eventStartLevel()
{
	camSetExtraObjectiveMessage(_("Build at least 7 non-wall structures on the plateau and destroy all New Paradigm reinforcements"));

	totalTransportLoads = 0;
	blipActive = false;

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "SUB_1_4AS", {
		callback: "extraVictoryCondition"
	});
	var startpos = getObject("startPosition");
	var lz = getObject("landingZone");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);

	// make sure player doesn't build on enemy LZs
	for (let i = 1; i <= 5; ++i)
	{
		var ph = getObject("PhantomLZ" + i);
		// HACK: set LZs of bad players, namely 2...6,
		// note: player 1 is NP
		setNoGoArea(ph.x, ph.y, ph.x2, ph.y2, i + 2);
	}

	setMissionTime(camChangeOnDiff(camMinutesToSeconds(60)));
	camPlayVideos({video: "MB1CA_MSG", type: CAMP_MSG});

	// first transport after 10 seconds
	queue("startTransporterAttack", camSecondsToMilliseconds(90));
	queue("helicopterAttack", camSecondsToMilliseconds(90));
	setTimer("checkEnemyVtolArea", camSecondsToMilliseconds(1));
}
