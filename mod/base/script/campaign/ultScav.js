

// Port of Ultimate Scavengers Mod into campaign.
var ultScav_MIN_ATTACKERS;
var ultScav_MIN_DEFENDERS;
var ultScav_VTOL_FLAG;
var ultScav_MIN_FACTORIES;
var ultScav_MIN_VTOL_FACTORIES;
var ultScav_MIN_CYB_FACTORIES;
var ultScav_MIN_TRUCKS;
var ultScav_MIN_SENSORS;

var ultScav_baseInfo = [];

var ultScav_sensors;
var ultScav_trucks;
var ultScav_vtoltemplates;
var ultScav_templates;
var ultScav_defenses;
var ultScav_vtolpad;
var ultScav_repair;
var ultScav_gen;
var ultScav_vtolfac;
var ultScav_factory;
var ultScav_cybfactory;
var ultScav_derrick;

namespace("ULT_");

function generateRandomTemplates(bodies, propulsions, weapons, array)
{
	let templates;
	if (array)
	{
		templates = [];
	}
	else
	{
		templates = {};
	}

	for (let i = 0; i < 50; ++i)
	{
		templates[i] = {body: bodies[camRand(bodies.length)], prop: propulsions[camRand(propulsions.length)], weap: weapons[camRand(weapons.length)]};
	}

	return templates;
}

