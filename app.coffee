# some variables
occupied = false
held = false
confidence = 0.0
timer = null
timeOccupied = null
timeUnoccupied = new Date

# get our piface up and running
pif = require 'caf_piface'
p = new pif.PiFace()
p.init()

# get our readers going. TODO: change to event emitters
reader = ->
  if p.read() == 1  # if the switch is pressed when we poll
    held = true
    if !occupied  # if this is our first pass, we need to set occupation
      occupied = true
      timeOccupied = new Date
    clearTimeout timer  # clear the unoccupied timer, if it's set
    timer = null
    p.write 1,7  # turn on the occupied LED
  else  # otherwise, it isn't pressed
    if !timer
      timer = setTimeout (->
        timeUnoccupied = new Date
        occupied = false
        p.write 0,7  # turn off the occupied LED
      ), 5000

setInterval reader, 100

# now, get express running
express = require 'express'
http = require 'http'
path = require 'path'

app = express()

app.set 'port', process.env.PORT || 3000
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'ejs'
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.cookieParser('its a secret to everyone')
app.use express.session()
app.use app.router
app.use (require 'node-sass').middleware data =
  src: path.join __dirname , 'public', 'sass'
  dest: path.join __dirname, 'public'
  debug: true
  outputStyle: 'compressed'
app.use express.static(path.join(__dirname, 'public'))


# route for index page
app.get '/', (req, res) ->
  # use the correct calculation time depending if we're occupied
  if occupied
    diffTime = timeOccupied
  else
    diffTime = timeUnoccupied

  # calculate confidence, just linear for now
  confTime = (new Date) - diffTime
  confidence = confTime / 1000
  if confidence > 100
    confidence = 100

  # render index page or return json if we're asked
  if req.accepts(['json', 'html']) == 'json'
    res.json({ occupied: occupied, confidence: confidence })
  else
    res.render 'index', data =
      title: "Occupied?",
      occupied: occupied,
      confidence: confidence


(http.createServer(app)).listen app.get('port'), ->
  console.log('Express server listening on port ' + app.get('port'))

