import express from 'express';
import mongoose from 'mongoose';

const Animal = mongoose.model('Animal', new mongoose.Schema({
    type: String,
    state: String
}));

const app = express();

mongoose.connect('mongodb://admin:admin@localhost:27017/myapp?authSource=admin')
    .then(() => console.log('connected to db'));

app.get('/animals', async (_req, res) => {
    const animals = await Animal.find();
    console.log("Getting animals");
    return res.send(animals);
})

app.post('/animals', async (_req, res) => {
    await Animal.create({ type: 'Pig', state: 'Happy' });
    console.log("Animal created");
    return res.send('ok');
})

app.listen(3000, () => console.log('running on localhost:3000'));
