
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTech.js");
include("script/campaign/ultScav.js");

//Ambush player from scav base - triggered from middle path
camAreaEvent("scavBaseTrigger", function()
{
	var ambushGroup = camMakeGroup(enumArea("eastScavsNorth", SCAV_7, false));
	camManageGroup(ambushGroup, CAM_ORDER_ATTACK, {
		count: -1,
		regroup: false
	});
});

//Moves west scavs units closer to the base - triggered from right path
camAreaEvent("ambush1Trigger", function()
{
	camCallOnce("westScavAction");
});

//Sends some units towards player LZ - triggered from left path
camAreaEvent("ambush2Trigger", function()
{
	camCallOnce("northwestScavAction");
});

camAreaEvent("factoryTrigger", function()
{
	camEnableFactory("scavFactory1");
});

function westScavAction()
{
	var ambushGroup = camMakeGroup(enumArea("westScavs", SCAV_7, false));
	camManageGroup(ambushGroup, CAM_ORDER_DEFEND, {
		pos: camMakePos("ambush1")
	});
}

function northwestScavAction()
{
	var ambushGroup = camMakeGroup(enumArea("northWestScavs", SCAV_7, false));
	camManageGroup(ambushGroup, CAM_ORDER_DEFEND, {
		pos: camMakePos("ambush2")
	});
}

function eventPickup(feature, droid)
{
	if (droid.player === CAM_HUMAN_PLAYER && feature.stattype === ARTIFACT)
	{
		hackRemoveMessage("C1-1_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
	}
}

function eventAttacked(victim, attacker)
{
	if (victim.player === CAM_HUMAN_PLAYER)
	{
		return;
	}
	if (!victim)
	{
		return;
	}

	if (victim.type === STRUCTURE && victim.id === 146)
	{
		camCallOnce("westScavAction");
	}
}

//Send the south-eastern scavs in the main base on an attack run when the front bunkers get destroyed.
function checkFrontBunkers()
{
	if (getObject("frontBunkerLeft") === null && getObject("frontBunkerRight") === null)
	{
		var ambushGroup = camMakeGroup(enumArea("eastScavsSouth", SCAV_7, false));
		camManageGroup(ambushGroup, CAM_ORDER_ATTACK, {
			count: -1,
			regroup: false
		});
	}
	else
	{
		queue("checkFrontBunkers", camSecondsToMilliseconds(5));
	}
}

//Mission setup stuff
function eventStartLevel()
{
	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "SUB_1_2S", {
		area: "RTLZ",
		message: "C1-1_LZ",
		reinforcements: camMinutesToSeconds(0.5),
		retlz: true
	});

	var startpos = getObject("startPosition");
	var lz = getObject("landingZone"); //player lz
	var tent = getObject("transporterEntry");
	var text = getObject("transporterExit");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	camCompleteRequiredResearch(CAM1_1_RES_SCAV, SCAV_7);
	camCompleteRequiredResearch(CAM1_1_RES_SCAV, ULTSCAV);
	setAlliance(SCAV_7, ULTSCAV, true);

	camUpgradeOnMapTemplates(cTempl.bloke, cTempl.blokeheavy, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.trike, cTempl.triketwin, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.buggy, cTempl.buggytwin, SCAV_7);
	camUpgradeOnMapTemplates(cTempl.bjeep, cTempl.bjeeptwin, SCAV_7);

	//Get rid of the already existing crate and replace with another
	camSafeRemoveObject("artifact1", false);
	camSetArtifacts({
		"scavFactory1": { tech: ["R-Wpn-MG3Mk1", "R-Defense-HardcreteWall"] }, //Heavy machine gun
	});

	camSetFactories({
		"scavFactory1": {
			assembly: "Assembly",
			order: CAM_ORDER_ATTACK,
			data: {
				regroup: false,
				repair: 66,
				count: -1,
			},
			groupSize: 4,
			throttle: camChangeOnDiff(camSecondsToMilliseconds((difficulty <= MEDIUM) ? 40 : 30)),
			templates: [((difficulty <= MEDIUM) ? cTempl.triketwin : cTempl.trikeheavy), cTempl.blokeheavy, ((difficulty <= MEDIUM) ? cTempl.buggytwin : cTempl.buggyheavy), cTempl.bjeepheavy]
		},
	});

	camPlayVideos({video: "FLIGHT", type: CAMP_MSG});
	hackAddMessage("C1-1_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER, false);

	addDroid(ULTSCAV, 4, 70, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 6, 53, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 7, 28, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 19, 14, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 6, 8, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 36, 17, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 33, 38, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 27, 46, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 36, 58, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");
	addDroid(ULTSCAV, 36, 72, "Ultscav crane", "B2crane1", "BaBaProp", "", "", "scavCrane1");
	addDroid(ULTSCAV, 17, 68, "Ultscav crane", "B2crane2", "BaBaProp", "", "", "scavCrane2");

	ultScav_eventStartLevel(
		1, // vtols on/off. -1 = off
		120, // build defense every x seconds
		180, // build factories every x seconds
		-1, // build cyborg factories every x seconds
		75, // produce trucks every x seconds
		50, // produce droids every x seconds
		-1, // produce cyborgs every x seconds
		90, // produce VTOLs every x seconds
		11, // min factories
		3, // min vtol factories
		-1, // min cyborg factories
		3, // min number of trucks
		2, // min number of sensor droids
		5, // min number of attack droids
		4, // min number of defend droids
		210, // ground attack every x seconds
		230, // VTOL attack every x seconds
		1 // tech level
	);

	delete ultScav_vtoltemplates.HeavyChopper;

	queue("checkFrontBunkers", camSecondsToMilliseconds(5));
}
