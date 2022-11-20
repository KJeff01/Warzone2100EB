//Contains the campaign transition technology definitions.

//Basic base structures.
const STRUCTS_ALPHA = [
	"A0CommandCentre",
	"A0PowerGenerator",
	"A0ResourceExtractor",
	"A0ResearchFacility",
	"A0LightFactory",
];

// 				*** CAMPAIGN 1 ***
// Alpha Campaign - New Paradigm and Scavenger AI's
// Starting research for all players in campaign 1, except scavengers
const CAM1A_RESEARCH = [
	"R-Vehicle-Body01",
	"R-Sys-Spade1Mk1",
	"R-Vehicle-Prop-Wheels",
	"R-Vehicle-Body26",
	"R-Sys-Sensor-Upgrade00",
];

// Starting scavenger research for campaign 1
const CAM1A_RES_SCAV = [
	"R-Wpn-MG1Mk1",
	"R-Sys-Sensor-Upgrade00",
	"R-Wpn-Flamer-Damage01",
];

const CAM1B_RES_SCAV = CAM1A_RES_SCAV.concat([
	"R-Wpn-MG-Damage02",
	"R-Sys-Sensor-Turret01",
	"R-Wpn-Flamer-Damage03",
	"R-Wpn-Flamer-ROF01",
	"R-Wpn-Mortar-Damage01",
	"R-Wpn-Cannon-Damage01",
]);

const CAM1_1_RES_SCAV = CAM1B_RES_SCAV.concat([
	"R-Wpn-Mortar-Damage02",
]);

const CAM1_2_RES_SCAV = CAM1_1_RES_SCAV.concat([
	"R-Wpn-MG-Damage03",
	"R-Wpn-Mortar-Acc01",
	"R-Wpn-Cannon-Damage03",
	"R-Wpn-Rocket-Damage01",
	"R-Wpn-Rocket-ROF01",
]);

// Additional starting research for New Paradigm AI. This AI first appears in SUB1-3
const CAM1_3_RES_NP = [
	"R-Wpn-MG-Damage04",
	"R-Wpn-MG-ROF01",
	"R-Defense-WallUpgrade01",
	"R-Struc-Materials01",
	"R-Vehicle-Engine02",
	"R-Vehicle-Metals01",
	"R-Cyborg-Metals01",
	"R-Wpn-Cannon-Damage03",
	"R-Wpn-Cannon-Accuracy01",
	"R-Wpn-Flamer-Damage03",
	"R-Wpn-Flamer-ROF01",
	"R-Wpn-Mortar-Damage02",
	"R-Wpn-Mortar-ROF02",
	"R-Wpn-Mortar-Acc01",
	"R-Wpn-Rocket-Accuracy01",
	"R-Wpn-Rocket-Damage02",
	"R-Wpn-Rocket-ROF01",
	"R-Struc-RprFac-Upgrade01",
];

const CAM1_3_RES_SCAV = CAM1_2_RES_SCAV.concat([
	"R-Wpn-MG-Damage04",
	"R-Wpn-Rocket-ROF02",
	"R-Wpn-Rocket-Damage02",
	"R-Wpn-Mortar-ROF02",
	"R-Wpn-Cannon-Damage04",
	"R-Wpn-Cannon-Accuracy01",
	"R-Vehicle-Metals01",
	"R-Defense-WallUpgrade01",
	"R-Struc-Materials01",
	"R-Wpn-Mortar-Damage03",
	"R-Wpn-Mortar-ROF01",
]);

const CAM1C_RES_NP = CAM1_3_RES_NP.concat([
	"R-Defense-WallUpgrade02",
	"R-Struc-Materials02",
	"R-Vehicle-Engine03",
	"R-Cyborg-Armor-Heat01",
	"R-Vehicle-Armor-Heat01",
	"R-Wpn-Cannon-Damage04",
	"R-Wpn-Cannon-ROF02",
	"R-Wpn-Mortar-Damage03",
	"R-Wpn-Rocket-Damage04",
	"R-Wpn-Rocket-Accuracy02",
	"R-Wpn-Rocket-ROF02",
	"R-Wpn-RocketSlow-Accuracy01",
]);

const CAM1C_RES_SCAV = CAM1_3_RES_SCAV.concat([
	"R-Wpn-Rocket-Damage03",
	"R-Wpn-Mortar-ROF03",
	"R-Wpn-Cannon-ROF02",
	"R-Wpn-MG-ROF01",
	"R-Struc-RprFac-Upgrade01",
	"R-Defense-WallUpgrade02",
	"R-Struc-Materials02",
]);

const CAM1_4_RES_NP = CAM1C_RES_NP.concat([
	"R-Wpn-Rocket-ROF03",
	"R-Vehicle-Engine04",
	"R-Vehicle-Metals02",
	"R-Cyborg-Metals02",
	"R-Cyborg-Armor-Heat02",
	"R-Vehicle-Armor-Heat02",
	"R-Wpn-Mortar-ROF03",
	"R-Wpn-Mortar-Range02",
	"R-Wpn-Cannon-Mount01",
	"R-Wpn-Rocket-Range02",
	"R-Defense-WallUpgrade03",
	"R-Struc-Materials03",
]);

const CAM1_4_RES_SCAV = CAM1C_RES_SCAV.concat([
	"R-Wpn-Rocket-ROF03",
	"R-Vehicle-Armor-Heat01",
	"R-Vehicle-Engine02",
]);

const CAM1_5_RES_NP = CAM1_4_RES_NP.concat([
	"R-Vehicle-Metals03",
	"R-Cyborg-Metals03",
	"R-Cyborg-Armor-Heat03",
	"R-Vehicle-Armor-Heat03",
	"R-Wpn-Cannon-Damage05",
	"R-Wpn-Cannon-ROF03",
	"R-Wpn-RocketSlow-Accuracy02",
]);

