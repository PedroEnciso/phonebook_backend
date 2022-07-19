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
