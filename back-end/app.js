const express = require('express')
const app = express()
const port = 3000
const DbConnection = require('./db_connection').default

app.use(express.json())

app.post('/api/create-user', async (req, res) => {
  res.json(await DbConnection().postUser(req.body).catch(e => res.status(500).send({
    error : e
  })));
})

app.post('/api/api-auth', async (req, res) => {
  res.json({
    msg: 'done'
  });
})

app.get('/api/events', async (req, res) => {
  res.json(await DbConnection().getEvents().catch(e => res.status(500).send({
    error : e
  })));
})

app.post('/api/events', async (req, res) => {
  res.json(await DbConnection().postEvents(req.body).catch(e => res.status(500).send({
    error : e
  })));
})

app.get('/api/events/:event_id', async (req, res) => {
  res.json(await DbConnection().getEventById(req.params.event_id).catch(e => res.status(500).send({
    error : e
  })));
})

app.put('/api/events/:event_id', async (req, res) => {
  res.json(await DbConnection().putEvents(req.params.event_id, req.body).catch(e => res.status(500).send({
    error : e
  })));
})

app.delete('/api/events/:event_id', async (req, res) => {
  res.json(await DbConnection().deleteEvent(req.params.event_id).catch(e => res.status(500).send({
    error : e
  })));
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})