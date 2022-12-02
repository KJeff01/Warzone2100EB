
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

camAreaEvent("tankTrapTrig", function(droid)
{
	camEnableFactory("NPFactoryW");
	camEnableFactory("NPCybFactoryW");
	camCallOnce("mrlGroupAttack");
});

camAreaEvent("northWayTrigger", function(droid)
{
	camEnableFactory("NPFactoryE");
	camEnableFactory("NPCybFactoryE");
	camCallOnce("mrlGroupAttack");
});

camAreaEvent("causeWayTrig", function(droid)
{
	camEnableFactory("NPFactoryNE");
	camEnableFactory("NPCybFactoryNE");
	camCallOnce("transportBaseSetup");
});

camAreaEvent("westWayTrigger", function(droid)
{
	camEnableFactory("NPFactoryNE");
	camEnableFactory("NPCybFactoryNE");
	camEnableFactory("NPFactoryE");
	camEnableFactory("NPCybFactoryE");
	camCallOnce("mrlGroupAttack");
	camCallOnce("transportBaseSetup");
});

function transportBaseSetup()
{
	camDetectEnemyBase("NPLZGroup");
	camSetBaseReinforcements("NPLZGroup", camChangeOnDiff(camMinutesToMilliseconds(10)), "getDroidsForNPLZ", CAM_REINFORCE_TRANSPORT, {
		entry: { x: 2, y: 2 },
		exit: { x: 2, y: 2 },
		data: {
			regroup: false,
			count: -1,
			repair: 40,
		},
	});
}

function getDroidsForNPLZ()
{
	const LIM = 8; //Last alpha mission always has 8 transport units
	let body = ["Body45ABT", "Body88MBT", "Body88MBT", "Body121SUP"];
	let prop = ["HalfTrackGM", "HalfTrackNAS", "hover01NAS", "tracked01GM", "tracked01NAS", "wheeled01GM", "wheeled01NAS" ];
	let weap = ["Rocket-Pod-Quad", "Rocket-LtA-T-Quad", "MG3Mk1-Aslt",
			"Rocket-Pod-MRA-Quad", "Rocket-Pod-Arch-Quad", "Rocket-Arch-Hvy-Aslt-Gat",
			"Rocket-BB-AR", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng"
	];
	let templates = generateRandomTemplates(body, prop, weap, true);

	var droids = [];
	for (let i = 0; i < LIM; ++i)
	{
		droids.push(templates[camRand(templates.length)]);
	}
	return droids;
}

function HoverGroupPatrol()
{
	camManageGroup(camMakeGroup("hoversAttack"), CAM_ORDER_ATTACK, {
		pos: camMakePos("attackPoint2"),
		fallback: camMakePos("cybRetreatPoint"),
		morale: 50,
		regroup: false
	});
	camManageGroup(camMakeGroup("hoversDefense"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("hoverDefense1"),
			camMakePos("hoverDefense2"),
			camMakePos("hoverDefense3"),
			camMakePos("hoverDefense4")
		],
		interval: camMinutesToMilliseconds(1.5),
		repair: 70
	});
}

function cyborgGroupPatrol()
{
	camManageGroup(camMakeGroup("cyborgs1"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("genRetreatPoint"),
			camMakePos("cybRetreatPoint"),
			camMakePos("NPTransportPos")
		],
		repair: 66
	});
	camManageGroup(camMakeGroup("cyborgs2"), CAM_ORDER_PATROL, {
		pos: [
			camMakePos("genRetreatPoint"),
			camMakePos("cybRetreatPoint"),
			camMakePos("NPTransportPos")
		],
		repair: 66
	});
}

function mrlGroupAttack()
{
	camManageGroup(camMakeGroup("MRL1"), CAM_ORDER_ATTACK, {
		count: -1,
		repair: 80,
		regroup: false
	});
}

function IDFGroupAmbush()
{
	camManageGroup(camMakeGroup("IDF1"), CAM_ORDER_ATTACK, {
		count: -1,
		regroup: false
	});
	camManageGroup(camMakeGroup("IDF2"), CAM_ORDER_ATTACK, {
		count: -1,
		regroup: false
	});
}