function ultScav_setTech(tech_level)
{
	const COL_WHITE = 10;
	const COL_CYAN = 7;
	const COL_BLUE = 5;
	const COL_RED = 4;

	if (tech_level === 4) //Late campaign 3
	{
		changePlayerColour(ULTSCAV, COL_WHITE); // white
		ultScav_derrick = "A0ResourceExtractorMG";
		ultScav_factory = "A0LargeFactory1";
		ultScav_vtolfac = "A0LargeVTolFactory1";
		ultScav_gen = "A0VapPowerGenerator";
		ultScav_repair = "A0RepairCentre4";
		ultScav_vtolpad = "A0VtolPad";
		ultScav_cybfactory = "A0CyborgFactoryMech";

		// attribute names are irrelevant e.g. MGbunker
		ultScav_defenses = {
			MGbunker: "Emplacement-Howitzer03-Rot-Rail-Ram",
			CanTow: "Sys-CB-Tower02", // cb tower for arty wars
			FlameTow: "Emplacement-RailGun3Mk1-Aslt",
			MGTow: "Emplacement-RailGun3Mk1-Hvy",
			RocketPit: "Super-Howitzer105Mk1-Rail-Ram-Empl",// super rail howitzer stabilized
			LancerPit: "Super-Howitzer105Mk1-RailPlas-Empl", // super rail howitzer incnendiary
			MortarPit: "Emplacement-HvART-pit", // arch angel
			MortarPit2: "Sys-NEXUSLinkTOW", // arch angel

		};

		ultScav_templates = {
			bloke: { body: "Body15LGT", prop: "tracked01NAS", weap: "Laser2PULSEMk1-Aslt-Hvy" }, //superior leopard
			trike: { body: "Body16MED", prop: "tracked01NAS", weap: "Laser2PULSEMk1-Inc-Aslt" }, //superior panther
			buggy: { body: "Body13SUP", prop: "tracked01NAS", weap: "RailGun1Mk1" }, // wyvern
			bjeep: { body: "Body14SUP", prop: "tracked01NAS", weap: "HeavyLaser-Inc-Aslt" }, // dragon
		};

		ultScav_vtoltemplates = {
			ScavengerChopper: { body: "Body15LGT", prop: "Helicopter", weap: "Laser2PULSE-VTOL" },
			HeavyChopper: { body: "Body16MED", prop: "V-Tol", weap: "Bomb5-VTOL-Plasmite" },
		};

		ultScav_cyborgs = {
			mg: { body: "CyborgMecha", prop: "MechLegs", weap: "Cyb-Rail1-Mech" }, // Mech cyborgs
			cannon: { body: "CyborgMecha", prop: "MechLegs", weap: "Cyb-Atmiss-Mech" },
			rocket: { body: "CyborgMecha", prop: "MechLegs", weap: "Cyb-Laser-Mech" },
			mortar: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-PulseLsr" },
		};

		ultScav_trucks = {
			Truck1: { body: "Body15LGT", prop: "hover01NAS", weap: "Spade1Hvy" },
			Truck2: { body: "Body15LGT", prop: "hover01NAS", weap: "Spade1Hvy" },
			Truck3: { body: "Body15LGT", prop: "hover01NAS", weap: "Spade1Mk1NAS" },
			Truck4: { body: "Body15LGT", prop: "hover01NAS", weap: "Spade1Mk1NAS" },
		};

		ultScav_sensors = {
			scavsensor: { body: "Body15LGT", prop: "hover01NAS", weap: "Sensor-WideSpec" },
		};
	}
	else if (tech_level === 3)  // Campaign 3
	{
		changePlayerColour(ULTSCAV, COL_WHITE); // white
		ultScav_derrick = "A0ResourceExtractorMG";
		ultScav_factory = "A0RoboticFactory";
		ultScav_vtolfac = "A0VTolFactory1";
		ultScav_gen = "A0PowerGenerator";
		ultScav_repair = "A0RepairCentre4";
		ultScav_vtolpad = "A0VtolPad";
		ultScav_cybfactory = "A0CyborgFactory";

		ultScav_defenses = {
			MGbunker: "GuardTower-Rail1",
			CanTow: "GuardTower-Rail1",
			FlameTow: "NX-Tower-ATMiss",
			MGTow: "NX-Tower-ATMiss",
			RocketPit: "Empl4-Mortar1Mk1-Rail",
			LancerPit: "Emplacement-HvyATrocket",
			MortarPit: "Empl4-Mortar2Mk1-Rail",
		};

		ultScav_templates = {
			bloke: { body: "Body7ABT", prop: "tracked01NAS", weap: "RailGun1Mk1" }, //retaliation
			trike: { body: "Body7ABT", prop: "tracked01NAS", weap: "RailGun1Mk1" },
			buggy: { body: "Body3MBT", prop: "HalfTrackNAS", weap: "RailGun1Mk1" }, //retribution
			bjeep: { body: "Body3MBT", prop: "HalfTrackNAS", weap: "RailGun1Mk1" },
		};

		ultScav_vtoltemplates = {
			ScavengerChopper: { body: "Body3MBT", prop: "Helicopter", weap: "Rocket-VTOL-HvyA-T" },
			HeavyChopper: { body: "Body3MBT", prop: "Helicopter", weap: "Rocket-VTOL-HvyA-T" },
		};

		ultScav_cyborgs = {
			mg: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-PulseLsr" },
			cannon: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-RailGunner" },
			rocket: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-A-T" },
			mortar: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Wpn-Mortar1Mk1-Rail" },
		};

		ultScav_trucks = {
			Truck1: { body: "Body7ABT", prop: "hover01NAS", weap: "Spade1Hvy" },
			Truck2: { body: "Body7ABT", prop: "hover01NAS", weap: "Spade1Hvy" },
			Truck3: { body: "Body3MBT", prop: "hover01NAS", weap: "Spade1Mk1NAS" },
			Truck4: { body: "Body3MBT", prop: "hover01NAS", weap: "Spade1Mk1NAS" },
		};

		ultScav_sensors = {
			scavsensor: { body: "Body3MBT", prop: "wheeled01NAS", weap: "Sensor-WideSpec" },
		};
	}
	else if (tech_level === 2.5) // Late campaign 2
	{
		changePlayerColour(ULTSCAV, COL_BLUE); // blue
		ultScav_derrick = "A0ResourceExtractorMG";
		ultScav_factory = "A0RoboticFactory";
		ultScav_vtolfac = "A0VTolFactory1";
		ultScav_gen = "A0PowerGenerator";
		ultScav_repair = "A0RepairCentre4";
		ultScav_vtolpad = "A0VtolPad";
		ultScav_cybfactory = "A0CyborgFactory";

		ultScav_defenses = {
			building11: "Emplacement-Howitzer-Incendiary",
			building12: "Super-HowitzerPlas-Empl", //super incen howitzer
			building13: "Tower-RotMg", //assult gun emplacement
			building14: "Emplacement-HPVcannon", // bunker hpv
			building15: "AASite-QuadRotMg", //whirlwind site
			building16: "Emplacement-Howitzer105Mk1-Ram", //stable howitzer
			building17: "Super-Howitzer105Mk1-Ram-Empl", //super stable howitzer
			building18: "Emplacement-Howitzer03-Rot-Inc",
			building19: "Sys-SensoTower05", //plascrete sensor tower
			building20: "Tower2-Cannon5VulcanMk1-Inc",
			building21: "PillBox-Cannon6",
			building22: "Emplacement-Cannon5VulcanMk1-Hvy",
			building23: "WallTower-HvATrocket",
			building24: "Super-MG-Fort",
			building25: "Emplacement-PlasmaCannon",
			building26: "Super-LaserPlasma-Fort",
			building27: "WallTower2-Cannon4AUTOMk1-Hvy-Inc",
			building28: "Emplacement-Cannon4AUTOMk1-Hvy-Aslt",
			building29: "Emplacement-Howitzer150Mk1-Gat",
			building30: "Emplacement-Howitzer150Mk1-Inc",
			building31: "Emplacement-Howitzer150Mk1-Ram",
			building32: "Emplacement-Howitzer03-Rot-Ram",
			building33: "Emplacement-Howitzer150Mk1-Ram-Hvy",
			building34: "Emplacement-Cannon4AUTOMk1-Hvy-Aslt"
		};

		//"Body20LGT" // hard viper
		//"Body21MED" // hard Cobra
		//"Body22HVY", // hard python
		//"Body27SUP" // super sized hard python
		//"Body211SUP", //nasda leopard
		//"Body25SUP" //super leopard
		//"Body61SUPP" //nasda panther
		//"Body91REC" //nasda tiger

		/*"Rocket-Sunburst"
		"Rocket-Sunburst-Arch"
		"Howitzer-Incendiary"
		"Rocket-IDF-AR"
		"Cannon4AUTOMk1-AR"
		"Cannon4AUTOMk1-Lng"
		"MG4ROTARYMk1-AR"
		"Howitzer03-Rot-Inc"
		"Howitzer03-Rot-Ram"
		"Rocket-HvyA-T"
		"Rocket-VTOL-HvyA-T"
		"Rocket-HvyA-T-Quad"
		"Cyb-Hvywpn-IncMortar"
		"Cyb-Hvywpn-Mcannon"
		"Cyb-Hvywpn-Rocket-TopAttack"
		"Cyb-Hvywpn-TK"
		"Cyb-Hvywpn-Mortar1Mk1-Ram"
		"Cyb-Hvywpn-HPV"
		"Cyb-Hvywpn-MG4"
		"MG4ROTARYMk1-Hvy"
		"MG4ROTARYMk1-Hvy-Inc"
		"Cannon5VulcanMk1-AR"
		"Cyb-Hvywpn-Acannon"
		"Cannon5VulcanMk1-Inc"
		"Cannon4AUTOMk1-Inc"
		"Cannon6TwinAslt-AR"
		"Cannon5VulcanMk1-Hvy"
		"RailGun2Mk1TwinAslt-Inc" // inc twin assault cannon
		"Rocket-HvyA-T-Quad"
		"MG5TWINROTARY"
		"Cannon375mmMk1-Twn" //twin heavy cannon
		"Cannon4AUTOMk1-Hvy"
		"Laser4-PlasmaCannon"
		"Cannon4AUTOMk1-Hvy-Inc"
		"Howitzer150Mk1-Gat"
		"Cannon4AUTOMk1-Hvy-Aslt"
		"Howitzer150Mk1-Inc"
		"Howitzer150Mk1-Ram-Hvy"*/

		ultScav_templates = {
			bloke: { body: "Body27SUP", prop: "HalfTrackNAS", weap: "Cannon4AUTOMk1-Hvy-Aslt" },
			trike: { body: "Body25SUP", prop: "tracked01NAS", weap: "Cannon4AUTOMk1-Full-Aslt" },
			buggy: { body: "Body22HVY", prop: "HalfTrackNAS", weap: "Cannon375mmMk1-Twn" },
			bjeep: { body: "Body91REC", prop: "tracked01NAS", weap: "Cannon4AUTOMk1-Hvy-Inc" },
		};

		//"Rocket-VTOL-BB2"
		//"R-Wpn-Bomb07" //BB bomb
		//"Cannon4AUTO-VTOL"
		//"Bomb2-VTOL-HvHE"
		//"Bomb4-VTOL-HvyINC"
		//"Bomb4-VTOL-HvyINC-Mass"
		//"MG4ROTARYMk1-Hvy-Inc-VTOL"
		//"Cannon5Vulcan-VTOL"
		//"Rocket-VTOL-HvyA-T",

		ultScav_vtoltemplates = {
			ScavengerChopper: { body: "Body21MED", prop: "Helicopter", weap: "Cannon5Vulcan-VTOL" },
			HeavyChopper: { body: "Body61SUPP", prop: "Helicopter", weap: "Cannon5Vulcan-VTOL" },
		};

		ultScav_cyborgs = {
			cannon: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-Acannon" },
			rocket: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-HPV" },
			mortar: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-Mcannon" },
			mg: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-TK" },
			mg1: { body: "CyborgHeavyNAS", prop: "CyborgLegsNAS", weap: "Cyb-Hvywpn-IncMortar" },
		};

		ultScav_trucks = {
			Truck1: { body: "Body20LGT", prop: "hover01NAS", weap: "Spade1Mk1NAS" },
			Truck2: { body: "Body20LGT", prop: "wheeled01NAS", weap: "Spade1Mk1NAS" },
			Truck3: { body: "Body211SUP", prop: "wheeled01NAS", weap: "Spade1Mk1NAS" },
			Truck4: { body: "Body211SUP", prop: "hover01NAS", weap: "Spade1Mk1NAS" },
		};

		ultScav_sensors = {
			scavsensor: { body: "Body211SUP", prop: "HalfTrackNAS", weap: "ScavSensor" },
			scavsensor2: { body: "Body20LGT", prop: "HalfTrackNAS", weap: "ScavSensor" },
		};
	}
	else if (tech_level === 2)
	{
		changePlayerColour(ULTSCAV, COL_CYAN); // cyan
		ultScav_derrick = "A0ResourceExtractorMG";
		ultScav_factory = "A0RoboticFactory";
		ultScav_vtolfac = "A0VTolFactory1";
		ultScav_gen = "A0PowerGenerator";
		ultScav_repair = "A0RepairCentre4";
		ultScav_vtolpad = "A0VtolPad";
		ultScav_cybfactory = "A0CyborgFactory";

		ultScav_defenses = {
			building1: "Super-MortarRamjet-Empl",
			building2: "Emplacement-MortarPit-Incendiary",
			building3: "Sys-SensoTower04", //supercrete sensor
			building4: "Sys-CB-Tower01", // CB tower
			building5: "Empl3-Mortar2Mk1-Inc",
			building6: "X-Super-Cannon", //cannon fort
			building7: "X-Super-Rocket", //rocket fort
			building8: "Super-MortarPlas-Empl", //super incendiary mortar
			building9: "Empl3-Mortar3ROTARYMk1-Inc", //incen
			building10: "Empl3-Mortar3ROTARYMk1-Ram-Rot",
		};

		let body = ["Body20LGT", "Body21MED", "Body22HVY", "Body27SUP", "Body211SUP", "Body25SUP", "Body61SUPP", "Body91REC"];
		let prop = ["HalfTrackGM", "HalfTrackNAS", "hover01NAS", "tracked01NAS", "tracked01GM", "wheeled01GM", "wheeled01NAS" ];
		let weap = [
			"Rocket-LtA-T-Quad", "Rocket-Arch-Hvy-Aslt-Gat", "Cannon375mmMk1-AR", "Cannon375mmMk1-Lng",
			"Flame2", "Flame2-Hvy", "Mortar-Incendiary", "Rocket-BB-Arch", "Mortar2Mk1-Inc",
			"Mortar3ROTARYMk1-Inc", "Mortar3ROTARYMk1-Ram-Rot"
	 	];
		ultScav_templates = generateRandomTemplates(body, prop, weap);

		body = ["Body20LGT", "Body21MED", "Body211SUP", "Body61SUPP"];
		prop = ["V-TolNAS"];
		weap = ["Rocket-VTOL-TopAttackHvy", "Rocket-VTOL-LtA-T", "Rocket-VTOL-BB", "Bomb1-VTOL-LtHE",
			"Bomb3-VTOL-LtINC", "Bomb2-VTOL-HvHE", "Bomb2-VTOL-HvHE"
		];
		ultScav_vtoltemplates = generateRandomTemplates(body, prop, weap);

		body = ["CyborgLightNAS"];
		prop = ["CyborgLegsNAS"];
		weap = [
			"Cyb-Wpn-Cannon-Sniper", "Cyb-Wpn-Rocket-Sunburst-Arch",
			"Cyb-Wpn-Grenade", "Cyb-Wpn-Thermite", "Cyb-Wpn-MortarInc", "CyborgRotMG"
		];
		ultScav_cyborgs = generateRandomTemplates(body, prop, weap);

		body = ["Body211SUP", "Body61SUPP",];
		prop = ["hover01NAS"];
		weap = ["Spade1Mk1NAS"];
		ultScav_trucks = generateRandomTemplates(body, prop, weap);

		body = ["Body211SUP", "Body61SUPP",];
		prop = ["hover01NAS"];
		weap = ["SensorTurret1Mk1"];
		ultScav_sensors = generateRandomTemplates(body, prop, weap);
	}
	else if (tech_level === 1.5 || tech_level === -1.5)
	{
		changePlayerColour(ULTSCAV, COL_RED); // red
		ultScav_derrick = "A0ResourceExtractor";
		ultScav_factory = "A0LightFactory";
		ultScav_vtolfac = "A0VTolFactory1";
		ultScav_gen = "A0PowerGenerator";
		ultScav_repair = "A0RepairCentre2";
		ultScav_vtolpad = "A0VtolPad";
		ultScav_cybfactory = "A0CyborgFactory";

		ultScav_defenses = {
			FlameBunk: "PillBox5",
			HvyMGBunk: "Bunker-MG3Mk1-Twn",
			AugHvyMGT: "Tower2-MG3Mk1-Aslt",
			BallistcM: "Emplacement-MRL-pit",
			RotaryCan: "Emplacement-Cannon5VulcanMk1-Gat",
			StabMort: "Empl3-Mortar1Mk1-Ram",
			StabBomb: "Empl3-Mortar2Mk1-Ram",
			quadRock: "GuardTower9",
			quadRock2: "GuardTower6",
			quadRckT: "GuardTower10",
			rockAryB: "Emplacement-MRL-pit",
			RotThRock: "Emplacement-Rocket-Arch-Hvy-Aslt-Gat",
			sensoTow: "Sys-SensoTower02",
		};

		//"Body26SUP" super heavy mantis thermal

		let body = ["Body17LGT", "Body45ABT", "Body18MED", "Body88MBT", "Body19HVY", "Body121SUP"];
		let prop = ["HalfTrackGM", "HalfTrackNAS", "hover01NAS", "tracked01NAS", "tracked01GM", "wheeled01GM", "wheeled01NAS" ];
		let weap = ["MG3Mk1-Twn", "Rocket-Pod-Twn", "Rocket-Pod-Quad", "Rocket-LtA-T-Quad", "Rocket-LtA-T-AR", "Rocket-Pod-MRA-Twin", "Rocket-Pod-Arch",
				"MG3Mk1-Aslt", "Rocket-Pod-Arch-Twin", "Rocket-MRL-Homing", "Cannon5VulcanMk1-Gat", "Mortar1Mk1-Ram", "Mortar2Mk1-Ram", "Rocket-Pod-MRA-Quad",
				"Rocket-Pod-Arch-Quad", "Rocket-MRL-Homing-Hvy", "Rocket-Arch-Hvy-Aslt-Gat"
	 	];
		if (tech_level === -1.5)
		{
			prop = ["hover01NAS"];
		}
		ultScav_templates = generateRandomTemplates(body, prop, weap);

		body = ["Body17LGT", "Body45ABT", "Body18MED", "Body88MBT", "Body19HVY", "Body121SUP"];
		prop = ["Helicopter"];
		weap = ["Cannon1-VTOL", "Rocket-VTOL-TopAttackHvy", "Rocket-VTOL-Pod3", "Rocket-VTOL-LtA-T", "Rocket-MRL-VTOL", "Rocket-VTOL-BB" ];
		ultScav_vtoltemplates = generateRandomTemplates(body, prop, weap);

		body = ["CyborgLightNAS"];
		prop = ["CyborgLegsNAS"];
		weap = ["CyborgCannon", "Cyb-Wpn-Cannon-Sniper", "CyborgRocket", "Cyb-Wpn-Rocket-Sunburst-Arch",
			"Cyb-Wpn-Rocket-Sunburst", "Cyb-Wpn-Grenade", "CyborgChaingun", "CyborgFlamer01"
		];
		ultScav_cyborgs = generateRandomTemplates(body, prop, weap);

		body = ["Body17LGT", "Body45ABT", "Body18MED", "Body88MBT", "Body19HVY", "Body121SUP"];
		prop = ["hover01NAS"];
		weap = ["Spade1Mk1NAS"];
		ultScav_trucks = generateRandomTemplates(body, prop, weap);

		body = ["Body17LGT", "Body45ABT", "Body18MED", "Body88MBT", "Body19HVY", "Body121SUP"];
		prop = ["hover01NAS"];
		weap = ["SensorTurret1Mk1"];
		ultScav_sensors = generateRandomTemplates(body, prop, weap);
	}
	else
	{
		changePlayerColour(ULTSCAV, COL_RED); // red
		ultScav_derrick = "A0ResourceExtractor";
		ultScav_factory = "A0BaBaFactory";
		ultScav_vtolfac = "A0BaBaVtolFactory";
		ultScav_gen = "A0BaBaPowerGenerator";
		ultScav_repair = "ScavRepairCentre";
		ultScav_vtolpad = "A0BaBaVtolPad";
		ultScav_cybfactory = "A0CyborgFactory";

		ultScav_defenses = {
			MGbunker: "A0BaBaBunker",
			CanTow: "A0CannonTower",
			FlameTow: "A0BaBaFlameTower",
			MGTow: "bbaatow",
			RocketPit: "A0BaBaRocketPit",
			LancerPit: "A0BaBaRocketPitAT",
			MortarPit: "A0BaBaMortarPit",
		};

		ultScav_templates = {
			bloke: { body: "B1BaBaPerson01", prop: "BaBaLegs", weap: "BabaMG" },
			trike: { body: "B4body-sml-trike01-AR", prop: "BaBaProp", weap: "BabaTrikeMG" },
			buggy: { body: "B3body-sml-buggy01-AR", prop: "BaBaProp", weap: "BabaBuggyMG" },
			bjeep: { body: "B2JeepBody-AR", prop: "BaBaProp", weap: "BabaJeepMG" },
			rbjeep: { body: "B2RKJeepBody-AR", prop: "BaBaProp", weap: "BabaRocket" },
			rbuggy: { body: "B3bodyRKbuggy01-AR", prop: "BaBaProp", weap: "BabaRocket" },
		};

		ultScav_vtoltemplates = {
			ScavengerChopper: { body: "ScavengerChopper", prop: "Helicopter", weap: "MG1-VTOL" },
			HeavyChopper: { body: "HeavyChopper", prop: "Helicopter", weap: "Rocket-VTOL-Pod" },
		};

		ultScav_cyborgs = {
			mg: { body: "CyborgLightNAS", prop: "CyborgLegsNAS", weap: "CyborgChaingun" },
			cannon: { body: "CyborgLightNAS", prop: "CyborgLegsNAS", weap: "CyborgCannon" },
			grenade: { body: "CyborgLightNAS", prop: "CyborgLegsNAS", weap: "Cyb-Wpn-Grenade" },
			flamer: { body: "CyborgLightNAS", prop: "CyborgLegsNAS", weap: "CyborgFlamer01" },
		};

		ultScav_trucks = {
			Truck1: { body: "B2crane1", prop: "BaBaProp", weap: "scavCrane1" },
			Truck2: { body: "B2crane1", prop: "BaBaProp", weap: "scavCrane2" },
			Truck3: { body: "B2crane2", prop: "BaBaProp", weap: "scavCrane1" },
			Truck4: { body: "B2crane2", prop: "BaBaProp", weap: "scavCrane2" },
		};

		ultScav_sensors = {
			scavsensor: { body: "BusBody-AR", prop: "BaBaProp", weap: "ScavSensor" },
		};
	}
}
// unit limit constant
function ultScav_atLimits()
{
	return countDroid(DROID_ANY, ULTSCAV) > 199;
}

