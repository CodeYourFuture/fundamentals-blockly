const fs = require('fs')
const path = require('path');

const btcContents = fs.readFileSync(path.join(__dirname, 'blocks-to-categories.json'))
const btcJson = JSON.parse(btcContents)

function parseToolbox(text) {
    const blockPattern = /<!--block-->(\w+)<!--\/block-->/g

    let blocks = [...text.matchAll(blockPattern)]
        .map((block) => block[1])

    blocks = [...new Set(blocks)]

    let categories = {}
    let toolboxContents = []

    for (let blockName of blocks) {
        if (!(blockName in btcJson)) {
            console.warn(`${blockName} not defined in blocks-to-categories.json`)
            continue
        }

        const blockDetails = btcJson[blockName]
        const categoryName = blockDetails.categoryType

        const blockEntry = {
            kind: 'block',
            type: blockDetails.blockType
        }

        if ('blockxml' in blockDetails) { blockEntry.blockxml = blockDetails.blockxml }

        if (categoryName in categories) {
            categories[categoryName].push(blockEntry)
        } else {
            categories[categoryName] = [blockEntry]
        }
    }

    for (let category in categories) {
        toolboxContents.push({
            kind: "category",
            name: category,
            contents: categories[category]
        })
    }

    return JSON.stringify({
        kind: "categoryToolbox",
        contents: toolboxContents
    }, null, 2)
}

function writeExercisesIndexJs(exerciseInputDir) {
    let exercisesFileNames = fs.readdirSync(exerciseInputDir).filter((filename) => filename.endsWith('.md'))

    exercisesFileNames.forEach((filename) => {
        const filePath = path.join(exerciseInputDir, filename)
        const fileText = fs.readFileSync(filePath, 'utf8')
        const filenameNoExt = filename.slice(0, -3)

        const exerciseOutputDir = path.join(__dirname, '..', 'src', 'Exercises', filenameNoExt)
        const exerciseMd = path.join(exerciseOutputDir, 'lesson.md')
        const exerciseIndexJs = path.join(exerciseOutputDir, 'index.js')

        fs.mkdirSync(exerciseOutputDir, { recursive: true })
        fs.copyFileSync(filePath, exerciseMd)

        const exerciseIndexJsContent = `
import LessonMarkdown from "../../LessonMarkdown";
import markdownUrl from "./lesson.md";

export function Lesson() {
    return <LessonMarkdown url={markdownUrl} />;
}

export const toolbox = ${parseToolbox(fileText)}`

        fs.writeFileSync(exerciseIndexJs, exerciseIndexJsContent)
    })
}

function writeRootExercisesIndexJs(exerciseInputDir) {
    let exercisesFileNames = fs.readdirSync(exerciseInputDir).filter((filename) => filename.endsWith('.md'))
    const exerciseAliases = []

    let rootIndexJsContent = ""
    const rootIndexJs = path.join(__dirname, '..', 'src', 'Exercises', 'index.js')

    exercisesFileNames.forEach((filename) => {
        let exerciseNoExt = filename.slice(0,-3)

        // Starting with _ so that the alias is ES6 compatible, in case file name starts with number
        let exerciseAlias = `_${exerciseNoExt.replaceAll('-', '_')}`

        exerciseAliases.push(exerciseAlias)

        rootIndexJsContent += `import * as ${exerciseAlias} from "./${exerciseNoExt}"\n`
    })

    rootIndexJsContent += `\n\nexport default ${JSON
        .stringify(exerciseAliases, null, 2)
        .replaceAll('"', '')}`

    fs.writeFileSync(rootIndexJs, rootIndexJsContent)
}

function generateExercises() {
    const rootDir = path.join(__dirname, '..')
    const relExerciseInputDir = './exercises'

    const absExerciseInputDir = path.join(rootDir, './exercises')

    // Create exercises folders and index
    writeExercisesIndexJs(absExerciseInputDir)

    // Create root exercises index
    writeRootExercisesIndexJs(absExerciseInputDir)
}

generateExercises()