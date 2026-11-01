import * as housesRepository from "../repositories/houses.repository.js";

// GET /houses
export async function getAllHouses(req, res) {
  try {
    const allHouses = await housesRepository.getAllHouses();
    res.status(200).json(allHouses);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// GET /houses/:id
export async function getHouseById(req, res) {
  try {
    const house = await housesRepository.getHouseById(req.params.id);
    if (house) {
      res.status(200).json(house);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
