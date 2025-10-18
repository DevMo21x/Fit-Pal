import e from 'express';
import workoutSession from '../../Models/workoutSessionModel.js';
const router = e.Router();

// Get all workout records from the DB
router.get('/', async (req, res) => {
  try {
    const workouts = await workoutSession.find().exec();
    if (!workouts) {
      res.status(404).send();
    } else {
      res.json(workouts);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error, try again later !');
  }
});

// Get Record by ID from the DB
router.get('/:id', async (req, res) => {
  try {
    const workoutId = await workoutSession.findById(req.params.id).exec();
    if (!workoutId) {
      res.status(404).send('Record not found !');
    } else {
      res.json(workoutId);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error, try again later !');
  }
});

// Create a new Workout Record
router.post('/', async (req, res) => {
  const newWorkout = new Event(req.body);

  try {
    const newRecord = await newWorkout.save();
    if (!newRecord) {
      res.send('An error has occurred');
    } else {
      res.status(201).json(newRecord);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error, try again later !');
  }
});

// Update Record
router.put('/:id', async (req, res) => {
  try {
    await workoutSession.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}).exec();
  } catch (error) {
    res.status(500).send('Internal Server Error, try again later !');
  }
});

export default router;
