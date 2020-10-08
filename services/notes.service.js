const NotesDao = require('../dao/notes');

const addNotes = async (notes, uid) => {
    try {
        const { value, error } = await NotesDao.addNotes(notes, uid);
        if (error) {
            return { error: error };
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

const getNotes = async (uid) => {
    try {
        const { value, error } = await NotesDao.getNotes(uid);
        if (error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

const editNotes = async (noteId, notes, uid) => {
    console.log(notes)
    console.log(`At service:\n noteId:${noteId},notes:${notes},uid:${uid}`)
    try {
        const { value, error } = await NotesDao.editNotes(noteId, notes, uid);
        if (error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

const deleteNote = async (uid, notesId) => {
    try {
        const { value, error } = await NotesDao.deleteNote(uid, notesId);
        if (error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

const getNotesForQuery = async (uid, queryString) => {
    try {
        const { value, error } = await NotesDao.getNotesOnQuery(uid, queryString);
        if (error) {
            return { error: error }
        }
        return { value: value }
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    addNotes,
    getNotes,
    editNotes,
    deleteNote,
    getNotesForQuery
}