const CAM1_5_RES_SCAV = CAM1_4_RES_SCAV.concat([
	"R-Wpn-Rocket-Damage04",
	"R-Wpn-Cannon-ROF03",
	"R-Wpn-RocketSlow-Accuracy01",
	"R-Vehicle-Engine03",
	"R-Sys-Engineering01",
	"R-Defense-WallUpgrade03",
	"R-Struc-Materials03",
]);

const CAM1AC_RES_NP = CAM1_5_RES_NP.concat([
	"R-Cyborg-Engine01",
	"R-Wpn-Cannon-Damage06",
]);

const CAM1_7_RES_NP = CAM1AC_RES_NP;

const CAM1_7_RES_SCAV = CAM1_5_RES_SCAV.concat([
	"R-Wpn-Cannon-Damage06",
]);

const CAM1D_RES_NP = CAM1_7_RES_NP.concat([
	"R-Cyborg-Engine03",
	"R-Wpn-Mortar-Range03",
	"R-Wpn-Cannon-Damage07",
	"R-Wpn-Rocket-Damage05",
	"R-Vehicle-Metals04",
	"R-Cyborg-Metals04",
]);


// 				*** CAMPAIGN 2 ***
//			Beta Campaign - Collective AI
// Starting research for all players in campaign 2
const CAM2A_RESEARCH = CAM1A_RESEARCH.concat([
	"R-Defense-Tower01",
	"R-Sys-Engineering01",
	"R-Wpn-Flamer01Mk1",
	"R-Wpn-MG1Mk1",
	"R-Defense-TankTrap01",
	"R-Sys-MobileRepairTurret01",
	"R-Wpn-MG-Damage02",
	//alpha 2
	"R-Struc-PowerModuleMk1",
	"R-Sys-Sensor-Turret01",
	"R-Vehicle-Engine01",
	"R-Wpn-MG2Mk1",
	"R-Sys-Sensor-Tower01",
	"R-Wpn-Flamer-Damage03",
	"R-Wpn-Flamer-ROF01",
	"R-Wpn-MG-Damage04",
	"R-Wpn-AAGun05",
	"R-Defense-AASite-QuadMg1AAGun-Scav",
	//alpha 3
	"R-Defense-HardcreteWall",
	"R-Wpn-MG3Mk1",
	"R-Defense-HardcreteGate",
	"R-Defense-Pillbox01",
	"R-Defense-Tower02",
	"R-Defense-Tower03",
	"R-Defense-Tower04",
	"R-Sys-Sensor-Tower02",
	"R-Defense-Pillbox02",
	"R-Defense-Pillbox03",
	//alpha 4
	"R-Vehicle-Prop-Halftracks",
	"R-Wpn-Cannon1Mk1",
	"R-Wpn-Mortar01Lt",
	"R-Defense-MortarPit",
	"R-Defense-Pillbox04",
	"R-Defense-WallTower02",
	"R-Wpn-Cannon-Damage01",
	"R-Wpn-Mortar-Damage01",
	"R-Wpn-Cannon-Damage02",
	"R-Wpn-Mortar-Damage02",
	"R-Wpn-Cannon-Damage03",
	"R-Wpn-Mortar-Damage03",
	"R-Wpn-Cannon-Damage04",
	"R-Wpn-Mortar-ROF01",
	"R-Wpn-Cannon-ROF01",
	"R-Wpn-MG3Mk1-Twn",
	"R-Defense-WallTower01",
	"R-Defense-MG3Mk1-Twn",
	"R-Wpn-AAGun06",
	"R-Defense-AASite-QuadRotAAGun-Scav",
	"R-Vehicle-Metals01",
	//alpha 5
	"R-Defense-WallUpgrade01",
	"R-Struc-CommandRelay",
	"R-Struc-Factory-Module",
	"R-Struc-RepairFacility",
	"R-Sys-ECM-Upgrade01",
	"R-Comp-CommandTurret01",
	"R-Defense-ECM1PylonMk1",
	"R-Defense-Pillbox05",
	"R-Defense-WallTower05",
	"R-Defense-WallUpgrade02",
	"R-Struc-Materials01",
	"R-Vehicle-Body05",
	"R-Defense-WallUpgrade03",
	"R-Struc-Materials02",
	"R-Struc-Materials03",
	"R-Vehicle-Body04",
	//alpha 6
	"R-Struc-Factory-Upgrade01",
	"R-Struc-Research-Module",
	"R-Vehicle-Armor-Heat01",
	"R-Vehicle-Engine02",
	"R-Vehicle-Prop-Tracks",
	"R-Wpn-Cannon2Mk1",
	"R-Wpn-Rocket05-MiniPod",
	"R-Defense-Tower08",
	"R-Defense-WallTower03",
	"R-Struc-Research-Upgrade01",
	"R-Struc-RprFac-Upgrade01",
	"R-Vehicle-Armor-Heat02",
	"R-Wpn-MG-ROF01",
	"R-Wpn-Rocket-Damage01",
	"R-Struc-Research-Upgrade02",
	"R-Sys-MobileRepairTurretHvy",
	"R-Vehicle-Armor-Heat03",
	"R-Wpn-Cannon-Accuracy01",
	"R-Wpn-Rocket-Damage02",
	"R-Struc-Research-Upgrade03",
	"R-Wpn-Mortar-Acc01",
	"R-Wpn-Rocket-Accuracy01",
	"R-Wpn-Rocket-Damage03",
	"R-Wpn-Rocket-ROF01",
	"R-Struc-Factory-Upgrade04",
	"R-Wpn-Rocket-Pod-Twn",
	"R-Wpn-Rocket-ROF02",
	"R-Wpn-Rocket01-LtAT",
	"R-Defense-Pillbox06",
	"R-Defense-Pillbox06-Bun",
	"R-Defense-WallTower06",
	"R-Wpn-Cannon-ROF02",
	"R-Wpn-Rocket-Damage04",
	"R-Wpn-Rocket-ROF03",
	"R-Wpn-Rocket03-HvAT",
	"R-Wpn-Cannon-ROF03",
	"R-Wpn-Rocket-Accuracy02",
	"R-Wpn-RocketSlow-Accuracy01",
	"R-Wpn-Mortar-Range01",
	"R-Defense-MortarPit-Ram",
	//alpha 8
	"R-Wpn-Rocket-Pod-Quad",
	"R-Defense-Tower06",
	"R-Vehicle-Body17",
	"R-Wpn-Cannon-Damage05",
	"R-Wpn-Cannon-Mount01",
	"R-Wpn-Rocket-Pod-MRA",
	"R-Wpn-Rocket-Pod-MRA-Twin",
	"R-Wpn-Rocket05-MiniPod-Arch",
	"R-Vehicle-Metals02",
	"R-Wpn-Cannon-Damage06",
	"R-Wpn-MG3Mk1-Aslt",
	"R-Wpn-Mortar02Hvy",
	"R-Wpn-Rocket-Pod-Twn-Arch",
	"R-Wpn-Rocket-Range01",
	"R-Wpn-Rocket02-MRL",
	"R-Defense-HvyMor",
	"R-Defense-MG3Mk1-Aslt",
	"R-Vehicle-Body11",
	"R-Wpn-Mortar-ROF02",
	"R-Wpn-Rocket-Pod-MRA-Quad",
	"R-Wpn-Rocket-Pod-Quad-Arch",
	"R-Wpn-Rocket-Range02",
	"R-Defense-MRL",
	"R-Defense-Tower09",
	"R-Defense-Tower10",
	"R-Wpn-Mortar-ROF03",
	"R-Wpn-Rocket-Arch-Hvy-Aslt-Gat",
	"R-Wpn-Rocket-Range03",
	"R-Defense-Rocket-Arch-Hvy-Aslt-Gat",
	//alpha 9
	"R-Comp-SynapticLink",
	"R-Struc-Factory-Cyborg",
	"R-Vehicle-Body08",
	"R-Wpn-Sunburst",
	"R-Cyborg-Engine01",
	"R-Defense-Sunburst",
	"R-Vehicle-Body18",
	"R-Wpn-Sunburst-Arch",
	"R-Defense-Sunburst-Arch",
	"R-Vehicle-Engine04",
	"R-Cyborg-Metals01",
	"R-Cyborg-Metals02",
	"R-Cyborg-Metals03",
	"R-Cyborg-Armor-Heat01",
	"R-Cyborg-Armor-Heat02",
	"R-Cyborg-Armor-Heat03",
	"R-Wpn-Rocket01-LtAT-Quad",
	//alpha 11
	"R-Wpn-Cannon3Mk1",
	"R-Wpn-Mortar-Range02",
	"R-Defense-HvyMor-Ram",
	//alpha 12
	"R-Vehicle-Body12",
	"R-Vehicle-Metals03",
	"R-Vehicle-Prop-Hover",
	"R-Vehicle-Body19",
	//beta transition gifts
	"R-Vehicle-Prop-Helicopter",
	"R-Struc-VTOLFactory",
	"R-Defense-AASite-QuadMg1",
	"R-Wpn-AAGun03",
	"R-Struc-VTOLPad",
]);

