const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } =  require('../config');

class Block {
    // Stablish values for a block
    constructor(timeStamp, lastHash, hash, data, nonce) {
       this.timeStamp = timeStamp;
       this.lastHash = lastHash;
       this.hash = hash;
       this.data = data;
       this.nonce = nonce;
    }

    // To debug
    toString() {
        return `Block -
        timestamp: ${this.timeStamp}
        lastHash: ${this.lastHash.substring(0, 10)}
        hash: ${this.hash.substring(0, 10)}
        nonce: ${this.nonce}
        data: ${this.data}
        `
    }

    // This meyhod creates a genessis block
    static genesis() {
        return new this('Genesis time', '--------', 'f1r2t-h45h', [], 0);
    }


    // To mine a block - Create a new one - add a new block to the chain
    static mineBlock(lastBlock, data) {
       let timestamp, hash;
       const lastHash = lastBlock.hash;
       let nonce = 0;

       do {
        nonce++;
        timestamp = Date.now();
        hash = Block.hash(timestamp, lastHash, data, nonce);
       } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

       return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const { timeStamp, lastHash, data, nonce } = block;
        return Block.hash(timeStamp, lastHash, data, nonce);
    }
}

module.exports = Block;