function ultScav_isHeli(propulsion)
{
	return propulsion === "Helicopter" || propulsion === "V-Tol";
}

// Make sure a unit does not try to go off map
function ultScav_mapLimits(x, y, num1, num2, xOffset, yOffset)
{
	let coordinates = [];
	let xPos = x + xOffset + camRand(num1) - num2;
	let yPos = y + yOffset + camRand(num1) - num2;

	if (xPos < 2)
	{
		xPos = 2;
	}
	if (yPos < 2)
	{
		yPos = 2;
	}
	if (xPos > mapWidth - 2)
	{
		xPos = mapWidth - 2;
	}
	if (yPos > mapHeight - 2)
	{
		yPos = mapHeight - 2;
	}

	return {x: xPos, y: yPos};
}

//Return a closeby enemy object. Will be undefined if none.
function ultScav_rangeStep(obj, visibility)
{
	const STEP = 1000;
	let target;

	for (let i = 0; i <= 30000; i += STEP)
	{
		let temp = enumRange(obj.x, obj.y, i, CAM_HUMAN_PLAYER, visibility);
		if (camDef(temp[0]))
		{
			target = temp[0];
			break;
		}
	}

	return target;
}

function ultScav_constructbaseInfo(x, y)
{
	this.x = x;
	this.y = y;
	this.defendGroup = camNewGroup(); // tanks to defend the base
	this.builderGroup = camNewGroup(); // trucks to build base structures and ultScav_defenses
	this.attackGroup = camNewGroup(); // tanks to attack nearby things
	this.ultScav_factoryNumber = ultScav_baseInfo.length;
}

