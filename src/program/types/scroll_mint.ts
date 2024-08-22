export type ScrollMint = {
  "version": "0.1.0",
  "name": "simple_mint",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supply",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "time",
          "type": "u64"
        },
        {
          "name": "solFee",
          "type": "u64"
        },
        {
          "name": "playByCollection",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mintCollection",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "delegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "mint",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasure",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "delegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "ticket",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associated",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "rank",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "floor",
          "type": "u8"
        },
        {
          "name": "name",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "treasure",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "supply",
            "type": "u64"
          },
          {
            "name": "mints",
            "type": "u64"
          },
          {
            "name": "time",
            "type": "u64"
          },
          {
            "name": "solFee",
            "type": "u64"
          },
          {
            "name": "mainCollection",
            "type": "publicKey"
          },
          {
            "name": "playByCollection",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "play",
            "type": "u64"
          },
          {
            "name": "startTimestamp",
            "type": "u64"
          },
          {
            "name": "stopTimestamp",
            "type": "u64"
          },
          {
            "name": "times",
            "type": "u64"
          },
          {
            "name": "record",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoRandom",
      "msg": "No Random gen"
    },
    {
      "code": 6001,
      "name": "NoFaction",
      "msg": "No Faction match"
    },
    {
      "code": 6002,
      "name": "NoMetadata",
      "msg": "No Metadata match"
    },
    {
      "code": 6003,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6004,
      "name": "NotAllowedAuthority",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6005,
      "name": "IncorrectSupply",
      "msg": "Mint Amount Exceeded Supply"
    },
    {
      "code": 6006,
      "name": "AddressExist",
      "msg": "Address already exist."
    },
    {
      "code": 6007,
      "name": "OrderFinish",
      "msg": "Order Finish."
    },
    {
      "code": 6008,
      "name": "OrderFilled",
      "msg": "Order Completely Filled."
    },
    {
      "code": 6009,
      "name": "IncorrectTime",
      "msg": "Incorrect Time to Execute."
    },
    {
      "code": 6010,
      "name": "IncorrectNFT",
      "msg": "Incorrect NFT Definition."
    },
    {
      "code": 6011,
      "name": "IncorrectDefinition",
      "msg": "Incorrect Order Definition."
    },
    {
      "code": 6012,
      "name": "ZeroAddressDetected",
      "msg": "ZeroAddressDetected"
    },
    {
      "code": 6013,
      "name": "IncorrectAssociated",
      "msg": "Incorrect associated account"
    },
    {
      "code": 6014,
      "name": "MathOverflow",
      "msg": "Math Operation Overflow"
    },
    {
      "code": 6015,
      "name": "EmptyData",
      "msg": "account with empty data"
    }
  ]
};

export const IDL: ScrollMint = {
  "version": "0.1.0",
  "name": "simple_mint",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "supply",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "time",
          "type": "u64"
        },
        {
          "name": "solFee",
          "type": "u64"
        },
        {
          "name": "playByCollection",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mintCollection",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "delegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "mint",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasure",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "delegate",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "ticket",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associated",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "rank",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "treasure",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "position",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "floor",
          "type": "u8"
        },
        {
          "name": "name",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "treasure",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "supply",
            "type": "u64"
          },
          {
            "name": "mints",
            "type": "u64"
          },
          {
            "name": "time",
            "type": "u64"
          },
          {
            "name": "solFee",
            "type": "u64"
          },
          {
            "name": "mainCollection",
            "type": "publicKey"
          },
          {
            "name": "playByCollection",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "play",
            "type": "u64"
          },
          {
            "name": "startTimestamp",
            "type": "u64"
          },
          {
            "name": "stopTimestamp",
            "type": "u64"
          },
          {
            "name": "times",
            "type": "u64"
          },
          {
            "name": "record",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoRandom",
      "msg": "No Random gen"
    },
    {
      "code": 6001,
      "name": "NoFaction",
      "msg": "No Faction match"
    },
    {
      "code": 6002,
      "name": "NoMetadata",
      "msg": "No Metadata match"
    },
    {
      "code": 6003,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6004,
      "name": "NotAllowedAuthority",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6005,
      "name": "IncorrectSupply",
      "msg": "Mint Amount Exceeded Supply"
    },
    {
      "code": 6006,
      "name": "AddressExist",
      "msg": "Address already exist."
    },
    {
      "code": 6007,
      "name": "OrderFinish",
      "msg": "Order Finish."
    },
    {
      "code": 6008,
      "name": "OrderFilled",
      "msg": "Order Completely Filled."
    },
    {
      "code": 6009,
      "name": "IncorrectTime",
      "msg": "Incorrect Time to Execute."
    },
    {
      "code": 6010,
      "name": "IncorrectNFT",
      "msg": "Incorrect NFT Definition."
    },
    {
      "code": 6011,
      "name": "IncorrectDefinition",
      "msg": "Incorrect Order Definition."
    },
    {
      "code": 6012,
      "name": "ZeroAddressDetected",
      "msg": "ZeroAddressDetected"
    },
    {
      "code": 6013,
      "name": "IncorrectAssociated",
      "msg": "Incorrect associated account"
    },
    {
      "code": 6014,
      "name": "MathOverflow",
      "msg": "Math Operation Overflow"
    },
    {
      "code": 6015,
      "name": "EmptyData",
      "msg": "account with empty data"
    }
  ]
};