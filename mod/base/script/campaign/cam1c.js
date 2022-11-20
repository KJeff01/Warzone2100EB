
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

function enableUltScavs()
{
	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		190, // build defense every x seconds
		85, // build factories every x seconds
		-1, // build cyborg factories every x seconds
		240, // produce trucks every x seconds
		120, // produce droids every x seconds
		-1, // produce cyborgs every x seconds
		75, // produce VTOLs every x seconds
		5, // min factories
		10, // min vtol factories
		-1, // min cyborg factories
		4, // min number of trucks
		-1, // min number of sensor droids
		4, // min number of attack droids
		3, // min number of defend droids
		55, // ground attack every x seconds
		145, // VTOL attack every x seconds
		1 // tech level
	);
}

function triggerUlts()
{
	camCallOnce("enableUltScavs");
}

function sendRocketForce()
{
	camManageGroup(camMakeGroup("RocketForce"), CAM_ORDER_ATTACK, {
		regroup: true,
		count: -1,
	});
}

function sendTankScoutForce()
{
	camManageGroup(camMakeGroup("TankScoutForce"), CAM_ORDER_ATTACK, {
		regroup: true,
		count: -1,
	});
	// FIXME: Re-enable this when commander/formation movement
	// becomes good enough. Remove the call above then.
	/*
	camManageGroup(camMakeGroup("TankScoutForce"), CAM_ORDER_FOLLOW, {
		droid: "TankScoutForceCommander",
		order: CAM_ORDER_ATTACK
	});
	*/
}

function sendTankForce()
{
	camManageGroup(camMakeGroup("TankForce"), CAM_ORDER_ATTACK, {
		regroup: true,
		count: -1,
	});
	// FIXME: Re-enable this when commander/formation movement
	// becomes good enough. Remove the call above then.
	/*
	camManageGroup(camMakeGroup("TankForce"), CAM_ORDER_FOLLOW, {
		droid: "TankForceCommander",
		order: CAM_ORDER_ATTACK
	});
	*/
}

function enableNPFactory()
{
	camEnableFactory("NPCentralFactory");
}

function enableNorthScavFactory()
{
	camEnableFactory("ScavNorthFactory");
}