// Additional AI research for campaign 2
const CAM2A_RES_COL = CAM2A_RESEARCH.concat([
	"R-Sys-Engineering02",
	"R-Sys-Sensor-Upgrade01",
	"R-Wpn-MG-ROF02",
	"R-Wpn-MG-Damage06",
	"R-Sys-ECM-Upgrade01",
	"R-Wpn-AAGun-Damage02",
	"R-Wpn-Mortar-Damage05",
	"R-Wpn-AAGun-ROF02",
	"R-Wpn-Rocket-Damage06",
	"R-Wpn-Cannon-Damage07",
]);

const CAM2_1_RES_HUMAN = CAM2A_RESEARCH;
const CAM2_1_RES_COL = CAM2A_RES_COL.concat([
	"R-Sys-Sensor-Upgrade02",
	"R-Wpn-MG-Damage08",
	"R-Sys-ECM-Upgrade02",
	"R-Wpn-AAGun-Damage03",
	"R-Wpn-Mortar-Damage06",
	"R-Wpn-AAGun-ROF03",
	"R-Wpn-Rocket-Damage07",
	"R-Cyborg-Engine02",
	"R-Wpn-Cannon-ROF04",
	"R-Wpn-Cannon-Mount02",
]);

const CAM2B_RES_COL = CAM2_1_RES_COL.concat([
	"R-Wpn-Rocket-Damage08",
	"R-Wpn-Flamer-Damage06",
	"R-Wpn-Flamer-Range03",
	"R-Wpn-MG-ROF03",
	"R-Wpn-Cannon-Accuracy02",
	"R-Wpn-Mortar-Acc02",
	"R-Wpn-RocketSlow-Accuracy02",
	"R-Vehicle-Engine05",
	"R-Wpn-AAGun-Accuracy01",
	"R-Cyborg-Metals05",
	"R-Sys-Sensor-Upgrade03",
	"R-Defense-WallUpgrade05",
	"R-Struc-Materials06",
	"R-Wpn-Mortar-ROF04",
	"R-Wpn-Cannon-Damage08",
	"R-Wpn-Cannon-ROF05",
	"R-Wpn-AAGun-Damage04",
]);

