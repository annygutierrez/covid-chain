const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } =  require('../config');

class Block {
    // Stablish values for a block
    constructor(timeStamp, lastHash, hash, data, nonce, difficulty) {
       this.timeStamp = timeStamp;
       this.lastHash = lastHash;
       this.hash = hash;
       this.data = data;
       this.nonce = nonce;
       this.difficulty = difficulty || DIFFICULTY;
    }

    // To debug
    toString() {
        return `Block -
        timestamp: ${this.timeStamp}
        lastHash: ${this.lastHash.substring(0, 10)}
        hash: ${this.hash.substring(0, 10)}
        nonce: ${this.nonce}
        difficulty: ${this.difficulty}
        data: ${this.data}
        `
    }

    // This meyhod creates a genessis block
    static genesis() {
        return new this('Genesis time', '--------', 'f1r2t-h45h', [], 0, DIFFICULTY);
    }


    // To mine a block - Create a new one - add a new block to the chain
    static mineBlock(lastBlock, data) {
       let timestamp, hash;
       const lastHash = lastBlock.hash;
       let { difficulty } = lastBlock;
       let nonce = 0;

       do {
        nonce++;
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty(lastBlock, timestamp);
        hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
       } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

       return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timeStamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timeStamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
         let { difficulty } = lastBlock;
         return lastBlock.timeStamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
    }
}

module.exports = Block;