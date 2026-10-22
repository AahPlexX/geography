import type { Question } from '../types';

export const worldExpandedQuestions = [
  { id:38, category:'world', stage:'world', interactiveTarget:'North America', origin:"Expanded #38 • Teacher's Hemispheres Worksheet", question:"Look at the 'Northern Hemisphere' box on your first worksheet. Which group lists the EXACT four continents written inside the Northern Hemisphere box?", options:[
    {text:'North America, Europe, Asia, and Africa',isCorrect:true,rationale:"Your 'Northern Hemisphere' box has exactly four continents written inside it: North America, Europe, Asia, and Africa!"},
    {text:'South America, Antarctica, and Australia',isCorrect:false,rationale:"Those three continents are the exact list inside the 'Southern Hemisphere' box."},
    {text:'North America and South America',isCorrect:false,rationale:"Those two continents are the list inside the 'Western Hemisphere' box."},
    {text:'Antarctica, Australia, and South America',isCorrect:false,rationale:'Those are the three Southern Hemisphere continents.'}], hint:"Read the four continent names you wrote in the top-left 'Northern Hemisphere' box on your worksheet!" },
  { id:39, category:'world', stage:'world', interactiveTarget:'Europe', origin:"Expanded #39 • Teacher's Hemispheres Worksheet", question:"Look at the 'Eastern Hemisphere' box (bottom-left box) on your first worksheet. How many continents are listed inside it, and what are they?", options:[
    {text:'5 continents: Antarctica, Africa, Asia, Australia, and Europe',isCorrect:true,rationale:'On your worksheet, the Eastern Hemisphere box has 5 continents written in it: Antarctica, Africa, Asia, Australia, and Europe!'},
    {text:'2 continents: North America and South America',isCorrect:false,rationale:'Those 2 continents are in the Western Hemisphere box.'},
    {text:'3 continents: South America, Antarctica, and Australia',isCorrect:false,rationale:'Those 3 continents are in the Southern Hemisphere box.'},
    {text:'4 continents: North America, South America, Europe, and Asia',isCorrect:false,rationale:'North America and South America are in the Western Hemisphere, not the Eastern Hemisphere.'}], hint:"Count the 5 continents written in the bottom-left 'Eastern Hemisphere' box on your first worksheet!" },
  { id:40, category:'world', stage:'world', interactiveTarget:'Asia', origin:"Expanded #40 • Teacher's Hemispheres Worksheet", question:"On your 'Hemispheres' worksheet, which three continents are written in BOTH the Northern Hemisphere box AND the Eastern Hemisphere box?", options:[
    {text:'Europe, Asia, and Africa',isCorrect:true,rationale:'On your worksheet, Europe, Asia, and Africa all appear in both the Northern Hemisphere box and the Eastern Hemisphere box!'},
    {text:'North America, South America, and Antarctica',isCorrect:false,rationale:'North and South America are in the Western Hemisphere, and Antarctica is in the Southern Hemisphere.'},
    {text:'Australia, Antarctica, and South America',isCorrect:false,rationale:'Those three are in the Southern Hemisphere box.'},
    {text:'North America, Europe, and Australia',isCorrect:false,rationale:'North America is in the Western Hemisphere and Australia is in the Southern Hemisphere.'}], hint:"Compare your 'Northern Hemisphere' list and your 'Eastern Hemisphere' list—which 3 continents are in both?" },
  { id:41, category:'world', stage:'world', interactiveTarget:'South America', origin:"Expanded #41 • Teacher's Hemispheres Worksheet", question:"Look at the 'Southern Hemisphere' box (top-right box) on your first worksheet. Which group lists the EXACT three continents written in the Southern Hemisphere box?", options:[
    {text:'South America, Antarctica, and Australia',isCorrect:true,rationale:'On your worksheet, the Southern Hemisphere box has three continents: South America, Antarctica, and Australia!'},
    {text:'North America, Europe, and Asia',isCorrect:false,rationale:'Those continents are in the Northern Hemisphere box.'},
    {text:'Africa, Europe, and Asia',isCorrect:false,rationale:'On your worksheet, Africa, Europe, and Asia are listed in the Northern and Eastern Hemisphere boxes.'},
    {text:'North America and South America',isCorrect:false,rationale:'Those two are the Western Hemisphere list.'}], hint:"Read the three continents you wrote in the top-right 'Southern Hemisphere' box on your first worksheet!" },
  { id:42, category:'world', stage:'world', interactiveTarget:'South America', origin:'Expanded #42 • World Map Study Guide', question:'If you travel straight South from North America, which continent do you reach first?', options:[
    {text:'South America',isCorrect:true,rationale:'South America is connected just south of North America in the Western Hemisphere.'},
    {text:'Europe',isCorrect:false,rationale:'Europe is to the east of North America across the Atlantic Ocean.'},
    {text:'Australia',isCorrect:false,rationale:'Australia is southwest across the Pacific Ocean in the Eastern Hemisphere.'},
    {text:'Asia',isCorrect:false,rationale:'Asia is west across the Pacific Ocean.'}], hint:'Click on or choose the continent directly below North America.' },
  { id:43, category:'world', stage:'world', interactiveTarget:'Asia', origin:'Expanded #43 • World Map Study Guide', question:'Look at the seven continents on your World Map Study Guide. Which continent is the largest in land area and is connected to the eastern side of Europe?', options:[
    {text:'Asia',isCorrect:true,rationale:'Asia is the largest continent on the map and shares a giant landmass with Europe in the Eastern Hemisphere.'},
    {text:'Australia',isCorrect:false,rationale:'Australia is the smallest continent and is surrounded by water.'},
    {text:'Europe',isCorrect:false,rationale:"Europe is much smaller than Asia and sits to Asia's west."},
    {text:'South America',isCorrect:false,rationale:'South America is in the Western Hemisphere, not connected to Europe.'}], hint:'Click on or choose the giant continent in the top-right part of the world map.' },
  { id:44, category:'world', stage:'world', interactiveTarget:'Southern Ocean', origin:'Expanded #44 • World Map Study Guide', question:'Which ocean completely surrounds the icy continent of Antarctica at the bottom of the world map?', options:[
    {text:'Southern Ocean',isCorrect:true,rationale:'The Southern Ocean is labeled directly above Antarctica at the bottom of the world map.'},
    {text:'Arctic Ocean',isCorrect:false,rationale:'The Arctic Ocean is at the very top of the map near the North Pole.'},
    {text:'Indian Ocean',isCorrect:false,rationale:'The Indian Ocean is warmer and located further north between Africa, Asia, and Australia.'},
    {text:'Atlantic Ocean',isCorrect:false,rationale:'The Atlantic Ocean runs vertically between the Americas and Europe/Africa.'}], hint:'Click on the ocean badge right above Antarctica!' },
  { id:45, category:'world', stage:'world', interactiveTarget:'Arctic Ocean', origin:'Expanded #45 • World Map Study Guide', question:'Which ocean is located at the very top of the Northern Hemisphere, north of North America, Europe, and Asia?', options:[
    {text:'Arctic Ocean',isCorrect:true,rationale:'The Arctic Ocean sits at the very top of the globe in the Northern Hemisphere.'},
    {text:'Southern Ocean',isCorrect:false,rationale:'The Southern Ocean is at the very bottom of the Southern Hemisphere.'},
    {text:'Indian Ocean',isCorrect:false,rationale:'The Indian Ocean is south of Asia.'},
    {text:'Pacific Ocean',isCorrect:false,rationale:'The Pacific Ocean lies between Asia/Australia and the Americas.'}], hint:'Click on the ocean badge at the very top edge of the world map!' },
  { id:46, category:'world', stage:'world', interactiveTarget:null, origin:'Expanded #46 • World Map Study Guide', question:"According to the heading at the top of your 'Parts of a World Map Study Guide (Test 10/23),' how many continents and how many oceans must students be able to locate and label?", options:[
    {text:'7 Continents and 5 Oceans',isCorrect:true,rationale:"The study guide states: 'Students must be able to locate and label the 7 Continents, 5 Oceans, Equator, Prime Meridian, 4 Hemispheres, Cardinal, and Intermediate directions.'"},
    {text:'5 Continents and 7 Oceans',isCorrect:false,rationale:'This reverses the numbers—there are 7 continents and 5 oceans.'},
    {text:'4 Continents and 4 Oceans',isCorrect:false,rationale:'4 is the number of hemispheres and cardinal directions, not continents or oceans.'},
    {text:'6 Continents and 6 Oceans',isCorrect:false,rationale:'There are 7 continents and 5 oceans.'}], hint:'Read the bold sentence at the top of your 10/23 Study Guide.' }
] as const satisfies readonly Question[];