function ultScav_findNearest(list, x, y, flag)
{
	let minDist = Infinity, minIdx;
	for (let i = 0, l = list.length; i < l; ++i)
	{
		let obj = list[i];
		let d = camDist(obj.x, obj.y, x, y);
		if (d < minDist)
		{
			minDist = d;
			minIdx = i;
		}
	}
	return (flag === true) ? list[minIdx] : minIdx;
}

function ultScav_regroup()
{
	let list = enumDroid(ULTSCAV);
	for (let i = 0; i < list.length; ++i)
	{
		let droid = list[i];
		if (droid.group === null)
		{
			ultScav_addDroidToSomeGroup(droid);
		}
	}
}

function ultScav_addDroidToSomeGroup(droid)
{
	let base = ultScav_findNearest(ultScav_baseInfo, droid.x, droid.y, true);

	if (!camDef(base))
	{
		let n = ultScav_baseInfo.length;
		if (n === 0 && ultScav_buildStructure(droid, ultScav_factory))
		{
			ultScav_baseInfo[n] = new ultScav_constructbaseInfo(droid.x, droid.y);
			groupAddDroid(ultScav_baseInfo[n].builderGroup, droid);
			return;
		}
		return;
	}

	switch (droid.droidType)
	{
		case DROID_CONSTRUCT:
		{
			groupAddDroid(base.builderGroup, droid);
		}
		break;

		case DROID_WEAPON:
		case DROID_CYBORG:
		{
			if (groupSize(base.defendGroup) < ultScav_MIN_DEFENDERS)
			{
				groupAddDroid(base.defendGroup, droid);
			}
			else if (groupSize(base.attackGroup) < ultScav_MIN_ATTACKERS)
			{
				groupAddDroid(base.attackGroup, droid);
				break;
			}
			else
			{
				let rBase = camRand(ultScav_baseInfo.length);
				groupAddDroid(ultScav_baseInfo[rBase].attackGroup, droid);
			}
		}
		break;

		case DROID_SENSOR:
		case DROID_PERSON:
		{
			groupAddDroid(base.attackGroup, droid);
		}
		break;
	}
}

