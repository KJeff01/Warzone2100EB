function setupScavenger()	// inside hackNetOff()
{
	// NOTE: Keep this stuff in sync with scavfact.js or else desyncs could happen

	// Returns true if something is defined
	function isDefined(data)
	{
		return typeof(data) !== "undefined";
	}

	const derrick = "A0ResourceExtractor";
	const factory = "A0BaBaFactory";
	const vtolfac = "A0BaBaVtolFactory";
	const gen = "A0BaBaPowerGenerator";
	const oilres = "OilResource";
	const repair = "ScavRepairCentre";
	const vtolpad = "A0BaBaVtolPad";

	const defenses = [
		"A0BaBaBunker",
		"A0BaBaBunker",
		"A0BaBaBunker",
		"A0CannonTower",
		"A0CannonTower",
		"A0CannonTower",
		"A0BaBaFlameTower",
		"A0BaBaFlameTower",
		"A0BaBaRocketPit",
		"A0BaBaRocketPit",
		"A0BaBaRocketPitAT",
		"A0BaBaMortarPit",
		"bbaatow",
	];

	const templates = [
		["B4body-sml-trike01-AR","bTrikeMG"],
		["B4body-sml-trike01-AR","bTrikeMG"],
		["B4body-sml-trike01-AR","bTrikeMG"],
		["B4body-sml-trike01-AR","bTrikeMG"],
		["B3body-sml-buggy01-AR","BuggyMG"],
		["B3body-sml-buggy01-AR","BuggyMG"],
		["B3body-sml-buggy01-AR","BuggyMG"],
		["B3body-sml-buggy01-AR","BuggyMG"],
		["B2JeepBody-AR","BJeepMG"],
		["B2JeepBody-AR","BJeepMG"],
		["B2JeepBody-AR","BJeepMG"],
		["B2JeepBody-AR","BJeepMG"],
		["B3bodyRKbuggy01-AR","BabaRocket"],
		["B3bodyRKbuggy01-AR","BabaRocket"],
		["B3bodyRKbuggy01-AR","BabaRocket"],
		["B2RKJeepBody-AR","BabaRocket"],
		["B2RKJeepBody-AR","BabaRocket"],
		["B2RKJeepBody-AR","BabaRocket"],
		["BusBody-AR","BusCannon-AR"],
		["BusBody-AR","BusCannon"],
		["BusBody-AR","BabaPitRocketAT"],
		["B2tractor","BabaFlame"],
		["B2tractor","BabaFlame"],
		["B2tractor","BabaFlame"],
		["FireBody-AR","BabaFlame"],
		["FireBody-AR","BabaFlame"],
		["FireBody-AR","BusCannon"],
		["FireBody-AR","BabaPitRocket"],
		["FireBody-AR","BabaPitRocketAT"],
		["ScavCamperBody","BabaPitRocket"],
		["ScavCamperBody","BusCannon"],
		["ScavCamperBody","BabaPitRocket"],
		["ScavCamperBody","BusCannon"],
		["ScavCamperBody","BabaPitRocket"],
		["ScavCamperBody","BusCannon"],
		["ScavTruckBody","BabaFlame","BabaRocket","BabaPitRocketAT"],
		["ScavTruckBody","BusCannon","BabaPitRocket","BabaRocket"],
		["ScavTruckBody","BabaFlame","BabaRocket","BabaPitRocketAT"],
		["ScavTruckBody","BusCannon","BabaPitRocket","BabaRocket"],
		["ScavIcevanBody","BabaFlame"],
		["ScavIcevanBody","Mortar1Mk1"],
		["ScavIcevanBody","Mortar1Mk1"],
		["ScavIcevanBody","Mortar1Mk1"],
		["ScavNEXUStrack","ScavNEXUSlink"],
		["ScavNEXUStrack","ScavNEXUSlink"],
		["ScavNEXUStrack","ScavNEXUSlink"],
	];

	const vtolTemplates = [
		["ScavengerChopper","MG1-VTOL-SCAVS"],
		["HeavyChopper","Rocket-VTOL-Pod-SCAVS"],
	];

	for (var i = 0, len = templates.length; i < len; ++i)
	{
		makeComponentAvailable(templates[i][0], scavengerPlayer);
		makeComponentAvailable(templates[i][1], scavengerPlayer);

		if (isDefined(templates[i][2]))
		{
			makeComponentAvailable(templates[i][2], scavengerPlayer);
		}

		if (isDefined(templates[i][3]))
		{
			makeComponentAvailable(templates[i][3], scavengerPlayer);
		}
	}

	for (var i = 0, len = vtolTemplates.length; i < len; ++i)
	{

		makeComponentAvailable(vtolTemplates[i][0], scavengerPlayer);
		makeComponentAvailable(vtolTemplates[i][1], scavengerPlayer);

		if (isDefined(vtolTemplates[i][2]))
		{
			makeComponentAvailable(vtolTemplates[i][2], scavengerPlayer);
		}

		if (isDefined(vtolTemplates[i][3]))
		{
			makeComponentAvailable(vtolTemplates[i][3], scavengerPlayer);
		}

	}

	const SCAV_COMPONENTS = [
		"B4body-sml-trike01", "B3body-sml-buggy01", "B2JeepBody", "BusBody",
		"FireBody", "B1BaBaPerson01", "BaBaProp", "BaBaLegs", "bTrikeMG",
		"BuggyMG", "BJeepMG", "BusCannon", "BabaFlame", "BaBaMG",
		"B2crane1", "scavCrane1", "B2crane2", "scavCrane2", "ScavSensor",
		"Helicopter", "B2RKJeepBody", "B2tractor", "B3bodyRKbuggy01",
		"HeavyChopper", "ScavCamperBody", "ScavengerChopper", "ScavIcevanBody",
		"ScavNEXUSbody", "ScavNEXUStrack", "ScavTruckBody", "MG1-VTOL",
		"Rocket-VTOL-Pod", "ScavNEXUSlink", "BaBaCannon", "BabaPitRocket",
		"BabaPitRocketAT", "BabaRocket", "BabaRPG", "babawep",
		"BTowerMG", "Mortar1Mk1", "B1BaBaPerson02",
	];

	for (var i = 0, len = SCAV_COMPONENTS.length; i < len; ++i)
	{
		makeComponentAvailable(SCAV_COMPONENTS[i], scavengerPlayer);
	}

	enableStructure(factory, scavengerPlayer);
	enableStructure(vtolfac, scavengerPlayer);
	enableStructure(derrick, scavengerPlayer);
	enableStructure(gen, scavengerPlayer);
	enableStructure(repair, scavengerPlayer);
	enableStructure(vtolpad, scavengerPlayer);

	for (var i = 0, len = defenses.length; i < len; ++i)
	{
		enableStructure(defenses[i], scavengerPlayer);
	}
}

function scavengerInit()
{

}
