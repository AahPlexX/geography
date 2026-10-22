import type { Question } from '../types';

export const symbolQuestions = [
  { id:28, category:'symbols', stage:'symbols', interactiveTarget:'Bald Eagle', origin:'Original #28 • National Symbols', question:"Looking at the 'National Symbols' box, which living bird is a national symbol of the United States?", options:[
    {text:'Bayou Turtle',isCorrect:false,rationale:'The turtle is the mascot for the Bayou Bridges worksheet, not an official U.S. national symbol in the box.'},
    {text:'Bald Eagle',isCorrect:true,rationale:"The Bald Eagle is shown in the top middle of the 'National Symbols' box and at the top right of the page."},
    {text:'American Robin',isCorrect:false,rationale:"The American Robin is not listed in the 'National Symbols' box."},
    {text:'Wild Turkey',isCorrect:false,rationale:"The Wild Turkey is not shown in the 'National Symbols' box."}], hint:"Click on or choose the large bird with white head feathers in the 'NATIONAL SYMBOLS' box." },
  { id:29, category:'symbols', stage:'symbols', interactiveTarget:'Statue of Liberty', origin:'Original #29 • National Symbols', question:"Which three famous buildings or monuments are shown in the bottom row of the 'National Symbols' box?", options:[
    {text:'Golden Gate Bridge, Lighthouse, and Farm Silo',isCorrect:false,rationale:'Those are illustrations for the regions, not the national symbols in the bottom box.'},
    {text:'Statue of Liberty, The White House, and Washington Monument',isCorrect:true,rationale:"The bottom row of the 'National Symbols' box displays the Statue of Liberty, The White House, and the Washington Monument."},
    {text:'American Flag, Bald Eagle, and Liberty Bell',isCorrect:false,rationale:'Those three symbols are in the top row of the box, and they are not buildings or monuments.'},
    {text:'Rocky Mountains, Great Lakes, and Mississippi River',isCorrect:false,rationale:'Those are natural geographic features, not human-made buildings or monuments.'}], hint:"Look at the bottom row inside the 'NATIONAL SYMBOLS' section." },
  { id:30, category:'symbols', stage:'symbols', interactiveTarget:'American Flag', origin:'Original #30 • Why Symbols Matter', question:"According to the 'Why Symbols Matter' section, why are national symbols like the American Flag and the Liberty Bell important to people in the United States?", options:[
    {text:'They tell sailors which direction is North, South, East, or West.',isCorrect:false,rationale:'A compass rose shows directions to sailors, not national symbols.'},
    {text:"They stand for our country's values, history, and freedom, and help us feel proud to be Americans.",isCorrect:true,rationale:"The 'Why Symbols Matter' box explains that national symbols stand for our country's values, history, and freedom, and help us feel proud to be Americans."},
    {text:'They divide the Earth into the Northern and Southern Hemispheres.',isCorrect:false,rationale:'The Equator divides the Earth into the Northern and Southern Hemispheres.'},
    {text:'They show where the Rocky Mountains meet the Great Plains.',isCorrect:false,rationale:'Maps show where mountain ranges and plains meet.'}], hint:'Read the text right above the three smiling children with their hands over their hearts.' },
  { id:56, category:'symbols', stage:'symbols', interactiveTarget:'Liberty Bell', origin:'Expanded #56 • National Symbols', question:"Which national symbol in the 'National Symbols' box is a famous historic bell with a large crack down its side that stands for American independence and freedom?", options:[
    {text:'Liberty Bell',isCorrect:true,rationale:"The Liberty Bell is shown in the top-right corner of the 'National Symbols' box with its famous crack."},
    {text:'Washington Monument',isCorrect:false,rationale:'The Washington Monument is a tall stone obelisk tower, not a bell.'},
    {text:'Statue of Liberty',isCorrect:false,rationale:'The Statue of Liberty is a giant statue holding a torch in New York Harbor.'},
    {text:'The White House',isCorrect:false,rationale:'The White House is the building where the President lives and works.'}], hint:'Click on the bell picture in the interactive National Symbols gallery!' },
  { id:57, category:'symbols', stage:'symbols', interactiveTarget:'The White House', origin:'Expanded #57 • National Symbols', question:"Which national symbol shown in the 'National Symbols' box is the famous building in Washington, D.C., where the President of the United States lives and works?", options:[
    {text:'The White House',isCorrect:true,rationale:"The White House is the iconic building with columns shown in the bottom-middle of the 'National Symbols' box."},
    {text:'Washington Monument',isCorrect:false,rationale:'The Washington Monument is a tall pointed stone monument honoring George Washington, not the house where the President lives.'},
    {text:'Statue of Liberty',isCorrect:false,rationale:'The Statue of Liberty is a monument on an island in New York Harbor.'},
    {text:'Liberty Bell',isCorrect:false,rationale:'The Liberty Bell is an historic bell in Philadelphia.'}], hint:'Click on the building with columns in the middle of the bottom row!' },
  { id:58, category:'symbols', stage:'symbols', interactiveTarget:'Washington Monument', origin:'Expanded #58 • National Symbols', question:"Which national symbol in the bottom-right corner of the 'National Symbols' box is a tall, pointed stone tower in Washington, D.C., built to honor our country's first president?", options:[
    {text:'Washington Monument',isCorrect:true,rationale:"The Washington Monument is the tall obelisk tower shown in the bottom-right of the 'National Symbols' box."},
    {text:'Statue of Liberty',isCorrect:false,rationale:'The Statue of Liberty is a robed figure holding a torch.'},
    {text:'The White House',isCorrect:false,rationale:'The White House is a wide building with columns.'},
    {text:'American Flag',isCorrect:false,rationale:'The American Flag is made of cloth with stars and stripes.'}], hint:'Click on the tall pointed monument in the bottom-right corner of the Symbols gallery!' },
  { id:59, category:'symbols', stage:'symbols', interactiveTarget:'Statue of Liberty', origin:'Expanded #59 • National Symbols', question:'Which national symbol stands on an island in the Mid-Atlantic region holding a torch high in the air to welcome people to America and symbolize freedom?', options:[
    {text:'Statue of Liberty',isCorrect:true,rationale:"The Statue of Liberty is pictured both next to the Mid-Atlantic region box and in the bottom-left of the 'National Symbols' box."},
    {text:'Bald Eagle',isCorrect:false,rationale:'The Bald Eagle is our national bird.'},
    {text:'Liberty Bell',isCorrect:false,rationale:'The Liberty Bell is a metal bell, not a statue holding a torch.'},
    {text:'The White House',isCorrect:false,rationale:'The White House is a building in Washington, D.C.'}], hint:"Look at the statue holding a torch next to the 'MID-ATLANTIC' box and in the 'NATIONAL SYMBOLS' box!" }
] as const satisfies readonly Question[];
