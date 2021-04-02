import { Entity } from "../types/types";

export const entities: Entity[] = [
  {
    sentiment: null,
    metadata: {
      mid: "/m/03bby1",
      wikipedia_url: "https://en.wikipedia.org/wiki/Googleplex",
    },
    type: "ORGANIZATION",
    name: "Google",
    mentions: [
      {
        sentiment: null,
        type: "PROPER",
        text: {
          content: "Google",
          beginOffset: -1,
        },
      },
    ],
    salience: 0.18886299431324005,
  },
  {
    sentiment: null,
    salience: 0.17920063436031342,
    name: "Mountain View",
    metadata: {
      wikipedia_url: "https://en.wikipedia.org/wiki/Mountain_View,_California",
      mid: "/m/0r6c4",
    },
    mentions: [
      {
        type: "PROPER",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Mountain View",
        },
      },
      {
        type: "PROPER",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Mountain View",
        },
      },
    ],
    type: "LOCATION",
  },
  {
    salience: 0.14206703007221222,
    metadata: {
      wikipedia_url: "https://en.wikipedia.org/wiki/Android_(operating_system)",
      mid: "/m/02wxtgw",
    },
    sentiment: null,
    name: "Android",
    type: "CONSUMER_GOOD",
    mentions: [
      {
        type: "PROPER",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Android",
        },
      },
      {
        type: "PROPER",
        text: {
          beginOffset: -1,
          content: "Android",
        },
        sentiment: null,
      },
    ],
  },
  {
    sentiment: null,
    metadata: {
      mid: "/m/09gds74",
      wikipedia_url: "https://en.wikipedia.org/wiki/Sundar_Pichai",
    },
    name: "Sundar Pichai",
    mentions: [
      {
        type: "PROPER",
        sentiment: null,
        text: {
          content: "Sundar Pichai",
          beginOffset: -1,
        },
      },
    ],
    type: "PERSON",
    salience: 0.10975376516580582,
  },
  {
    sentiment: null,
    mentions: [
      {
        text: {
          beginOffset: -1,
          content: "phone",
        },
        sentiment: null,
        type: "COMMON",
      },
    ],
    metadata: {},
    salience: 0.09722497314214706,
    name: "phone",
    type: "CONSUMER_GOOD",
  },
  {
    salience: 0.08834461867809296,
    type: "PERSON",
    mentions: [
      {
        type: "COMMON",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "users",
        },
      },
    ],
    name: "users",
    sentiment: null,
    metadata: {},
  },
  {
    sentiment: null,
    type: "LOCATION",
    mentions: [
      {
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Amphitheatre Pkwy",
        },
        type: "PROPER",
      },
    ],
    metadata: {
      mid: "/g/1tf2sgcm",
    },
    name: "Amphitheatre Pkwy",
    salience: 0.07451575994491577,
  },
  {
    sentiment: null,
    metadata: {},
    name: "CA 940430",
    mentions: [
      {
        text: {
          content: "CA 940430",
          beginOffset: -1,
        },
        sentiment: null,
        type: "PROPER",
      },
    ],
    type: "OTHER",
    salience: 0.05068293213844299,
  },
  {
    name: "keynote",
    sentiment: null,
    type: "OTHER",
    salience: 0.029002878814935684,
    metadata: {},
    mentions: [
      {
        text: {
          content: "keynote",
          beginOffset: -1,
        },
        sentiment: null,
        type: "COMMON",
      },
    ],
  },
  {
    sentiment: null,
    type: "CONSUMER_GOOD",
    metadata: {},
    name: "phones",
    mentions: [
      {
        sentiment: null,
        type: "COMMON",
        text: {
          content: "phones",
          beginOffset: -1,
        },
      },
    ],
    salience: 0.0246114581823349,
  },
  {
    metadata: {
      mid: "/m/01p15w",
      wikipedia_url: "https://en.wikipedia.org/wiki/Consumer_Electronics_Show",
    },
    type: "EVENT",
    sentiment: null,
    salience: 0.015732960775494576,
    name: "Consumer Electronic Show",
    mentions: [
      {
        text: {
          beginOffset: -1,
          content: "Consumer Electronic Show",
        },
        type: "PROPER",
        sentiment: null,
      },
    ],
  },
  {
    type: "ADDRESS",
    salience: 0,
    sentiment: null,
    name: "1600 Amphitheatre Pkwy, Mountain View, CA",
    mentions: [
      {
        text: {
          content: "1600 Amphitheatre Pkwy, Mountain View, CA",
          beginOffset: -1,
        },
        type: "TYPE_UNKNOWN",
        sentiment: null,
      },
    ],
    metadata: {
      broad_region: "California",
      narrow_region: "Santa Clara County",
      street_name: "Amphitheatre Parkway",
      street_number: "1600",
      country: "US",
      locality: "Mountain View",
    },
  },
  {
    mentions: [
      {
        type: "TYPE_UNKNOWN",
        text: {
          content: "$799",
          beginOffset: -1,
        },
        sentiment: null,
      },
    ],
    type: "PRICE",
    sentiment: null,
    name: "$799",
    salience: 0,
    metadata: {
      currency: "USD",
      value: "799.000000",
    },
  },
  {
    sentiment: null,
    salience: 0,
    mentions: [
      {
        text: {
          beginOffset: -1,
          content: "799",
        },
        sentiment: null,
        type: "TYPE_UNKNOWN",
      },
    ],
    metadata: {
      value: "799",
    },
    type: "NUMBER",
    name: "799",
  },
  {
    sentiment: null,
    mentions: [
      {
        type: "TYPE_UNKNOWN",
        text: {
          beginOffset: -1,
          content: "1600",
        },
        sentiment: null,
      },
    ],
    name: "1600",
    metadata: {
      value: "1600",
    },
    salience: 0,
    type: "NUMBER",
  },
  {
    metadata: {
      value: "940430",
    },
    salience: 0,
    mentions: [
      {
        sentiment: null,
        text: {
          content: "940430",
          beginOffset: -1,
        },
        type: "TYPE_UNKNOWN",
      },
    ],
    name: "940430",
    sentiment: null,
    type: "NUMBER",
  },
  {
    sentiment: null,
    metadata: {
      mid: "/m/03bby1",
      wikipedia_url: "https://en.wikipedia.org/wiki/Googleplex",
    },
    type: "ORGANIZATION",
    name: "Google",
    mentions: [
      {
        sentiment: null,
        type: "PROPER",
        text: {
          content: "Google",
          beginOffset: -1,
        },
      },
    ],
    salience: 0.18886299431324005,
  },
  {
    sentiment: null,
    salience: 0.17920063436031342,
    name: "Mountain View",
    metadata: {
      wikipedia_url: "https://en.wikipedia.org/wiki/Mountain_View,_California",
      mid: "/m/0r6c4",
    },
    mentions: [
      {
        type: "PROPER",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Mountain View",
        },
      },
      {
        type: "PROPER",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Mountain View",
        },
      },
    ],
    type: "LOCATION",
  },
  {
    salience: 0.14206703007221222,
    metadata: {
      wikipedia_url: "https://en.wikipedia.org/wiki/Android_(operating_system)",
      mid: "/m/02wxtgw",
    },
    sentiment: null,
    name: "Android",
    type: "CONSUMER_GOOD",
    mentions: [
      {
        type: "PROPER",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Android",
        },
      },
      {
        type: "PROPER",
        text: {
          beginOffset: -1,
          content: "Android",
        },
        sentiment: null,
      },
    ],
  },
  {
    sentiment: null,
    metadata: {
      mid: "/m/09gds74",
      wikipedia_url: "https://en.wikipedia.org/wiki/Sundar_Pichai",
    },
    name: "Sundar Pichai",
    mentions: [
      {
        type: "PROPER",
        sentiment: null,
        text: {
          content: "Sundar Pichai",
          beginOffset: -1,
        },
      },
    ],
    type: "PERSON",
    salience: 0.10975376516580582,
  },
  {
    sentiment: null,
    mentions: [
      {
        text: {
          beginOffset: -1,
          content: "phone",
        },
        sentiment: null,
        type: "COMMON",
      },
    ],
    metadata: {},
    salience: 0.09722497314214706,
    name: "phone",
    type: "CONSUMER_GOOD",
  },
  {
    salience: 0.08834461867809296,
    type: "PERSON",
    mentions: [
      {
        type: "COMMON",
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "users",
        },
      },
    ],
    name: "users",
    sentiment: null,
    metadata: {},
  },
  {
    sentiment: null,
    type: "LOCATION",
    mentions: [
      {
        sentiment: null,
        text: {
          beginOffset: -1,
          content: "Amphitheatre Pkwy",
        },
        type: "PROPER",
      },
    ],
    metadata: {
      mid: "/g/1tf2sgcm",
    },
    name: "Amphitheatre Pkwy",
    salience: 0.07451575994491577,
  },
  {
    sentiment: null,
    metadata: {},
    name: "CA 940430",
    mentions: [
      {
        text: {
          content: "CA 940430",
          beginOffset: -1,
        },
        sentiment: null,
        type: "PROPER",
      },
    ],
    type: "OTHER",
    salience: 0.05068293213844299,
  },
  {
    name: "keynote",
    sentiment: null,
    type: "OTHER",
    salience: 0.029002878814935684,
    metadata: {},
    mentions: [
      {
        text: {
          content: "keynote",
          beginOffset: -1,
        },
        sentiment: null,
        type: "COMMON",
      },
    ],
  },
  {
    sentiment: null,
    type: "CONSUMER_GOOD",
    metadata: {},
    name: "phones",
    mentions: [
      {
        sentiment: null,
        type: "COMMON",
        text: {
          content: "phones",
          beginOffset: -1,
        },
      },
    ],
    salience: 0.0246114581823349,
  },
  {
    metadata: {
      mid: "/m/01p15w",
      wikipedia_url: "https://en.wikipedia.org/wiki/Consumer_Electronics_Show",
    },
    type: "EVENT",
    sentiment: null,
    salience: 0.015732960775494576,
    name: "Consumer Electronic Show",
    mentions: [
      {
        text: {
          beginOffset: -1,
          content: "Consumer Electronic Show",
        },
        type: "PROPER",
        sentiment: null,
      },
    ],
  },
  {
    type: "ADDRESS",
    salience: 0,
    sentiment: null,
    name: "1600 Amphitheatre Pkwy, Mountain View, CA",
    mentions: [
      {
        text: {
          content: "1600 Amphitheatre Pkwy, Mountain View, CA",
          beginOffset: -1,
        },
        type: "TYPE_UNKNOWN",
        sentiment: null,
      },
    ],
    metadata: {
      broad_region: "California",
      narrow_region: "Santa Clara County",
      street_name: "Amphitheatre Parkway",
      street_number: "1600",
      country: "US",
      locality: "Mountain View",
    },
  },
  {
    mentions: [
      {
        type: "TYPE_UNKNOWN",
        text: {
          content: "$799",
          beginOffset: -1,
        },
        sentiment: null,
      },
    ],
    type: "PRICE",
    sentiment: null,
    name: "$799",
    salience: 0,
    metadata: {
      currency: "USD",
      value: "799.000000",
    },
  },
  {
    sentiment: null,
    salience: 0,
    mentions: [
      {
        text: {
          beginOffset: -1,
          content: "799",
        },
        sentiment: null,
        type: "TYPE_UNKNOWN",
      },
    ],
    metadata: {
      value: "799",
    },
    type: "NUMBER",
    name: "799",
  },
  {
    sentiment: null,
    mentions: [
      {
        type: "TYPE_UNKNOWN",
        text: {
          beginOffset: -1,
          content: "1600",
        },
        sentiment: null,
      },
    ],
    name: "1600",
    metadata: {
      value: "1600",
    },
    salience: 0,
    type: "NUMBER",
  },
  {
    metadata: {
      value: "940430",
    },
    salience: 0,
    mentions: [
      {
        sentiment: null,
        text: {
          content: "940430",
          beginOffset: -1,
        },
        type: "TYPE_UNKNOWN",
      },
    ],
    name: "940430",
    sentiment: null,
    type: "NUMBER",
  },
];
