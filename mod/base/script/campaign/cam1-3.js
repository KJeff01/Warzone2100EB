
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");


var NPDefenseGroup, NPScoutGroup, NPFactory;

camAreaEvent("RemoveBeacon", function(droid)
{
	hackRemoveMessage("C1-3_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
});

camAreaEvent("NorthConvoyTrigger", function(droid)
{
	camManageGroup(camMakeGroup("NorthConvoyForce"), CAM_ORDER_DEFEND, {
		pos: camMakePos("NorthConvoyLoc")
	});
});

camAreaEvent("SouthConvoyTrigger", function(droid)
{
	camEnableFactory("ScavFactory");
	camManageGroup(camMakeGroup("SouthConvoyForce"), CAM_ORDER_DEFEND, {
		pos: camMakePos("SouthConvoyLoc"),
		radius: 6,
	});
	var scout = getObject("ScoutDroid");
	if (camDef(scout) && scout)
	{
		camTrace("New Paradigm sensor scout retreating");
		var pos = camMakePos("ScoutDroidTarget");
		orderDroidLoc(scout, DORDER_MOVE, pos.x, pos.y);
	}
});

camAreaEvent("WestConvoyTrigger", function(droid)
{
	camManageGroup(camMakeGroup("WestConvoyForce"), CAM_ORDER_DEFEND, {
		pos: camMakePos("WestConvoyLoc"),
		radius: 6,
	});
});

function enableNP(args)
{
	camEnableFactory("ScavFactory");
	camEnableFactory("NPFactory");

	camManageGroup(NPScoutGroup, CAM_ORDER_COMPROMISE, {
		pos: camMakePos("RTLZ"),
		repair: 66,
		regroup: true,
		removable: false,
	});
	camManageGroup(NPDefenseGroup, CAM_ORDER_FOLLOW, {
		droid: "NPCommander",
		order: CAM_ORDER_DEFEND,
		data: {
			pos: camMakePos("NPCommander"),
			radius: 22,
			repair: 66,
		},
		repair: 66,
	});

	camPlayVideos(["pcv455.ogg", "SB1_3_MSG4"]);
}

function sendScouts()
{
	camManageGroup(camMakeGroup("ScavScoutForce"), CAM_ORDER_COMPROMISE, {
		pos: camMakePos("RTLZ")
	});
}

camAreaEvent("ScavTrigger", function(droid)
{
	camEnableFactory("ScavFactory");
});

camAreaEvent("NPTrigger", function(droid)
{
	camCallOnce("enableReinforcements");
});

function eventAttacked(victim, attacker) {
	if (!camDef(victim) || !victim || victim.player === CAM_HUMAN_PLAYER)
	{
		return;
	}
	if (victim.player === NEW_PARADIGM)
	{
		camCallOnce("enableNP");
		var commander = getObject("NPCommander");
		if (camDef(attacker) && attacker && camDef(commander) && commander &&
			commander.order !== DORDER_SCOUT && commander.order !== DORDER_RTR)
		{
			orderDroidLoc(commander, DORDER_SCOUT, attacker.x, attacker.y);
		}
	}
}

function enableReinforcements()
{
	playSound("pcv440.ogg"); // Reinforcements are available.
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "CAM_1C", {
		area: "RTLZ",
		message: "C1-3_LZ",
		reinforcements: camMinutesToSeconds(2), // changes!
		annihilate: true
	});
}

function camEnemyBaseDetected_ScavBaseGroup()
{
	queue("camCallOnce", camSecondsToMilliseconds(1), "enableReinforcements");
}

function camEnemyBaseEliminated_ScavBaseGroup()
{
	//make enemy easier to find if all his buildings destroyed
	camManageGroup(
		camMakeGroup(enumArea(0, 0, mapWidth, mapHeight, SCAVS, false)),
		CAM_ORDER_ATTACK
	);
}

function playNPWarningMessage()
{
	camPlayVideos(["pcv455.ogg", "SB1_3_MSG3"]);
}

