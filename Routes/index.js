const express = require('express');
const Auth = require('./auth')
const Payment = require('./payment')
const Project = require('./project')
const Keyword = require('./keyword')
const User = require('./user')
const Invitation = require('./invitation')
const Team = require('./team')
const Author = require('./author')
const Upload = require('./upload')
const Profile = require('./profile')

const router = express.Router();

// AUTH Routes * /api/auth/*
router.use('/auth', Auth)

// Payment Routes * /api/payment/*
router.use('/payment', Payment)

// Project Routes * /api/project/*
router.use('/project', Project)

// Keyword Routes * /api/keyword/*
router.use('/keyword', Keyword)

// User Routes * /api/user/*
router.use('/user', User)

// Invitation Routes * /api/user/*
router.use('/invite', Invitation)

// Team Routes * /api/team/*
router.use('/team', Team)

// Autor Routes * /api/author/*
router.use('/author', Author)

// Upload Routes * /api/upload/*
router.use('/upload', Upload)

// Profile Routes * /api/profile/*
router.use('/profile', Profile)


module.exports = router;