const CAM2_2_RES_COL = CAM2B_RES_COL.concat([
	"R-Wpn-Rocket-Damage09",
	"R-Wpn-Mortar-Acc03",
	"R-Cyborg-Metals06",
	"R-Cyborg-Armor-Heat06",
	"R-Vehicle-Metals05",
	"R-Struc-RprFac-Upgrade04",
	"R-Defense-WallUpgrade06",
	"R-Wpn-Mortar-Range03",
]);

const CAM2C_RES_COL = CAM2_2_RES_COL.concat([
	"R-Vehicle-Metals06",
	"R-Vehicle-Armor-Heat06",
	"R-Wpn-Flamer-ROF03",
	"R-Wpn-Howitzer-Damage03",
	"R-Wpn-Bomb-Accuracy03",
	"R-Struc-VTOLPad-Upgrade02",
	"R-Wpn-Howitzer-Accuracy02",
	"R-Wpn-Howitzer-ROF02",
	"R-Wpn-Howitzer-Range01",
	"R-Cyborg-Engine03",
	"R-Wpn-Cannon-ROF06",
]);

const CAM2_5_RES_COL = CAM2C_RES_COL.concat([
	"R-Vehicle-Engine06",
	"R-Struc-Power-Upgrade01c",
	"R-Wpn-AAGun-ROF06",
	"R-Struc-VTOLPad-Upgrade03",
	"R-Wpn-AAGun-Accuracy02",
	"R-Wpn-Howitzer-ROF03",
	"R-Defense-WallUpgrade07",
	"R-Struc-Materials08",
	"R-Wpn-Cannon-Damage09",
	"R-Wpn-AAGun-Damage05",
]);

const CAM2D_RES_COL = CAM2_5_RES_COL.concat([
	"R-Wpn-AAGun-Accuracy03",
	"R-Wpn-Howitzer-Accuracy03",
	"R-Wpn-Missile-ROF02",
	"R-Wpn-Missile-Accuracy01",
	"R-Wpn-Missile-Damage01",
	"R-Wpn-Howitzer-ROF04",
	"R-Wpn-Missile-Range01",
	"R-Defense-WallUpgrade09",
	"R-Struc-Materials09",
	"R-Wpn-AAGun-Damage06",
	"R-Wpn-Howitzer-Damage04",
]);

const CAM2_6_RES_COL = CAM2D_RES_COL.concat([
	"R-Wpn-Missile-ROF02",
	"R-Wpn-Missile-Accuracy02",
	"R-Wpn-Missile-Damage02",
	"R-Wpn-Missile-Range02",
	"R-Wpn-Howitzer-Range02",
]);

const CAM2_7_RES_COL = CAM2_6_RES_COL.concat([
	"R-Wpn-Missile-ROF03",
	"R-Wpn-Missile-Damage03",
	"R-Wpn-Howitzer-Damage05",
]);

const CAM2_8_RES_COL = CAM2_7_RES_COL.concat([
	"R-Wpn-Missile-Range03",
	"R-Wpn-Howitzer-Range03",
]);

const CAM2END_RES_COL = CAM2_8_RES_COL.concat([
	"R-Wpn-Cannon-Mount03",
	"R-Wpn-Howitzer-Damage06",
	//Extra tough
	"R-Vehicle-Metals07",
	"R-Vehicle-Armor-Heat07",
	"R-Cyborg-Metals07",
	"R-Cyborg-Armor-Heat07",
	"R-Vehicle-Engine07",
	"R-Cyborg-Engine06",
]);

