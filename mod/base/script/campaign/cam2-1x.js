/*
SUB_2_1 Script
Authors: Cristian Odorico (Alpha93) / KJeff01
 */
include ("script/campaign/libcampaign.js");
include ("script/campaign/templates.js");
include ("script/campaign/transitionTech.js");
var victoryFlag;

const TRANSPORT_TEAM = 1;

//trigger event when droid reaches the downed transport.
camAreaEvent("crashSite", function(droid)
{
	//Unlikely to happen.
	if (!enumDroid(TRANSPORT_TEAM).length)
	{
		gameOverMessage(false);
		return;
	}

	const GOODSND = "pcv615.ogg";
	playSound(GOODSND);

	hackRemoveMessage("C21_OBJECTIVE", PROX_MSG, CAM_HUMAN_PLAYER);

	var droids = enumDroid(TRANSPORT_TEAM);
	for (var i = 0; i < droids.length; ++i)
	{
		donateObject(droids[i], CAM_HUMAN_PLAYER);
	}

	//Give the donation enough time to transfer them to the player. Otherwise
	//the level will end too fast and will trigger asserts in the next level.
	queue("triggerWin", camSecondsToMilliseconds(2));
});

//function that applies damage to units in the downed transport transport team.
function preDamageUnits()
{
	setHealth(getObject("transporter"), 40);
	var droids = enumDroid(TRANSPORT_TEAM);
	for (var j = 0; j < droids.length; ++j)
	{
		setHealth(droids[j], 40 + camRand(20));
	}
}

//victory callback will thus complete the level.
function triggerWin()
{
	victoryFlag = true;
}

function setupCyborgGroups()
{
	//create group of cyborgs and send them on war path
	camManageGroup(camMakeGroup("cyborgPositionNorth"), CAM_ORDER_ATTACK, {
		regroup: false
	});

	//create group of cyborgs and send them on war path
	camManageGroup(camMakeGroup("cyborgPositionEast"), CAM_ORDER_ATTACK, {
		regroup: false
	});
}

function setCrashedTeamExp()
{
	const DROID_EXP = 32;
	var droids = enumDroid(TRANSPORT_TEAM).filter(function(dr) {
		return !camIsSystemDroid(dr) && !camIsTransporter(dr);
	});

	for (var i = 0; i < droids.length; ++i)
	{
		var droid = droids[i];
		setDroidExperience(droid, DROID_EXP);
	}

	preDamageUnits();
}

//Checks if the downed transport has been destroyed and issue a game lose.
function checkCrashedTeam()
{
	if (getObject("transporter") === null)
	{
		return false;
	}

	if (camDef(victoryFlag) && victoryFlag)
	{
		return true;
	}
}

function eventStartLevel()
{
	camSetExtraObjectiveMessage(_("Locate and rescue your units from the shot down transporter"));

	camSetStandardWinLossConditions(CAM_VICTORY_OFFWORLD, "CAM_2B", {
		area: "RTLZ",
		message: "C21_LZ",
		reinforcements: -1,
		callback: "checkCrashedTeam"
	});

	var subLandingZone = getObject("landingZone");
	var startpos = getObject("startingPosition");
	var tent = getObject("transporterEntry");
	var text = getObject("transporterExit");
	centreView(startpos.x, startpos.y);
	setNoGoArea(subLandingZone.x, subLandingZone.y, subLandingZone.x2, subLandingZone.y2);
	startTransporterEntry(tent.x, tent.y, CAM_HUMAN_PLAYER);
	setTransporterExit(text.x, text.y, CAM_HUMAN_PLAYER);

	var enemyLz = getObject("COLandingZone");
	setNoGoArea(enemyLz.x, enemyLz.y, enemyLz.x2, enemyLz.y2, THE_COLLECTIVE);

	//Add crash site blip and from an alliance with the crashed team.
	hackAddMessage("C21_OBJECTIVE", PROX_MSG, CAM_HUMAN_PLAYER, false);
	setAlliance(CAM_HUMAN_PLAYER, TRANSPORT_TEAM, true);

	//set downed transport team colour to be Project Green.
	changePlayerColour(TRANSPORT_TEAM, 0);

	camCompleteRequiredResearch(CAM2_1_RES_COL, THE_COLLECTIVE);
	camCompleteRequiredResearch(CAM2_1_RES_HUMAN, TRANSPORT_TEAM);

	camSetArtifacts({
		"base1ArtifactPos": { tech: "R-Vehicle-Body20" }, //hardened alloys, blue bodies
	});

	camSetEnemyBases({
		"COHardpointBase": {
			cleanup: "hardpointBaseCleanup",
			detectMsg: "C21_BASE1",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"COBombardBase": {
			cleanup: "bombardBaseCleanup",
			detectMsg: "C21_BASE2",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
		"COBunkerBase": {
			cleanup: "bunkerBaseCleanup",
			detectMsg: "C21_BASE3",
			detectSnd: "pcv379.ogg",
			eliminateSnd: "pcv394.ogg",
		},
	});

	setCrashedTeamExp();
	victoryFlag = false;
	queue("setupCyborgGroups", camSecondsToMilliseconds(5));
}