function setupPatrols()
{
	IDFGroupAmbush();
	HoverGroupPatrol();
	cyborgGroupPatrol();
}

function blowupRepair()
{
	camSafeRemoveObject("NPMiddleRepairFacility", false);
}

function checkEnemyVtolArea()
{
	var pos = {x: 1, y: 1};
	var vtols = enumRange(pos.x, pos.y, 2, NEW_PARADIGM, false).filter(function(obj) { return isVTOL(obj); });

	for (let i = 0, l = vtols.length; i < l; ++i)
	{
		if ((vtols[i].weapons[0].armed < 100) || (vtols[i].health < 100))
		{
			camSafeRemoveObject(vtols[i], false);
		}
	}
}

function vtolAttack()
{
	let vtolRemovePos = {x: 1, y: 1};
	let vtolPositions = undefined; //to randomize the spawns each time
	let body = ["Body17LGT", "Body45ABT", "Body18MED", "Body88MBT", "Body19HVY", "Body121SUP"];
	let prop = ["V-TolNAS"];
	let weap = ["Cannon1-VTOL", "Rocket-VTOL-TopAttackHvy", "Rocket-VTOL-Pod3", "Rocket-VTOL-LtA-T", "Rocket-MRL-VTOL", "Rocket-VTOL-BB" ];
	let list = generateRandomTemplates(body, prop, weap, true);
	let extras = {
		minVTOLs: (difficulty >= HARD) ? 3 : 2,
		maxRandomVTOLs: (difficulty >= HARD) ? 3 : 2
	};

	camSetVtolData(NEW_PARADIGM, vtolPositions, vtolRemovePos, list, camChangeOnDiff(camSecondsToMilliseconds(240)), "NPFactoryNE", extras);
}

function tankAttack()
{
	let positions = [
		{x: 78, y: 49},
		{x: 48, y: 2},
		{x: 2, y: 63}
	];
	let body = ["Body45ABT", "Body88MBT", "Body121SUP"];
	let prop = ["hover01NAS"];
	let weap = ["Rocket-Pod-Quad", "Rocket-LtA-T-Quad", "MG3Mk1-Aslt",
			"Rocket-Pod-MRA-Quad", "Rocket-Pod-Arch-Quad", "Rocket-Arch-Hvy-Aslt-Gat",
			"Rocket-BB-AR", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng"
	];
	let templates = generateRandomTemplates(body, prop, weap, true);

	let chosen = [];
	for (let i = 0; i < 5; ++i)
	{
		chosen.push(templates[camRand(templates.length)]);
	}

	camSendReinforcement(NEW_PARADIGM, camMakePos(positions[camRand(positions.length)]), chosen, CAM_REINFORCE_GROUND, {
		data: { regroup: false, count: -1, },
	});
}