function ultScav_groupOfTank(droid)
{
	for (let i = 0, b = ultScav_baseInfo.length; i < b; ++i)
	{
		if (droid.group === ultScav_baseInfo[i].attackGroup)
		{
			return ultScav_baseInfo[i].attackGroup;
		}
	}

	return undefined;
}

function ultScav_buildStructure(droid, stat)
{
	if ((droid.order !== DORDER_BUILD))
	{
		let randx = (camRand(100) < 50) ? -camRand(2) : camRand(2);
		let randy = (camRand(100) < 50) ? -camRand(2) : camRand(2);
		let loc = pickStructLocation(droid, stat, droid.x + randx, droid.y + randy, 0);
		if (camDef(loc))
		{
			if (orderDroidBuild(droid, DORDER_BUILD, stat, loc.x, loc.y));
			{
				return true;
			}
		}

		switch (stat)
		{
			case ultScav_derrick:
			{
				queue("ultScav_buildOils", camSecondsToMilliseconds(5));
				return false;
			}
			case ultScav_factory:
			{
				queue("ultScav_buildFactories", camSecondsToMilliseconds(5));
				return false;
			}
			case ultScav_gen:
			{
				queue("ultScav_buildOils", camSecondsToMilliseconds(5));
				return false;
			}
			case ultScav_repair:
			{
				queue("ultScav_buildThings", camSecondsToMilliseconds(5));
				return false;
			}
			case ultScav_vtolfac:
			{
				queue("ultScav_buildvtolFactories", camSecondsToMilliseconds(5));
				return false;
			}
			case ultScav_vtolpad:
			{
				queue("ultScav_buildvtolFactories", camSecondsToMilliseconds(5));
				return false;
			}
			case ultScav_cybfactory:
			{
				queue("ultScav_buildCybFactories", camSecondsToMilliseconds(5));
				return false;
			}
		}
	}
	return false;
}

function ultScav_randomAttrib(obj)
{
	let keys = Object.keys(obj);
	return obj[keys[camRand(keys.length)]];
}

function ultScav_buildTower(droid)
{
	let random_defense = ultScav_randomAttrib(ultScav_defenses);
	return ultScav_buildStructure(droid, random_defense);
}

function ultScav_findTruck()
{
	let list = enumDroid(ULTSCAV, DROID_CONSTRUCT).filter(function(dr) {
		return (dr.order !== DORDER_BUILD);
	});
	return list;
}

