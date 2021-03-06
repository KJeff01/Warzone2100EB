
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
	var templates = [ cTempl.nphct, cTempl.nphct, cTempl.npmorb, cTempl.npmorb, cTempl.npsbb ];

	var droids = [];
	for (var i = 0; i < LIM; ++i)
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
		regroup: true
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

	setAlliance(ULTSCAV, NEW_PARADIGM, true);

	//Get rid of the already existing crate and replace with another
	camSafeRemoveObject("artifact1", false);
	camSetArtifacts({
		"artifactLocation": { tech: "R-Vehicle-Prop-Hover" }, //SE base
		"NPFactoryW": { tech: "R-Vehicle-Metals03" }, //West factory
		"NPFactoryNE": { tech: "R-Vehicle-Body12" }, //Main base factory
	});

	camCompleteRequiredResearch(CAM1D_RES_NP, NEW_PARADIGM);
	camCompleteRequiredResearch(CAM1D_RES_NP, ULTSCAV);

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

	camSetFactories({
		"NPFactoryW": {
			assembly: "NPFactoryWAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(65)),
			data: {
				regroup: false,
				repair: 66,
				count: -1,
			},
			templates: [ cTempl.nphmgh, cTempl.npltath, cTempl.nphch ] //Hover factory
		},
		"NPFactoryE": {
			assembly: "NPFactoryEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(75)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: [ cTempl.npltat, cTempl.npmsens, cTempl.npmorb, cTempl.npsmct, cTempl.nphct ] //variety
		},
		"NPFactoryNE": {
			assembly: "NPFactoryNEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(90)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: [ cTempl.nphct, cTempl.npsbb, cTempl.npmorb ] //tough units
		},
		"NPCybFactoryW": {
			assembly: "NPCybFactoryWAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(55)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybr ]
		},
		"NPCybFactoryE": {
			assembly: "NPCybFactoryEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(40)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybr ]
		},
		"NPCybFactoryNE": {
			assembly: "NPCybFactoryNEAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(70)),
			data: {
				regroup: false,
				repair: 33,
				count: -1,
			},
			templates: [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybr ]
		},
	});

	hackAddMessage("C1D_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, true);

	queue("setupPatrols", camMinutesToMilliseconds(2.5));
	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		85, // build defense every x seconds
		75, // build factories every x seconds
		90, // build cyborg factories every x seconds
		35, // produce trucks every x seconds
		55, // produce droids every x seconds
		55, // produce cyborgs every x seconds
		45, // produce VTOLs every x seconds
		3, // min factories
		3, // min vtol factories
		3, // min cyborg factories
		4, // min number of trucks
		5, // min number of sensor droids
		5, // min number of attack droids
		3, // min number of defend droids
		220, // ground attack every x seconds
		210, // VTOL attack every x seconds
		1.5 // tech level
	);
}
