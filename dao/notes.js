const Notes = require('../model/notes');

const addNotes = async ({ title, content }, uid) => {
    try {
        const checkExisting = await Notes.findOne({ title, content, uid });
        console.log('the checkExisting value:', checkExisting)
        if (checkExisting) {
            return { error: 'Provided note already exists' }
        }
        const addNotes = await Notes.create({ title: title, content: content, uid: uid });
        console.log('the addNotes value:', addNotes)
        return { value: addNotes }
    } catch (error) {
        console.log('the error received is:', error)
        return { error: error }
    }
}

const getNotes = async (uid) => {
    try {
        const notes = await Notes.find({ uid }).select('title content');
        return { value: notes }
    } catch (error) {
        return { error: error }
    }
}

const editNotes = async (noteId, { title, content }, uid) => {
    try {
        const editNotes = await Notes.findOneAndUpdate({ _id: noteId, uid }, { title: title, content: content });
        return { value: editNotes }
    } catch (error) {
        return { error: error }
    }
}

const deleteNote = async (uid, notesId) => {
    try {
        const noteDelete = await Notes.findOneAndRemove({ _id: notesId, uid })
        return { value: noteDelete }
    } catch (error) {
        return { error: error }
    }
}

const getNotesOnQuery = async (uid, queryString) => {
    try {
        const notes = await Notes.find({ uid, $or: [{ title: { "$regex": queryString, "$options": "i" } }, { content: { "$regex": queryString, "$options": "i" } }] }).select('title content');
        return { value: notes }
    } catch (error) {
        return { error: error }
    }
}

module.exports = {
    addNotes,
    getNotes,
    editNotes,
    deleteNote,
    getNotesOnQuery
}