function ultScav_buildOils()
{
	let list = ultScav_findTruck();

	for (let i = 0, d = list.length; i < d; ++i)
	{
		let droid = list[i];
		if ((countStruct(ultScav_derrick, ULTSCAV) - ((countStruct(ultScav_gen, ULTSCAV) * 4))) > 0)
		{
			ultScav_buildStructure(droid, ultScav_gen);
		}

		if (!ultScav_checkAndrepair(droid))
		{
			let result = ultScav_findNearest(enumFeature(ALL_PLAYERS, OIL_RESOURCE), droid.x, droid.y, true);
			if (camDef(result))
			{
				orderDroidBuild(droid, DORDER_BUILD, ultScav_derrick, result.x, result.y);
			}
		}
	}
}

function isUpgradeableFactory(factory)
{
	return ((factory !== "A0BaBaFactory") && (factory !== "A0BaBaVtolFactory"));
}

function ultscav_buildFactoryModule(fac)
{
	const MAX_MODS = 2;
	let facs = enumStruct(ULTSCAV, fac);
	let trucks = enumDroid(ULTSCAV, DROID_CONSTRUCT);
	let success = false;
	let module = "A0FacMod1";

	for (let i = 0, len = facs.length; i < len; ++i)
	{
		let factory = facs[i];
		if (factory.status !== BUILT || factory.modules >= MAX_MODS)
		{
			continue;
		}

		for (let j = 0, len2 = trucks.length; j < len2; ++j)
		{
			let truck = trucks[j];
			let shouldBuild = ((gameTime - factory.born) >= 240000) && camDist(truck.x, truck.y, factory.x, factory.y) <= 20;

			if (shouldBuild && (truck.order !== DORDER_BUILD) && orderDroidBuild(truck, DORDER_BUILD, module, factory.x, factory.y))
			{
				success = true;
			}
		}
	}

	return success;
}

function ultScav_buildFactories()
{
	if (countStruct(ultScav_factory, ULTSCAV) < ultScav_MIN_FACTORIES)
	{
		let list = enumDroid(ULTSCAV, DROID_CONSTRUCT);

		for (let i = 0, d = list.length; i < d; ++i)
		{
			let droid = list[i];
			let base = ultScav_findNearest(ultScav_baseInfo, droid.x, droid.y, true);
			if (!camDef(base))
			{
				let n = ultScav_baseInfo.length;
				if (n === 0 && ultScav_buildStructure(droid, ultScav_factory))
				{
					ultScav_baseInfo[n] = new ultScav_constructbaseInfo(droid.x, droid.y);
					groupAddDroid(ultScav_baseInfo[n].builderGroup, droid);
					return;
				}
				return;
			}

			let dist = camDist(base.x, base.y, droid.x, droid.y);
			//dist makes sure that factories are not built too close to eachother
			if ((dist > 5) && ultScav_buildStructure(droid, ultScav_factory))
			{
				let n = ultScav_baseInfo.length;
				ultScav_baseInfo[n] = new ultScav_constructbaseInfo(droid.x, droid.y);
				groupAddDroid(ultScav_baseInfo[n].builderGroup, droid);
				return;
			}
		}
	}
	if (isUpgradeableFactory(ultScav_factory) && ultscav_buildFactoryModule(ultScav_factory))
	{
		return;
	}
}

function ultScav_buildvtolFactories()
{
	if (isUpgradeableFactory(ultScav_vtolfac) && ultscav_buildFactoryModule(ultScav_vtolfac))
	{
		return;
	}
	else
	{
		let list = ultScav_findTruck();

		if (countStruct(ultScav_vtolfac, ULTSCAV) < ultScav_MIN_VTOL_FACTORIES)
		{
			for (let i = 0, d = list.length; i < d; ++i)
			{
				let droid = list[i];
				ultScav_buildStructure(droid, ultScav_vtolfac);
			}
		}
		else if (countStruct(ultScav_vtolpad, ULTSCAV) < (ultScav_countHelicopters() * 3))
		{
			for (let i = 0, d = list.length; i < d; ++i)
			{
				let droid = list[i];
				ultScav_buildStructure(droid, ultScav_vtolpad);
			}
		}
	}
}

function ultScav_buildCybFactories()
{
	let list = ultScav_findTruck();

	if (countStruct(ultScav_cybfactory, ULTSCAV) < ultScav_MIN_CYB_FACTORIES)
	{
		for (let i = 0, d = list.length; i < d; ++i)
		{
			let droid = list[i];
			ultScav_buildStructure(droid, ultScav_cybfactory);
		}
	}

}

function ultScav_buildThings()
{
	let list = ultScav_findTruck();

	function isBuilt(structure)
	{
		return structure.status === BUILT;
	}

	for (let i = 0, d = list.length; i < d; ++i)
	{
		let droid = list[i];
		if (!ultScav_checkAndrepair(droid))
		{
			if ((countStruct(ultScav_derrick, ULTSCAV) - ((countStruct(ultScav_gen, ULTSCAV) * 4))) > 0)
			{
				ultScav_buildStructure(droid, ultScav_gen);
			}
			if ((enumStruct(ULTSCAV, ultScav_repair).filter(isBuilt) < 2))
			{
				ultScav_buildStructure(droid, ultScav_repair);
			}
			if (gameTime > camSecondsToMilliseconds(30))
			{
				ultScav_buildTower(droid);
			}
		}
	}
}

function ultScav_attackOils()
{
	let list = ultScav_findTruck();

	for (let i = 0, d = list.length; i < d; ++i)
	{
		let droid = list[i];
		if (!ultScav_checkAndrepair(droid))
		{
			let dlist = enumStruct(CAM_HUMAN_PLAYER, OIL_RESOURCE);
			if (dlist.length > 0)
			{
				for (let r = 0; r < dlist.length; ++r)
				{
					let enemy_ultScav_derrick = dlist[r];
					if (camDist(droid.x, droid.y, enemy_ultScav_derrick.x, enemy_ultScav_derrick.y) < 12)
					{
						ultScav_buildTower(droid);
					}
				}
			}
		}
	}
}

