// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
 type PlayerCard {
    small: String
    large: String
    id: String
 }

 type Player {
    puuid: String
    region: String
    account_level: Int
    name: String
    tag: String
    card: PlayerCard
 }

 type Images {
   large: String
   triangle_up: String
 }

 type PlayerMMR {
   currenttier: Int
   currenttierpatched: String
   images: Images
   ranking_in_tier: Int
   mmr_change_to_last_game: Int
   elo: Int
 }

 type Query {
    getPlayer(name: String!, tag: String!): Player
    getMMR(region: String!, puuid: String!): PlayerMMR
 }
`;

module.exports = typeDefs;
