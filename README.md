# Daolist

Daolist allows you to explore and search Aragon DAOs on the Ethereum network

## Design

There are three components to Daolist:

### [worker](/worker)

The worker scrapes every transaction in every block to see if any transaction interacts with an official Aragon smart contract, or if a new Aragon smart contract was deployed (e.g. a `KernelProxy` or an `AppProxy`).
   
The worker then emits events internally, where different internal components react to them. An example would be an internal component that saves DAO information to the database
  
This pattern is built around the concept that Ethereum is basically one huge event sourcing mechanism, and that Daolist is just a read model.

#### Configuration

| Environment Variable | Description                                   | Default                       |
|----------------------|-----------------------------------------------|-------------------------------|
| **Database**         |                                               |                               |
| `MONGODB_URI`        | The URI of the MongoDB instance to connect to | `mongodb://localhost:27017`   |
| **Ethereum**         |                                               |                               |
| `ETH_NODE`           | The URI of the Parity node to connect to      | `wss://mainnet.daolist.io/ws` |
| **Cache**            |                                               |                               |
| `REDIS_URL`          | The URL of the Redis instance to connect to   | `redis://localhost:6379`      |
| **Misc**             |                                               |                               |
| `LOG_LEVEL`          | The log level                                 | `info`                        |

### [api](/api)

This API simply presents the state that the worker has built.

#### Configuration

| Environment Variable | Description                                   | Default                     |
|----------------------|-----------------------------------------------|-----------------------------|
| **Database**         |                                               |                             |
| `MONGODB_URI`        | The URI of the MongoDB instance to connect to | `mongodb://localhost:27017` |
| **Misc**             |                                               |                             |
| `PORT`               | The port to listen for requests on            | `3000`                      |
| `LOG_LEVEL`          | The log level                                 | `info`                      |

### [website](/website)

The explorer front-end itself, built in React with Aragon UI.

## Setup

Note that Daolist.io requires a Parity node in archive mode with tracing enabled.

```bash
# Clone the repository
git clone git@github.com:onbjerg/daolist
cd daolist

# Install the dependencies
for dir in ./*; do (cd "$dir" && npm i); done

# Start the components
for dir in ./*; do (cd "$dir" && npm start); done
```

## Release

- The API can be found at https://api.daolist.io
- The website can be found at https://daolist.io
- The archive node can be found at wss://mainnet.daolist.io/ws (feel free to use it)

## Authors

Oliver Nordbjerg ([@onbjerg](https://github.com/onbjerg))
