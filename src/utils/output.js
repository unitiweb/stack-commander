const term = require('terminal-kit').terminal
const { cleanLines } = require('./helpers')

const maxLineLength = 100

const headerLine = (topSpace = false, bottomSpace = false, character = '=') => {
    if (topSpace) term("\n")
    term.green(character.repeat(maxLineLength) + "\n")
    if (bottomSpace) term("\n")
}

/**
 * Create a header line
 *
 * @param text The header test
 * @param topLine Boolean to show top line
 * @param bottomLine Boolean to show bottom line
 * @param callback Callback to add addition inside lines of text
 */
const header = (text, topLine = true, bottomLine = true) => {
    // Add a top line if necessary
    if (topLine) headerLine(true)

    // Add the header text and mike it all uppercase
    term.green(` ${text.toUpperCase()}\n`)

    // Add a bottom line if necessary
    if (bottomLine) headerLine(false, true)
}

const commands = (list) => {
    for (let i = 0; i < list.length; i++) {
        const cmd = list[i]
        if (cmd.path && cmd.path.length > 0) {
            spacer()
            term.green(`  | path: ${cmd.path}\n`);
        }

        let params = ''
        // Add a spacer prefix if params is not empty
        // Also, only set params on the last command in the list
        if (cmd.params.length > 0 && i === (list.length - 1)) {
            params = ' ' + cmd.params
        }

        for (let ii = 0; ii < cmd.commands.length; ii++) {
            term.yellow(cleanLines(cmd.commands[ii].trim() + params, '  |--> '))
            spacer()
        }
    }
}

const description = (text) => {
    term(cleanLines(text, '    '))
}

const spacer = () => {
    term("\n")
}

const error = (text) => {
    const line = '-'.repeat(maxLineLength)
    term.red(`\n\n${line}\n`)
    term.bold.red(` -- ${text}\n`)
    term.red(`${line}\n\n`)
    process.exit(1)
}

module.exports = {
    headerLine,
    header,
    commands,
    description,
    spacer,
    error
}
