import { nanoid } from "nanoid";
export default [
  {
    name: "Mixmax",
    budget_name: "Software subscription",
    owner_name: 'Vishal',
    id: nanoid(),
    owner_id: 1,
    spent: {
      value: 100,
      currency: "SGD",
    },
    available_to_spend: {
      value: 1000,
      currency: "SGD",
    },
    card_type: "burner",
    expiry: "9 feb",
    limit: 100,
    status: "active",
  },
  {
    name: "Second",
    budget_name: "Hardware",
    owner_name: 'Ron',
    id: nanoid(),
    owner_id: 2,
    spent: {
      value: 100,
      currency: "SGD",
    },
    available_to_spend: {
      value: 1000,
      currency: "SGD",
    },
    card_type: "burner",
    expiry: "9 feb",
    limit: 100,
    status: "active",
  },
  {
    name: "Third",
    budget_name: "Thingamajinga",
    owner_name: 'James',
    id: nanoid(),
    owner_id: 3,
    spent: {
      value: 148,
      currency: "SGD",
    },
    available_to_spend: {
      value: 30,
      currency: "SGD",
    },
    card_type: "burner",
    expiry: "9 feb",
    limit: 100,
    status: "active",
  },
];
