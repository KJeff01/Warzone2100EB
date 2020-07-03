include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include ("script/campaign/ultScav.js");


camAreaEvent("factoryTrigger", function(droid)
{
	enableFactories();
	camManageGroup(camMakeGroup("canalGuards"), CAM_ORDER_ATTACK, {
		morale: 60,
		fallback: camMakePos("COMediumFactoryAssembly"),
		repair: 67,
		regroup: false,
	});
});

function camEnemyBaseEliminated_COEastBase()
{
	hackRemoveMessage("C25_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
}

//Tell everything not grouped on map to attack
function camEnemyBaseDetected_COEastBase()
{
	var droids = enumArea(0, 0, mapWidth, mapHeight, THE_COLLECTIVE, false).filter(function(obj) {
		return obj.type === DROID && obj.group === null && obj.canHitGround;
	});

	camManageGroup(camMakeGroup(droids), CAM_ORDER_ATTACK, {
		count: -1,
		regroup: false,
		repair: 80
	});
}

function setupDamHovers()
{
	camManageGroup(camMakeGroup("damGroup"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("damWaypoint1"),
			camMakePos("damWaypoint2"),
			camMakePos("damWaypoint3"),
		],
		//morale: 10,
		//fallback: camMakePos("damWaypoint1"),
		repair: 67,
		regroup: true,
	});
}

function setupCyborgsNorth()
{
	camManageGroup(camMakeGroup("northCyborgs"), CAM_ORDER_ATTACK, {
		morale: 70,
		fallback: camMakePos("COMediumFactoryAssembly"),
		repair: 67,
		regroup: false,
	});
}

function setupCyborgsEast()
{
	camManageGroup(camMakeGroup("eastCyborgs"), CAM_ORDER_ATTACK, {
		pos: camMakePos("playerLZ"),
		morale: 90,
		fallback: camMakePos("crossroadWaypoint"),
		repair: 30,
		regroup: false,
	});
}

function enableFactories()
{
	camEnableFactory("COMediumFactory");
	camEnableFactory("COCyborgFactoryL");
	camEnableFactory("COCyborgFactoryR");
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "SUB_2DS",{
		area: "RTLZ",
		message: "C25_LZ",
		reinforcements: camMinutesToSeconds(2)
	});

	var startpos = getObject("startPosition");
	var lz = getObject("landingZone"); //player lz
	var tent = getObject("transporterEntry");
	var text = getObject("transporterExit");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	var enemyLz = getObject("COLandingZone");
	setNoGoArea(enemyLz.x, enemyLz.y, enemyLz.x2, enemyLz.y2, THE_COLLECTIVE);

	camSetArtifacts({
		"NuclearReactor": { tech: "R-Struc-Power-Upgrade01" },
		"COMediumFactory": { tech: "R-Wpn-Cannon4AMk1" },
		"COCyborgFactoryL": { tech: "R-Wpn-MG4" },
	});

	setAlliance(THE_COLLECTIVE, ULTSCAV, true);
	camCompleteRequiredResearch(CAM2_5_RES_COL, THE_COLLECTIVE);
	camCompleteRequiredResearch(CAM2_5_RES_COL, ULTSCAV);

	camSetEnemyBases({
		"COEastBase": {
			cleanup: "baseCleanup",
			detectMsg: "C25_BASE1",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"CODamBase": {
			cleanup: "damBaseCleanup",
			detectMsg: "C25_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
	});

	camSetFactories({
		"COMediumFactory": {
			assembly: "COMediumFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			data: {
				regroup: false,
				repair: 20,
				count: -1,
			},
			templates: [cTempl.comct, cTempl.comatt, cTempl.comhpv]
		},
		"COCyborgFactoryL": {
			assembly: "COCyborgFactoryLAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			data: {
				regroup: false,
				repair: 30,
				count: -1,
			},
			templates: [cTempl.cocybag, cTempl.npcybf, cTempl.npcybr]
		},
		"COCyborgFactoryR": {
			assembly: "COCyborgFactoryRAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			data: {
				regroup: false,
				repair: 30,
				count: -1,
			},
			templates: [cTempl.npcybr, cTempl.npcybc]
		},
	});

	hackAddMessage("C25_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, true);

	queue("setupDamHovers", camSecondsToMilliseconds(3));
	queue("setupCyborgsEast", camChangeOnDiff(camMinutesToMilliseconds(3)));
	queue("enableFactories", camChangeOnDiff(camMinutesToMilliseconds(8)));
	queue("setupCyborgsNorth", camChangeOnDiff(camMinutesToMilliseconds(10)));
	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		40, // build defense every x seconds
		50, // build factories every x seconds
		45, // build cyborg factories every x seconds
		25, // produce trucks every x seconds
		45, // produce droids every x seconds
		25, // produce cyborgs every x seconds
		40, // produce VTOLs every x seconds
		1, // min factories
		1, // min vtol factories
		2, // min cyborg factories
		5, // min number of trucks
		3, // min number of sensor droids
		6, // min number of attack droids
		4, // min number of defend droids
		135, // ground attack every x seconds
		175, // VTOL attack every x seconds
		2.5 // tech level
	);
}
