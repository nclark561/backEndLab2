const houses = require('./db.json');
let houseId = 4;

module.exports = {
    getAllHouses: (req, res) => {
        res.status(200).send(houses);
    },
    deleteHouse: (req, res) => {
        const { id } = req.params;
        const idx = houses.findIndex(house => house.id == id);
        houses.splice(idx, 1);
        res.status(200).send(houses);
    },
    createHouse: (req, res) => {
        const { address, price, imageURL } = req.body;
        if (!address || !price || !imageURL) {
            res.sendStatus(400);
        }
        let newHouse = {...req.body, id: houseId};
        houses.push(newHouse);
        houseId++;
        res.status(200).send(houses);
    },
    updateHouse: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        let idx = houses.findIndex(house => house.id == id);
        houses[idx].price = +houses[idx].price;
        if (type === 'plus') {
            houses[idx].price += 10000;
        } else {
            houses[idx].price -= 10000;
        }
        res.status(200).send(houses);
    }
}