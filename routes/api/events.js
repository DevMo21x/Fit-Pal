import express from 'express';
import Event from '../../Models/event.js';
const router = express.Router();

router.get('/', async (req, res) => {
  // Query the database and retrieve all all events from our database

  let events;
  try {
    events = await Event.find().exec();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }

  res.json(events);
});

//Get event by id
router.get('/:id', async (req, res) => {
  try {
    const newEventId = await Event.findById(req.params.id).exec();
    if (!newEventId) {
      res.status(404).send('Record Not Found!');
    } else {
      res.status(200).json(newEventId);
    }
  } catch (error) {
    res.status(404).send('Not found!');
  }

  // res.send(`Get one event with id ${req.params.id}`);
});

// create and event
router.post('/', async (req, res) => {
  // Use the model to create a new instance of event and save to database
  const newEvent = new Event(req.body);
  const newRecord = await newEvent.save();
  res.status(201).json(newRecord);
});

router.put('/:id', (req, res) => {
  res.send(`Update and event with id: ${req.params.id}`);
});

router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id).exec();
    res.status(204).send('The record has been deleted !');
  } catch (error) {
    res.status(500).send('Internal Server error');
  }

  // res.send(`Delete event with ID ${req.params.id}`);
});

export default router;
