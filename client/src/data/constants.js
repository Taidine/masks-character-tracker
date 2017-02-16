export const labelLabels = ['Freak', 'Danger', 'Savior', 'Superior', 'Mundane'];

export const conditionLabels = ['Hopeless', 'Afraid', 'Insecure', 'Guilty', 'Angry'];

export const conditionPenalty = [
  '-2 to Unleash Your Powers',
  '-2 to Directly Engage',
  '-2 to Defend or Reject Influence',
  '-2 to Provoke or Assess',
  '-2 to Comfort/Support or Pierce the Mask',
]

export const conditionClear = [
  'Fling yourself into easy relief',
  'Run from something difficult',
  'Take foolhardy action without talking to your team',
  'Make a sacrifice to absolve your guilt',
  'Hurt someone or break something important',
]

export const playbookOpts = [
  {value: 'The Beacon', text: 'Beacon' },
  {value: 'The Bull', text: 'Bull' },
  {value: 'The Doomed', text: 'Doomed' },
  {value: 'The Delinquent', text: 'Delinquent' },
  {value: 'The Janus', text: 'Janus' },
  {value: 'The Protege', text: 'Protege' },
  {value: 'The Legacy', text: 'Legacy' },
  {value: 'The Outsider', text: 'Outsider' },
  {value: 'The Nova', text: 'Nova' },
  {value: 'The Joined', text: 'Joined' },
  {value: 'The Star', text: 'Star' },
  {value: 'The Reformed', text: 'Reformed' },
  {value: 'The Newborn', text: 'Newborn' },
  {value: 'The Innocent', text: 'Innocent' },
]

export const mockSheet1 = {
  playbook: 'The Outsider',
  name: 'Enfys Yl\'Carillon',
  heroName: 'N/A',
  player: 'Haley',
  powers: 'Flight, telepathy, sorcery',
  labels: [4, 1, 2, 4, 2],
  maxLabels: 13,
  conditions: [0, 1, 0, 0, 0],
  moves: [
    {
      name: 'Alien tech',
      text: 'When you alter a human device, roll +Freak. On a hit, you create a device that can do something impossible once and then fizzle. When you roll a 10+, choose one: it works exceptionally well, or you get an additional use out of it'
    },
    {
      name: 'Not so different after all',
      text: 'When you talk about your home, roll + Freak. On a 10+, choose two. On a 7-9, choose one. During the conversation you: confess a flaw of your home and add one team to the pool, mislead them about your home and take influence over them, or describe the glories of your home and clear a condition. On a miss you inadvertently reveal more than planned; tell them a secret or vulnerability.'
    },
  ],
  influence: {
    by: ['George'],
    on: ['Friend', 'T\'sora', 'TBD', 'George'],
    not: [],
  },
  notes: [],
  potential: 2,
  advancements: {number: 0, notes: []},
}