function setupEBStuff()
{
	queue("vtolAttack", camMinutesToMilliseconds(10));
	setTimer("checkEnemyVtolArea", camSecondsToMilliseconds(1));
	setTimer("tankAttack", camMinutesToMilliseconds(7));
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "CAM_1END", {
		area: "RTLZ",
		message: "C1D_LZ",
		reinforcements: camMinutesToSeconds(2),
		eliminateBases: true
	});

	var startpos = getObject("startPosition");
	var lz = getObject("landingZone"); //player lz
	var tent = getObject("transporterEntry");
	var text = getObject("transporterExit");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	//Get rid of the already existing crate and replace with another
	camSafeRemoveObject("artifact1", false);
	camSetArtifacts({
		"artifactLocation": { tech: ["R-Vehicle-Prop-Hover", "R-Cyborg-Engine02"] }, //SE base
		"NPFactoryW": { tech: "R-Vehicle-Metals03" }, //West factory
		"NPFactoryNE": { tech: "R-Vehicle-Body12" }, //Main base factory
	});

	camCompleteRequiredResearch(CAM1D_RES_NP, NEW_PARADIGM);
	camCompleteRequiredResearch(CAM1D_RES_NP, ULTSCAV);
	setAlliance(NEW_PARADIGM, ULTSCAV, true);

	//blowupRepair();

	camSetEnemyBases({
		"NPSouthEastGroup": {
			cleanup: "NPSouthEast",
			detectMsg: "C1D_BASE1",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NPMiddleGroup": {
			cleanup: "NPMiddle",
			detectMsg: "C1D_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NPNorthEastGroup": {
			cleanup: "NPNorthEast",
			detectMsg: "C1D_BASE3",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"NPLZGroup": {
			cleanup: "NPLZ1",
			detectMsg: "C1D_LZ2",
			eliminateSnd: "pcv394.ogg",
			player: NEW_PARADIGM // required for LZ-type bases
		},
	});

	let body = ["Body45ABT", "Body88MBT", "Body88MBT", "Body121SUP"];
	let prop = ["HalfTrackGM", "HalfTrackNAS", "hover01NAS", "tracked01GM", "tracked01NAS", "wheeled01GM", "wheeled01NAS" ];
	let weap = ["Rocket-Pod-Quad", "Rocket-LtA-T-Quad", "MG3Mk1-Aslt",
			"Rocket-Pod-MRA-Quad", "Rocket-Pod-Arch-Quad", "Rocket-Arch-Hvy-Aslt-Gat",
			"Rocket-BB-AR", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng"
	];
	let templatesVariety = generateRandomTemplates(body, prop, weap, true);
	prop = ["hover01NAS"];
	let templatesHover = generateRandomTemplates(body, prop, weap, true);
	body = ["Body88MBT", "Body121SUP"];
	prop = ["HalfTrackGM", "HalfTrackNAS", "tracked01NAS", "tracked01GM"];
	weap = ["Rocket-LtA-T-Quad", "Rocket-Arch-Hvy-Aslt-Gat", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng"];
	let templatesTough = generateRandomTemplates(body, prop, weap, true);

	body = ["CyborgLightNAS"];
	prop = ["CyborgLegsNAS"];
	weap = ["Cyb-Wpn-Cannon-Sniper", "CyborgRocket", "Cyb-Wpn-Rocket-Sunburst-Arch",
		"Cyb-Wpn-Rocket-Sunburst", "Cyb-Wpn-Grenade", "CyborgFlamer01"
	];
	let templatesCyborgs1 = generateRandomTemplates(body, prop, weap, true);
	let templatesCyborgs2 = generateRandomTemplates(body, prop, weap, true);
	let templatesCyborgs3 = generateRandomTemplates(body, prop, weap, true);

	camSetFactories({
		"NPFactoryW": {
			assembly: "NPFactoryWAssembly",
			order: CAM_ORDER_PATROL,
			groupSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			data: {
				pos: [
					camMakePos("hoverDefense5"),
					camMakePos("hoverDefense6"),
					camMakePos("hoverDefense7"),
					camMakePos("hoverDefense8"),
					camMakePos("hoverDefense9")
				],
				interval: camSecondsToMilliseconds(45),
				regroup: false,
				repair: 66,
				count: -1,
			},
			templates: templatesHover //Hover factory
		},
		"NPFactoryE": {
			assembly: "NPFactoryEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(65)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: templatesVariety //variety
		},
		"NPFactoryNE": {
			assembly: "NPFactoryNEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(80)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: templatesTough //tough units
		},
		"NPCybFactoryW": {
			assembly: "NPCybFactoryWAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: templatesCyborgs1
		},
		"NPCybFactoryE": {
			assembly: "NPCybFactoryEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: templatesCyborgs2
		},
		"NPCybFactoryNE": {
			assembly: "NPCybFactoryNEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(60)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: templatesCyborgs3
		},
	});

	camSetExpState(true);
	camSetExpLevel(2);
	camSetOnMapEnemyUnitExp();

	hackAddMessage("C1D_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);

	queue("setupPatrols", camMinutesToMilliseconds(2.5));
	queue("setupEBStuff", camMinutesToMilliseconds(camChangeOnDiff(15)));
}
