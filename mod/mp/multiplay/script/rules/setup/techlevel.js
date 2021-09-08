function setupTechLevel(player)
{
	completeResearchOnTime(0, player);

	//global function, doc/js-functions
	var techLevel = getMultiTechLevel();
	if (techLevel == 2)
	{
		completeResearch(TECH_TWO, player);
	}
	else if (techLevel == 3)
	{
		completeResearch(TECH_THREE, player);
	}
	else if (techLevel == 4)
	{
		completeAllResearch(player);
	}

}
