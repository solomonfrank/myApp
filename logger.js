
const EventEmitter = require('events')


class Logger extends EventEmitter{


    log( message) {

        console.log('hello ' + message);

        this.emit('Me', {id : 1, name: 'solomon'});
    }


}

module.exports = Logger