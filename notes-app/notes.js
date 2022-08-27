const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => "Your notes...";

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json'))
    } catch (e) {
        return []
    }
};

const saveNotes = (note) => fs.writeFileSync('notes.json', JSON.stringify(note));

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    };
};

const removeNote = (title) => {
    const notes = loadNotes()
    const clearedNote = notes.filter(item => !(item.title === title));

    if (clearedNote.length !== notes.length) {
        saveNotes(clearedNote);
        console.log(chalk.green.inverse(title + ' removed!'));
    } else {
        console.log(chalk.red.inverse(title + ' not exist!'));
    }
};

const listNote = () => {
    console.log(chalk.yellow.inverse('Your note is:'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()

    try {
        const result = notes.find(note => note.title === title);
        console.log(chalk.yellow.inverse(result.title));
        console.log(result.body);
    } catch(e) {
        console.log(chalk.red.inverse('Title not found!'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
};