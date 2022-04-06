import { readdirSync } from 'fs'
import btc from 'blocksToCategories'
import exp from 'constants'

function ParseToolbox(text) {
    const blockPattern = /<!--block-->(\w+)<!--\/block-->/g
    const toolbox = {
        kind: "categoryToolbox",
        contents: []
    }

    let blocks = [...text.matchAll(blockPattern)]
        .map((block) => {
            block[1]
        })

    blocks = [...new Set(blocks)]

    let categories = {}
    let toolboxContents = []

    for (let blockName of blocks) {
        if (categories[btc[blockName]]) {
            categories[btc[blockName]].push({
                kind: 'block',
                type: blockName
            })
        } else {
            categories[btc[blockName]] = [{
                kind: 'block',
                type: blockName
            }]
        }
    }

    for (let category in categories) {
        toolboxContents.push({
            kind: "category",
            name: category,
            contents: categories[category]
        })
    }

    return {
        kind: "categoryToolbox",
        contents: toolboxContents
    }
}

function Exercises(dir) {
    let exercises = readdirSync(dir).filter((filename) => {
        filename.endsWith('.md')
    })

    exercises.map((filename) => {
        const res = await fetch(filename);
        const fileText = await res.text();

        return {
            'markdown': fileText,
            'toolbox': ParseToolbox(fileText)
        }
    })

    return exercises
}

export const exercises = Exercises('./')