
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

var useHeavyReinforcement;

//Get some droids for the New Paradigm transport
function getDroidsForNPLZ(args)
{
	var lightAttackerLimit = 8;
	var heavyAttackerLimit = 3;
	var unitTemplates;
	var list = [];

	if (difficulty === HARD)
	{
		lightAttackerLimit = 9;
		heavyAttackerLimit = 4;
	}
	else if (difficulty === INSANE)
	{
		lightAttackerLimit = 10;
		heavyAttackerLimit = 5;
	}

	if (useHeavyReinforcement)
	{
		var artillery = [cTempl.npmor];
		var other = [cTempl.npmmct];
		if (camRand(2) > 0)
		{
			//Add a sensor if artillery was chosen for the heavy units
			list.push(cTempl.npsens);
			unitTemplates = artillery;
		}
		else
		{
			unitTemplates = other;
		}
	}
	else
	{
		unitTemplates = [cTempl.nppod, cTempl.npmrl, cTempl.nphmgt];
	}

	var lim = useHeavyReinforcement ? heavyAttackerLimit : lightAttackerLimit;
	for (let i = 0; i < lim; ++i)
	{
		list.push(unitTemplates[camRand(unitTemplates.length)]);
	}

	useHeavyReinforcement = !useHeavyReinforcement; //switch it
	return list;
}

//These enable Scav and NP factories when close enough
camAreaEvent("NorthScavFactoryTrigger", function(droid)
{
	camEnableFactory("ScavNorthFactory");
	camEnableFactory("NPCyborgFactory");
	camEnableFactory("NPLeftFactory");
	camEnableFactory("NPRightFactory");
});

camAreaEvent("SouthWestScavFactoryTrigger", function(droid)
{
	camEnableFactory("ScavSouthWestFactory");
});

camAreaEvent("SouthEastScavFactoryTrigger", function(droid)
{
	camEnableFactory("ScavSouthEastFactory");
});

camAreaEvent("NPFactoryTrigger", function(droid)
{
	if (camIsTransporter(droid) === false)
	{
		camEnableFactory("NPCyborgFactory");
		camEnableFactory("NPLeftFactory");
		camEnableFactory("NPRightFactory");
	}
	else
	{
		resetLabel("NPFactoryTrigger", CAM_HUMAN_PLAYER);
	}
});

//Land New Paradigm transport in the LZ area (protected by four hardpoints in the New Paradigm base)
camAreaEvent("NPLZTriggerEast", function()
{
	camCallOnce("activateNPLZTransporter");
});

camAreaEvent("NPLZTrigger", function()
{
	camCallOnce("activateNPLZTransporter");
});

function activateNPLZTransporter()
{
	setTimer("sendNPTransport", camChangeOnDiff(camMinutesToMilliseconds(3)));
	sendNPTransport();
}

function sendNPTransport()
{
	var nearbyDefense = enumArea("LandingZone2", NEW_PARADIGM, false).filter((obj) => (
		obj.type === STRUCTURE && obj.stattype === DEFENSE
	));

	if (nearbyDefense.length > 0)
	{
		var list = getDroidsForNPLZ();
		camSendReinforcement(NEW_PARADIGM, camMakePos("NPTransportPos"), list, CAM_REINFORCE_TRANSPORT, {
			entry: { x: 2, y: 42 },
			exit: { x: 2, y: 42 },
			order: CAM_ORDER_ATTACK,
			data: {
				regroup: false,
				count: -1,
				pos: camMakePos("NPBase"),
				repair: 66,
			},
		});
	}
	else
	{
		removeTimer("sendNPTransport");
	}
}

function enableNPFactories()
{
	camEnableFactory("NPCyborgFactory");
	camEnableFactory("NPLeftFactory");
	camEnableFactory("NPRightFactory");
}

//Destroying the New Paradigm base will activate all scav factories
//And make any unfound scavs attack the player
function camEnemyBaseEliminated_NPBaseGroup()
{
	//Enable all scav factories
	camEnableFactory("ScavNorthFactory");
	camEnableFactory("ScavSouthWestFactory");
	camEnableFactory("ScavSouthEastFactory");

	//Make all scavengers on map attack
	camManageGroup(
		camMakeGroup(enumArea(0, 0, mapWidth, mapHeight, SCAV_7, false)),
		CAM_ORDER_ATTACK
	);
}

