const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated } = require('../services/auth.service');
const NotesService = require('../services/notes.service');
const UserService = require('../services/user.service');

router.param('uid', async (req, res, next, id) => {
    try {
        const { value, error } = await UserService.getUserById(id);
        if (error || !value) {
            res.status(400).json({
                message: 'User details couldn\'t be found',
                response: error
            })
        } else {
            req.profile = value;
        }
        next();
    } catch (error) {
        res.status(400).json({
            message: `User details couldn't be fetched`,
            response: error
        })
    }
})

router.post('/addNotes/:uid', [isSignedIn, isAuthenticated], async (req, res) => {
    try {
        const { value, error } = await NotesService.addNotes(req.body, req.profile._id);
        if (error || !value) {
            res.status(400).json({
                message: 'Failed to add notes',
                response: error
            })
        } else {
            res.status(200).json({
                message: 'Notes added successfully',
                response: value
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to add notes',
            response: error
        })
    }
})

router.get('/listNotes/:uid', [isSignedIn, isAuthenticated], async (req, res) => {
    try {
        const { value, error } = await NotesService.getNotes(req.profile._id);
        if (error || !value) {
            res.status(400).json({
                message: 'User notes could not be fetched',
                response: error
            })
        } else {
            res.status(200).json({
                message: 'User data fetched successfully',
                response: value
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'User notes could not be fetched!',
            response: error
        })
    }
})

router.put('/editNotes/:uid/:noteId', [isSignedIn, isAuthenticated], async (req, res) => {
    try {
        const { value, error } = await NotesService.editNotes(req.params.noteId, req.body, req.profile._id);
        if (error || !value) {
            res.status(400).json({
                message: `Failed to edit user notes`,
                response: error
            })
        } else {
            res.status(200).json({
                message: 'User notes edited successfully',
                response: value
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to edit notes',
            response: error
        })
    }
})

router.delete('/deleteNotes/:uid/:noteId', [isSignedIn, isAuthenticated], async (req, res) => {
    try {
        const { value, error } = await NotesService.deleteNote(req.profile._id, req.params.noteId)
        if (error || !value) {
            res.status(400).json({
                message: `Failed to delete user note`,
                response: error
            })
        } else {
            res.status(200).json({
                message: `User note deleted successfully`,
                response: value
            })
        }
    } catch (error) {
        res.status(400).json({
            message: `Failed to delete user notes`,
            response: error
        })
    }
})

router.get('/searchNotes/:uid/:queryString', [isSignedIn, isAuthenticated], async (req, res) => {
    try {
        const { value, error } = await NotesService.getNotesForQuery(req.profile._id, req.params.queryString);
        if (error || !value) {
            res.status(400).json({
                message: 'Failed to fetch user notes with the given query string',
                response: error
            })
        } else {
            console.log('the value received:', value)
            if (!value.length) {
                res.status(200).json({
                    message: `No notes found for the searched query '${req.params.queryString}'`
                })
            } else {
                res.status(200).json({
                    message: 'Notes searched successfully!',
                    response: value
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: 'Failed to search user notes',
            response: error
        })
    }
})

module.exports = router