function ultScav_produce(what)
{
	let factoryType;
	let templates;

	switch (what)
	{
		case "truck": factoryType = ultScav_factory; templates = ultScav_trucks; break;
		case "tank": factoryType = ultScav_factory; templates = ultScav_templates; break;
		case "cyborg": factoryType = ultScav_cybfactory; templates = ultScav_cyborgs; break;
		case "sensor": factoryType = ultScav_factory; templates = ultScav_sensors; break;
		case "vtol": factoryType = ultScav_vtolfac; templates = ultScav_vtoltemplates; break;
		default:
			camDebug("Unknown ultimate scavenger production request");
			return undefined;
	}

	let faclist = enumStruct(ULTSCAV, factoryType);
	for (let i = 0, len = faclist.length; i < len; ++i)
	{
		let fac = faclist[i];

		if (ultScav_structureReady(fac))
		{
			let template_list = [];
			for (let key in templates)
			{
				template_list.push(key);
			}
			let random_template = template_list[camRand(template_list.length)];
			__camBuildDroid(templates[random_template], fac);
		}
	}

	return true;
}

function ultScav_produceTruck()
{
	if (countDroid(DROID_CONSTRUCT, ULTSCAV) < ultScav_MIN_TRUCKS)
	{
		ultScav_produce("truck");
	}
}

function ultScav_produceSensor()
{
	if (countDroid(DROID_SENSOR, ULTSCAV) < ultScav_MIN_SENSORS)
	{
		ultScav_produce("sensor");
	}
}

function ultScav_produceDroid()
{
	ultScav_produce("tank");
}

function ultScav_produceHelicopter()
{
	ultScav_produce("vtol");
}

function ultScav_structureReady(struct)
{
	return (structureIdle(struct) && struct.status === BUILT);
}

function ultScav_produceCyborg()
{
	ultScav_produce("cyborg");
}

function ultScav_checkAndrepair(droid)
{
	const MIN_HEALTH = 55;
	if (droid !== null)
	{
		if (!(ultScav_isHeli(droid.propulsion) || (droid.order === DORDER_BUILD)))
		{
			if (droid.health < MIN_HEALTH)
			{
				return orderDroid(droid, DORDER_RTR);
			}
		}
	}
	return false;
}

function ultScav_attackWithDroid(droid, target, force)
{
	if (droid !== null)
	{
		if (ultScav_checkAndrepair(droid))
		{
			return;
		}

		if (droid.droidType === DROID_WEAPON || droid.droidType === DROID_CYBORG)
		{
			if ((droid.order !== DORDER_SCOUT) || force)
			{
				orderDroidLoc(droid, DORDER_SCOUT, target.x, target.y);
			}
		}
		else if (droid.droidType === DROID_SENSOR)
		{
			if ((droid.order !== DORDER_OBSERVE) || force)
			{
				orderDroidObj(droid, DORDER_OBSERVE, target);
			}
		}
	}
}

function ultScav_helicopterArmed(obj, percent)
{
	for (let i = 0; i < obj.weapons.length; ++i)
	{
		if (obj.weapons[i].armed >= percent)
		{
			return true;
		}
	}

	return false;
}


function ultScav_helicopterReady(droid)
{
	const ARMED_PERCENT = 1;

	if ((droid.order === DORDER_ATTACK) || (droid.order === DORDER_REARM))
	{
		return false;
	}

	if (ultScav_helicopterArmed(droid, ARMED_PERCENT))
	{
		return true;
	}

	if (droid.order !== DORDER_REARM)
	{
		orderDroid(droid, DORDER_REARM);
	}

	return false;
}

//Helicopters can only attack things that the scavengers have seen
function ultScav_helicopterAttack()
{
	let list = ultScav_findFreeHelicopters();

	if (list.length === 0)
	{
		return;
	}

	let target = ultScav_rangeStep(ultScav_baseInfo[camRand(ultScav_baseInfo.length)], true);

	for (let i = 0, l = list.length; i < l; ++i)
	{
		let droid = list[i];
		let coords = [];

		if (camDef(target))
		{
			coords = ultScav_mapLimits(target.x, target.y, 5, 2, 0, 0);
		}
		else
		{
			let xOff = camRand(2);
			let yOff = camRand(2);
			xOff = (!xOff) ? -camRand(10) : camRand(10);
			yOff = (!yOff) ? -camRand(10) : camRand(10);
			coords = ultScav_mapLimits(droid.x, droid.y, 5, 2, xOff, yOff);
		}

		orderDroidLoc(droid, DORDER_SCOUT, coords.x, coords.y);
	}
}

function ultScav_countHelicopters()
{
	return enumDroid(ULTSCAV).filter(function(object) {
		return ultScav_isHeli(object.propulsion);
	}).length;
}

function ultScav_findFreeHelicopters(count)
{
	return enumDroid(ULTSCAV).filter(function(object) {
		return (ultScav_isHeli(object.propulsion) && ultScav_helicopterReady(object));
	});
}

function ultScav_groundAttackStuff()
{
	if (!ultScav_baseInfo.length)
	{
		return;
	}

	let randomBase = camRand(ultScav_baseInfo.length);

	let target = ultScav_rangeStep(ultScav_baseInfo[randomBase], true);
	if (!camDef(target))
	{
		target = ultScav_rangeStep(ultScav_baseInfo[randomBase], false);
	}

	if (camDef(target))
	{
		for (let i = 0, l = ultScav_baseInfo.length; i < l; ++i)
		{
			let base = ultScav_baseInfo[i];
			let attackDroids = enumGroup(base.attackGroup);
			if (camDef(target) && (attackDroids.length > ultScav_MIN_ATTACKERS))
			{
				for (let j = 0, k = attackDroids.length; j < k; ++j)
				{
					ultScav_attackWithDroid(attackDroids[j], target, false);
				}
			}
		}
	}
}

function ultScav_retreat()
{
	let list = enumDroid(ULTSCAV);
	for (let i = 0; i < list.length; ++i)
	{
		let droid = list[i];
		if (!isVTOL(droid))
		{
			if (droid.health < 80)
			{
				orderDroid(droid, DORDER_RTR);
			}
		}
	}
}

// does not work yet
function ultScav_transporterDroids()
{
	let droids = [];
	let count = 6 + camRand(5);

	let droid_list = [];
	for (let key in ultScav_templates)
	{
		droid_list.push(key);
	}

	for (let i = 0; i < count; ++i)
	{
		droids.push(droid_list[camRand(droid_list.length)]);
	}

	return droids;
}