// 					*** CAMPAIGN 3 ***
//				Gamma Campaign - Nexus AI
// Starting research for all players in campaign 3
// TODO: Make this minimal
const CAM3A_RESEARCH = CAM2A_RESEARCH.concat([
	"R-Defense-SuperRamjetMortar",
	"R-Sys-Engineering02",
	"R-Sys-Sensor-Upgrade01",
	"R-Wpn-AAGun-Damage01",
	"R-Wpn-MG-ROF02",
	"R-Wpn-MG-Damage08",
	"R-Sys-CBSensor-Turret01",
	"R-Sys-RadarDetector01",
	"R-Sys-RadarDetector02",
	"R-Sys-Sensor-Upgrade02",
	"R-Sys-ECM-Upgrade02",
	"R-Wpn-AAGun-Damage03",
	"R-Wpn-Mortar-Damage06",
	"R-Wpn-AAGun-ROF03",
	"R-Wpn-Rocket-Damage09",
	//beta 2
	"R-Vehicle-Body20",
	"R-Vehicle-Body21",
	"R-Vehicle-Body22",
	//beta 3
	"R-Vehicle-Body02",
	"R-Wpn-Flame2",
	"R-Defense-WallTower-Projector",
	"R-Wpn-Flamer-Damage06",
	"R-Wpn-Flamer-Range03",
	"R-Wpn-MG-ROF03",
	"R-Defense-HvyFlamer",
	"R-Wpn-Cannon-Accuracy02",
	"R-Wpn-Mortar-Acc03",
	"R-Wpn-Mortar-Incendiary",
	"R-Wpn-Rocket03-HvAT-Arch",
	"R-Wpn-RocketSlow-Accuracy02",
	"R-Defense-ECM1PylonMk2",
	"R-Defense-MortarPit-Incendiary",
	"R-Defense-SensoTower04",
	"R-Struc-Research-Upgrade06",
	"R-Sys-CBSensor-Tower01",
	"R-Vehicle-Engine06",
	"R-Wpn-AAGun-Accuracy01",
	"R-Wpn-Mortar02-Incendiary",
	"R-Cyborg-Metals06",
	"R-Cyborg-Armor-Heat06",
	"R-Defense-HvyMor-Inc",
	"R-Defense-Super-Cannon",
	"R-Defense-Super-Rocket",
	"R-Defense-SuperIncMortar",
	"R-Defense-WallUpgrade06",
	"R-Sys-Sensor-Upgrade03",
	"R-Vehicle-Metals06",
	"R-Vehicle-Armor-Heat06",
	//beta 4
	"R-Struc-RprFac-Upgrade04",
	"R-Wpn-Mortar3",
	"R-Defense-RotMor",
	"R-Wpn-Mortar03-Incendiary",
	"R-Struc-Materials06",
	"R-Defense-Mortar3ROTARYMk1-Inc",
	"R-Wpn-Mortar-Range03",
	"R-Defense-Mortar3ROTARYMk1-Ram-Rot",
	// beta 5
	"R-Vehicle-Body06",
	"R-Vehicle-Prop-VTOL",
	"R-Wpn-AAGun02",
	"R-Wpn-HowitzerMk1",
	"R-Wpn-Howitzer-Incendiary",
	"R-Wpn-Rocket06-IDF",
	"R-Defense-AASite-QuadBof",
	"R-Defense-Howitzer",
	"R-Defense-IDFRocket",
	"R-Defense-WallTower-DoubleAAgun",
	"R-Sys-VTOLCBS-Turret01",
	"R-Sys-VTOLStrike-Turret01",
	"R-Wpn-Bomb01",
	"R-Wpn-Bomb03",
	"R-Wpn-Flamer-ROF03",
	"R-Sys-VTOLStrike-Tower01",
	"R-Wpn-Bomb07",
	"R-Wpn-Howitzer-Damage03",
	"R-Wpn-Bomb-Accuracy03",
	"R-Defense-Howitzer-Incendiary",
	"R-Defense-SuperIncHowitzer",
	//beta 6
	"R-Wpn-Cannon4AMk1",
	"R-Wpn-MG4",
	"R-Wpn-MG5",
	"R-Defense-Tower-RotMg",
	"R-Defense-Emplacement-HPVcannon",
	"R-Defense-RotMG",
	"R-Defense-WallTower-HPVcannon",
	"R-Wpn-AAGun04",
	"R-Wpn-MG4-Hvy",
	"R-Wpn-MG5-Hvy",
	"R-Defense-AASite-QuadRotMg",
	"R-Defense-Wall-RotMg",
	"R-Struc-Power-Upgrade01c",
	"R-Wpn-MG4-Hvy-Inc",
	"R-Wpn-MG5-Hvy-Inc",
	"R-Defense-WallTower-QuadRotAA",
	"R-Wpn-AAGun-ROF06",
	"R-Defense-GuardTower-RotMg",
	"R-Defense-Super-MG-Fort",
	"R-Defense-MG5TWINROTARY-Hvy",
	"R-Defense-MG5TWINROTARY-Hvy-Inc",
	//beta 7
	"R-Wpn-Bomb02",
	"R-Wpn-Bomb04",
	"R-Wpn-Missile2A-T",
	"R-Wpn-MdArtMissile",
	"R-Wpn-MdArtMissile-Hvy",
	"R-Wpn-HvArtMissile",
	"R-Struc-VTOLPad-Upgrade03",
	"R-Wpn-AAGun-Accuracy03",
	"R-Wpn-Howitzer-Accuracy03",
	"R-Wpn-Howitzer03-Rot",
	"R-Wpn-Missile-ROF03",
	"R-Defense-RotHow",
	"R-Defense-Super-Missile",
	"R-Wpn-Missile-Accuracy02",
	"R-Wpn-Missile-Damage03",
	"R-Wpn-Howitzer-ROF04",
	"R-Wpn-Missile-Range03",
	"R-Wpn-Howitzer-Range01",
	"R-Defense-Howitzer-Ram",
	"R-Defense-SuperRamjetHowitzer",
	"R-Wpn-Howitzer03-Rot-Inc",
	"R-Wpn-Howitzer03-Rot-Ram",
	"R-Defense-RotHow-Inc",
	"R-Defense-WallUpgrade09",
	"R-Defense-PlascreteGate",
	"R-Struc-Materials09",
	"R-Defense-CB-Tower02",
	"R-Defense-ECM1PylonMk3",
	"R-Defense-GuardTower-ATMiss",
	"R-Defense-SensoTower05",
	"R-Defense-WallTower-A-Tmiss",
	"R-Defense-WallTower-TwinAGun",
	"R-Defense-MdArtMissile",
	"R-Defense-HvyArtMissile",
	//beta 8
	"R-Cyborg-HvyBody",
	"R-Cyborg-Engine03",
	"R-Sys-VTOLCBS-Tower01",
	"R-Wpn-Rocket07-Tank-Killer",
	"R-Cyborg-Hvywpn-A-T",
	"R-Cyborg-Hvywpn-IncMortar",
	"R-Cyborg-Hvywpn-MG3",
	"R-Cyborg-Hvywpn-Mcannon",
	"R-Cyborg-Hvywpn-Ripple",
	"R-Cyborg-Hvywpn-Arch",
	"R-Cyborg-Hvywpn-Rocket-LtA-T",
	"R-Cyborg-Hvywpn-Rocket-Pod",
	"R-Cyborg-Hvywpn-Rocket-Pod-Arch",
	"R-Cyborg-Hvywpn-Rocket-Pod-MRA",
	"R-Cyborg-Hvywpn-Rocket-Sunburst",
	"R-Cyborg-Hvywpn-Rocket-Sunburst-Arch",
	"R-Cyborg-Hvywpn-TK",
	"R-Cyborg-Hvywpn-Flamer",
	"R-Cyborg-Hvywpn-Mortar1Mk1-Ram",
	"R-Cyborg-Hvywpn-HPV",
	"R-Cyborg-Hvywpn-MG4",
	"R-Wpn-Mortar-ROF04",
	//beta 9
	"R-Wpn-Cannon5",
	"R-Defense-Tower-VulcanCan",
	"R-Cyborg-Hvywpn-Acannon",
	"R-Defense-Wall-VulcanCan",
	"R-Wpn-Cannon5-Inc",
	"R-Defense-Tower2-Cannon5VulcanMk1-Inc",
	"R-Wpn-Cannon6TwinAslt",
	"R-Defense-Cannon6",
	"R-Wpn-Cannon-Damage09",
	"R-Wpn-Cannon-ROF06",
	"R-Wpn-Cannon5-Hvy-Aslt",
	"R-Wpn-RailGun2Mk1TwinAslt-Inc",
	"R-Wpn-AAGun-Damage06",
	"R-Defense-Cannon5VulcanMk1-Hvy",
	"R-Wpn-Rocket07-Tank-Killer-Quad",
	"R-Defense-WallTower-HvyA-Trocket",
	"R-Defense-HvyA-Trocket",
	//beta 10
	"R-Vehicle-Body09",
	"R-Wpn-Cannon375mmMk1-Twn",
	"R-Wpn-Cannon4AMk1-Hvy",
	"R-Wpn-HvyHowitzer",
	"R-Wpn-PlasmaCannon",
	"R-Defense-HvyHowitzer",
	"R-Defense-PlasmaCannon",
	"R-Defense-Super-LaserPlasma-Fort",
	"R-Defense-WallTower04",
	"R-Wpn-Cannon4AMk1-Hvy-Inc",
	"R-Wpn-HvyHowitzer-Gat",
	"R-Defense-Cannon4AUTOMk1-Hvy-Inc",
	"R-Wpn-Cannon-Mount02",
	"R-Wpn-Cannon-Mount03",
	"R-Defense-Cannon4AUTOMk1-Full-Aslt",
	"R-Defense-Cannon5VulcanMk1-Gat",
	"R-Wpn-Howitzer-Damage06",
	"R-Wpn-HvyHowitzer-Inc",
	"R-Defense-HvyHowitzer-Gat",
	"R-Defense-HvyHowitzer-Inc",
	"R-Defense-HvyHowitzer-Ram",
	"R-Defense-RotHow-Ram",
	"R-Wpn-Howitzer-Range03",
	"R-Defense-HvyHowitzer-Ram-Hvy",
	"R-Wpn-HvyHowitzer-Ram-Hvy",
	"R-Defense-Cannon4AUTOMk1-Hvy-Aslt",
]);

