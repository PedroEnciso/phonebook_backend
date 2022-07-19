const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;

const data = [
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
