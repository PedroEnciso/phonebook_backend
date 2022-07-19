const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;

let data = [
  {
    name: "poopoo",
    number: "5555555555",
    id: 1,
  },
  {
    name: "Larry",
    number: "6804949094",
    id: 2,
  },
  {
    name: "ped",
    number: "7605252738",
    id: 4,
  },
  {
    name: "frank",
    number: "2323490928",
    id: 9,
  },
  {
    name: "larry bird",
    number: "4740958329",
    id: 12,
  },
  {
    name: "george",
    number: "3204083959",
    id: 15,
  },
];

////// middleware //////
const getRandomId = () => {
  const id = Math.floor(Math.random() * 100000);
  return id;
};

////// routing //////

app.get("/info", (req, res) => {
  console.log("GET request for info");
  const length = data.length;
  res.send(`
        <p>Phonebook has ${length} people.<p/>
        <p>${Date()}<p/>
    `);
});

app.get("/api/persons", (req, res) => {
  console.log("GET request for persons");
  res.send(JSON.stringify(data));
});

app.post("/api/persons", (req, res) => {
  console.log("POST request for /api/persons");
  // get the body
  const body = req.body;
  // validate the body
  if (body.name && body.number) {
    // name and number are present, check if name is in data
    const duplicate = data.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    );
    if (duplicate) {
      // name already exists in phonebook, throw error
      return res.status(400).json({
        error: "name exists in the phonebook",
      });
    }
  } else {
    // name or number is empty, throw error
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  // create a person object with body.name and body.number
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomId(),
  };
  // add new person to data
  data = data.concat(person);
  // return the newly added person
  res.send(person);
});

app.get("/api/persons/:id", (req, res) => {
  console.log(`GET request for person ${req.params.id}`);

  const id = req.params.id;
  const target = data.find((person) => person.id.toString() === id);

  if (target) {
    res.send(JSON.stringify(target));
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  console.log(`DELETE request for person ${req.params.id}`);

  const id = req.params.id;
  data = data.filter((person) => person.id.toString() !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