// Additional AI research for starting campaign 3
const CAM3A_RES_NEXUS = [
	"R-Sys-Engineering04",
	"R-Struc-Power-Upgrade03a",
	"R-Struc-VTOLPad-Upgrade06",
	"R-Defense-WallUpgrade09",
	"R-Struc-Materials07",
	"R-Vehicle-Metals07",
	"R-Cyborg-Metals07",
	"R-Vehicle-Armor-Heat07",
	"R-Cyborg-Armor-Heat07",
	"R-Vehicle-Engine07",
	"R-Wpn-Rail-Damage01",
	"R-Wpn-Rail-Accuracy01",
	"R-Wpn-Rail-ROF01",
	"R-Sys-Autorepair-General",
	"R-Cyborg-Engine06",
	"R-Wpn-Flamer-Damage09",
	"R-Wpn-Flamer-ROF06",
	"R-Wpn-Bomb-Damage05",
	"R-Struc-RprFac-Upgrade06",
	"R-Wpn-Energy-Damage01",
	"R-Wpn-Energy-ROF01",
	"R-Wpn-Energy-Range01",
];

const CAM3_1_RES_NEXUS = CAM3A_RESEARCH.concat([
	"R-Defense-WallUpgrade10",
	"R-Struc-Materials09",
	"R-Wpn-Energy-Damage02",
	"R-Wpn-Energy-ROF02",
	"R-Wpn-Energy-Range02",
	"R-Wpn-EMP-Damage01",
	"R-Wpn-Rail-Range01",
]);

//This is used for giving allies in Gamma technology (3-b/3-2/3-c)
const CAM3_RES_ALLY = CAM3A_RESEARCH;

const CAM3B_RES_NEXUS = CAM3_1_RES_NEXUS.concat([
	"R-Defense-WallUpgrade11",
	"R-Vehicle-Engine08",
	"R-Wpn-Rail-ROF02",
	"R-Wpn-Rail-Damage02",
	"R-Wpn-Energy-Accuracy01",
	"R-Wpn-Energy-Range03",
	"R-Sys-SpyTurret-Range01",
	"R-Wpn-EMP-Damage02",
]);


const CAM3_2_RES_NEXUS = CAM3B_RES_NEXUS.concat([
	"R-Wpn-Energy-Damage03",
	"R-Sys-Resistance-Upgrade01",
	"R-Defense-WallUpgrade12",
	"R-Vehicle-Metals08",
	"R-Cyborg-Metals08",
	"R-Vehicle-Armor-Heat08",
	"R-Cyborg-Armor-Heat08",
]);

const CAM3AB_RES_NEXUS = CAM3_2_RES_NEXUS.concat([
	"R-Wpn-Energy-ROF03",
	"R-Wpn-EMP-Damage03",
	"R-Wpn-Bomb-Damage06",
	"R-Sys-Resistance-Upgrade02",
	"R-Wpn-Rail-Range02",
]);

const CAM3C_RES_NEXUS = CAM3AB_RES_NEXUS.concat([
	"R-Wpn-Rail-ROF03",
	"R-Wpn-Rail-Damage03",
	"R-Wpn-Energy-Range04",
	"R-Sys-Resistance-Upgrade03",
]);

const CAM3AD_RES_NEXUS = CAM3C_RES_NEXUS.concat([
	"R-Vehicle-Engine09",
	"R-Vehicle-Metals09",
]);

const CAM3AD2_RES_NEXUS = CAM3AD_RES_NEXUS.concat([
	"R-Wpn-Rail-Range03",
	"R-Cyborg-Metals09",
]);

