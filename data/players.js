// All demo player data lives here, and ONLY here.
// The podium and the leaderboard both read from this file.
// A mode that is missing from "tiers" means no tier was supplied for it.

const players = [
  {
    id: 1,
    username: "Caitlynn_",
    points: 70,
    tiers: {
      Crystal: "LT2",
      Cart: "LT3",
      "Diamond Pot": "LT3",
      DiaSMP: "LT3",
      Mace: "LT3",
      "Netherite Pot": "LT3",
      SMP: "LT3",
      "Spear Mace": "LT3",
      Sword: "LT3",
      UHC: "LT3",
    },
  },
  {
    id: 2,
    username: "DarkResolve",
    points: 22,
    tiers: { Cart: "HT3", "Netherite Pot": "LT3", Sword: "LT3" },
  },
  {
    id: 3,
    username: "CedricTheOwl",
    points: 18,
    tiers: { "Diamond Pot": "LT3", "Netherite Pot": "LT3", Sword: "HT1" },
  },
  {
    id: 4,
    username: "ImAjeetX",
    points: 12,
    tiers: { DiaSMP: "LT3", UHC: "LT3" },
  },
  {
    id: 5,
    username: "KitsuneFlamee",
    points: 11,
    tiers: { Crystal: "LT5",
      Cart: "LT5",
      "Diamond Pot": "LT5",
      DiaSMP: "LT5",
      Mace: "LT5",
      "Netherite Pot": "LT5",
      SMP: "LT5",
      "Spear Mace": "LT5",
      Sword: "LT5",
      UHC: "LT5",
      Axe: "LT5"
     },
  },
  {
    id: 6,
    username: "ZAstroPlayz",
    points: 12,
    tiers: { Crystal: "LT5",
      Cart: "LT5",
      "Diamond Pot": "LT5",
      DiaSMP: "LT5",
      Mace: "LT5",
      "Netherite Pot": "LT5",
      SMP: "LT5",
      "Spear Mace": "LT5",
      Sword: "LT5",
      UHC: "LT5",
      Axe: "LT5" },
  },
  {
    id: 7,
    username: "123JediJosh",
    points: 10,
    tiers: { Crystal: "HT3" },
  },
  {
    id: 8,
    username: "Elag206_",
    points: 10,
    tiers: { Mace: "HT3" },
  },
  {
    id: 9,
    username: "1sharpness1",
    points: 6,
    tiers: { Crystal: "LT3" },
  },
  {
    id: 10,
    username: "Govind16op",
    points: 6,
    tiers: { "Spear Mace": "LT3" },
  },
  {
    id: 11,
    username: "Senron",
    points: 6,
    tiers: { Mace: "LT3" },
  },
  {
    id: 12,
    username: "Sh4dow_G4merz",
    points: 6,
    tiers: { "Spear Mace": "LT3" },
  },
  {
    id: 13,
    username: "SAHIL57",
    points: 5,
    tiers: { Sword: "LT4", Crystal: "HT5" },
  },
  {
    id: 14,
    username: "ℓµƒƒყ",
    points: 2,
    tiers: { Sword: "HT5" },
  },
  {
    id: 15,
    username: "Duplexion_",
    points: 1,
    tiers: { "Netherite Pot": "LT5" },
  },
  {
    id: 16,
    username: "zohaan6969",
    points: 1,
    tiers: { Cart: "LT5" },
  },
];

// Returns the players sorted by points (highest first) with a "rank" added.
// When two players have equal points, the lower "id" (the supplied order)
// comes first, so positions never change randomly.
export function getRankedPlayers() {
  return [...players]
    .sort((a, b) => b.points - a.points || a.id - b.id)
    .map((player, index) => ({ ...player, rank: index + 1 }));
}

export default players;