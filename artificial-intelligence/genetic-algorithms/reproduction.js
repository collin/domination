const { AIgenome } = require('./population')

const DEFAULT_SKILL_LEVEL = 25

// random sampling based off of Monte Carlo rejection sampling
function selectParent(genomes) {
  // random number between 0 & sum of all genomes' skill
  // as skill levels are adjusted with TrueSkill, their sum remains the same
  let random = Math.random() * DEFAULT_SKILL_LEVEL * genomes.length;
  for (var i = 0; random > 0 && i < genomes.length; i++) {
    random -= genomes[i].skill[0]
  }
  let selectedGenome = genomes[--i]
  return selectedGenome
}


function reproduce(genomes, i) {
  let parentA = selectParent(genomes)
  let parentB = selectParent(genomes)

  let CTWmin = Math.random() < 0.5
    ? parentA.chanceToWinThreshold
    : parentB.chanceToWinThreshold

  let PSQmin = Math.random() < 0.5
    ? parentA.playerStrengthQuotientThreshold
    : parentB.playerStrengthQuotientThreshold

  let attackStrategy = Math.random() < 0.5
    ? parentA.attackStrategy
    : parentB.attackStrategy

  let allotmentStrategy = Math.random() < 0.5
    ? parentA.allotmentStrategy
    : parentB.allotmentStrategy

  const MUTATION_RATE = 0.01
  let mutate = Math.random() < MUTATION_RATE
  let geneVariations = [CTWmin, PSQmin, attackStrategy, allotmentStrategy]

  if (mutate) {
    geneVariations[Math.floor(Math.random() * 4)] = null
  }

  return new AIgenome(...geneVariations, i)
}

function populateNextGeneration(genomes) {
  let nextGeneration = []
  for (let i = 1; i <= genomes.length; i++) {
    nextGeneration.push(reproduce(genomes, i))
  }
  return nextGeneration
}

module.exports = {
  selectParent,
  reproduce,
  populateNextGeneration
}
