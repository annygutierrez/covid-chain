const SHA256 = require('crypto-js/sha256');

class Block {
    // Stablish values for a block
    constructor(timeStamp, lastHash, hash, data) {
       this.timeStamp = timeStamp;
       this.lastHash = lastHash;
       this.hash = hash;
       this.data = data;
    }

    // To debug
    toString() {
        return `Block -
        timestamp: ${this.timeStamp}
        lastHash: ${this.lastHash.substring(0, 10)}
        hash: ${this.hash.substring(0, 10)}
        data: ${this.data}
        `
    }

    // This meyhod creates a genessis block
    static genesis() {
        return new this('Genesis time', '--------', 'f1r2t-h45h', []);
    }


    // To mine a block - Create a new one - add a new block to the chain
    static mineBlock(lastBlock, data) {
       const timestamp = Date.now();
       const lastHash = lastBlock.hash;
       const hash = Block.hash(timestamp, lastHash, data);

       return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block) {
        const { timeStamp, lastHash, data } = block;
        return Block.hash(timeStamp, lastHash, data);
    }
}

module.exports = Block;