camAreaEvent("RemoveBeacon", function()
{
	hackRemoveMessage("C1C_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);

	triggerUlts();
});

camAreaEvent("AmbushTrigger", function()
{
	// wzcam enables factory here, even though it's quite early
	camEnableFactory("ScavCentralFactory");

	camManageGroup(camMakeGroup("AmbushForce"), CAM_ORDER_ATTACK, {
		pos: "AmbushTarget",
		regroup: true,
		count: -1,
	});
	// FIXME: Re-enable this when commander/formation movement
	// becomes good enough. Remove the call above then.
	// FIXME: This group has more droids than the commander can handle!
	/*
	camManageGroup(camMakeGroup("AmbushForce"), CAM_ORDER_FOLLOW, {
		droid: "AmbushForceCommander",
		order: CAM_ORDER_ATTACK,
		pos: "AmbushTarget",
	});
	*/
});

camAreaEvent("ScavCentralFactoryTrigger", function()
{
	// doesn't make much sense because the player
	// passes through AmbushTrigger anyway
	// before getting there
	camEnableFactory("ScavCentralFactory");
});

camAreaEvent("ScavNorthFactoryTrigger", function()
{
	camCallOnce("enableNorthScavFactory");
});

camAreaEvent("NPNorthFactoryTrigger", function()
{
	camEnableFactory("NPNorthFactory");
});

function camEnemyBaseEliminated_NPCentralFactory()
{
	camEnableFactory("NPNorthFactory");
}

function getDroidsForNPLZ(args)
{
	var scouts = [ cTempl.nppod, cTempl.nphmg ];
	var heavies = [ cTempl.npslc, cTempl.npsmct ];
	var useArtillery = (camRand(100) < 50);

	var numScouts = camRand(5) + 1;
	var heavy = heavies[camRand(heavies.length)];
	var list = [];

	if (useArtillery)
	{
		list[list.length] = cTempl.npsens; //sensor will count towards scout total
		numScouts -= 1;
		heavy = cTempl.npmor;
	}

	for (let i = 0; i < numScouts; ++i)
	{
		list[list.length] = scouts[camRand(scouts.length)];
	}

	for (let a = numScouts; a < 8; ++a)
	{
		list[list.length] = heavy;
	}

	return list;
}

camAreaEvent("NPLZ1Trigger", function()
{
	// Message4 here, Message3 for the second LZ, and
	// please don't ask me why they did it this way
	camPlayVideos({video: "MB1C4_MSG", type: MISS_MSG});
	camDetectEnemyBase("NPLZ1Group");

	camSetBaseReinforcements("NPLZ1Group", camChangeOnDiff(camMinutesToMilliseconds(5)), "getDroidsForNPLZ",
		CAM_REINFORCE_TRANSPORT, {
			entry: { x: 126, y: 76 },
			exit: { x: 126, y: 36 }
		}
	);
});

camAreaEvent("NPLZ2Trigger", function()
{
	camPlayVideos({video: "MB1C3_MSG", type: MISS_MSG});
	camDetectEnemyBase("NPLZ2Group");
	camCallOnce("enableNorthScavFactory");

	camSetBaseReinforcements("NPLZ2Group", camChangeOnDiff(camMinutesToMilliseconds(5)), "getDroidsForNPLZ",
		CAM_REINFORCE_TRANSPORT, {
			entry: { x: 126, y: 76 },
			exit: { x: 126, y: 36 }
		}
	);
});

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "CAM_1CA");
	var startpos = getObject("startPosition");
	var lz = getObject("landingZone");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);

	// make sure player doesn't build on enemy LZs of the next level
	for (let i = 1; i <= 5; ++i)
	{
		var ph = getObject("PhantomLZ" + i);
		// HACK: set LZs of bad players, namely 2...6,
		// note: player 1 is NP, player 7 is scavs
		setNoGoArea(ph.x, ph.y, ph.x2, ph.y2, i + 1);
	}

	setMissionTime(camChangeOnDiff(camHoursToSeconds(3)));

	setReinforcementTime(-1);
	setAlliance(NEW_PARADIGM, SCAV_7, true);
	setAlliance(NEW_PARADIGM, ULTSCAV, true);
	setAlliance(SCAV_7, ULTSCAV, true);
	camCompleteRequiredResearch(CAM1C_RES_NP, NEW_PARADIGM);
	camCompleteRequiredResearch(CAM1C_RES_SCAV, SCAV_7);
	camCompleteRequiredResearch(CAM1C_RES_SCAV, ULTSCAV);

	camUpgradeOnMapTemplates(cTempl.bloke, cTempl.blokeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.trike, cTempl.trikeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.buggy, cTempl.buggyheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.bjeep, cTempl.bjeepheavy, SCAV_7);

	camSetEnemyBases({
		"ScavSouthDerrickGroup": {
			cleanup: "ScavSouthDerrick",
			detectMsg: "C1C_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"ScavSouthEastHighgroundGroup": {
			cleanup: "ScavSouthEastHighground",
			detectMsg: "C1C_BASE6",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"ScavNorthBaseGroup": {
			cleanup: "ScavNorthBase",
			detectMsg: "C1C_BASE3",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"ScavSouthPodPitsGroup": {
			cleanup: "ScavSouthPodPits",
			detectMsg: "C1C_BASE4",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv391.ogg"
		},
		"ScavCentralBaseGroup": {
			cleanup: "MixedCentralBase", // two bases with same cleanup region
			detectMsg: "C1C_BASE5",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv391.ogg",
			player: SCAV_7 // hence discriminate by player filter
		},
		"NPEastBaseGroup": {
			cleanup: "NPEastBase",
			detectMsg: "C1C_BASE7",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NPNorthEastGeneratorGroup": {
			cleanup: "NPNorthEastGenerator",
			detectMsg: "C1C_BASE8",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NPNorthEastBaseGroup": {
			cleanup: "NPNorthEastBase",
			detectMsg: "C1C_BASE9",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NPCentralBaseGroup": {
			cleanup: "MixedCentralBase", // two bases with same cleanup region
			detectMsg: "C1C_BASE10",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
			player: NEW_PARADIGM // hence discriminate by player filter
		},
		"NPLZ1Group": {
			cleanup: "NPLZ1", // kill the four towers to disable LZ
			detectMsg: "C1C_LZ1",
			eliminateSnd: "pcv394.ogg",
			player: NEW_PARADIGM // required for LZ-type bases
		},
		"NPLZ2Group": {
			cleanup: "NPLZ2", // kill the four towers to disable LZ
			detectMsg: "C1C_LZ2",
			eliminateSnd: "pcv394.ogg",
			player: NEW_PARADIGM // required for LZ-type bases
		},
	});

	hackAddMessage("C1C_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false); // initial beacon
	camPlayVideos([{video: "MB1C_MSG", type: CAMP_MSG}, {video: "MB1C2_MSG", type: CAMP_MSG}]);

	camSetArtifacts({
		"ScavSouthFactory": { tech: ["R-Wpn-Rocket05-MiniPod", "R-Wpn-Cannon2Mk1", "R-Wpn-Mortar-Range01"] },
		"NPResearchFacility": { tech: ["R-Struc-Research-Module", "R-Vehicle-Engine02"] },
		"NPCentralFactory": { tech: ["R-Vehicle-Prop-Tracks", "R-Wpn-Rocket03-HvAT"] },
		"NPNorthFactory": { tech: ["R-Vehicle-Armor-Heat01", "R-Struc-Factory-Upgrade01"] },
	});

	camSetFactories({
		"ScavSouthFactory": {
			assembly: "ScavSouthFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(25)),
			templates: [ cTempl.buscan, cTempl.rbjeep8, cTempl.trikeheavy, cTempl.buggyheavy ]
		},
		"ScavCentralFactory": {
			assembly: "ScavCentralFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(25)),
			templates: [ cTempl.firecan, cTempl.rbuggy, cTempl.bjeepheavy, cTempl.blokeheavy ]
		},
		"ScavNorthFactory": {
			assembly: "ScavNorthFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [ cTempl.firecan, cTempl.rbuggy, cTempl.buscan, cTempl.trikeheavy ]
		},
		"NPCentralFactory": {
			assembly: "NPCentralFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(60)),
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			templates: [ cTempl.npmor, cTempl.npsens, cTempl.npslc ]
		},
		"NPNorthFactory": {
			assembly: "NPNorthFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			data: {
				regroup: false,
				repair: 66,
				count: -1,
			},
			templates: [ cTempl.nppod, cTempl.npsmct, cTempl.npmor ]
		},
	});

	camManageTrucks(NEW_PARADIGM);
	replaceTexture("page-7-barbarians-arizona.png", "page-7-barbarians-kevlar.png");

	camEnableFactory("ScavSouthFactory");
	camManageGroup(camMakeGroup("RocketScoutForce"), CAM_ORDER_ATTACK, {
		regroup: true,
		count: -1,
	});

	addDroid(ULTSCAV, 60, 116, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 73, 115, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 101, 111, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 79, 97, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 119, 112, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 117, 83, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 100, 88, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 89, 82, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 100, 70, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 94, 58, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 108, 55, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 85, 37, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 115, 18, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 98, 12, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 64, 32, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 69, 10, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 70, 56, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 61, 68, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 58, 78, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 63, 93, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");

	queue("sendRocketForce", camSecondsToMilliseconds(25));
	queue("sendTankScoutForce", camSecondsToMilliseconds(30));
	queue("sendTankForce", camSecondsToMilliseconds(100)); // in wzcam it moves back and then forward
	queue("enableNPFactory", camMinutesToMilliseconds(5));
	queue("triggerUlts", camChangeOnDiff(camMinutesToMilliseconds(15)));
}
