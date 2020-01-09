//Contains the campaign transition technology definitions.

// 				*** CAMPAIGN 1 ***
// Alpha Campaign - New Paradigm and Scavenger AI's
// Starting research for all players in campaign 1, except scavengers
const CAM1A_RESEARCH = [
	"R-Vehicle-Body01", "R-Sys-Spade1Mk1", "R-Vehicle-Prop-Wheels", "R-Vehicle-Body26", "R-Sys-Sensor-Upgrade00",
];

// Starting scavenger research for campaign 1
const CAM1A_RES_SCAV = [
	"R-Wpn-MG1Mk1", "R-Sys-Sensor-Upgrade00",
];

// Additional starting research for New Paradigm AI. This AI first appears in SUB1-3
const CAM1_3_RES_NP = [
	"R-Wpn-MG-Damage04", "R-Wpn-MG-ROF01", "R-Defense-WallUpgrade02",
	"R-Struc-Materials02",
	"R-Vehicle-Engine02",
	"R-Vehicle-Metals02", "R-Cyborg-Metals02", "R-Wpn-Cannon-Damage03",
	"R-Wpn-Flamer-Damage03", "R-Wpn-Flamer-ROF01",
	"R-Wpn-Mortar-Damage02", "R-Wpn-Rocket-Accuracy01",
	"R-Wpn-Rocket-Damage02", "R-Wpn-Rocket-ROF01",
	"R-Struc-RprFac-Upgrade01",
];

const CAM1_3_RES_SCAV = [
	"R-Wpn-MG1Mk1", "R-Wpn-MG-Damage02", "R-Wpn-Mortar-Damage01", "R-Vehicle-Metals01"
];

const CAM1C_RES_NP = [
	"R-Wpn-MG1Mk1"
];

const CAM1C_RES_SCAV = [
	"R-Wpn-MG-Damage04"
];

const CAM1_4_RES_NP = [
	"R-Wpn-MG1Mk1"
];
const CAM1_4_RES_SCAV = [
	"R-Wpn-MG1Mk1"
];

const CAM1_5_RES_NP = [
	"R-Wpn-MG1Mk1"
];

const CAM1_5_RES_SCAV = [
	"R-Wpn-MG1Mk1"
];

const CAM1AC_RES_NP = [
	"R-Wpn-MG1Mk1"
];

const CAM1D_RES_NP = [
	"R-Wpn-MG1Mk1"
];

const CAM1_7_RES_NP = [
	"R-Wpn-MG1Mk1"
];
const CAM1_7_RES_SCAV = [
	"R-Wpn-MG1Mk1"
];


