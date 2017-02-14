const sheetTemplate = {
    cId: '',
    playbook: '',
    name: '',
    heroName: '',
    player: '',
    powers: '',
    labels: [0,0,0,0,0],
    maxLabels: 13,
    conditions: [false, false, false, false, false],
    moves: [],
    influence: {
      by: [],
      on: [],
      not: [],
    },
    notes: [],
    potential: 0,
    advancements: {number: 0, notes: []},
}

export default sheetTemplate;
