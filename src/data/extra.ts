import type { Question } from '../types';

export const extraQuestions = [
  { id:61, category:'globe', stage:'globe', interactiveTarget:'Southern Hemisphere', origin:'Added #61 • Parts of a Globe', question:'A traveler crosses the Equator while moving south. Which half of the globe does the traveler enter?', options:[
    {text:'Northern Hemisphere',isCorrect:false,rationale:'The Northern Hemisphere is the half above the Equator.'},
    {text:'Southern Hemisphere',isCorrect:true,rationale:'Crossing the Equator while moving south takes the traveler into the Southern Hemisphere, the half below the Equator.'},
    {text:'Eastern Hemisphere',isCorrect:false,rationale:'The Eastern Hemisphere is one side of the vertical Prime Meridian division, not the half below the Equator.'},
    {text:'Western Hemisphere',isCorrect:false,rationale:'The Western Hemisphere is the other side of the vertical Prime Meridian division, not the half below the Equator.'}], hint:'Think about which horizontal half of the globe lies below the middle dividing line.' },
  { id:62, category:'globe', stage:'globe', interactiveTarget:'Equator', origin:'Added #62 • Parts of a Globe', question:'Which imaginary line must be crossed to move directly from the Northern Hemisphere into the Southern Hemisphere?', options:[
    {text:'Prime Meridian',isCorrect:false,rationale:'The Prime Meridian divides the Eastern and Western Hemispheres.'},
    {text:'Equator',isCorrect:true,rationale:'The Equator is the horizontal dividing line between the Northern and Southern Hemispheres.'},
    {text:'Arctic Circle',isCorrect:false,rationale:'The Arctic Circle is not the worksheet line that divides the globe into its northern and southern halves.'},
    {text:'Compass Rose',isCorrect:false,rationale:'A compass rose shows direction and is not a line that divides the globe.'}], hint:'Use the horizontal dividing line shown across the middle of the worksheet globe.' },
  { id:63, category:'globe', stage:'globe', interactiveTarget:'Eastern Hemisphere', origin:'Added #63 • Parts of a Globe', question:'On the vertically divided worksheet globe, a location is to the right of the Prime Meridian. Which hemisphere is it in?', options:[
    {text:'Eastern Hemisphere',isCorrect:true,rationale:'The worksheet places the Eastern Hemisphere on the right side of the Prime Meridian.'},
    {text:'Western Hemisphere',isCorrect:false,rationale:'The Western Hemisphere is shown on the left side of the Prime Meridian.'},
    {text:'Northern Hemisphere',isCorrect:false,rationale:'Northern describes the half above the Equator rather than the right side of the Prime Meridian.'},
    {text:'Southern Hemisphere',isCorrect:false,rationale:'Southern describes the half below the Equator rather than the right side of the Prime Meridian.'}], hint:'Use the vertical globe on the worksheet and focus on its right-hand half.' },

  { id:64, category:'world', stage:'world', interactiveTarget:'Australia', origin:'Added #64 • World Map Study Guide', question:'Which continent on the study guide is the smallest of the seven continents and is surrounded by water?', options:[
    {text:'Asia',isCorrect:false,rationale:'Asia is the largest continent on the study guide.'},
    {text:'Australia',isCorrect:true,rationale:'Australia is the smallest continent and appears as an island continent surrounded by water.'},
    {text:'Africa',isCorrect:false,rationale:'Africa is larger and connects to Asia through the northeastern part of the continent.'},
    {text:'North America',isCorrect:false,rationale:'North America is much larger than Australia.'}], hint:'Compare the seven labeled landmasses and look for the small island continent southeast of Asia.' },
  { id:65, category:'world', stage:'world', interactiveTarget:'Pacific Ocean', origin:'Added #65 • World Map Study Guide', question:'Which ocean lies between Asia and Australia on one side and North and South America on the other?', options:[
    {text:'Atlantic Ocean',isCorrect:false,rationale:'The Atlantic Ocean lies between the Americas and Europe and Africa.'},
    {text:'Indian Ocean',isCorrect:false,rationale:'The Indian Ocean lies mainly between Africa, Asia, and Australia.'},
    {text:'Pacific Ocean',isCorrect:true,rationale:'The Pacific Ocean spans the space between Asia and Australia and the Americas.'},
    {text:'Arctic Ocean',isCorrect:false,rationale:'The Arctic Ocean is at the northern edge of the world map.'}], hint:'On a flat world map, this very large ocean appears along both the left and right edges.' },
  { id:66, category:'world', stage:'world', interactiveTarget:'Atlantic Ocean', origin:'Added #66 • World Map Study Guide', question:'Which ocean separates the Americas from Europe and Africa?', options:[
    {text:'Atlantic Ocean',isCorrect:true,rationale:'The Atlantic Ocean lies between North and South America and Europe and Africa.'},
    {text:'Pacific Ocean',isCorrect:false,rationale:'The Pacific Ocean lies between the Americas and Asia and Australia.'},
    {text:'Southern Ocean',isCorrect:false,rationale:'The Southern Ocean surrounds Antarctica.'},
    {text:'Indian Ocean',isCorrect:false,rationale:'The Indian Ocean lies between Africa, Asia, and Australia.'}], hint:'Trace the body of water crossed when traveling from the eastern United States toward Europe.' },
  { id:67, category:'world', stage:'world', interactiveTarget:'Asia', origin:'Added #67 • World Map Study Guide', question:'Europe is connected to the western side of which much larger continent?', options:[
    {text:'South America',isCorrect:false,rationale:'South America is across the Atlantic Ocean from Europe.'},
    {text:'Australia',isCorrect:false,rationale:'Australia is southeast of Asia and separated from Europe by other land and water.'},
    {text:'Asia',isCorrect:true,rationale:'Europe and Asia share one large connected landmass, with Asia directly east of Europe.'},
    {text:'Antarctica',isCorrect:false,rationale:'Antarctica is at the far south of the world map.'}], hint:'Look immediately to the right of Europe on the world map.' },
  { id:68, category:'world', stage:'world', interactiveTarget:'Africa', origin:'Added #68 • World Map Study Guide', question:'Starting in South America and traveling east across the Atlantic Ocean, which continent is on the opposite side?', options:[
    {text:'Africa',isCorrect:true,rationale:'Africa lies east of South America across the Atlantic Ocean.'},
    {text:'Asia',isCorrect:false,rationale:'Asia is farther east beyond Europe and Africa.'},
    {text:'Australia',isCorrect:false,rationale:'Australia is far across the Pacific and Indian Ocean side of the map.'},
    {text:'Antarctica',isCorrect:false,rationale:'Antarctica lies south of South America rather than directly east across the Atlantic.'}], hint:'Follow the Atlantic Ocean horizontally from South America toward the large landmass on its eastern side.' },

  { id:69, category:'compass', stage:'compass', interactiveTarget:'East (E)', origin:'Added #69 • Compass Rose', question:'On a standard map and compass rose, which cardinal direction means moving to the right?', options:[
    {text:'West (W)',isCorrect:false,rationale:'West points to the left on the compass rose.'},
    {text:'North (N)',isCorrect:false,rationale:'North points upward.'},
    {text:'East (E)',isCorrect:true,rationale:'East points to the right on a standard compass rose.'},
    {text:'South (S)',isCorrect:false,rationale:'South points downward.'}], hint:'Use the four largest compass points and compare the point on the right side.' },
  { id:70, category:'compass', stage:'compass', interactiveTarget:'South (S)', origin:'Added #70 • Compass Rose', question:'On a standard map and compass rose, which cardinal direction means moving straight down?', options:[
    {text:'North (N)',isCorrect:false,rationale:'North points straight up.'},
    {text:'East (E)',isCorrect:false,rationale:'East points to the right.'},
    {text:'South (S)',isCorrect:true,rationale:'South points straight down on a standard compass rose.'},
    {text:'West (W)',isCorrect:false,rationale:'West points to the left.'}], hint:'Find the main compass point directly opposite North.' },
  { id:71, category:'compass', stage:'compass', interactiveTarget:'East (E)', origin:'Added #71 • Compass Rose & World Map', question:'A plane travels from North America across the Atlantic Ocean toward Europe. Which cardinal direction is it mainly traveling on the study map?', options:[
    {text:'East (E)',isCorrect:true,rationale:'Europe is to the right, or east, of North America across the Atlantic Ocean.'},
    {text:'West (W)',isCorrect:false,rationale:'West would move left from North America toward the Pacific Ocean.'},
    {text:'South (S)',isCorrect:false,rationale:'South would move toward South America rather than Europe.'},
    {text:'North (N)',isCorrect:false,rationale:'North would move toward the Arctic rather than across the Atlantic to Europe.'}], hint:'Compare North America and Europe on the world map, then match that left-to-right movement to the compass rose.' },

  { id:72, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Added #72 • Major Geographic Features', question:'Which name from the study guide is a major U.S. river rather than a Great Lake or mountain range?', options:[
    {text:'Mississippi River',isCorrect:true,rationale:'The Mississippi is listed with the major U.S. rivers.'},
    {text:'Lake Huron',isCorrect:false,rationale:'Huron is one of the five Great Lakes.'},
    {text:'Appalachian Mountains',isCorrect:false,rationale:'The Appalachians are a major mountain range.'},
    {text:'Lake Ontario',isCorrect:false,rationale:'Ontario is one of the five Great Lakes.'}], hint:'Separate the water features that flow as rivers from the lakes and mountain ranges.' },
  { id:73, category:'us_regions', stage:'us_map', interactiveTarget:'Great Lakes', origin:'Added #73 • Major Geographic Features', question:'Which name from the study guide belongs to one of the five Great Lakes rather than to a major river?', options:[
    {text:'Rio Grande',isCorrect:false,rationale:'The Rio Grande is listed as a major river.'},
    {text:'Colorado River',isCorrect:false,rationale:'The Colorado is listed as a major river.'},
    {text:'Lake Ontario',isCorrect:true,rationale:'Ontario is one of the five Great Lakes: Superior, Michigan, Huron, Erie, and Ontario.'},
    {text:'Columbia River',isCorrect:false,rationale:'The Columbia is listed as a major river.'}], hint:'Use the HOMES memory clue for the five Great Lakes.' },
  { id:74, category:'us_regions', stage:'us_map', interactiveTarget:'Mid-Atlantic', origin:'Added #74 • U.S. Regions', question:'Which U.S. region on the study guide is associated with banking, health care, government, large cities, and Washington, D.C.?', options:[
    {text:'Mid-Atlantic',isCorrect:true,rationale:'The Mid-Atlantic section connects large cities and Washington, D.C. with banking, health care, and government.'},
    {text:'Great Plains',isCorrect:false,rationale:'The Great Plains focuses on flat land, farming, ranching, and natural resources.'},
    {text:'West',isCorrect:false,rationale:'The West is associated with mountains, deserts, Pacific coastlines, technology, movies, and aerospace.'},
    {text:'New England',isCorrect:false,rationale:'New England is associated with four seasons, shipbuilding, fishing, education, and tourism.'}], hint:'Think about the region containing the nation’s capital and many large Atlantic-coast cities.' },
  { id:75, category:'us_regions', stage:'us_map', interactiveTarget:'New England', origin:'Added #75 • U.S. Regions', question:'Which U.S. region combines shipbuilding and fishing with education and tourism on the study guide?', options:[
    {text:'New England',isCorrect:true,rationale:'New England is described with shipbuilding, fishing, education, tourism, and four distinct seasons.'},
    {text:'South',isCorrect:false,rationale:'The South is associated with warm-weather agriculture, shipping, and tourism.'},
    {text:'Midwest',isCorrect:false,rationale:'The Midwest is associated with farming, automobiles, and food processing.'},
    {text:'Great Plains',isCorrect:false,rationale:'The Great Plains is associated with wheat, corn, cattle, ranching, and flat land.'}], hint:'Look for the far-northeastern region represented by the lighthouse on the study material.' },
  { id:76, category:'us_regions', stage:'us_map', interactiveTarget:'Great Plains', origin:'Added #76 • U.S. Regions', question:'Which U.S. region is connected with wheat, corn, cattle, ranching, and natural gas on the study material?', options:[
    {text:'Great Plains',isCorrect:true,rationale:'The Great Plains has wide flat lands used for wheat, corn, cattle, and ranching and is associated with natural gas.'},
    {text:'Mid-Atlantic',isCorrect:false,rationale:'The Mid-Atlantic is associated with large cities, government, banking, and health care.'},
    {text:'New England',isCorrect:false,rationale:'New England is associated with forests, lakes, four seasons, fishing, and shipbuilding.'},
    {text:'West',isCorrect:false,rationale:'The West is associated with mountains, deserts, long Pacific coastlines, technology, movies, and aerospace.'}], hint:'Choose the broad interior region whose flat land makes large farms and ranches possible.' },
  { id:77, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Added #77 • Major Geographic Features', question:'Which pairing correctly identifies the oceans along the eastern and western sides of the United States?', options:[
    {text:'Atlantic Ocean east; Pacific Ocean west',isCorrect:true,rationale:'The Atlantic borders the eastern side of the United States and the Pacific borders the western side.'},
    {text:'Pacific Ocean east; Atlantic Ocean west',isCorrect:false,rationale:'This reverses the two oceans bordering the United States.'},
    {text:'Indian Ocean east; Arctic Ocean west',isCorrect:false,rationale:'The Indian and Arctic Oceans are not the east-west ocean pair listed for the United States.'},
    {text:'Southern Ocean east; Indian Ocean west',isCorrect:false,rationale:'Neither the Southern nor Indian Ocean is the east-west ocean pair bordering the United States.'}], hint:'Match the Atlantic coast and Pacific coast labels to the two sides of the country.' },

  { id:78, category:'symbols', stage:'symbols', interactiveTarget:'American Flag', origin:'Added #78 • National Symbols', question:'Which group matches the three national symbols shown together across the top row of the study guide’s National Symbols box?', options:[
    {text:'American Flag, Bald Eagle, and Liberty Bell',isCorrect:true,rationale:'The top row contains the American Flag, Bald Eagle, and Liberty Bell.'},
    {text:'Statue of Liberty, The White House, and Washington Monument',isCorrect:false,rationale:'Those three human-made landmarks appear across the bottom row.'},
    {text:'Rocky Mountains, Mississippi River, and Great Lakes',isCorrect:false,rationale:'Those are geographic features, not the three top-row national symbols.'},
    {text:'Golden Gate Bridge, Lighthouse, and Farm Silo',isCorrect:false,rationale:'Those images relate to regional examples rather than the National Symbols top row.'}], hint:'Separate the three top-row symbols from the three landmarks shown underneath them.' },
  { id:79, category:'symbols', stage:'symbols', interactiveTarget:'Bald Eagle', origin:'Added #79 • National Symbols', question:'Which national symbol on the study guide is a living animal rather than a human-made object, building, or monument?', options:[
    {text:'Liberty Bell',isCorrect:false,rationale:'The Liberty Bell is a human-made historic object.'},
    {text:'Bald Eagle',isCorrect:true,rationale:'The Bald Eagle is a living bird and a national symbol of the United States.'},
    {text:'The White House',isCorrect:false,rationale:'The White House is a human-made building.'},
    {text:'Washington Monument',isCorrect:false,rationale:'The Washington Monument is a human-made monument.'}], hint:'Look for the only choice that is a bird.' },
  { id:80, category:'symbols', stage:'symbols', interactiveTarget:'The White House', origin:'Added #80 • National Symbols', question:'Which pair of national landmarks from the study guide are both located in Washington, D.C.?', options:[
    {text:'The White House and Washington Monument',isCorrect:true,rationale:'The study material identifies both the White House and Washington Monument with Washington, D.C.'},
    {text:'Statue of Liberty and Liberty Bell',isCorrect:false,rationale:'The Statue of Liberty is in New York Harbor and the Liberty Bell is associated with Philadelphia, not Washington, D.C.'},
    {text:'Bald Eagle and American Flag',isCorrect:false,rationale:'Those are national symbols, but they are not two Washington, D.C. landmarks.'},
    {text:'Statue of Liberty and The White House',isCorrect:false,rationale:'The White House is in Washington, D.C., but the Statue of Liberty is in New York Harbor.'}], hint:'Choose the pair that includes the President’s residence and the tall monument honoring the first president.' }
] as const satisfies readonly Question[];
