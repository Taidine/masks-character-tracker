const sheetTemplate = {
    cId: '',
    playbook: '',
    name: '',
    heroName: '',
    player: '',
    powers: {label: '', value:''},
    labels: [0,0,0,0,0],
    maxLabels: 3,
    conditions: [false, false, false, false, false],
    moves: [{name: '', text:''}],
    influence: {
      by: [],
      on: [],
      not: [],
    },
    notes: [],
    potential: 0,
    advancements: [],
}

export default sheetTemplate;
