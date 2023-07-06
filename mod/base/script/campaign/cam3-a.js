include("script/campaign/transitionTech.js");
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");

var transporterIndex; //Number of bonus transports that have flown in.
var startedFromMenu;
var truckLocCounter;

//Remove Nexus VTOL droids.
camAreaEvent("vtolRemoveZone", function(droid)
{
	if (droid.player !== CAM_HUMAN_PLAYER)
	{
		if (isVTOL(droid))
		{
			camSafeRemoveObject(droid, false);
		}
	}

	resetLabel("vtolRemoveZone", NEXUS);
});

//Order base three groups to do stuff and enable cyborg factories in the north
camAreaEvent("northFactoryTrigger", function(droid)
{
	camEnableFactory("NXcybFac-b3");
	camEnableFactory("NXcybFac-b4");

	camManageGroup(camMakeGroup("NEAttackerGroup"), CAM_ORDER_ATTACK, {
		regroup: true,
		morale: 90,
		fallback: camMakePos("SWBaseRetreat")
	});

	camManageGroup(camMakeGroup("NEDefenderGroup"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("genericasAssembly"),
			camMakePos("northFacAssembly"),
		],
		interval: camMinutesToMilliseconds(1),
		regroup: true,
	});
});

//Enable factories in the SW base
camAreaEvent("westFactoryTrigger", function(droid)
{
	camEnableFactory("NXcybFac-b2-1");
	camEnableFactory("NXcybFac-b2-2");
	camEnableFactory("NXHvyFac-b2");
});

//Enable all factories if the player tries to bypass a trigger area
camAreaEvent ("middleTrigger", function(droid)
{
	enableAllFactories();
});

function setUnitRank(transport)
{
	const DROID_EXP = [1024, 128, 64, 32]; //Can make Hero Commanders if recycled.
	var droids = enumCargo(transport);

	for (let i = 0, len = droids.length; i < len; ++i)
	{
		var droid = droids[i];
		if (!camIsSystemDroid(droid))
		{
			setDroidExperience(droid, DROID_EXP[transporterIndex - 1]);
		}
	}
}

function eventTransporterLanded(transport)
{
	if (startedFromMenu)
	{
		setUnitRank(transport);
	}
}

//Enable all factories.
function enableAllFactories()
{
	const FACTORY_NAMES = [
		"NXcybFac-b3", "NXcybFac-b2-1", "NXcybFac-b2-2", "NXHvyFac-b2", "NXcybFac-b4",
	];

	for (let j = 0, i = FACTORY_NAMES.length; j < i; ++j)
	{
		camEnableFactory(FACTORY_NAMES[j]);
	}
}

function truckDefense()
{
	if (enumDroid(NEXUS, DROID_CONSTRUCT).length === 0)
	{
		removeTimer("truckDefense");
		return;
	}

	var list = ["Emplacement-Howitzer150", "Emplacement-MdART-pit", "Emplacement-RotHow"];
	var position;

	if (truckLocCounter === 0)
	{
		position = camMakePos("buildPos1");
		truckLocCounter += 1;
	}
	else
	{
		position = camMakePos("buildPos2");
		truckLocCounter = 0;
	}

	camQueueBuilding(NEXUS, list[camRand(list.length)], position);
}

//Extra transport units are only awarded to those who start Gamma campaign
//from the main menu.
function sendPlayerTransporter()
{
	const transportLimit = 4; //Max of four transport loads if starting from menu.
	if (!camDef(transporterIndex))
	{
		transporterIndex = 0;
	}

	if (transporterIndex === transportLimit)
	{
		removeTimer("sendPlayerTransporter");
		return;
	}

	var droids = [];
	var list = [cTempl.prhasgnt, cTempl.prhhpvt, cTempl.prhaawwt, cTempl.prtruck];

	// send 4 Assault Guns, 2 Hyper Velocity Cannons, 2 Whirlwind AA Turrets and 2 Trucks
	for (let i = 0, d = list.length; i < 10; ++i)
	{
		droids.push(i < d * 2 ? list[i % 4] : list[0]);
	}

	camSendReinforcement(CAM_HUMAN_PLAYER, camMakePos("landingZone"), droids,
		CAM_REINFORCE_TRANSPORT, {
			entry: { x: 63, y: 118 },
			exit: { x: 63, y: 118 }
		}
	);

	transporterIndex += 1;
}

//Setup Nexus VTOL hit and runners.
function vtolAttack()
{
	var list = [cTempl.nxlneedv, cTempl.nxlscouv, cTempl.nxmtherv];
	camSetVtolData(NEXUS, "vtolAppearPos", "vtolRemovePos", list, camChangeOnDiff(camMinutesToMilliseconds(5)), "NXCommandCenter");
}

//These groups are active immediately.
function groupPatrolNoTrigger()
{
	camManageGroup(camMakeGroup("cybAttackers"), CAM_ORDER_ATTACK, {
		pos: [
			camMakePos("northFacAssembly"),
			camMakePos("ambushPlayerPos"),
		],
		regroup: true,
		count: -1,
		morale: 90,
		fallback: camMakePos("healthRetreatPos")
	});

	camManageGroup(camMakeGroup("hoverPatrolGrp"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("hoverGrpPos1"),
			camMakePos("hoverGrpPos2"),
			camMakePos("hoverGrpPos3"),
		]
	});

	camManageGroup(camMakeGroup("cybValleyPatrol"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("southWestBasePatrol"),
			camMakePos("westEntrancePatrol"),
			camMakePos("playerLZPatrol"),
		]
	});

	camManageGroup(camMakeGroup("NAmbushCyborgs"), CAM_ORDER_ATTACK);
}