// 				*** CAMPAIGN 2 ***
//			Beta Campaign - Collective AI
// Starting research for all players in campaign 2
const CAM2A_RESEARCH = [
	"R-Vehicle-Body26",
	"R-Wpn-MG1Mk1",
	"R-Vehicle-Body01",
	"R-Vehicle-Prop-Helicopter",
	"R-Struc-VTOLFactory",
	"R-Sys-Spade1Mk1",
	"R-Vehicle-Prop-Wheels",
	"R-Wpn-Flamer-Damage03",
	"R-Sys-Engineering01",
	"R-Sys-MobileRepairTurret01",
	"R-Defense-WallTower03",
	"R-Struc-PowerModuleMk1",
	"R-Wpn-MG2Mk1",
	"R-Defense-AASite-QuadMg1",
	"R-Wpn-MG3Mk1",
	"R-Wpn-Cannon1Mk1",
	"R-Defense-WallUpgrade03",
	"R-Wpn-AAGun03",
	"R-Defense-WallUpgrade03",
	"R-Struc-Factory-Upgrade04",
	"R-Vehicle-Metals03",
	"R-Cyborg-Metals03",
	"R-Wpn-Rocket-Range03",
	"R-Wpn-Rocket-Pod-MRA-Quad",
	"R-Vehicle-Body17",
	"R-Vehicle-Body18",
	"R-Vehicle-Body19",
	"R-Struc-Materials03",
	"R-Struc-Research-Upgrade03",
	"R-Defense-HardcreteGate",
	"R-Struc-RprFac-Upgrade01",
	"R-Wpn-MG-ROF01",
	"R-Defense-Pillbox02",
	"R-Defense-Tower09",
	"R-Wpn-Cannon-Damage03",
	"R-Wpn-Rocket05-MiniPod",
	"R-Wpn-Rocket-Damage03",
	"R-Wpn-Rocket-ROF03",
	"R-Wpn-Flamer-ROF01",
	"R-Wpn-MG-Damage04",
	"R-Defense-Tower02",
	"R-Wpn-Mortar-Damage03",
	"R-Wpn-Mortar-ROF04",
	"R-Wpn-Rocket-Accuracy02",
	"R-Cyborg-Engine01",
	"R-Wpn-Rocket-Pod-MRA-Twin",
	"R-Wpn-RocketSlow-Accuracy01",
	"R-Vehicle-Engine03",
	"R-Defense-Tower08",
	"R-Defense-MRL",
	"R-Comp-CommandTurret01",
	"R-Defense-MortarPit",
	"R-Defense-Pillbox01",
	"R-Defense-Pillbox04",
	"R-Defense-Pillbox05",
	"R-Defense-Pillbox06",
	"R-Defense-TankTrap01",
	"R-Defense-Tower01",
	"R-Defense-Tower06",
	"R-Defense-WallTower01",
	"R-Defense-WallTower02",
	"R-Defense-WallTower06",
	"R-Wpn-AAGun06",
	"R-Vehicle-Body11",
	"R-Vehicle-Body12",
	"R-Struc-VTOLPad",
	"R-Sys-MobileRepairTurretHvy",
	"R-Vehicle-Prop-Tracks",
	"R-Vehicle-Prop-Hover",
	"R-Vehicle-Prop-Wheels",
	"R-Wpn-Cannon-Accuracy01",
	"R-Wpn-Cannon3Mk1",
	"R-Wpn-Mortar-Acc01",
	"R-Defense-HvyMor",
	"R-Wpn-Rocket03-HvAT",
	"R-Defense-ECM1PylonMk1",
	"R-Cyborg-Armor-Heat03",
	"R-Wpn-Rocket05-MiniPod-Arch",
	"R-Wpn-Rocket-Pod-Twn-Arch",
	"R-Wpn-Rocket-Pod-Quad-Arch",
	"R-Defense-Tower10",
	"R-Wpn-Rocket01-LtAT",
	"R-Wpn-Rocket01-LtAT-Quad",
	"R-Wpn-Sunburst",
	"R-Defense-Sunburst",
	"R-Defense-Sunburst-Arch",
	"R-Wpn-Rocket-Arch-Hvy-Aslt-Gat",
	"R-Comp-SynapticLink",
	"R-Wpn-Cannon-Damage06",
	"R-Wpn-Cannon-ROF03",
	"R-Wpn-Cannon-Mount01",
	"R-Wpn-MG3Mk1-Aslt",
	"R-Defense-MG3Mk1-Aslt",
	"R-Defense-MortarPit-Ram",
	"R-Wpn-Mortar-Range02",
	"R-Defense-HvyMor-Ram",
	"R-Sys-Sensor-Tower02",
];


// Additional AI research for campaign 2
const CAM2A_RES_COL = [
	"R-Wpn-MG1Mk1", "R-Sys-Engineering03", "R-Wpn-Howitzer-ROF02",
	"R-Defense-WallUpgrade06", "R-Struc-Materials03", "R-Wpn-Howitzer-Damage03",
	"R-Struc-Factory-Upgrade07", "R-Wpn-Cannon-Mount02", "R-Wpn-Howitzer-Accuracy02",
	"R-Vehicle-Engine06", "R-Vehicle-Metals06", "R-Cyborg-Metals06",
	"R-Wpn-Cannon-Accuracy02", "R-Wpn-Cannon-Damage06", "R-Wpn-Flamer-Range02",
	"R-Wpn-Cannon-ROF06", "R-Wpn-Flamer-Damage06", "R-Wpn-Flamer-ROF03", "R-Wpn-Mortar-ROF03",
	"R-Wpn-MG-Damage06", "R-Wpn-MG-ROF02", "R-Wpn-Mortar-Acc02",
	"R-Wpn-Mortar-Damage03", "R-Wpn-Mortar-ROF02", "R-Struc-Materials06", "R-Wpn-Mortar-Range03",
	"R-Wpn-Rocket-Accuracy02", "R-Wpn-Rocket-Damage06", "R-Cyborg-HvyBody", "R-Wpn-Rocket-Range03",
	"R-Wpn-Rocket-ROF03", "R-Wpn-RocketSlow-Accuracy02", "R-Cyborg-Armor-Heat03", "R-Wpn-Rocket-Accuracy02",
	"R-Sys-Sensor-Upgrade01", "R-Cyborg-Engine04", "R-Wpn-Bomb-Accuracy03", "R-Struc-VTOLPad-Upgrade06"
];

const CAM2_1_RES_HUMAN = [
	"R-Wpn-MG1Mk1"
];

const CAM2_1_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2_2_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2_5_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2_6_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2_7_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2_8_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2A_RES_HUMAN = [
	"R-Wpn-MG1Mk1"
];

