const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/jamDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.log('connected'))
  .on('error', error => {
    console.log('error');
  });

const jamSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: Date
});

const Jam = mongoose.model('Jam', jamSchema);

const jam = new Jam({
  name: 'Blackberry Jam',
  description:
    'Blackberries are one of the truly simple pleasures of summer, and it only takes a few handfuls to make a flavorful homemade blackberry jam.',
  created: '2020-01-09'
});

const appleJam = new Jam({
  name: 'Apple Butter',
  description:
    'Apple butter is delicious on buttered toast. Although apple butter takes time to make (the sauce is slow cooked for at least an hour), the upfront part is easy. You do not have to peel or core the apples.',
  created: '2020-03-12'
});

const mangoJam = new Jam({
  name: 'Mango Jam',
  description:
    'Mango jam captures the sunny, tropical flavor of fresh mangoes for year-round use.',
  created: '2010-04-01'
});

const orangeMarmalade = new Jam({
  name: 'Orange Marmalade',
  created: '2010-04-09'
});

//orangeMarmalade.save();

// Jam.update({_id:'5e9032ee5d7863e0319fd5d0'}, {description:'Orange marmalade is sweet and vibrant, much like orange juice. Unlike other jams, such as strawberry or raspberry, orange marmalade has a slight zest to it from the citrus component.'},
// function (error){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Record successfully  updated');
//     }
// });

// Jam.insertMany([jam, mangoJam, appleJam, orangeMarmalade], error => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("I'll do my best to give this jam the sweetness it deserves");
//   }
// });

Jam.deleteMany({ name: 'Orange Marmalade' }, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Item successfully deleted.');
  }
});

Jam.find(function (error, jam) {
  if (error) {
    console.log(error);
  } else {
    jam.forEach(jam => {
      console.log(jam.name);
    });
  }
});

// ------- People section --------

const peopleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Error: noame specified']
  },
  lastName: String,
  age: {
    type: Number,
    min: 5,
    max: 60
  },
  gender: String
});

const People = mongoose.model('People', peopleSchema);

const person1 = new People({
  firstName: 'Stefano',

  lastName: 'Ciobilly',
  age: 45,
  gender: 'male'
});

const person2 = new People({
  firstName: 'Lisa',
  lastName: 'Simpson',
  age: 10,
  gender: 'female'
});

People.insertMany([person1, person2], error => {
  if (error) {
    console.log(err);
  } else {
    console.log('Added');
  }
});

People.find(function (error, people) {
  if (error) {
    console.log(error);
  } else {
    people.forEach(people => {
      console.log(people);
    });
  }
});

People.update({ _id: '5e90230d0ff827dbd8deb6e8' }, { age: 30 }, function (
  error
) {
  if (error) {
    console.log(error);
  } else {
    console.log('Record successfully  updated');
  }
});

app.listen(3000, () => {
  console.log('Server is Running on Port 3000');
});
