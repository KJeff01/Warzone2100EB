
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

function exposeNorthBase()
{
	camDetectEnemyBase("NorthGroup"); // no problem if already detected
	camPlayVideos({video: "SB1_2_MSG2", type: MISS_MSG});
}

function camArtifactPickup_ScavLab()
{
	camCallOnce("exposeNorthBase");
	camSetFactoryData("WestFactory", {
		assembly: "WestAssembly",
		order: CAM_ORDER_COMPROMISE,
		data: {
			pos: [
				camMakePos("WestAssembly"),
				camMakePos("GatesPos"),
				camMakePos("RTLZ"), // changes
			],
			radius: 8
		},
		groupSize: 5,
		maxSize: 9,
		throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 13 : 10)),
		templates: [ cTempl.trikeheavy, cTempl.blokeheavy, cTempl.buggyheavy, cTempl.bjeepheavy ]
	});
	camEnableFactory("WestFactory");
}

function camEnemyBaseDetected_NorthGroup()
{
	camCallOnce("exposeNorthBase");
}

camAreaEvent("NorthBaseTrigger", function(droid)
{
	// frankly, this one happens silently
	camEnableFactory("NorthFactory");
});

function enableWestFactory()
{
	camEnableFactory("WestFactory");
	camManageGroup(camMakeGroup("RaidGroup"), CAM_ORDER_ATTACK, {
		pos: camMakePos("RTLZ"),
		morale: 80,
		fallback: camMakePos("ScavLab")
	});
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "SUB_1_3S", {
		area: "RTLZ",
		message: "C1-2_LZ",
		reinforcements: 60,
		retlz: true
	});

	var startpos = getObject("StartPosition");
	var lz = getObject("LandingZone");
	var tent = getObject("TransporterEntry");
	var text = getObject("TransporterExit");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	setAlliance(SCAV_7, ULTSCAV, true);
	camCompleteRequiredResearch(CAM1_2_RES_SCAV, ULTSCAV);
	camCompleteRequiredResearch(CAM1_2_RES_SCAV, SCAV_7);

	camUpgradeOnMapTemplates(cTempl.bloke, cTempl.blokeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.trike, cTempl.triketwin, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.buggy, cTempl.buggytwin, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.bjeep, cTempl.bjeeptwin, SCAV_7);

	camSetEnemyBases({
		"NorthGroup": {
			cleanup: "NorthBase",
			detectMsg: "C1-2_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"WestGroup": {
			cleanup: "WestBase",
			detectMsg: "C1-2_BASE2",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"ScavLabGroup": {
			cleanup: "ScavLabCleanup",
			detectMsg: "C1-2_OBJ1",
		},
	});

	camDetectEnemyBase("ScavLabGroup");

	camSetArtifacts({
		"ScavLab": { tech: ["R-Wpn-MG3Mk1-Twn", "R-Wpn-Mortar01Lt"] },
		"NorthFactory": { tech: ["R-Vehicle-Prop-Halftracks", "R-Wpn-Cannon1Mk1", "R-Vehicle-Metals01"] },
	});

	camSetFactories({
		"NorthFactory": {
			assembly: "NorthAssembly",
			order: CAM_ORDER_PATROL,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 20 : 15)),
			data: {
				pos: [
					camMakePos("NorthAssembly"),
					camMakePos("ScavLabPos"),
					camMakePos("RTLZ"),
				],
				interval: camSecondsToMilliseconds(20),
				regroup: false,
				count: -1,
			},
			group: camMakeGroup("NorthTankGroup"),
			templates: [ cTempl.trikeheavy, cTempl.blokeheavy, cTempl.buggyheavy, cTempl.bjeepheavy ]
		},
		"WestFactory": {
			assembly: "WestAssembly",
			order: CAM_ORDER_PATROL,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 13 : 10)),
			data: {
				pos: [
					camMakePos("WestAssembly"),
					camMakePos("GatesPos"),
					camMakePos("ScavLabPos"),
				],
				interval: camSecondsToMilliseconds(20),
				regroup: false,
				count: -1,
			},

			templates: [ cTempl.trikeheavy, cTempl.blokeheavy, cTempl.buggyheavy, cTempl.bjeepheavy ]
		},
	});

	addDroid(ULTSCAV, 35, 41, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 23, 56, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 13, 45, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 6, 28, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 15, 15, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 48, 33, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");

	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		240, // build defense every x seconds
		75, // build factories every x seconds
		-1, // build cyborg factories every x seconds
		210, // produce trucks every x seconds
		50, // produce droids every x seconds
		-1, // produce cyborgs every x seconds
		105, // produce VTOLs every x seconds
		3, // min factories
		2, // min vtol factories
		-1, // min cyborg factories
		3, // min number of trucks
		2, // min number of sensor droids
		6, // min number of attack droids
		3, // min number of defend droids
		75, // ground attack every x seconds
		210, // VTOL attack every x seconds
		1 // tech level
	);

	delete ultScav_vtoltemplates.HeavyChopper;

	queue("enableWestFactory", camChangeOnDiff(camSecondsToMilliseconds(30)));
}
