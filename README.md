# Ark Pino Stackdrive Logger  Plugin

This Ark plugin utilizes and extends Ark's core logger plugin called `core-logger-pino` and adds support for sending logs to [Google's Stackdriver](https://cloud.google.com/stackdriver/) which amongst other things also supports:

- simple searching and browsing through logs
- creating metrics from logs
- creating alerts

By replacing `core-pino-logger` with this plugin you won't loose any of existing logging functionalities. This plugins simply extends the `core-pino-pluggin` with Stackdriver. Please note that if you have custom settings set for `core-pino-logger` in `plugins.js`, you'll have to move them to `logger-pino-stackdriver` which will pass them on to the `core-pino-logger`.

#### ❤️ Support maintenance and development of plugins
If you find this or other plugins useful please consider

- voting for `deadlock` delegate
- donating to `AWtgFYbvtLDYccJvC5MChk4dpiUy2Krt2U`

to support development new plugins and tools for Ark's Ecosystem and maintenance of existing ones. Full list of contributions can be found on [https://arkdelegatesio/delegate/deadlock/](https://arkdelegates.io/delegate/deadlock/contributions/). 🖖

## Installation

#### For production:

`yarn global add @deadlock-delegate/logger-pino-stackdriver`

#### For development:

```bash
cd ~/ark-core/plugins
git clone https://github.com/deadlock-delegate/logger-pino-stackdriver
lerna bootstrap
```

### Registration

Open `~/.config/ark-core/{mainnet|devnet|testnet}/plugins.js` and replace `"@arkecosystem/core-logger-pino": {},` with `'@deadlock/logger-pino-stackdriver": {},`.

like so:

```js
module.exports = {
  "@arkecosystem/core-event-emitter": {},
  "@deadlock-delegate/logger-pino-stackdriver": {
    levels: {
      console: process.env.CORE_LOG_LEVEL || 'debug',  // log level of console logger (this is default that's taken from core-logger-pino)
      file: process.env.CORE_LOG_LEVEL_FILE || 'trace'  // log level of file logger (this is default that's taken from core-logger-pino)
    },
    fileRotator: {
      interval: '1d'  // how often should log file rotate (this is default that's taken from core-logger-pino)
    },
    stackdriver: {
      projectId: 'your-project-name-on-google-cloud',  // name of the project in Google Cloud where you'll be sending the logs
      logName: 'name-of-your-log'  // name of the log in Google cloud (if it doesn't exist yet, it will be created automatically)
    }
  },
  ...
}
```

### Configuration

Open .env file that is located at `~/.config/ark-core/<network>/.env` (should be replaced by either mainnet, devnet or testnet) and add the following environment variable:

```
GOOGLE_APPLICATION_CREDENTIALS=<absolute path to your Google service account credentials>
```

for example:

```
GOOGLE_APPLICATION_CREDENTIALS=/home/user/credentials.json
```

If you don't know how to create a Google service account for your project [check this out](https://cloud.google.com/docs/authentication/production).

##### Tips:

If you wish to send log data from multiple nodes to the same project's Stackdriver you can differentiate the logs by changing the `logName` settings on every node, eg:

node-1 should have logName set to node-1, node-2 should have logName set to node-2, etc.

## Credits

- [roks0n](https://github.com/roks0n)
- [All Contributors](../../contributors)

## License

[MIT](LICENSE) © roks0n
