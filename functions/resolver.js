require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const sanitizeInput = require('./sanitize')

const resolvers = {
    Query: {
        getPlayer: async (_, { name, tag }) => {
            const sanitizedName = sanitizeInput(name);
            const sanitizedTag = sanitizeInput(tag);

            const response = await fetch(`${process.env.TOPR}/${sanitizedName}/${sanitizedTag}`);
            const data = await response.json();

            if (data.status === 200) {
                return data.data;
            } else {
                throw new Error('Player not found');
            }
        },
        getMMR: async (_, { region, puuid }) => {
            const response = await fetch(`${process.env.MMR}/${region}/${puuid}`);
            const data = await response.json();

            if (data.status === 200) {
                return data.data;
            } else {
                throw new Error('Player not found');
            }
        },
    },
};

module.exports = resolvers;
