import { genPieMockData, shuffleArray, opDigits } from '../dist/index'

const arr = ['a', 'b', 'c', 'd', 'e']

const pieData = genPieMockData(arr)
console.log('pie', pieData)

const shuffleData = shuffleArray(arr)
console.log('shuffle', shuffleData)

const opNumber = opDigits(1.234)
console.log(opNumber)
