include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include ("script/campaign/ultScav.js");


function camEnemyBaseDetected_COMainBase()
{
	camManageGroup(camMakeGroup("mediumBaseGroup"), CAM_ORDER_DEFEND, {
		pos: camMakePos("uplinkBaseCorner"),
		radius: 20,
		regroup: false,
	});

	camManageGroup(camMakeGroup("southEastGroup"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("playerLZ"),
			camMakePos("grp2Pos2"),
			camMakePos("uplinkBaseCorner"),
		],
		interval: camSecondsToMilliseconds(40),
		//fallback: camMakePos("heavyFacAssembly"),
		repair: 40,
		regroup: false,
	});

	camEnableFactory("COCyborgFactory-b1");
	camEnableFactory("COCyborgFactory-b2");
	camEnableFactory("COHeavyFactory-b2R");
	enableTimeBasedFactories(); //Might as well since the player is attacking.
}

function camEnemyBaseEliminated_COUplinkBase()
{
	hackRemoveMessage("C26_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
}

//Group together attack droids in this base that are not already in a group
function camEnemyBaseDetected_COMediumBase()
{
	var droids = enumArea("mediumBaseCleanup", THE_COLLECTIVE, false).filter(function(obj) {
		return obj.type === DROID && obj.group === null && obj.canHitGround;
	});

	camManageGroup(camMakeGroup(droids), CAM_ORDER_ATTACK, {
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
		"COCyborgFactory-Arti": { tech: "R-Wpn-Rocket07-Tank-Killer" },
		"COCommandCenter": { tech: "R-Wpn-Mortar-ROF04" },
		"uplink": { tech: "R-Sys-VTOLCBS-Tower01" },
		"COCyborgFactory-b1": { tech: ["R-Cyborg-HvyBody", "R-Cyborg-Engine02"] },
	});

	setAlliance(THE_COLLECTIVE, ULTSCAV, true);
	camCompleteRequiredResearch(CAM2_6_RES_COL, THE_COLLECTIVE);
	camCompleteRequiredResearch(CAM2_6_RES_COL, ULTSCAV);

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
			throttle: camChangeOnDiff(camSecondsToMilliseconds(40)),
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds(80)),
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds(60)),
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
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			data: {
				regroup: false,
				repair: 30,
				count: -1,
			},
			templates: [cTempl.comhpv, cTempl.comagt, cTempl.comrotm]
		},
	});

	hackAddMessage("C26_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, true);

	queue("northWestAttack", camMinutesToMilliseconds(2));
	queue("mainBaseAttackGroup", camMinutesToMilliseconds(3));
	queue("enableTimeBasedFactories", camChangeOnDiff(camMinutesToMilliseconds(10)));
	ultScav_eventStartLevel(
		-1, // vtols on/off. -1 = off
		45, // build defense every x seconds
		75, // build factories every x seconds
		-1, // build cyborg factories every x seconds
		25, // produce trucks every x seconds
		115, // produce droids every x seconds
		-1, // produce cyborgs every x seconds
		-1, // produce VTOLs every x seconds
		1, // min factories
		-1, // min vtol factories
		-1, // min cyborg factories
		7, // min number of trucks
		-1, // min number of sensor droids
		10, // min number of attack droids
		3, // min number of defend droids
		75, // ground attack every x seconds
		-1, // VTOL attack every x seconds
		2.5); // tech level
}
