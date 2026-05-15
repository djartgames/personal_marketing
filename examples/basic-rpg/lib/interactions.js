import { Interaction } from 'edwin';

const innkeeperDialogue = new Interaction({
  id: 'innkeeper_greeting',
  steps: [
    {
      id: 'intro',
      text: 'Welcome to the Rusty Flagon! What can I do for you?',
      options: [
        { label: 'Just looking around.', next: 'farewell' },
        { label: 'I need a room.', next: 'room' },
        { label: 'Goodbye.', next: null },
      ],
    },
    {
      id: 'room',
      text: "That'll be 5 gold coins. We've a cosy spot by the fire.",
      options: [
        { label: "Sounds good, I'll take it.", next: 'farewell' },
        { label: 'Maybe later.', next: 'intro' },
      ],
    },
    {
      id: 'farewell',
      text: 'Safe travels, friend!',
      options: [{ label: 'Goodbye.', next: null }],
    },
  ],
});

export { innkeeperDialogue };
