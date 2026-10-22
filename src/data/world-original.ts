import type { Question } from '../types';

export const worldOriginalQuestions = [
  { id:4, category:'world', stage:'world', interactiveTarget:'Australia', origin:'Original #4 • Hemispheres Map', question:"Based on your 'Hemispheres' worksheet, which island continent in the bottom-right corner is written in BOTH the Southern Hemisphere box and the Eastern Hemisphere box?", options:[
    {text:'North America',isCorrect:false,rationale:'North America is written in the Northern and Western Hemisphere boxes.'},
    {text:'Europe',isCorrect:false,rationale:'Europe is written in the Northern and Eastern Hemisphere boxes.'},
    {text:'Australia',isCorrect:true,rationale:'On your worksheet, Australia sits below the red Equator and to the right of the green Prime Meridian, so it goes in the Southern and Eastern Hemisphere boxes!'},
    {text:'South America',isCorrect:false,rationale:'South America is written in the Southern and Western Hemisphere boxes.'}], hint:'Click on or choose the island continent in the bottom-right corner of the world map.' },
  { id:5, category:'world', stage:'world', interactiveTarget:'Africa', origin:"Original #5 • Teacher's Hemispheres Worksheet", question:"Look at the four sorting boxes at the bottom of your 'Hemispheres' worksheet. Which two hemisphere boxes is Africa written in for your class test?", options:[
    {text:'Southern Hemisphere and Western Hemisphere',isCorrect:false,rationale:'On your worksheet, South America is the continent listed in both the Southern and Western boxes.'},
    {text:'Northern Hemisphere and Eastern Hemisphere',isCorrect:true,rationale:"On your teacher's 'Hemispheres' worksheet, Africa is sorted into the Northern Hemisphere box and the Eastern Hemisphere box (right alongside Europe and Asia)!"},
    {text:'Northern Hemisphere and Western Hemisphere',isCorrect:false,rationale:'North America is the continent sorted into the Northern and Western Hemisphere boxes.'},
    {text:'Southern Hemisphere and Eastern Hemisphere',isCorrect:false,rationale:'Australia and Antarctica are the continents listed in both the Southern and Eastern boxes on your worksheet.'}], hint:"Check the boxes on your first worksheet where you wrote 'Africa' (hint: it's in the same two boxes as Europe and Asia!)." },
  { id:6, category:'world', stage:'world', interactiveTarget:'North America', origin:'Original #6 • Hemispheres Map', question:"Look at the 'Western Hemisphere' box at the bottom-right of your first worksheet. Which TWO continents are the ONLY ones listed in the Western Hemisphere?", options:[
    {text:'Europe and Asia',isCorrect:false,rationale:'Europe and Asia are listed in the Northern and Eastern Hemisphere boxes.'},
    {text:'Africa and Australia',isCorrect:false,rationale:'Africa and Australia are listed in the Eastern Hemisphere box.'},
    {text:'North America and South America',isCorrect:true,rationale:"On your teacher's worksheet, North America and South America are the exact two continents written inside the 'Western Hemisphere' box!"},
    {text:'Antarctica and Europe',isCorrect:false,rationale:'Both Antarctica and Europe are listed in the Eastern Hemisphere box on your worksheet.'}], hint:"Check the two continents you wrote inside the 'Western Hemisphere' box at the bottom right of your first worksheet." },
  { id:7, category:'world', stage:'world', interactiveTarget:'Antarctica', origin:'Original #7 • Hemispheres & World Map', question:"Which icy continent at the very bottom of the world map is listed in both the 'Southern Hemisphere' box and the 'Eastern Hemisphere' box on your worksheet?", options:[
    {text:'Antarctica',isCorrect:true,rationale:'Antarctica is at the very bottom of the map and is written in the Southern Hemisphere and Eastern Hemisphere boxes on your worksheet.'},
    {text:'Europe',isCorrect:false,rationale:'Europe is in the Northern and Eastern Hemispheres.'},
    {text:'South America',isCorrect:false,rationale:'South America is in the Southern and Western Hemispheres on your worksheet.'},
    {text:'North America',isCorrect:false,rationale:'North America is in the Northern and Western Hemispheres.'}], hint:'Click on or choose the long, icy continent at the very bottom edge of the world map.' },
  { id:8, category:'world', stage:'world', interactiveTarget:'Atlantic Ocean', origin:'Original #8 • World Map Study Guide', question:'A sailor is traveling on a ship from the eastern coast of North America straight across the water to Europe. Which ocean is the ship crossing?', options:[
    {text:'Pacific Ocean',isCorrect:false,rationale:'The Pacific Ocean is on the western side of North America, between North America and Asia.'},
    {text:'Indian Ocean',isCorrect:false,rationale:'The Indian Ocean is between Africa, Asia, and Australia.'},
    {text:'Atlantic Ocean',isCorrect:true,rationale:'The Atlantic Ocean lies directly between North/South America on the left and Europe/Africa on the right.'},
    {text:'Arctic Ocean',isCorrect:false,rationale:'The Arctic Ocean is at the very top of the map above North America, Europe, and Asia.'}], hint:'Click on or choose the ocean located right in the middle between the Americas and Europe/Africa.' },
  { id:9, category:'world', stage:'world', interactiveTarget:'Pacific Ocean', origin:'Original #9 • World Map Study Guide', question:'Why does the Pacific Ocean appear on both the far left side and the far right side of a flat world map?', options:[
    {text:'Because there are two different oceans named the Pacific Ocean.',isCorrect:false,rationale:'There is only one Pacific Ocean on Earth; it just looks split on a flat sheet of paper.'},
    {text:'Because the round Earth is flattened out to make a map.',isCorrect:true,rationale:'When a round globe is unrolled into a flat rectangle, the giant Pacific Ocean is split along the left and right edges.'},
    {text:'Because the Prime Meridian cuts the Pacific Ocean in half on the front of the map.',isCorrect:false,rationale:'The Prime Meridian runs through the Atlantic Ocean and Africa in the center of the map, not the edges.'},
    {text:'Because the Equator pushes the water to both sides.',isCorrect:false,rationale:'The Equator is an imaginary line and does not move ocean water.'}], hint:'Imagine wrapping the flat world map back into a cylinder so the left edge touches the right edge.' },
  { id:10, category:'world', stage:'world', interactiveTarget:'Indian Ocean', origin:'Original #10 • World Map Study Guide', question:'Which ocean is located directly south of Asia, east of Africa, and west of Australia?', options:[
    {text:'Southern Ocean',isCorrect:false,rationale:'The Southern Ocean is located further south, surrounding Antarctica.'},
    {text:'Atlantic Ocean',isCorrect:false,rationale:'The Atlantic Ocean is located west of Africa, not east of Africa.'},
    {text:'Indian Ocean',isCorrect:true,rationale:'On the world map study guide, the Indian Ocean sits neatly between Africa, Asia, and Australia.'},
    {text:'Arctic Ocean',isCorrect:false,rationale:'The Arctic Ocean is at the very top of the Northern Hemisphere.'}], hint:'Look in the Eastern Hemisphere right above the Southern Ocean and between Africa and Australia.' },
  { id:11, category:'world', stage:'world', interactiveTarget:'Arctic Ocean', origin:'Original #11 • World Map Study Guide', question:'Which two oceans are found at the very top (northernmost) and very bottom (southernmost) parts of the world map?', options:[
    {text:'Atlantic Ocean and Pacific Ocean',isCorrect:false,rationale:'The Atlantic and Pacific Oceans stretch vertically from north to south rather than sitting only at the top and bottom poles.'},
    {text:'Arctic Ocean and Southern Ocean',isCorrect:true,rationale:'The Arctic Ocean is at the very top of the map near the North Pole, and the Southern Ocean is at the bottom near Antarctica.'},
    {text:'Indian Ocean and Arctic Ocean',isCorrect:false,rationale:'While the Arctic Ocean is at the top, the Indian Ocean is in the middle-right area, not the very bottom.'},
    {text:'Southern Ocean and Indian Ocean',isCorrect:false,rationale:'The Indian Ocean is not at the northernmost top of the map.'}], hint:'Check the ocean labels at the very top edge above Europe/Asia and at the bottom edge just above Antarctica.' }
] as const satisfies readonly Question[];
