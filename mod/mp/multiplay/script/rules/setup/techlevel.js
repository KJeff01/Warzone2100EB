function setupTechLevel(player)
{
	completeResearchOnTime(0, player);

	//global function, doc/js-functions
	var techLevel = getMultiTechLevel();
	if (techLevel == 2)
	{
		for (var i = 0, len = TECH_TWO.length; i < len; ++i)
		{
			completeResearch(TECH_TWO[i], player);
		}
	}
	else if (techLevel == 3)
	{
		for (var i = 0, len = TECH_THREE.length; i < len; ++i)
		{
			completeResearch(TECH_THREE[i], player);
		}
	}
	else if (techLevel == 4)
	{
		completeAllResearch(player);
	}

}
