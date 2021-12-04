
// const { joinRoom, addListener, sendToRoom } = require('../utils/socket')
const { get } = require('jquery')
const { getIO, getSocket } = require('./utils/socket')
const workgroup = require('./workgroup')

const express = require('express')
const router = express.Router()

const { targetEventType, proofEventType } = require('./messaging/eventType')
const KafkaProducer = require('./messaging/producer');

const targetProducer = new KafkaProducer('battleship', targetEventType);
const proofProducer = new KafkaProducer('proof', proofEventType);

const joinGame = (session, game) => {
  const socket = getSocket(session)

  socket.join(game)

  socket.on('game:move', (workgroup, message) => {
    console.log('Received:', msg)
  })
}

const startGame = (game) => {
  console.log(`starting game with ID #${game}`)
  getIO().to(game).emit('game:init')
  // sendToRoom(session, game, 'game:init', undefined, true)
}

router.post('/target', async (req, res) => {
  await targetProducer.queue(req.body);
  res.sendStatus(200)
})

router.post('/outcome', async (req, res) => {
  await proofProducer.queue(req.body);
  res.sendStatus(200);
})

module.exports = {
    joinGame,
    startGame,
    battleshipRouter: router
}