const CAM2B_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2C_RES_COL = [
	"R-Struc-Materials09", "R-Wpn-Rocket-ROF03", "R-Wpn-Rocket-Range03", "R-Wpn-Rocket-Damage09", "R-Wpn-Mortar-Damage06", "R-Wpn-Mortar-Acc03",
	"R-Wpn-MG-Damage08", "R-Wpn-Howitzer-Damage04", "R-Wpn-Howitzer-Accuracy03", "R-Wpn-Flamer-ROF04", "R-Wpn-Flamer-Damage09", "R-Wpn-Cannon-ROF06",
	"R-Wpn-Cannon-Damage09", "R-Wpn-Bomb-Damage06", "R-Wpn-AAGun-Accuracy03", "R-Wpn-AAGun-Damage06", "R-Sys-Sensor-Upgrade03", "R-Defense-WallUpgrade09",
	"R-Cyborg-Metals09", "R-Wpn-Cannon-Mount03"
];

const CAM2D_RES_COL = [
	"R-Wpn-MG1Mk1"
];

const CAM2END_RES_COL = [
	"R-Wpn-MG1Mk1"
];

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
	"R-Sys-Sensor-Upgrade02",
	"R-Sys-ECM-Upgrade02",
	"R-Wpn-AAGun-Damage03",
	"R-Wpn-Mortar-Damage06",
	"R-Wpn-AAGun-ROF03",
	"R-Wpn-Rocket-Damage09", // Beta 1 already ????
	//beta 1
	"R-Vehicle-Body20",
	"R-Vehicle-Body21",
	"R-Vehicle-Body22",
	//beta 2
	"R-Vehicle-Body02",
	"R-Wpn-Flame2",
	"R-Wpn-Flamer-Damage06",
	"R-Wpn-Flamer-Range03",
	"R-Wpn-MG-ROF03",
	"R-Defense-HvyFlamer",
	"R-Wpn-Cannon-Accuracy02",
	"R-Wpn-Mortar-Acc03",
	"R-Wpn-Mortar-Incenediary",
	"R-Wpn-Rocket03-HvAT-Arch",
	"R-Wpn-RocketSlow-Accuracy02",
	"R-Defense-ECM1PylonMk2",
	"R-Defense-MortarPit-Incenediary",
	"R-Defense-SensoTower04",
	"R-Struc-Research-Upgrade06",
	"R-Sys-CBSensor-Tower01",
	"R-Vehicle-Engine06",
	"R-Wpn-AAGun-Accuracy01",
	"R-Wpn-Mortar02-Incenediary",
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
	//beta 3
	"R-Struc-RprFac-Upgrade04",
	"R-Wpn-Mortar3",
	"R-Defense-RotMor",
	"R-Wpn-Mortar03-Incenediary",
	"R-Struc-Materials06",
	"R-Defense-Mortar3ROTARYMk1-Inc",
	"R-Wpn-Mortar-Range03",
	"R-Defense-Mortar3ROTARYMk1-Ram-Rot",
	// beta 4
	"R-Vehicle-Body06",
	"R-Vehicle-Prop-VTOL",
	"R-Wpn-AAGun02",
	"R-Wpn-HowitzerMk1",
	"R-Wpn-Howitzer-Incenediary",
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
	"R-Defense-Howitzer-Incenediary",
	"R-Defense-SuperIncHowitzer",
	//beta 5
	"R-Wpn-Cannon4AMk1",
	"R-Wpn-MG4",
	"R-Defense-Emplacement-HPVcannon",
	"R-Defense-RotMG",
	"R-Defense-WallTower-HPVcannon",
	"R-Wpn-AAGun04",
	"R-Wpn-MG4-Hvy",
	"R-Defense-AASite-QuadRotMg",
	"R-Defense-Wall-RotMg",
	"R-Struc-Power-Upgrade01c",
	"R-Wpn-MG4-Hvy-Inc",
	"R-Defense-WallTower-QuadRotAA",
	//beta 6
	"R-Wpn-Bomb02",
	"R-Wpn-Bomb04",
	"R-Wpn-Missile2A-T", // before tank-killer ?!?!?!
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
	//beta 7
	"R-Cyborg-HvyBody",
	"R-Cyborg-Engine03",
	"R-Sys-VTOLCBS-Tower01",
	"R-Wpn-Rocket07-Tank-Killer",
	"R-Cyborg-Hvywpn-A-T",
	"R-Cyborg-Hvywpn-IncMortar",
	"R-Cyborg-Hvywpn-MG3",
	"R-Cyborg-Hvywpn-Mcannon",
	"R-Cyborg-Hvywpn-Ripple",
	"R-Cyborg-Hvywpn-Rocket-LtA-T",
	"R-Cyborg-Hvywpn-Rocket-Pod",
	"R-Cyborg-Hvywpn-Rocket-Pod-Arch",
	"R-Cyborg-Hvywpn-Rocket-Pod-MRA",
	"R-Cyborg-Hvywpn-Rocket-Sunburst",
	"R-Cyborg-Hvywpn-Rocket-Sunburst-Arch",
	"R-Cyborg-Hvywpn-TK",
	"R-Cyborg-Hvywpn-Flamer",
	"R-Cyborg-Hvywpn-Mortar1Mk1-Ram",
	"R-Wpn-Rocket07-Tank-Killer-Quad",
	"R-Cyborg-Hvywpn-HPV",
	"R-Cyborg-Hvywpn-MG4",
	"R-Defense-HvyA-Trocket",
	"R-Defense-WallTower-HvyA-Trocket",
	//beta 8
	"R-Wpn-Cannon5",
	"R-Cyborg-Hvywpn-Acannon",
	"R-Defense-Wall-VulcanCan",
	"R-Wpn-Cannon5-Inc",
	"R-Wpn-Cannon6TwinAslt",
	"R-Defense-Cannon6",
	"R-Wpn-Cannon-Damage09",
	"R-Wpn-Cannon-ROF06",
	"R-Wpn-Cannon5-Hvy-Aslt",
	"R-Wpn-RailGun2Mk1TwinAslt-Inc",
	"R-Wpn-AAGun-Damage06",
	//beta end
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
	"R-Wpn-Cannon-Mount03",
	"R-Wpn-Howitzer-Damage06",
	"R-Wpn-HvyHowitzer-Inc",
	"R-Defense-HvyHowitzer-Gat",
	"R-Defense-HvyHowitzer-Inc",
	"R-Defense-HvyHowitzer-Ram",
	"R-Defense-RotHow-Ram",
	"R-Wpn-Howitzer-Range03",
	"R-Defense-HvyHowitzer-Ram-Hvy",
	"R-Wpn-HvyHowitzer-Ram-Hvy",
]);

