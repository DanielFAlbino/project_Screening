/**
 * Seed the database
 */
const CollectionModel = require("../models/Collection");

const data = [
  {
    user: "admin",
    collectionName: "fire Master",
    cardsList: [
      {
        name: "Apprentice Necromancer",
        cardNumber: 49,
        description:
          "Sacrifice Apprentice Necromancer: Return target creature card from you...",
      },
      {
        name: "Apprentice Necromancer",
        cardNumber: 49,
        description:
          "Sacrifice Apprentice Necromancer: Return target creature card from you...",
      },
    ],
  },
  {
    user: "Jonh_Doe",
    collectionName: "Necromancers",
    cardsList: [
      {
        name: "Apprentice Necromancer",
        cardNumber: 49,
        description:
          "Sacrifice Apprentice Necromancer: Return target creature card from you...",
      },
      {
        name: "Apprentice Necromancer",
        cardNumber: 49,
        description:
          "Sacrifice Apprentice Necromancer: Return target creature card from you...",
      },
    ],
  },
  {
    user: "Queen_Elisabeth",
    collectionName: "Great Master",
    cardsList: [
      {
        name: "Apprentice Necromancer",
        cardNumber: 49,
        description:
          "Sacrifice Apprentice Necromancer: Return target creature card from you...",
      },
      {
        name: "Apprentice Necromancer",
        cardNumber: 49,
        description:
          "Sacrifice Apprentice Necromancer: Return target creature card from you...",
      },
    ],
  },
];

data.forEach((object) => {
  CollectionModel.create(object)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => console.error(error));
});
