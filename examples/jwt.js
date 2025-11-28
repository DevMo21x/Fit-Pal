import jwt from 'jsonwebtoken';

const token = jwt.sign({ foo: 'bar' }, 'mylittlesecret');

console.log(token);

const isValid = jwt.verify(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3NjEwNTI0ODZ9.BNME7g8lBEJ3BZLa38cGpOMciwAOshpMDuTSo_TIlG8',
    'mylittlesecret',
);
