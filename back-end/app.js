const express = require('express')
const app = express()
const port = 3000
const DbConnection = require('./db_connection').default
const AuthGeneration = require('./auth_generation').default

app.use(express.json())
app.use(express.urlencoded())

const getTokenHeader = (req) => {
  const headers = req.headers
  const token = headers && headers['Authorization'] ? headers['Authorization'].split('Token ')[0] : null
  return token
}

app.post('/api/create-user', async (req, res) => {

  res.json(await DbConnection().postUser(req.body).catch(e => {
    return { error: e }
  }))
})

app.post('/api/api-auth', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  console.log('.---> body', req.body)
  console.log('.---> query', req.query)

  const user = await DbConnection().getUserByUsernameAndPassword(username, password).catch(e => console.error(e));
  if (!user) {
    res.status(401).send({
      msg: 'Invalid username or password'
    })
  } else {
    const token = AuthGeneration().generateAuthToken(user);
    res.json({ token });
  }
})

app.get('/api/events', async (req, res) => {
  const token = getTokenHeader(req)
  const isValidToken = AuthGeneration().isTokenValid(token)
  if (!isValidToken) {
    res.status(401).send({
      msg: 'You must provide a valid token'
    })
    return
  }
  res.json(await DbConnection().getEvents().catch(e => res.status(500).send({
    error: e
  })));
})

app.post('/api/events', async (req, res) => {
  const token = getTokenHeader(req)
  const isValidToken = AuthGeneration().isTokenValid(token)
  if (!isValidToken) {
    res.status(401).send({
      msg: 'You must provide a valid token'
    })
    return
  }
  res.json(await DbConnection().postEvents(req.body).catch(e => res.status(500).send({
    error: e
  })));
})

app.get('/api/events/:event_id', async (req, res) => {
  const token = getTokenHeader(req)
  const isValidToken = AuthGeneration().isTokenValid(token)
  if (!isValidToken) {
    res.status(401).send({
      msg: 'You must provide a valid token'
    })
    return
  }
  res.json(await DbConnection().getEventById(req.params.event_id).catch(e => res.status(500).send({
    error: e
  })));
})

app.put('/api/events/:event_id', async (req, res) => {
  const token = getTokenHeader(req)
  const isValidToken = AuthGeneration().isTokenValid(token)
  if (!isValidToken) {
    res.status(401).send({
      msg: 'You must provide a valid token'
    })
    return
  }
  res.json(await DbConnection().putEvents(req.params.event_id, req.body).catch(e => res.status(500).send({
    error: e
  })));
})

app.delete('/api/events/:event_id', async (req, res) => {
  const token = getTokenHeader(req)
  const isValidToken = AuthGeneration().isTokenValid(token)
  if (!isValidToken) {
    res.status(401).send({
      msg: 'You must provide a valid token'
    })
    return
  }
  res.json(await DbConnection().deleteEvent(req.params.event_id).catch(e => res.status(500).send({
    error: e
  })));
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})