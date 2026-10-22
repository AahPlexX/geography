import type { Question } from '../types';

export const globeQuestions = [
  { id:1, category:'globe', stage:'globe', interactiveTarget:'Equator', origin:'Original #1 • Parts of a Globe', question:'If a geographer cuts a globe in half horizontally across the very middle, what is the imaginary line along that cut called?', options:[
    {text:'Prime Meridian',isCorrect:false,rationale:'The Prime Meridian runs vertically from top to bottom rather than horizontally across the middle.'},
    {text:'Equator',isCorrect:true,rationale:'The Equator is the imaginary line running horizontally across the middle of the globe that divides it into top and bottom sections.'},
    {text:'Northern Hemisphere',isCorrect:false,rationale:'The Northern Hemisphere is the entire top half of the globe, not the imaginary dividing line itself.'},
    {text:'Compass Rose',isCorrect:false,rationale:'A compass rose is a symbol on a map that shows directions, not an imaginary line around the Earth.'}], hint:'Think about the red horizontal line traced across the middle of the globe on your worksheet.' },
  { id:2, category:'globe', stage:'globe', interactiveTarget:'Prime Meridian', origin:'Original #2 • Parts of a Globe', question:'Which two hemispheres are created when the Earth is divided vertically by the Prime Meridian?', options:[
    {text:'Northern and Southern',isCorrect:false,rationale:'The Northern and Southern Hemispheres are created by cutting the globe horizontally along the Equator.'},
    {text:'Eastern and Western',isCorrect:true,rationale:'Cutting the globe vertically along the Prime Meridian creates the Western Hemisphere on the left and the Eastern Hemisphere on the right.'},
    {text:'Atlantic and Pacific',isCorrect:false,rationale:'Atlantic and Pacific are the names of oceans, not halves of the globe.'},
    {text:'Cardinal and Intermediate',isCorrect:false,rationale:'Cardinal and intermediate are types of directions on a compass rose, not hemispheres.'}], hint:"Look at the second globe on your 'Parts of a Globe' sheet that was colored orange and yellow." },
  { id:3, category:'globe', stage:'globe', interactiveTarget:null, origin:'Original #3 • Parts of a Globe', question:'Why does a globe show the shapes of the continents and where they are in relation to one another more accurately than a flat map you keep in a car?', options:[
    {text:'Because a globe is round like the Earth.',isCorrect:true,rationale:'Since the Earth is a round sphere, a round globe represents the true shapes and positions of the continents without stretching them.'},
    {text:'Because a globe has a compass rose painted on the ocean.',isCorrect:false,rationale:'Both flat maps and globes can have a compass rose, so that does not make the shapes of continents more accurate.'},
    {text:'Because a globe only shows the Western Hemisphere.',isCorrect:false,rationale:'A globe shows all four hemispheres when you spin it around.'},
    {text:'Because a globe is larger than the real Earth.',isCorrect:false,rationale:'A globe is a small model that is much smaller than the real Earth.'}], hint:"Read the very first paragraph on your 'Parts of a Globe' worksheet." },
  { id:31, category:'globe', stage:'globe', interactiveTarget:'Northern Hemisphere', origin:'Expanded #31 • Parts of a Globe', question:"On your 'Parts of a Globe' worksheet, what color were you instructed to color the Northern Hemisphere (the top section above the Equator)?", options:[
    {text:'Green',isCorrect:true,rationale:"The worksheet says 'Color the Northern Hemisphere green,' which is the top half above the red Equator."},
    {text:'Blue',isCorrect:false,rationale:'Blue was used for the Southern Hemisphere on the bottom half.'},
    {text:'Orange',isCorrect:false,rationale:'Orange was used for the Western Hemisphere on the second globe.'},
    {text:'Yellow',isCorrect:false,rationale:'Yellow was used for the Eastern Hemisphere on the second globe.'}], hint:'Click on the top half of the left globe in the interactive diagram!' },
  { id:32, category:'globe', stage:'globe', interactiveTarget:'Southern Hemisphere', origin:'Expanded #32 • Parts of a Globe', question:"On your 'Parts of a Globe' worksheet, which hemisphere is on the bottom section of the horizontally cut globe and colored blue?", options:[
    {text:'Northern Hemisphere',isCorrect:false,rationale:'The Northern Hemisphere is the top section colored green.'},
    {text:'Southern Hemisphere',isCorrect:true,rationale:'The bottom section below the Equator is the Southern Hemisphere, which you colored blue.'},
    {text:'Western Hemisphere',isCorrect:false,rationale:'The Western Hemisphere is the left half of the vertically cut globe.'},
    {text:'Eastern Hemisphere',isCorrect:false,rationale:'The Eastern Hemisphere is the right half of the vertically cut globe.'}], hint:'Click on the blue bottom half of the first globe!' },
  { id:33, category:'globe', stage:'globe', interactiveTarget:'Western Hemisphere', origin:'Expanded #33 • Parts of a Globe', question:"Look at the bottom globe on your 'Parts of a Globe' sheet. Which hemisphere is on the left side of the Prime Meridian and colored orange?", options:[
    {text:'Eastern Hemisphere',isCorrect:false,rationale:'The Eastern Hemisphere is on the right side and colored yellow.'},
    {text:'Western Hemisphere',isCorrect:true,rationale:'The left half of the globe cut vertically by the Prime Meridian is the Western Hemisphere (colored orange).'},
    {text:'Northern Hemisphere',isCorrect:false,rationale:'The Northern Hemisphere is the top half above the Equator.'},
    {text:'Southern Hemisphere',isCorrect:false,rationale:'The Southern Hemisphere is the bottom half below the Equator.'}], hint:'Click on the orange left half of the second globe!' },
  { id:34, category:'globe', stage:'globe', interactiveTarget:'Eastern Hemisphere', origin:'Expanded #34 • Parts of a Globe', question:"On the bottom globe of your 'Parts of a Globe' worksheet, which hemisphere is to the right of the purple Prime Meridian and colored yellow?", options:[
    {text:'Eastern Hemisphere',isCorrect:true,rationale:'The right half of the vertically divided globe is the Eastern Hemisphere, colored yellow on your sheet.'},
    {text:'Western Hemisphere',isCorrect:false,rationale:'The Western Hemisphere is on the left side and colored orange.'},
    {text:'Southern Hemisphere',isCorrect:false,rationale:'The Southern Hemisphere is the bottom half below the Equator.'},
    {text:'Northern Hemisphere',isCorrect:false,rationale:'The Northern Hemisphere is the top half above the Equator.'}], hint:'Click on the yellow right half of the second globe!' },
  { id:35, category:'globe', stage:'globe', interactiveTarget:'Equator', origin:'Expanded #35 • Parts of a Globe', question:"Look closely at the degree numbers on the globes on your 'Parts of a Globe' worksheet. What degree measurement is labeled right on the Equator?", options:[
    {text:'0°',isCorrect:true,rationale:'The Equator is the starting line for latitude and is labeled 0° on the far right edge of both globes on your worksheet.'},
    {text:'30°',isCorrect:false,rationale:'30° is the line halfway between the Equator and 60°.'},
    {text:'60°',isCorrect:false,rationale:'60° is the line closer to the top and bottom poles of the globe.'},
    {text:'100°',isCorrect:false,rationale:'100° does not appear on the globe diagram.'}], hint:'Look at the degree number right next to the Equator line on the right edge of the globe.' },
  { id:36, category:'globe', stage:'globe', interactiveTarget:null, origin:'Expanded #36 • Parts of a Globe', question:"In the third paragraph of 'Parts of a Globe,' the text says: 'Another way to partition the globe is to cut it in half vertically.' What does the word 'partition' mean here?", options:[
    {text:'To divide or separate into parts',isCorrect:true,rationale:'To partition the globe means to divide or cut it into separate halves (hemispheres).'},
    {text:'To spin the globe in a circle',isCorrect:false,rationale:'Spinning the globe does not divide it into halves.'},
    {text:'To color the oceans blue',isCorrect:false,rationale:'Coloring is an art activity, whereas partitioning means dividing into sections.'},
    {text:'To fold a paper map in your car',isCorrect:false,rationale:'Partitioning refers to dividing the globe into hemispheres.'}], hint:"Look at the root word 'part' inside the word 'partition'!" },
  { id:37, category:'globe', stage:'globe', interactiveTarget:null, origin:'Expanded #37 • Parts of a Globe', question:"How many total hemispheres (parts of the globe) are taught on your 'Parts of a Globe' worksheet?", options:[
    {text:'Two',isCorrect:false,rationale:'Cutting horizontally makes two and cutting vertically makes two more, for a total of four.'},
    {text:'Four',isCorrect:true,rationale:"The worksheet states: 'There are four parts to the globe'—Northern, Southern, Eastern, and Western Hemispheres."},
    {text:'Five',isCorrect:false,rationale:'There are five oceans, not five hemispheres.'},
    {text:'Seven',isCorrect:false,rationale:'There are seven continents, not seven hemispheres.'}], hint:"Count the boxes at the bottom of your 'Hemispheres' sorting worksheet!" }
] as const satisfies readonly Question[];
