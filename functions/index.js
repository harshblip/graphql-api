const functions = require('firebase-functions');
const { ApolloServer } = require('apollo-server-cloud-functions');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const cors = require('cors')({
    origin: true,
});

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphql = functions.https.onRequest((request, response) => {
    // Counter to track the number of retries
    let retries = 0;

    const handleRequest = () => {
        // Enable CORS using the cors middleware
        cors(request, response, () => {
            if (request.path === '/') {
                server.createHandler()(request, response)
                    .catch(error => {
                        // Check if it's a retryable error and within the maximum number of retries
                        if (error.code === 'ECONNRESET' && retries < 2) {
                            retries++;
                            console.log(`Retrying request (${retries}/2) due to ${error}`);
                            // Retry the request
                            handleRequest();
                        } else {
                            // If not a retryable error or exceeded the maximum retries, respond with an error
                            console.error('Error:', error);
                            response.status(500).send('Internal Server Error');
                        }
                    });
            } else {
                response.status(404).send('Not Found');
            }
        });
    };

    // Initial invocation of the request handler
    handleRequest();
});
