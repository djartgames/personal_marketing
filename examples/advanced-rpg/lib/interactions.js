import { Interaction } from 'edwin';

const guardDialogue = new Interaction({
  id: 'guard_dialogue',
  steps: [
    {
      id: 'challenge',
      text: 'Halt! The vault is sealed. Only those bearing the Moon Key may pass.',
      options: [
        { label: 'I have the Silver Key!', next: 'pass' },
        { label: 'I was just exploring.', next: 'dismiss' },
      ],
    },
    {
      id: 'pass',
      text: 'Very well. The vault awaits you.',
      options: [{ label: 'Thank you.', next: null }],
    },
    {
      id: 'dismiss',
      text: "Move along then. Don't cause trouble.",
      options: [{ label: 'Of course.', next: null }],
    },
  ],
});

const merchantDialogue = new Interaction({
  id: 'merchant_dialogue',
  steps: [
    {
      id: 'welcome',
      text: 'Greetings! I deal in rare artefacts. Looking for something special?',
      options: [
        { label: 'Tell me about your wares.', next: 'wares' },
        { label: "I'm just passing through.", next: 'farewell' },
      ],
    },
    {
      id: 'wares',
      text: 'I have the finest Silver Key – opens the vault beneath the citadel.',
      options: [
        {
          label: "I'll take the key.",
          next: 'sold',
          action: (gameState) => {
            gameState.flags = gameState.flags ?? {};
            gameState.flags.boughtKey = true;
          },
        },
        { label: 'Too expensive.', next: 'farewell' },
      ],
    },
    {
      id: 'sold',
      text: 'A wise purchase. May it serve you well.',
      options: [{ label: 'Farewell.', next: null }],
    },
    {
      id: 'farewell',
      text: 'Safe travels!',
      options: [{ label: 'Bye.', next: null }],
    },
  ],
});

export { guardDialogue, merchantDialogue };
