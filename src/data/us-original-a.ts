import type { Question } from '../types';

export const usOriginalQuestionsA = [
  { id:15, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Original #15 • Bayou Bridges Vocabulary', question:'According to your Bayou Bridges study sheet, what is the vocabulary word for a large area that has certain characteristics related to its geography, form of government, or traditions that set it apart from other places?', options:[
    {text:'Hemisphere',isCorrect:false,rationale:'A hemisphere is half of the globe, not a specific area defined by shared traditions or government.'},
    {text:'Region',isCorrect:true,rationale:"The Vocabulary box defines a 'region' as a large area with certain characteristics related to its geography, government, or traditions that set it apart."},
    {text:'Symbol',isCorrect:false,rationale:"A symbol is an object or landmark that stands for a country's values and history."},
    {text:'Continent',isCorrect:false,rationale:'A continent is one of the seven giant landmasses on Earth.'}], hint:"Look inside the top-right 'VOCABULARY' box on your Bayou Bridges page." },
  { id:16, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Original #16 • Bayou Bridges Exploring the U.S.', question:'About how far does the United States stretch from coast to coast?', options:[
    {text:'About 300 miles',isCorrect:false,rationale:'300 miles is only about the width of one state, not the entire country.'},
    {text:'About 3,000 miles',isCorrect:true,rationale:"The 'Exploring the United States' box states that the United States stretches about 3,000 miles from coast to coast."},
    {text:'About 30,000 miles',isCorrect:false,rationale:'30,000 miles is more than the distance all the way around the entire Earth!'},
    {text:'About 500 miles',isCorrect:false,rationale:'500 miles is the length of the small scale bar on the map, not the whole country.'}], hint:"Read the very first bullet point under 'EXPLORING THE UNITED STATES'." },
  { id:17, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Original #17 • Bayou Bridges Regions', question:'Which of the following is something that the states within each United States region have in common?', options:[
    {text:'They all have the exact same state governor and state capital.',isCorrect:false,rationale:'Every individual state has its own state capital and governor.'},
    {text:'They have similar geography, climate, natural resources, and economic activities.',isCorrect:true,rationale:"According to the 'Each Region Has...' box, states in a region share similar geography, climate, natural resources, and economic activities."},
    {text:'They all touch both the Atlantic Ocean and the Pacific Ocean.',isCorrect:false,rationale:'Many U.S. regions are inland or only touch one ocean.'},
    {text:'They are all the exact same size and shape on the map.',isCorrect:false,rationale:'States have many different sizes and shapes.'}], hint:"Check the four stars in the 'EACH REGION HAS...' box on the right side of the Bayou Bridges sheet." },
  { id:18, category:'us_regions', stage:'us_map', interactiveTarget:'Canada', origin:'Original #18 • Regions of the U.S. Map', question:"Look at the map of the 'Regions of the United States'. Which country borders the United States to the north, and which country borders it to the south?", options:[
    {text:'Mexico to the north and Canada to the south',isCorrect:false,rationale:'This swaps the two neighbors; Canada is in the north and Mexico is in the south.'},
    {text:'Canada to the north and Mexico to the south',isCorrect:true,rationale:'On the U.S. map, Canada is labeled above the northern border and Mexico is labeled below the southern border.'},
    {text:'Europe to the north and South America to the south',isCorrect:false,rationale:'Europe and South America are continents, and neither shares a direct border with the United States.'},
    {text:'Alaska to the north and Hawaii to the south',isCorrect:false,rationale:'Alaska and Hawaii are U.S. states, not foreign countries bordering the U.S.'}], hint:"Look above Minnesota/North Dakota and below Texas on the 'Regions of the United States' map." },
  { id:19, category:'us_regions', stage:'us_map', interactiveTarget:'New England', origin:'Original #19 • U.S. Regions', question:'Which U.S. region is located in the far northeast corner of the country, experiences four very different seasons, and has important industries like shipbuilding and fishing?', options:[
    {text:'West',isCorrect:false,rationale:'The West is on the Pacific coast and is known for deserts, mountains, movies, and aerospace.'},
    {text:'Great Plains',isCorrect:false,rationale:'The Great Plains is an inland region known for wide, flat lands, wheat, corn, and cattle.'},
    {text:'New England',isCorrect:true,rationale:'The New England box describes mountains, hills, forests, lakes, four different seasons, shipbuilding, and fishing.'},
    {text:'South',isCorrect:false,rationale:'The South has a warm climate and grows crops like cotton, tobacco, and rice.'}], hint:'Click on or choose the region box on your study sheet with a picture of a lighthouse next to it.' },
  { id:20, category:'us_regions', stage:'us_map', interactiveTarget:'Mid-Atlantic', origin:'Original #20 • U.S. Regions', question:"If you want to visit large cities and the nation's capital, Washington, D.C., which U.S. region should you travel to?", options:[
    {text:'Mid-Atlantic',isCorrect:true,rationale:'The Mid-Atlantic box states that it includes large cities and is home to Washington, D.C., the capital.'},
    {text:'Midwest',isCorrect:false,rationale:"The Midwest is known as the 'Breadbasket of America' with many farms and automobile factories."},
    {text:'Great Plains',isCorrect:false,rationale:"The Great Plains is known for wide, flat lands for farming and ranching rather than the nation's capital."},
    {text:'West',isCorrect:false,rationale:'The West is on the opposite coast along the Pacific Ocean.'}], hint:'Check the second region box from the left on your Bayou Bridges page.' },
  { id:21, category:'us_regions', stage:'us_map', interactiveTarget:'Great Plains', origin:'Original #21 • U.S. Regions', question:'Why is the Great Plains region so well-suited for farming wheat and corn and ranching cattle?', options:[
    {text:'Because it has high, snowy mountain peaks all year long.',isCorrect:false,rationale:'High snowy mountains make large-scale farming and cattle ranching much harder.'},
    {text:'Because it has wide, flat lands.',isCorrect:true,rationale:'The Great Plains box explains that its wide, flat lands are perfect for farming and ranching.'},
    {text:'Because it is completely surrounded by the Pacific Ocean.',isCorrect:false,rationale:'The Great Plains is in the middle of the country and does not touch any ocean.'},
    {text:'Because it has thick tropical rainforests.',isCorrect:false,rationale:'The Great Plains is covered in flat grasslands and prairies, not rainforests.'}], hint:"Read the very first sentence under the 'GREAT PLAINS' heading." }
] as const satisfies readonly Question[];
