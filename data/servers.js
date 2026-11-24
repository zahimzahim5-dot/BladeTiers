// All verified servers live here. To add or remove an IP, edit this file only.
// Each group has a list of IPs per region code (AS, AU, OCE, EU, NA, ME, AF).

export const regions = [
  { code: "AS", name: "Asia" },
  { code: "AU", name: "Australia" },
  { code: "OCE", name: "Oceania" },
  { code: "EU", name: "Europe" },
  { code: "NA", name: "North America" },
  { code: "ME", name: "Middle East" },
  { code: "AF", name: "Africa" },
];

export const serverGroups = [
  {
    id: "premium",
    title: "Premium",
    servers: {
      AS: [
        "as.catpvp.xyz",
        "as.mcpvp.club",
        "as.minemen.club",
        "as.stray.gg",
        "mcpvp.com",
        "play.pvphq.com",
      ],
      AU: [],
      OCE: [],
      EU: ["eu.minemen.club", "eu.alterprac.com"],
      NA: ["na.minemen.club", "vanillapractice.com"],
      ME: [],
      AF: [],
    },
  },
  {
    id: "cracked",
    title: "Cracked",
    servers: {
      AS: [
        "as.acentramc.com",
        "as.chickencraft.nl",
        "asiapvp.xyz",
        "fusion-network.xyz",
        "gamertee.net",
        "mazerclub.net",
        "minesive.com",
        "staticpvp.fun",
        "veltrix.club",
      ],
      AU: [],
      OCE: [],
      EU: ["play.pika-network.net", "blocksmc.com"],
      NA: ["pvpland.net", "vipermc.net"],
      ME: [],
      AF: [],
    },
  },
];

export const serverNotice =
  "If any server from the list above doesn't work anymore, contact the staff so they can update the list.";