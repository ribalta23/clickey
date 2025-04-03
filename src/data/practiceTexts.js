export const practiceTexts = {
  beginner: [
    {
      id: "b1",
      text: "The quick brown fox jumps over the lazy dog.",
      level: "beginner",
      focusKeys: ["home row"]
    },
    {
      id: "b2",
      text: "A fast black car drives by the old white house.",
      level: "beginner",
      focusKeys: ["home row"]
    },
    {
      id: "b3",
      text: "She sells seashells by the seashore.",
      level: "beginner",
      focusKeys: ["s key"]
    },
    {
      id: "b4",
      text: "Five boxing wizards jump quickly.",
      level: "beginner",
      focusKeys: ["varied keys"]
    }
  ],
  intermediate: [
    {
      id: "i1",
      text: "The early bird catches the worm, but the second mouse gets the cheese.",
      level: "intermediate",
      focusKeys: ["punctuation"]
    },
    {
      id: "i2",
      text: "All that glitters is not gold; all who wander are not lost.",
      level: "intermediate",
      focusKeys: ["semicolon"]
    },
    {
      id: "i3",
      text: "The best way to predict the future is to create it.",
      level: "intermediate",
      focusKeys: ["varied keys"]
    }
  ],
  advanced: [
    {
      id: "a1",
      text: "The professional programmer understands that clarity is king when writing code, and that complex expressions rarely impress anyone but their authors.",
      level: "advanced",
      focusKeys: ["long sentence"]
    },
    {
      id: "a2",
      text: "Don't judge each day by the harvest you reap, but by the seeds you plant. The journey of a thousand miles begins with a single step.",
      level: "advanced",
      focusKeys: ["punctuation", "quotation"]
    }
  ],
  daily: [
    {
      id: "d1",
      date: "2023-07-11",
      text: "Today is a perfect day to improve your typing skills and set new personal records.",
      level: "varied"
    }
  ],
  spanish: [
    {
      id: "es1",
      text: "El veloz murciélago hindú comía feliz cardillo y kiwi.",
      level: "beginner",
      focusKeys: ["special characters"]
    },
    {
      id: "es2",
      text: "La cigüeña tocaba cada vez mejor el saxofón y el búho pedía kiwi y queso.",
      level: "intermediate",
      focusKeys: ["accents"]
    }
  ]
};

export const getRandomText = (level = 'beginner') => {
  const texts = practiceTexts[level] || practiceTexts.beginner;
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
};

export const getDailyText = () => {
  return practiceTexts.daily[0] || getRandomText('intermediate');
};

export default practiceTexts;