const CAM3_4_RES_NEXUS = CAM3AD2_RES_NEXUS.concat([
	"R-Vehicle-Armor-Heat09",
	"R-Cyborg-Armor-Heat09",
]);


const CAMEND_RES = CAM3A_RESEARCH.concat([
	"R-Sys-Engineering03",
	"R-Struc-Power-Upgrade03a",
	"R-Struc-VTOLPad-Upgrade06",
	//gamma 3
	"R-Cyborg-MechaBody",
	"R-Vehicle-Body03",
	"R-Vehicle-Body15",
	"R-Wpn-Bomb05",
	"R-Wpn-Laser01",
	"R-Comp-CommandTurret02",
	"R-Cyborg-MechaCannon",
	"R-Cyborg-MechaFlamer",
	"R-Cyborg-MechaMachinegun",
	"R-Cyborg-MechaMissile",
	"R-Cyborg-MechaRocket",
	"R-Defense-PrisLas",
	"R-Struc-Factory-Cyborg-Mech",
	"R-Sys-Sensor-WS",
	"R-Wpn-EMPCannon",
	"R-Wpn-Energy-Range01",
	"R-Wpn-MortarEMP",
	"R-Wpn-Plasmite-Flamer",
	"R-Wpn-Rocket05-MiniPod-EMP",
	"R-Cyborg-Hvywpn-EMP",
	"R-Defense-EMPCannon",
	"R-Defense-PlasmiteFlamer",
	"R-Defense-Super-EMP-Fort",
	"R-Struc-Research-Upgrade09",
	"R-Sys-Autorepair-General",
	"R-Sys-Engineering04",
	"R-Sys-Sensor-WSTower",
	"R-Sys-SpyTurret",
	"R-Vehicle-Engine07",
	"R-Wpn-Bomb06",
	"R-Wpn-Energy-Accuracy01",
	"R-Wpn-PlasmaCannon-Hvy-Aslt",
	"R-Cyborg-Engine06",
	"R-Cyborg-Hvywpn-SpyTurret01",
	"R-Cyborg-Hvywpn-TwnFlamer",
	"R-Defense-EMPMortar",
	"R-Defense-Super-NEXUS-Fort",
	"R-Sys-Sensor-UpLink",
	"R-Sys-SpyTower",
	"R-Vehicle-Armor-Heat09",
	"R-Vehicle-Metals09",
	"R-Sys-SpyTurret-Range01",
	"R-Wpn-EMP-Damage03",
	"R-Wpn-Flamer-Damage09",
	"R-Wpn-Flamer-ROF06",
	"R-Wpn-Bomb-Damage06",
	"R-Cyborg-Armor-Heat09",
	"R-Cyborg-Metals09",
	"R-Defense-Laser3BEAMMk1-Gat",
	"R-Defense-Laser4-PlasmaCannon-Hvy-Aslt",
	"R-Struc-RprFac-Upgrade06",
	"R-Defense-PlasmiteFlamer-Hvy",
	//gamma 5
	"R-Sys-Resistance-Upgrade03",
	//gamma 6
	"R-Wpn-Laser02",
	"R-Defense-PulseLas-Emp",
	"R-Wpn-Missile-LtSAM",
	"R-Wpn-RailGun01",
	"R-Cyborg-Hvywpn-PulseLsr",
	"R-Wpn-Flame2-Rail",
	"R-Wpn-HvyLaser",
	"R-Wpn-HvyLaser-Aslt",
	"R-Wpn-HvyLaser-Gat",
	"R-Wpn-Laser02-Aslt",
	"R-Wpn-Laser02-Gat",
	"R-Wpn-Laser02-Inc",
	"R-Wpn-Laser02-Med-Aslt",
	"R-Defense-Laser02-Inc-Aslt",
	"R-Wpn-Missile-HvSAM",
	"R-Wpn-Missile-LtSAM2-Arch",
	"R-Wpn-Mortar01Lt-Rail",
	"R-Wpn-PlasmaCannon-Hvy-Lsr-Aslt",
	"R-Cyborg-MechaLaser",
	"R-Defense-HeavyLas",
	"R-Defense-MortarPit-Rail",
	"R-Wpn-Flame3-Rail",
	"R-Wpn-HvyLaser-Inc-Aslt",
	"R-Wpn-Laser02-Aslt-Hvy",
	"R-Wpn-Laser02-Inc-Aslt",
	"R-Wpn-Missile-HvSAM-Arch",
	"R-Wpn-Mortar01Lt-Rail-Inc",
	"R-Wpn-Mortar01Lt-Rail-Ram",
	"R-Wpn-Mortar02Hvy-Rail",
	"R-Wpn-Mortar3-Rail",
	"R-Wpn-Rail-Accuracy01",
	"R-Wpn-Rail-Damage02",
	"R-Wpn-RailGun04",
	"R-Defense-HvyMor-Rail",
	"R-Defense-MortarPit-Rail-Inc",
	"R-Defense-MortarPit-Rail-Ram",
	"R-Defense-RotMor-Rail",
	"R-Defense-Super-FlamerPlasma-Fort",
	"R-Defense-SuperRailMortar",
	"R-Wpn-AAGun08",
	"R-Wpn-AALaser",
	"R-Wpn-Energy-Damage03",
	"R-Wpn-Mortar02Hvy-Rail-Inc",
	"R-Wpn-Mortar02Hvy-Rail-Ram",
	"R-Wpn-Mortar3-Rail-Inc",
	"R-Wpn-Mortar3-Rail-Ram",
	"R-Defense-AA-Laser",
	"R-Defense-HvyMor-Rail-Inc",
	"R-Defense-HvyMor-Rail-Ram",
	"R-Defense-RotMor-Rail-Inc",
	"R-Defense-RotMor-Rail-Ram",
	"R-Defense-SuperIncRailMortar",
	"R-Wpn-Energy-ROF03",
	"R-Wpn-Energy-Range04",
	"R-Wpn-Rail-ROF03",
	"R-Defense-GuardTower-Rail1",
	"R-Defense-PulseLas",
	"R-Defense-SamSite1",
	"R-Defense-WallTower-PulseLas",
	"R-Defense-HeavyLaser-Gat",
	"R-Defense-Laser2PULSEMk1-Inc",
	"R-Defense-Laser4-PlasmaCannon-Hvy-Lsr-Aslt",
	"R-Defense-SamSite-Arch",
	"R-Defense-SamSite2",
	"R-Defense-WallTower-HeavyLaser-Gat",
	"R-Defense-WallTower-Laser2PULSEMk1-Inc",
	"R-Defense-WallTower-SamHvy",
	"R-Defense-WallTower-SamSite",
	"R-Defense-HeavyLaser-Inc-Aslt",
	"R-Defense-PlasmiteFlamer-Rail",
	"R-Defense-RailGun1Mk1-Gat-Twn",
	"R-Defense-SamHvy-Arch",
	"R-Defense-AAGunLaser-Lng",
	"R-Defense-Railgun-Flak",
	"R-Defense-WallTower-RailGun1Mk1-GatAA",
	"R-Defense-WallTower-Railgun-Flak",
	"R-Struc-Factory-Upgrade07",
	//gamma 7
	"R-Struc-Factory-Upgrade09",
	"R-Sys-Resistance",
	"R-Vehicle-Body16",
	"R-Wpn-LasSat",
	"R-Wpn-RailGun02",
	"R-Cyborg-Hvywpn-RailGunner",
	"R-Defense-Rail2",
	"R-Wpn-AAGun07",
	"R-Wpn-Cannon6TwinAslt-Rail",
	"R-Wpn-Howitzer03-Rot-Rail",
	"R-Wpn-HowitzerMk1-Rail",
	"R-Wpn-HvyHowitzer-Rail",
	"R-Wpn-HvyHowitzer-Rail-Ram",
	"R-Wpn-Rail-Damage03",
	"R-Wpn-RailGun07",
	"R-Cyborg-MechaRail",
	"R-Defense-Howitzer-Rail",
	"R-Defense-HvyHowitzer-Rail",
	"R-Defense-RotHow-Rail",
	"R-Wpn-Howitzer03-Rot-Rail-Inc",
	"R-Wpn-Howitzer03-Rot-Rail-Ram",
	"R-Wpn-HowitzerMk1-Rail-Inc",
	"R-Wpn-HowitzerMk1-Rail-Ram",
	"R-Wpn-HvyHowitzer-Gat-Rail",
	"R-Wpn-HvyHowitzer-Rail-Hvy-Ram",
	"R-Wpn-HvyHowitzer-Rail-Inc",
	"R-Wpn-RailGun08",
	"R-Defense-PillBox-Rail6",
	"R-Comp-MissileCodes03",
	"R-Defense-Howitzer-Rail-Inc",
	"R-Defense-Howitzer-Rail-Ram",
	"R-Defense-HvyHowitzer-Gat-Rail",
	"R-Defense-HvyHowitzer-Rail-Inc",
	"R-Defense-HvyHowitzer-Rail-Ram",
	"R-Defense-RotHow-Rail-Inc",
	"R-Defense-RotHow-Rail-Ram",
	"R-Defense-SuperRailHowitzer",
	"R-Wpn-Rail-Range03",
	"R-Defense-HvyHowitzer-Rail-Hvy-Ram",
	"R-Defense-SuperIncRailHowitzer",
	"R-Vehicle-Body07",
	"R-Defense-WallTower-Rail2",
	"R-Vehicle-Body10",
	"R-Vehicle-Engine08",
	"R-Defense-Cannon6TwinAslt-Rail",
	"R-Defense-RailGun1Mk1-GatAA",
	"R-Defense-RailGun2Mk1-Twn-Inc",
	"R-Defense-WallTower-RailGun2Mk1-Twn-Inc",
	//gamme end
	"R-Vehicle-Body13",
	"R-Vehicle-Body14",
	"R-Wpn-RailGun03",
	"R-Defense-MassDriver",
	"R-Defense-Plasteel-Atmiss",
	"R-Defense-Plasteel-EMP",
	"R-Defense-Rail3",
	"R-Defense-Super-Laser2-Fort",
	"R-Struc-CC-AR",
	"R-Sys-Sensor-Tower03",
	"R-Sys-SpySkyTower",
	"R-Wpn-RailGun03-Aslt",
	"R-Defense-WallUpgrade12",
	"R-Wpn-RailGun05",
	"R-Wpn-RailGun06",
	"R-Defense-CB-Tower03",
	"R-Defense-ECM1PylonMk4",
	"R-Defense-Plasteel-Cannon6TwinAslt-Rail",
	"R-Defense-Plasteel-HeavyLaser-Gat",
	"R-Defense-Plasteel-HeavyLaser-Inc-Aslt",
	"R-Defense-Plasteel-Laser2PULSEMk1-Inc",
	"R-Defense-Plasteel-PulseLas",
	"R-Defense-Plasteel-Rail2",
	"R-Defense-Plasteel-RailGun1Mk1-Gat-Twn",
	"R-Defense-Plasteel-RailGun2Mk1-Twn-Inc",
	"R-Defense-Plasteel-Railgun-Flak",
	"R-Defense-Plasteel-TwinAssaultGun",
	"R-Defense-WallTower-Rail3",
	"R-Vehicle-Engine09",
	"R-Defense-Plasteel-Rail3",
	"R-Defense-RailGun2Mk1-GatAT",
	"R-Defense-RailGun3Mk1-Aslt",
	"R-Defense-RailGun3Mk1-Hvy",
]);
