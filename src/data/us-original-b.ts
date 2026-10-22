import type { Question } from '../types';

export const usOriginalQuestionsB = [
  { id:22, category:'us_regions', stage:'us_map', interactiveTarget:'Midwest', origin:'Original #22 • U.S. Regions', question:"Which region of the United States is famous as the 'Breadbasket of America' and has major industries in farming, automobiles, and food processing?", options:[
    {text:'New England',isCorrect:false,rationale:'New England is known for shipbuilding, fishing, education, and tourism.'},
    {text:'Midwest',isCorrect:true,rationale:"The Midwest box specifically calls this region the 'Breadbasket of America' with farms, factories, automobiles, and food processing."},
    {text:'Mid-Atlantic',isCorrect:false,rationale:'The Mid-Atlantic is known for Washington, D.C., banking, health care, and government.'},
    {text:'South',isCorrect:false,rationale:'The South is known for warm climate crops like cotton, tobacco, and rice.'}], hint:'Look for the region box with a picture of a tractor and a farm silo.' },
  { id:23, category:'us_regions', stage:'us_map', interactiveTarget:'South', origin:'Original #23 • U.S. Regions', question:'A farmer grows cotton, tobacco, and rice in a region with a warm climate, rich history, and busy shipping ports. Which region does this farmer live in?', options:[
    {text:'South',isCorrect:true,rationale:'The South region has a warm climate, rich history, and agriculture focused on cotton, tobacco, and rice, plus shipping and tourism.'},
    {text:'New England',isCorrect:false,rationale:'New England has cold winters and four very different seasons, which is not suited for growing cotton and rice.'},
    {text:'Great Plains',isCorrect:false,rationale:'The Great Plains focuses on wheat, corn, cattle, and natural gas.'},
    {text:'Midwest',isCorrect:false,rationale:'The Midwest is north of the South and has colder winters.'}], hint:'This is the region where Louisiana is located!' },
  { id:24, category:'us_regions', stage:'us_map', interactiveTarget:'West', origin:'Original #24 • U.S. Regions', question:'Which U.S. region includes mountains, deserts, and long coastlines along the Pacific Ocean, and has industries in movies, technology, and aerospace?', options:[
    {text:'Mid-Atlantic',isCorrect:false,rationale:'The Mid-Atlantic is along the Atlantic Ocean, not the Pacific Ocean.'},
    {text:'West',isCorrect:true,rationale:'The West region box lists mountains, deserts, long coastlines, technology, movies, tourism, and aerospace.'},
    {text:'Midwest',isCorrect:false,rationale:'The Midwest is in the northern center of the country near the Great Lakes.'},
    {text:'New England',isCorrect:false,rationale:'New England is in the far northeast along the Atlantic Ocean.'}], hint:'Look at the region box on the far right with a picture of the Golden Gate Bridge.' },
  { id:25, category:'us_regions', stage:'us_map', interactiveTarget:'Rocky Mountains', origin:'Original #25 • Major Geographic Features', question:"According to the 'Major Geographic Features' box, which two major mountain ranges are located in the United States?", options:[
    {text:'Superior Mountains and Michigan Mountains',isCorrect:false,rationale:'Superior and Michigan are two of the Great Lakes, not mountain ranges.'},
    {text:'Rocky Mountains and Appalachian Mountains',isCorrect:true,rationale:"The first bullet point under 'Major Geographic Features' lists the Rocky Mountains and Appalachian Mountains."},
    {text:'Mississippi Mountains and Colorado Mountains',isCorrect:false,rationale:'Mississippi and Colorado are listed as major U.S. rivers.'},
    {text:'Atlantic Mountains and Pacific Mountains',isCorrect:false,rationale:'Atlantic and Pacific are the two oceans bordering the United States.'}], hint:"Read the first bullet point in the 'MAJOR GEOGRAPHIC FEATURES' box in the bottom-left corner." },
  { id:26, category:'us_regions', stage:'us_map', interactiveTarget:null, origin:'Original #26 • Major Geographic Features', question:'Which group lists ONLY major rivers of the United States from your study guide?', options:[
    {text:'Superior, Michigan, Huron, Erie',isCorrect:false,rationale:'Those are four of the Great Lakes, not rivers.'},
    {text:'Mississippi, Colorado, Columbia, Rio Grande',isCorrect:true,rationale:"The second bullet point under 'Major Geographic Features' lists the Mississippi, Colorado, Columbia, and Rio Grande as major rivers."},
    {text:'Rocky, Appalachian, Great Plains, Midwest',isCorrect:false,rationale:'Those are mountain ranges and regions, not rivers.'},
    {text:'Atlantic, Pacific, Indian, Arctic',isCorrect:false,rationale:'Those are oceans of the world, not rivers.'}], hint:"Check the second bullet point under 'MAJOR GEOGRAPHIC FEATURES'." },
  { id:27, category:'us_regions', stage:'us_map', interactiveTarget:'Great Lakes', origin:'Original #27 • Major Geographic Features', question:"How many Great Lakes are listed in the 'Major Geographic Features' box, and what are their names?", options:[
    {text:'Four: Mississippi, Colorado, Columbia, and Rio Grande',isCorrect:false,rationale:'Those four are the major rivers listed on your sheet, not the Great Lakes.'},
    {text:'Five: Superior, Michigan, Huron, Erie, and Ontario',isCorrect:true,rationale:'There are five Great Lakes listed: Superior, Michigan, Huron, Erie, and Ontario (often remembered with the word HOMES).'},
    {text:'Two: Atlantic and Pacific',isCorrect:false,rationale:'Atlantic and Pacific are oceans, not lakes.'},
    {text:'Three: Canada, Mexico, and Gulf of Mexico',isCorrect:false,rationale:'Canada and Mexico are countries, and the Gulf of Mexico is a body of salt water connected to the ocean.'}], hint:'You can remember the five Great Lakes using the letters H-O-M-E-S!' }
] as const satisfies readonly Question[];