function eventDroidBuilt(droid, structure)
{
	// An example of manually managing factory groups.
	if (!camDef(structure) || !structure || structure.id !== NPFactory.id)
	{
		return;
	}
	if (getObject("NPCommander") !== null && groupSize(NPDefenseGroup) < 6) // watch out! commander control limit
	{
		groupAdd(NPDefenseGroup, droid);
	}
	else if (groupSize(NPScoutGroup) < 4 && droid.body !== cTempl.npsmc.body)
	{
		groupAdd(NPScoutGroup, droid); // heavy tanks don't go scouting
	}
	// As libcampaign.js pre-hook has already fired,
	// the droid would remain assigned to the factory's
	// managed group if not reassigned here,
	// hence fall-through.
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "CAM_1C", {
		area: "RTLZ",
		message: "C1-3_LZ",
		reinforcements: -1, // will override later
		annihilate: true
	});

	var startpos = getObject("StartPosition");
	var lz = getObject("LandingZone");
	var tent = getObject("TransporterEntry");
	var text = getObject("TransporterExit");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	camCompleteRequiredResearch(CAM1_3_RES_NP, NEW_PARADIGM);
	camCompleteRequiredResearch(CAM1_3_RES_SCAV, SCAVS);
	camCompleteRequiredResearch(CAM1_3_RES_SCAV, ULTSCAV);

	setAlliance(NEW_PARADIGM, SCAVS, true);
	setAlliance(ULTSCAV, SCAVS, true);
	setAlliance(ULTSCAV, NEW_PARADIGM, true);

	camSetEnemyBases({
		"ScavBaseGroup": {
			cleanup: "ScavBase",
			detectMsg: "C1-3_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"NPBaseGroup": {
			cleanup: "NPBase",
			detectMsg: "C1-3_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg"
		},
	});

	hackAddMessage("C1-3_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false); // south-west beacon

	camSetArtifacts({
		"ScavFactory": { tech: "R-Wpn-Cannon1Mk1" },
		"NPFactory": { tech: "R-Struc-Factory-Module" },
		"NPHQ": { tech: "R-Defense-HardcreteWall" },
		"NPCRC": { tech: "R-Struc-CommandRelay" },
		"NPRepair": { tech: "R-Struc-RepairFacility" },
		"TwinHvyMG": { tech: "R-Wpn-MG3Mk1-Twn" },
		"JammerTurret": { tech: "R-Sys-ECM-Upgrade01" },
	});

	camSetFactories({
		"ScavFactory": {
			assembly: "ScavAssembly",
			order: CAM_ORDER_COMPROMISE,
			data: {
				pos: camMakePos("RTLZ"),
				radius: 8
			},
			groupSize: 4,
			maxSize: 10,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [ cTempl.rbuggy, cTempl.bloke, cTempl.rbjeep, cTempl.buggy ]
		},
		"NPFactory": {
			assembly: "NPAssembly",
			order: CAM_ORDER_ATTACK,
			data: {
				regroup: false,
				repair: 30,
			},
			groupSize: 4, // sic! scouts, at most
			maxSize: 20,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(40)),
			templates: [ cTempl.nppod, cTempl.nphmg, cTempl.npsmc, cTempl.npsmc ]
		},
	});

	NPScoutGroup = camMakeGroup("NPScoutForce");
	NPDefenseGroup = camMakeGroup("NPDefense");
	NPFactory = getObject("NPFactory");

	queue("playNPWarningMessage", camSecondsToMilliseconds(3));
	queue("sendScouts", camSecondsToMilliseconds(60));
	ultScav_eventStartLevel(
		-1, // vtols on/off. -1 = off
		55, // build defense every x seconds
		35, // build factories every x seconds
		-1, // build cyborg factories every x seconds
		25, // produce trucks every x seconds
		35, // produce droids every x seconds
		-1, // produce cyborgs every x seconds
		-1, // produce VTOLs every x seconds
		2, // min factories
		-1, // min vtol factories
		-1, // min cyborg factories
		3, // min number of trucks
		3, // min number of sensor droids
		4, // min number of attack droids
		5, // min number of defend droids
		85, // ground attack every x seconds
		-1, // VTOL attack every x seconds
		1 // tech level
	);
}
