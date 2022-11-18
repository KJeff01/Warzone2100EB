
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

//Pursue player when nearby but do not go too far away from defense zone.
function camEnemyBaseDetected_NPBaseGroup()
{
	camCallOnce("NPBaseDetect");
}

function enableSouthScavFactory()
{
	camEnableFactory("SouthScavFactory");
}

camAreaEvent("NorthScavFactoryTrigger", function()
{
	camEnableFactory("NorthScavFactory");
});

camAreaEvent("NPBaseDetectTrigger", function()
{
	camDetectEnemyBase("NPBaseGroup");
});

camAreaEvent("removeRedObjectiveBlip", function()
{
	hackRemoveMessage("C1-4_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER); //Remove mission objective.
	hackAddMessage("C1-4_LZ", PROX_MSG, CAM_HUMAN_PLAYER, false);
});

camAreaEvent("LandingZoneTrigger", function()
{
	camPlayVideos(["pcv456.ogg", {video: "SB1_4_B", type: MISS_MSG}]);
	hackRemoveMessage("C1-4_LZ", PROX_MSG, CAM_HUMAN_PLAYER); //Remove LZ 2 blip.

	var lz = getObject("LandingZone2"); // will override later
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);

	// Give extra 40 minutes.
	setMissionTime(camChangeOnDiff(camMinutesToSeconds(40)) + getMissionTime());
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "SUB_1_5S", {
		area: "RTLZ",
		message: "C1-4_LZ",
		reinforcements: camMinutesToSeconds(1.5), // changes!
		retlz: true
	});
	// enables all factories
	camEnableFactory("SouthScavFactory");
	camEnableFactory("NorthScavFactory");
	camEnableFactory("HeavyNPFactory");
	camEnableFactory("MediumNPFactory");
	buildDefenses();
});

function NPBaseDetect()
{
	// Send tanks
	camManageGroup(camMakeGroup("AttackGroupLight"), CAM_ORDER_ATTACK, {
		pos: camMakePos("nearSensor"),
		radius: 10,
	});

	camManageGroup(camMakeGroup("AttackGroupMedium"), CAM_ORDER_ATTACK, {
		pos: camMakePos("nearSensor"),
		radius: 10,
	});

	camEnableFactory("HeavyNPFactory");
	camEnableFactory("MediumNPFactory");
}

function buildDefenses()
{
	// First wave of trucks
	camQueueBuilding(NEW_PARADIGM, "GuardTower6", "BuildTower0");
	camQueueBuilding(NEW_PARADIGM, "PillBox1",    "BuildTower3");
	camQueueBuilding(NEW_PARADIGM, "PillBox1",    "BuildTower6");

	// Second wave of trucks
	camQueueBuilding(NEW_PARADIGM, "GuardTower3", "BuildTower1");
	camQueueBuilding(NEW_PARADIGM, "GuardTower6", "BuildTower2");
	camQueueBuilding(NEW_PARADIGM, "GuardTower6", "BuildTower4");

	// Third wave of trucks
	camQueueBuilding(NEW_PARADIGM, "GuardTower3", "BuildTower5");
	camQueueBuilding(NEW_PARADIGM, "GuardTower6", "BuildTower7");
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "SUB_1_5S", {
		area: "RTLZ",
		message: "C1-4_LZ",
		reinforcements: -1, // will override later
		retlz: true
	});

	var startpos = getObject("StartPosition");
	var lz = getObject("LandingZone1"); // will override later
	var tent = getObject("TransporterEntry");
	var text = getObject("TransporterExit");

	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	camCompleteRequiredResearch(CAM1_4_RES_NP, NEW_PARADIGM);
	camCompleteRequiredResearch(CAM1_4_RES_SCAV, SCAV_7);
	camCompleteRequiredResearch(CAM1_4_RES_SCAV, ULTSCAV);
	setAlliance(NEW_PARADIGM, SCAV_7, true);
	setAlliance(NEW_PARADIGM, ULTSCAV, true);
	setAlliance(ULTSCAV, SCAV_7, true);

	camUpgradeOnMapTemplates(cTempl.bloke, cTempl.blokeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.trike, cTempl.trikeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.buggy, cTempl.buggyheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.bjeep, cTempl.bjeepheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.rbjeep, cTempl.rbjeep8, SCAV_7);

	camSetEnemyBases({
		"SouthScavBaseGroup": {
			cleanup: "SouthScavBase",
			detectMsg: "C1-4_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"NorthScavBaseGroup": {
			cleanup: "NorthScavBase",
			detectMsg: "C1-4_BASE3",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"NPBaseGroup": {
			cleanup: "NPBase",
			detectMsg: "C1-4_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg"
		},
	});

	hackAddMessage("C1-4_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);

	camSetArtifacts({
		"NPCommandCenter": { tech: ["R-Vehicle-Metals02", "R-Wpn-Mortar02Hvy", "R-Wpn-Cannon-Damage05"] },
		"NPResearchFacility": { tech: ["R-Vehicle-Body04", "R-Wpn-Rocket05-MiniPod-Arch"] },
		"MediumNPFactory": { tech: ["R-Wpn-Rocket-Pod-MRA", "R-Wpn-Rocket-Pod-MRA-Twin"] },
		"HeavyNPFactory": { tech: ["R-Vehicle-Body17", "R-Wpn-Cannon-Mount01"] },
	});

	camSetFactories({
		"SouthScavFactory": {
			assembly: "SouthScavFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			maxSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [ cTempl.rbuggy, cTempl.bjeepheavy, cTempl.buscan, cTempl.trikeheavy ]
		},
		"NorthScavFactory": {
			assembly: "NorthScavFactoryAssembly",
			order: CAM_ORDER_COMPROMISE,
			data: {
				pos: camMakePos("RTLZ"),
				radius: 8
			},
			groupSize: 4,
			maxSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(20)),
			templates: [ cTempl.firecan, cTempl.rbjeep8, cTempl.blokeheavy, cTempl.buggyheavy ]
		},
		"HeavyNPFactory": {
			assembly: "HeavyNPFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			maxSize: 6, // this one was exclusively producing trucks
			throttle: camChangeOnDiff(camSecondsToMilliseconds(60)), // but we simplify this out
			templates: [ cTempl.npsmc, cTempl.npmmct, cTempl.npsmc, cTempl.npsmct ]
		},
		"MediumNPFactory": {
			assembly: "MediumNPFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			maxSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			templates: [ cTempl.npmrl, cTempl.nphmg, cTempl.npsbb, cTempl.npmor ]
		},
	});

	// To be able to use camEnqueueBuilding() later,
	// and also to rebuild dead trucks.
	camManageTrucks(NEW_PARADIGM);

	addDroid(ULTSCAV, 21, 51, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 39, 54, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 50, 53, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 55, 49, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 15, 42, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 6, 31, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 21, 31, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 5, 17, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 11, 10, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 36, 20, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 56, 11, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");

	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		95, // build defense every x seconds
		85, // build factories every x seconds
		-1, // build cyborg factories every x seconds
		35, // produce trucks every x seconds
		75, // produce droids every x seconds
		-1, // produce cyborgs every x seconds
		-1, // produce VTOLs every x seconds
		6, // min factories
		3, // min vtol factories
		-1, // min cyborg factories
		3, // min number of trucks
		-1, // min number of sensor droids
		5, // min number of attack droids
		4, // min number of defend droids
		230, // ground attack every x seconds
		210, // VTOL attack every x seconds
		1.5 // tech level
	);

	queue("enableSouthScavFactory", camChangeOnDiff(camSecondsToMilliseconds(10)));
}