// Additional AI research for starting campaign 3
const CAM3A_RES_NEXUS = [
	"R-Wpn-MG1Mk1", "R-Sys-Engineering03", "R-Defense-WallUpgrade12",
	"R-Struc-Materials07", "R-Struc-Factory-Upgrade07",
	"R-Struc-VTOLPad-Upgrade06", "R-Vehicle-Engine09", "R-Vehicle-Metals07",
	"R-Cyborg-Metals07", "R-Vehicle-Armor-Heat03", "R-Cyborg-Armor-Heat03",
	"R-Wpn-Bomb-Accuracy03", "R-Wpn-Missile-Damage01", "R-Wpn-Missile-ROF01",
	"R-Sys-Sensor-Upgrade01", "R-Wpn-Rail-Damage01",
	"R-Wpn-Rail-ROF01", "R-Wpn-Rail-Accuracy01", "R-Wpn-Flamer-Damage06",
];

//This is used for giving allies in Gamma technology (3-b/3-2/3-c)
const CAM3_2_RES_ALLY = [
	"R-Wpn-Cannon-Accuracy02", "R-Wpn-Cannon-Damage06", "R-Wpn-Cannon-ROF03",
	"R-Wpn-Flamer-Damage06", "R-Wpn-Flamer-ROF03", "R-Wpn-Howitzer-Accuracy02",
	"R-Wpn-Howitzer-Damage03", "R-Wpn-MG-Damage07", "R-Wpn-MG-ROF03",
	"R-Wpn-Mortar-Acc02", "R-Wpn-Mortar-Damage06", "R-Wpn-Mortar-ROF03",
	"R-Wpn-Rocket-Accuracy02", "R-Wpn-Rocket-Damage06", "R-Wpn-Rocket-ROF03",
	"R-Vehicle-Armor-Heat02", "R-Vehicle-Engine06", "R-Vehicle-Metals06", "R-Cyborg-Metals06",
	"R-Cyborg-Armor-Heat02", "R-Defense-WallUpgrade06", "R-Struc-Factory-Upgrade07",
	"R-Struc-VTOLPad-Upgrade03", "R-Struc-Materials06", "R-Struc-Power-Upgrade01",
	"R-Struc-Research-Upgrade06", "R-Struc-RprFac-Upgrade04", "R-Sys-Engineering02",
	"R-Sys-MobileRepairTurret01", "R-Sys-Sensor-Upgrade01", "R-Wpn-AAGun-Accuracy02",
	"R-Wpn-AAGun-Damage03", "R-Wpn-AAGun-ROF03", "R-Wpn-Bomb-Accuracy02",
];

const CAM3_2_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3_4_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3A_RES_HUMAN = [
	"R-Wpn-MG1Mk1"
];

const CAM3AB_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3AD_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3AD2_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3B_RES_ALLY = [
	"R-Wpn-MG1Mk1"
];

const CAM3B_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3C_RES_NEXUS = [
	"R-Wpn-MG1Mk1"
];

const CAM3C_RES_ALLY = [
	"R-Wpn-MG1Mk1"
];
