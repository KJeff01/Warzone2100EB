include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

function camEnemyBaseDetected_COMainBase()
{
	camManageGroup(camMakeGroup("mediumBaseGroup"), CAM_ORDER_DEFEND, {
		pos: camMakePos("uplinkBaseCorner"),
		radius: 20,
		regroup: false,
	});

	camEnableFactory("COCyborgFactory-b1");
	camEnableFactory("COCyborgFactory-b2");
	camEnableFactory("COHeavyFactory-b2R");
}

camAreaEvent("factoryTriggerWest", function(droid)
{
	enableTimeBasedFactories();
});

camAreaEvent("factoryTriggerEast", function(droid)
{
	enableTimeBasedFactories();
});

function camEnemyBaseEliminated_COUplinkBase()
{
	hackRemoveMessage("C26_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
}

//Group together attack droids in this base that are not already in a group
function camEnemyBaseDetected_COMediumBase()
{
	var droids = enumArea("mediumBaseCleanup", THE_COLLECTIVE, false).filter((obj) => (
		obj.type === DROID && obj.group === null && obj.canHitGround
	));

	camManageGroup(camMakeGroup(droids), CAM_ORDER_ATTACK, {
		regroup: false,
	});
}

function truckDefense()
{
	if (enumDroid(THE_COLLECTIVE, DROID_CONSTRUCT).length === 0)
	{
		removeTimer("truckDefense");
		return;
	}

	var list = ["Emplacement-Howitzer105", "Emplacement-Rocket06-IDF", "Sys-CB-Tower01", "Emplacement-Howitzer105", "Emplacement-Rocket06-IDF", "Sys-SensoTower02"];
	camQueueBuilding(THE_COLLECTIVE, list[camRand(list.length)], camMakePos("buildPos1"));
	camQueueBuilding(THE_COLLECTIVE, list[camRand(list.length)], camMakePos("buildPos2"));
}

function southEastAttack()
{
	camManageGroup(camMakeGroup("southEastGroup"), CAM_ORDER_COMPROMISE, {
		pos: [
			camMakePos("playerLZ"),
		],
		repair: 40,
		regroup: false,
	});
}

function northWestAttack()
{
	camManageGroup(camMakeGroup("uplinkBaseGroup"), CAM_ORDER_ATTACK, {
		//morale: 10,
		//fallback: camMakePos("base1CybAssembly"),
		regroup: false,
	});
}

function mainBaseAttackGroup()
{
	camManageGroup(camMakeGroup("mainBaseGroup"), CAM_ORDER_ATTACK, {
		pos: [
			camMakePos("grp2Pos1"),
			camMakePos("playerLZ"),
			camMakePos("grp2Pos2"),
		],
		morale: 40,
		fallback: camMakePos("grp2Pos2"),
		regroup: false,
	});
}

function enableTimeBasedFactories()
{
	camEnableFactory("COMediumFactory");
	camEnableFactory("COCyborgFactory-Arti");
	camEnableFactory("COHeavyFactory-b2L");
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "SUB_2_7S", {
		area: "RTLZ",
		message: "C26_LZ",
		reinforcements: camMinutesToSeconds(3)
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
		"COCyborgFactory-Arti": { tech: ["R-Wpn-MG4-Hvy", "R-Wpn-Rocket07-Tank-Killer"] },
		"COCommandCenter": { tech: "R-Wpn-Mortar-ROF04" },
		"uplink": { tech: "R-Sys-VTOLCBS-Tower01" },
		"COCyborgFactory-b1": { tech: ["R-Cyborg-Metals06", "R-Cyborg-HvyBody"] },
	});

	camCompleteRequiredResearch(CAM2_6_RES_COL, THE_COLLECTIVE);

	camSetEnemyBases({
		"COUplinkBase": {
			cleanup: "uplinkBaseCleanup",
			detectMsg: "C26_BASE1",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"COMainBase": {
			cleanup: "mainBaseCleanup",
			detectMsg: "C26_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"COMediumBase": {
			cleanup: "mediumBaseCleanup",
			detectMsg: "C26_BASE3",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
	});

	camSetFactories({
		"COCyborgFactory-Arti": {
			assembly: "COCyborgFactory-ArtiAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 36 : 40)),
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			templates: [cTempl.npcybc, cTempl.npcybf, cTempl.cocybag, cTempl.npcybr]
		},
		"COCyborgFactory-b1": {
			assembly: "COCyborgFactory-b1Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 45 : 50)),
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			templates: [cTempl.cocybag, cTempl.npcybr]
		},
		"COCyborgFactory-b2": {
			assembly: "COCyborgFactory-b2Assembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 45 : 50)),
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
			templates: [cTempl.npcybc, cTempl.npcybf]
		},
		"COHeavyFactory-b2L": {
			assembly: "COHeavyFactory-b2LAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 72 : 80)),
			data: {
				regroup: false,
				repair: 20,
				count: -1,
			},
			templates: [cTempl.cohact, cTempl.comhpv, cTempl.comrotm]
		},
		"COHeavyFactory-b2R": {
			assembly: "COHeavyFactory-b2RAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 54 : 60)),
			data: {
				regroup: false,
				repair: 20,
				count: -1,
			},
			templates: [cTempl.comrotm, cTempl.comhltat, cTempl.cohact, cTempl.comsensh]
		},
		"COMediumFactory": {
			assembly: "COMediumFactoryAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 40 : 45)),
			data: {
				regroup: false,
				repair: 30,
				count: -1,
			},
			templates: [cTempl.comhpv, cTempl.comagt, cTempl.comrotm]
		},
	});

	hackAddMessage("C26_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);

	if (difficulty >= HARD)
	{
		addDroid(THE_COLLECTIVE, 26, 27, "Truck Panther Tracks", "Body6SUPP", "tracked01", "", "", "Spade1Mk1");
		addDroid(THE_COLLECTIVE, 42, 4, "Truck Panther Tracks", "Body6SUPP", "tracked01", "", "", "Spade1Mk1");
		camManageTrucks(THE_COLLECTIVE);
		setTimer("truckDefense", camChangeOnDiff(camMinutesToMilliseconds(6)));
	}

	queue("northWestAttack", camChangeOnDiff(camMinutesToMilliseconds(3)));
	queue("mainBaseAttackGroup", camChangeOnDiff(camMinutesToMilliseconds((difficulty <= MEDIUM) ? 4 : 4.5)));
	queue("southEastAttack", camChangeOnDiff(camMinutesToMilliseconds((difficulty <= MEDIUM) ? 4.5 : 5)));
	queue("enableTimeBasedFactories", camChangeOnDiff(camMinutesToMilliseconds((difficulty <= MEDIUM) ? 5 : 6)));
}
