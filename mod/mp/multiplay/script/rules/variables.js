var lastHitTime = 0;
var cheatmode = false;
var mainReticule = false;
var oilDrumData = {
	delay: 0, // time delay to prevent multiple drums from spawning on the same frame
	lastSpawn: 0, // time of the last successful drum added to the map
	maxOilDrums: 0 // maximum amount of random oil drums allowed on the map
};

const CREATE_LIKE_EVENT = 0;
const DESTROY_LIKE_EVENT = 1;
const TRANSFER_LIKE_EVENT = 2;

const cleanTech = 1;
const timeBaseTech = 3.25*60;		// after Power Module and Twin Machinegun
const timeAdvancedBaseTech = 7.55*60;	// after Mortar and Repair Facility and Twin Rocket Pod
const timeT2 = 17.2*60;         // after Super Tank-Killer Cyborg
const timeT3 = 23*60;			// after Needle Gun and Scourge Missile
