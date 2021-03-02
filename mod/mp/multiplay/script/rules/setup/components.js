function setupComponents(player)	// inside hackNetOff()
{
	enableTemplate("TruckNAS", player);
	enableTemplate("ConstructionDroid", player);
	// enable cyborgs components that can't be enabled with research
	makeComponentAvailable("CyborgSpade", player);
	// give bots the ability to produce some unused weapons
	if (playerData[player].isAI)
	{
		makeComponentAvailable("PlasmaHeavy", player);
		makeComponentAvailable("MortarEMP", player);
	}
}