//Gives starting tech and research.
function cam3Setup()
{
	for (let x = 0, l = STRUCTS_ALPHA.length; x < l; ++x)
	{
		enableStructure(STRUCTS_ALPHA[x], CAM_HUMAN_PLAYER);
	}

	camCompleteRequiredResearch(CAM1A_RESEARCH, CAM_HUMAN_PLAYER);
	camCompleteRequiredResearch(CAM2A_RESEARCH, CAM_HUMAN_PLAYER);
	camCompleteRequiredResearch(CAM3A_RESEARCH, CAM_HUMAN_PLAYER);
	camCompleteRequiredResearch(CAM1A_RESEARCH, NEXUS);
	camCompleteRequiredResearch(CAM2A_RESEARCH, NEXUS);
	camCompleteRequiredResearch(CAM3A_RESEARCH, NEXUS);
	camCompleteRequiredResearch(CAM3A_RES_NEXUS, NEXUS);

	enableResearch("R-Wpn-Rocket-Damage08", CAM_HUMAN_PLAYER);
	enableResearch("R-Wpn-Cannon-Damage08", CAM_HUMAN_PLAYER);
}

function eventStartLevel()
{
	const PLAYER_POWER = 16000;
	var startpos = getObject("startPosition");
	var lz = getObject("landingZone");
	var tent = getObject("transporterEntry");
	var text = getObject("transporterExit");

	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, "SUB_3_1S");
	setMissionTime(camChangeOnDiff(camHoursToSeconds(2)));

	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	var enemyLz = getObject("NXlandingZone");
	setNoGoArea(enemyLz.x, enemyLz.y, enemyLz.x2, enemyLz.y2, NEXUS);

	camSetArtifacts({
		"NXPowerGenArti": { tech: ["R-Wpn-MG5-Hvy", "R-Struc-Power-Upgrade02"] },
		"NXResearchLabArti": { tech: ["R-Wpn-MG-Damage08", "R-Sys-Engineering03"] },
	});

	setPower(PLAYER_POWER, CAM_HUMAN_PLAYER);
	cam3Setup();

	camSetEnemyBases({
		"NEXUS-WBase": {
			cleanup: "westBaseCleanup",
			detectMsg: "CM3A_BASE1",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NEXUS-SWBase": {
			cleanup: "southWestBaseCleanup",
			detectMsg: "CM3A_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NEXUS-NEBase": {
			cleanup: "northEastBaseCleanup",
			detectMsg: "CM3A_BASE3",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NEXUS-NWBase": {
			cleanup: "northWestBaseCleanup",
			detectMsg: "CM3A_BASE4",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
	});

	camSetFactories({
		"NXcybFac-b3": {
			assembly: "NXcybFac-b3Assembly",
			order: CAM_ORDER_ATTACK,
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(40)),
			group: camMakeGroup("NEAttackerGroup"),
			templates: [cTempl.nxcyrail, cTempl.nxcyscou]
		},
		"NXcybFac-b2-1": {
			assembly: "NXcybFac-b2-1Assembly",
			order: CAM_ORDER_ATTACK,
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			group: camMakeGroup("cybAttackers"),
			templates: [cTempl.nxcyrail, cTempl.nxcyscou]
		},
		"NXcybFac-b2-2": {
			assembly: "NXcybFac-b2-2Assembly",
			order: CAM_ORDER_PATROL,
			data: {
				pos: [
					camMakePos("southWestBasePatrol"),
					camMakePos("westEntrancePatrol"),
					camMakePos("playerLZPatrol"),
				],
				regroup: false,
				repair: 40,
				count: -1,
			},
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(35)),
			group: camMakeGroup("cybValleyPatrol"),
			templates: [cTempl.nxcyrail, cTempl.nxcyscou]
		},
		"NXHvyFac-b2": {
			assembly: "NXHvyFac-b2Assembly",
			order: CAM_ORDER_PATROL,
			data: {
				pos: [
					camMakePos("hoverGrpPos1"),
					camMakePos("hoverGrpPos2"),
					camMakePos("hoverGrpPos3"),
				],
				regroup: false,
				repair: 45,
				count: -1,
			},
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(60)),
			group: camMakeGroup("hoverPatrolGrp"),
			templates: [cTempl.nxmscouh]
		},
		"NXcybFac-b4": {
			assembly: "NXcybFac-b4Assembly",
			order: CAM_ORDER_ATTACK,
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			templates: [cTempl.nxcyrail, cTempl.nxcyscou]
		},
	});

	if (difficulty >= HARD)
	{
		addDroid(NEXUS, 8, 112, "Truck Retribution Hover", "Body7ABT", "hover01NAS", "", "", "Spade1Mk1");

		camManageTrucks(NEXUS);

		setTimer("truckDefense", camChangeOnDiff(camMinutesToMilliseconds(4.5)));
	}

	camPlayVideos([{video: "CAM3_INT", type: CAMP_MSG}, {video: "MB3A_MSG2", type: MISS_MSG}]);
	startedFromMenu = false;
	truckLocCounter = 0;

	//Only if starting Gamma directly rather than going through Beta
	if (enumDroid(CAM_HUMAN_PLAYER, DROID_SUPERTRANSPORTER).length === 0)
	{
		startedFromMenu = true;
		setReinforcementTime(LZ_COMPROMISED_TIME);
		sendPlayerTransporter();
		setTimer("sendPlayerTransporter", camMinutesToMilliseconds(5));
	}
	else
	{
		setReinforcementTime(camMinutesToSeconds(5));
	}

	groupPatrolNoTrigger();
	queue("vtolAttack", camChangeOnDiff(camMinutesToMilliseconds(8)));
	queue("enableAllFactories", camChangeOnDiff(camMinutesToMilliseconds(20)));
}