function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "CAM_1A-C", {
		area: "RTLZ",
		message: "C1-5_LZ",
		reinforcements: camMinutesToSeconds(3),
		annihilate: true
	});

	useHeavyReinforcement = false; //Start with a light unit reinforcement first
	var lz = getObject("LandingZone1"); //player lz
	var lz2 = getObject("LandingZone2"); //new paradigm lz
	var tent = getObject("TransporterEntry");
	var text = getObject("TransporterExit");
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	setNoGoArea(lz2.x, lz2.y, lz2.x2, lz2.y2, 5);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	//Transporter is the only droid of the player's on the map
	var transporter = enumDroid();
	cameraTrack(transporter[0]);

	//Make sure the New Paradigm and Scavs are allies
	setAlliance(NEW_PARADIGM, SCAV_7, true);
	setAlliance(NEW_PARADIGM, ULTSCAV, true);
	setAlliance(ULTSCAV, SCAV_7, true);

	camCompleteRequiredResearch(CAM1_5_RES_NP, NEW_PARADIGM);
	camCompleteRequiredResearch(CAM1_5_RES_SCAV, SCAV_7);
	camCompleteRequiredResearch(CAM1_5_RES_SCAV, ULTSCAV);

	camUpgradeOnMapTemplates(cTempl.bloke, cTempl.blokeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.trike, cTempl.trikeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.buggy, cTempl.buggyheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.bjeep, cTempl.bjeepheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.rbjeep, cTempl.rbjeep8, SCAV_7);

	camSetEnemyBases({
		"ScavNorthGroup": {
			cleanup: "ScavNorth",
			detectMsg: "C1-5_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"ScavSouthWestGroup": {
			cleanup: "ScavSouthWest",
			detectMsg: "C1-5_BASE2",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"ScavSouthEastGroup": {
			cleanup: "ScavSouthEast",
			detectMsg: "C1-5_BASE3",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"NPBaseGroup": {
			cleanup: "NPBase",
			detectMsg: "C1-5_OBJ1",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
			player: NEW_PARADIGM
		},
	});

	camSetArtifacts({
		"NPRightFactory": { tech: ["R-Vehicle-Engine03", "R-Wpn-Sunburst"] },
		"NPLeftFactory": { tech: ["R-Vehicle-Body08", "R-Wpn-Rocket01-LtAT-Quad"] }, //scorpion body
		"NPResearchFacility": { tech: ["R-Comp-SynapticLink", "R-Wpn-Rocket-Range03"] },
		"NPCyborgFactory": { tech: ["R-Struc-Factory-Cyborg", "R-Cyborg-Metals01"] },
	});

	camSetFactories({
		"NPLeftFactory": {
			assembly: "NPLeftAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(40)),
			templates: [ cTempl.npmrl, cTempl.npmmct, cTempl.nphmgt, cTempl.nppod ],
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
		},
		"NPRightFactory": {
			assembly: "NPRightAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			templates: [ cTempl.npmor, cTempl.npsens, cTempl.nphmgt ],
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
		},
		"NPCyborgFactory": {
			assembly: "NPCyborgAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(35)),
			templates: [ cTempl.npcybc, cTempl.npcybf, cTempl.npcybm ],
			data: {
				regroup: false,
				repair: 40,
				count: -1,
			},
		},
		"ScavSouthWestFactory": {
			assembly: "ScavSouthWestAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [ cTempl.firecan, cTempl.rbjeep8, cTempl.rbuggy, cTempl.blokeheavy ],
			data: {
				regroup: false,
				count: -1,
			},
		},
		"ScavSouthEastFactory": {
			assembly: "ScavSouthEastAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [ cTempl.firecan, cTempl.rbjeep8, cTempl.rbuggy, cTempl.blokeheavy ],
			data: {
				regroup: false,
				count: -1,
			},
		},
		"ScavNorthFactory": {
			assembly: "ScavNorthAssembly",
			order: CAM_ORDER_ATTACK,
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(15)),
			templates: [ cTempl.firecan, cTempl.rbjeep8, cTempl.rbuggy, cTempl.blokeheavy ],
			data: {
				regroup: false,
				count: -1,
			},
		},
	});

	addDroid(ULTSCAV, 15, 38, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 15, 30, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 7, 36, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 7, 6, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 24, 14, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 23, 26, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 56, 44, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");

	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		85, // build defense every x seconds
		75, // build factories every x seconds
		50, // build cyborg factories every x seconds
		45, // produce trucks every x seconds
		30, // produce droids every x seconds
		50, // produce cyborgs every x seconds
		70, // produce VTOLs every x seconds
		8, // min factories
		4, // min vtol factories
		5, // min cyborg factories
		4, // min number of trucks
		2, // min number of sensor droids
		5, // min number of attack droids
		3, // min number of defend droids
		55, // ground attack every x seconds
		140, // VTOL attack every x seconds
		1 // tech level
	);

	camSetExpState(true);
	camSetExpLevel((difficulty >= HARD) ? 3 : 2);

	queue("enableNPFactories", camChangeOnDiff(camMinutesToMilliseconds(10)));
}
