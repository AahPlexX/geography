import type { Question } from '../types';

export const usExpandedQuestions = [
  { id:51, category:'us_regions', stage:'us_map', interactiveTarget:'Gulf of Mexico', origin:'Expanded #51 • Regions of the U.S. Map', question:"Look at the bottom of the 'Regions of the United States' map, just south of Louisiana (LA), Texas (TX), and Mississippi (MS). What large body of water is labeled there?", options:[
    {text:'Gulf of Mexico',isCorrect:true,rationale:'The Gulf of Mexico is labeled at the bottom of the map bordering the southern states and Mexico.'},
    {text:'Arctic Ocean',isCorrect:false,rationale:'The Arctic Ocean is near the North Pole, far north of Canada.'},
    {text:'Lake Superior',isCorrect:false,rationale:'Lake Superior is at the top of the Midwest near Canada.'},
    {text:'Pacific Ocean',isCorrect:false,rationale:'The Pacific Ocean is on the far left (west) coast by California.'}], hint:'Click on the oval water label at the bottom of the U.S. map!' },
  { id:52, category:'us_regions', stage:'us_map', interactiveTarget:'Alaska and Hawaii', origin:'Expanded #52 • Regions of the U.S. Map', question:"Look at the two small inset boxes in the bottom-left corner of the 'Regions of the United States' map. Which two U.S. states are shown there because they are separated from the main 48 states?", options:[
    {text:'Alaska and Hawaii',isCorrect:true,rationale:'Alaska (AK) and Hawaii (HI) are shown in the inset boxes at the bottom-left of the U.S. map and listed in the map key.'},
    {text:'California and Texas',isCorrect:false,rationale:'California (CA) and Texas (TX) are attached to the main U.S. map.'},
    {text:'Canada and Mexico',isCorrect:false,rationale:'Canada and Mexico are neighboring countries, not U.S. states.'},
    {text:'Maine and Florida',isCorrect:false,rationale:'Maine (ME) and Florida (FL) are on the eastern coast of the main map.'}], hint:'Click on the inset box in the bottom-left corner of the interactive U.S. map!' },
  { id:53, category:'us_regions', stage:'us_map', interactiveTarget:'South', origin:'Expanded #53 • Regions of the U.S. Map', question:"Find your home state of Louisiana (labeled 'LA' on the Gulf Coast) on the 'Regions of the United States' map. Which U.S. region is Louisiana located in?", options:[
    {text:'South',isCorrect:true,rationale:'Louisiana (LA) is part of the South region, known for its warm climate, rich history, agriculture, and shipping ports.'},
    {text:'New England',isCorrect:false,rationale:'New England is in the far northeast corner (states like Maine and Massachusetts).'},
    {text:'Midwest',isCorrect:false,rationale:'The Midwest is further north around the Great Lakes.'},
    {text:'West',isCorrect:false,rationale:'The West is along the Pacific Ocean.'}], hint:"Click on the red region along the Gulf of Mexico where 'LA' is located!" },
  { id:54, category:'us_regions', stage:'us_map', interactiveTarget:'Appalachian Mountains', origin:'Expanded #54 • Major Geographic Features', question:'The United States has two major mountain ranges. The Rocky Mountains are in the western part of the country. Which major mountain range is located in the eastern part of the country?', options:[
    {text:'Appalachian Mountains',isCorrect:true,rationale:'The Appalachian Mountains run through the eastern United States, while the Rocky Mountains are in the West.'},
    {text:'Columbia Mountains',isCorrect:false,rationale:'Columbia is listed as a major U.S. river, not a mountain range.'},
    {text:'Huron Mountains',isCorrect:false,rationale:'Huron is one of the five Great Lakes.'},
    {text:'Rio Grande Mountains',isCorrect:false,rationale:'The Rio Grande is a major river along the southern border with Mexico.'}], hint:'Click on the mountain range in the eastern part of the U.S. map!' },
  { id:55, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Expanded #55 • Major Geographic Features', question:"Look at the last two bullet points in the 'Major Geographic Features' box. Which two oceans border the United States, and what four types of landforms are listed?", options:[
    {text:'Atlantic and Pacific Oceans; Deserts, Plains, Forests, and Coastlines',isCorrect:true,rationale:"The box lists 'Oceans (Atlantic, Pacific)' and 'Deserts, Plains, Forests, and Coastlines.'"},
    {text:'Indian and Arctic Oceans; Volcanoes, Glaciers, Jungles, and Swamps',isCorrect:false,rationale:"Those oceans and landforms are not the ones listed in the 'Major Geographic Features' box."},
    {text:'Southern and Atlantic Oceans; Tundra, Canyons, Islands, and Reefs',isCorrect:false,rationale:'The Southern Ocean surrounds Antarctica, not the United States.'},
    {text:'Pacific and Indian Oceans; Hills, Valleys, Plateaus, and Caves',isCorrect:false,rationale:'The Indian Ocean does not touch the United States.'}], hint:"Read the 4th and 5th bullet points in the bottom-left 'MAJOR GEOGRAPHIC FEATURES' box." },
  { id:60, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Expanded #60 • Big Idea & Think Like a Historian', question:"Read the 'BIG IDEA' and 'THINK LIKE A HISTORIAN!' boxes at the very bottom of your Bayou Bridges sheet. How do the geography and natural resources of a region affect the people who live there?", options:[
    {text:'They affect the kinds of jobs people do and the way they live.',isCorrect:true,rationale:"As 'Think Like a Historian!' highlights, a region's geography and resources shape the jobs people do (like fishing on the coast, farming on flat plains, or shipping by ports) and how they live."},
    {text:'They force everyone in the United States to do the exact same job.',isCorrect:false,rationale:'Different regions have different resources, so people do many different kinds of jobs across the country.'},
    {text:'They change the location of the Equator and Prime Meridian every winter.',isCorrect:false,rationale:'The Equator and Prime Meridian are fixed imaginary lines that never move.'},
    {text:'They make every region have the exact same weather all year.',isCorrect:false,rationale:'Regions have very different climates—like four seasons in New England and warm weather in the South.'}], hint:'Read the question next to the turtle holding a magnifying glass in the bottom-right corner!' }
] as const satisfies readonly Question[];
