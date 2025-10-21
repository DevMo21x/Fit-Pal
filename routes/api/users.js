import express from 'express';
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async(req, res) => {
  res.send(req.body)
  // make sure the email doesn't already exist 
  
})


router.post("/login", async(req, res) => {
  res.send(req.body);
})

export default router;