// does not work yet
function ultScav_reinforcements()
{
	let random_x = camRand(mapWidth);
	let random_y = camRand(mapHeight);
	let playerUnits = enumDroid(CAM_HUMAN_PLAYER).filter(function(droid) {
		return !isVTOL(droid);
	});

	if (!playerUnits.length)
	{
		return;
	}
	let aPlayerUnit = playerUnits[0];

	while (!propulsionCanReach("hover01", aPlayerUnit.x, aPlayerUnit.y, random_x, random_y))
	{
		random_x = camRand(mapWidth);
		random_y = camRand(mapHeight);
	}
	let nearbyDefense = enumRange(random_x, random_y, 4, CAM_HUMAN_PLAYER, false);

	if (!nearbyDefense.length)
	{
		let list = ultScav_transporterDroids();
		camSendReinforcement(ULTSCAV, camMakePos(random_x, random_y), list,
			CAM_REINFORCE_TRANSPORT, {
				entry: { x: camRand(mapWidth), y: camRand(mapHeight) },
				exit: { x: camRand(mapWidth), y: camRand(mapHeight) }
			}
		);
	}

	queue("ultScav_reinforcements", camChangeOnDiff(camMinutesToMilliseconds(1)));
}

function ULT_eventAttacked(victim, attacker)
{
	if (victim === null || attacker === null)
	{
		return;
	}
	if (!allianceExistsBetween(ULTSCAV, victim.player))
	{
		return;
	}

	let base = ultScav_findNearest(ultScav_baseInfo, victim.x, victim.y, true);
	let attackerLongRanged = (attacker.isCB || attacker.hasIndirect);

	if (camDef(base) && (camDist(victim.x, victim.y, attacker.x, attacker.y) < (attackerLongRanged ? 40 : 20)))
	{
		let list = enumGroup(base.defendGroup);

		if (list.length < ultScav_MIN_DEFENDERS)
		{
			return;
		}

		for (let i = 0, l = list.length; i < l; ++i)
		{
			ultScav_attackWithDroid(list[i], attacker, true);
		}
	}

}

function ultScav_eventStartLevel(
	vtol_flag,
	build_defense,
	build_factories,
	build_cybfactories,
	produce_trucks,
	produce_droids,
	produce_cyborgs,
	produce_vtols,
	min_factories,
	min_vtol_factories,
	min_cyborg_factories,
	min_trucks,
	min_sensors,
	min_attackers,
	min_defenders,
	ground_attack,
	vtol_attack,
	tech_level)
{
	ultScav_setTech(tech_level);
	ultScav_VTOL_FLAG = vtol_flag;
	ultScav_MIN_FACTORIES = min_factories;
	ultScav_MIN_VTOL_FACTORIES = min_vtol_factories;
	ultScav_MIN_CYB_FACTORIES = min_cyborg_factories;
	ultScav_MIN_TRUCKS = min_trucks;
	ultScav_MIN_SENSORS = min_sensors;
	ultScav_MIN_ATTACKERS = min_attackers;
	ultScav_MIN_DEFENDERS = min_defenders;

	let list = enumStruct(ULTSCAV, ultScav_factory);
	for (let i = 0, l = list.length; i < l; ++i)
	{
		let fac = list[i];
		ultScav_baseInfo[i] = new ultScav_constructbaseInfo(fac.x, fac.y);
	}

	for (let k in ultScav_defenses)
	{
		if (ultScav_defenses.hasOwnProperty(k))
		{
			enableStructure(ultScav_defenses[k], ULTSCAV);
		}
	}

	enableStructure(ultScav_gen, ULTSCAV);
	enableStructure(ultScav_factory, ULTSCAV);
	enableStructure(ultScav_derrick, ULTSCAV);
	enableStructure(ultScav_vtolpad, ULTSCAV);
	enableStructure(ultScav_repair, ULTSCAV);
	enableStructure(ultScav_vtolfac, ULTSCAV);
	enableStructure(ultScav_cybfactory, ULTSCAV);

	// general behavior
	ultScav_produceTruck();
	queue("ultScav_buildOils", camChangeOnDiff(camSecondsToMilliseconds(35)));
	setTimer("ultScav_buildOils", camChangeOnDiff(camSecondsToMilliseconds(130)));
	setTimer("ultScav_regroup", camChangeOnDiff(camSecondsToMilliseconds(60)));
	setTimer("ultScav_retreat", camChangeOnDiff(camSecondsToMilliseconds(50)));
	setTimer("ultScav_attackOils", camChangeOnDiff(camSecondsToMilliseconds(85)));
	setTimer("ultScav_produceSensor", camChangeOnDiff(camSecondsToMilliseconds(130)));

	// parameterized behavior
	if (produce_trucks !== -1)
	{
		setTimer("ultScav_produceTruck", camChangeOnDiff(camSecondsToMilliseconds(produce_trucks)));
	}
	if (produce_droids !== -1)
	{
		setTimer("ultScav_produceDroid", camChangeOnDiff(camSecondsToMilliseconds(produce_droids)));
	}
	if (produce_cyborgs !== -1)
	{
		setTimer("ultScav_produceCyborg", camChangeOnDiff(camSecondsToMilliseconds(produce_cyborgs)));
	}
	if (build_factories !== -1)
	{
		setTimer("ultScav_buildFactories", camChangeOnDiff(camSecondsToMilliseconds(build_factories)));
	}
	if (build_cybfactories !== -1)
	{
		setTimer("ultScav_buildCybFactories", camChangeOnDiff(camSecondsToMilliseconds(build_cybfactories)));
	}
	if (build_defense !== -1)
	{
		setTimer("ultScav_buildThings", camChangeOnDiff(camSecondsToMilliseconds(build_defense)));
	}
	if (ground_attack !== -1)
	{
		setTimer("ultScav_groundAttackStuff", camChangeOnDiff(camSecondsToMilliseconds(ground_attack)));
	}

	// vtol behavior
	if (ultScav_VTOL_FLAG !== -1)
	{
		if (produce_vtols !== -1)
		{
			setTimer("ultScav_buildvtolFactories", camChangeOnDiff(camSecondsToMilliseconds(produce_vtols)));
			setTimer("ultScav_produceHelicopter", camChangeOnDiff(camSecondsToMilliseconds(produce_vtols)));
		}
		if (vtol_attack !== -1)
		{
			setTimer("ultScav_helicopterAttack", camChangeOnDiff(camSecondsToMilliseconds(vtol_attack)));
		}
	}
}
