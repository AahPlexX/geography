import type { Question } from '../types';

export const compassQuestions = [
  {
    "id": 12,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "North (N)",
    "origin": "Original #12 • Compass Rose",
    "question": "On a compass rose, which group lists ONLY the four cardinal directions?",
    "options": [
      {
        "text": "Northeast, Southeast, Southwest, Northwest",
        "isCorrect": false,
        "rationale": "Those four are the intermediate directions located between the main points."
      },
      {
        "text": "North, South, East, West",
        "isCorrect": true,
        "rationale": "The four main points on a compass rose—North (N), South (S), East (E), and West (W)—are the cardinal directions."
      },
      {
        "text": "Top, Bottom, Left, Right",
        "isCorrect": false,
        "rationale": "Geographers use compass directions rather than top, bottom, left, and right."
      },
      {
        "text": "North, Northeast, South, Southeast",
        "isCorrect": false,
        "rationale": "This group mixes two cardinal directions with two intermediate directions."
      }
    ],
    "hint": "Look at the four biggest points on the compass rose labeled with single letters."
  },
  {
    "id": 13,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "Southwest (SW)",
    "origin": "Original #13 • Compass Rose",
    "question": "Look at the compass rose on your study guide. Which intermediate direction points halfway between South (S) and West (W)?",
    "options": [
      {
        "text": "Southeast (SE)",
        "isCorrect": false,
        "rationale": "Southeast is halfway between South and East."
      },
      {
        "text": "Northwest (NW)",
        "isCorrect": false,
        "rationale": "Northwest is halfway between North and West."
      },
      {
        "text": "Southwest (SW)",
        "isCorrect": true,
        "rationale": "Southwest combines South and West, pointing to the bottom-left corner between S and W."
      },
      {
        "text": "Northeast (NE)",
        "isCorrect": false,
        "rationale": "Northeast is halfway between North and East."
      }
    ],
    "hint": "Click on the smaller compass spike between S at the bottom and W on the left."
  },
  {
    "id": 14,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "Northeast (NE)",
    "origin": "Original #14 • Compass Rose",
    "question": "If you are in Africa and want to travel to Asia (moving up and to the right on the map), which intermediate direction are you traveling?",
    "options": [
      {
        "text": "Northwest (NW)",
        "isCorrect": false,
        "rationale": "Moving up and to the left is Northwest, which would take you toward North America."
      },
      {
        "text": "Southwest (SW)",
        "isCorrect": false,
        "rationale": "Moving down and to the left is Southwest, which would take you into the South Atlantic Ocean."
      },
      {
        "text": "Southeast (SE)",
        "isCorrect": false,
        "rationale": "Moving down and to the right is Southeast, which would take you toward the Indian Ocean and Australia."
      },
      {
        "text": "Northeast (NE)",
        "isCorrect": true,
        "rationale": "Moving up is North and moving right is East, so traveling up and to the right is Northeast (NE)."
      }
    ],
    "hint": "Up on the compass rose is North, and right is East. Combine those two directions!"
  },
  {
    "id": 47,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "Northwest (NW)",
    "origin": "Expanded #47 • Compass Rose",
    "question": "On the compass rose, which intermediate direction points halfway between North (N) and West (W)?",
    "options": [
      {
        "text": "Northwest (NW)",
        "isCorrect": true,
        "rationale": "Northwest (NW) is located in the top-left corner halfway between North (N) and West (W)."
      },
      {
        "text": "Northeast (NE)",
        "isCorrect": false,
        "rationale": "Northeast is halfway between North and East."
      },
      {
        "text": "Southwest (SW)",
        "isCorrect": false,
        "rationale": "Southwest is halfway between South and West."
      },
      {
        "text": "Southeast (SE)",
        "isCorrect": false,
        "rationale": "Southeast is halfway between South and East."
      }
    ],
    "hint": "Click on the NW point on the top-left of the interactive compass rose!"
  },
  {
    "id": 48,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "Southeast (SE)",
    "origin": "Expanded #48 • Compass Rose",
    "question": "On the compass rose, which intermediate direction points halfway between South (S) and East (E)?",
    "options": [
      {
        "text": "Southeast (SE)",
        "isCorrect": true,
        "rationale": "Southeast (SE) sits in the bottom-right corner halfway between South (S) and East (E)."
      },
      {
        "text": "Southwest (SW)",
        "isCorrect": false,
        "rationale": "Southwest is between South and West."
      },
      {
        "text": "Northeast (NE)",
        "isCorrect": false,
        "rationale": "Northeast is between North and East."
      },
      {
        "text": "Northwest (NW)",
        "isCorrect": false,
        "rationale": "Northwest is between North and West."
      }
    ],
    "hint": "Click on the SE point in the bottom-right corner of the compass rose!"
  },
  {
    "id": 49,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "West (W)",
    "origin": "Expanded #49 • Compass Rose",
    "question": "If a plane flies from Europe straight to the left across the Atlantic Ocean to North America, which cardinal direction is the plane flying?",
    "options": [
      {
        "text": "West (W)",
        "isCorrect": true,
        "rationale": "Moving to the left on a standard world map follows the West (W) point of the compass rose."
      },
      {
        "text": "East (E)",
        "isCorrect": false,
        "rationale": "East points to the right, which would take the plane from Europe into Asia."
      },
      {
        "text": "South (S)",
        "isCorrect": false,
        "rationale": "South points straight down, which would take the plane from Europe to Africa."
      },
      {
        "text": "North (N)",
        "isCorrect": false,
        "rationale": "North points straight up toward the Arctic Ocean."
      }
    ],
    "hint": "Click on the cardinal direction on the left side of the compass rose!"
  },
  {
    "id": 50,
    "category": "compass",
    "stage": "compass",
    "interactiveTarget": "Southeast (SE)",
    "origin": "Expanded #50 • Compass Rose",
    "question": "If you are in Europe and fly down and to the right across the map to visit Australia, which intermediate direction are you traveling?",
    "options": [
      {
        "text": "Southeast (SE)",
        "isCorrect": true,
        "rationale": "Going down on the map is South and going right is East, so traveling from Europe to Australia is Southeast (SE)."
      },
      {
        "text": "Northwest (NW)",
        "isCorrect": false,
        "rationale": "Northwest goes up and to the left."
      },
      {
        "text": "Southwest (SW)",
        "isCorrect": false,
        "rationale": "Southwest goes down and to the left toward South America."
      },
      {
        "text": "Northeast (NE)",
        "isCorrect": false,
        "rationale": "Northeast goes up and to the right."
      }
    ],
    "hint": "Down is South and right is East—click that corner on the compass rose!"
  }
] as const satisfies readonly Question[];
