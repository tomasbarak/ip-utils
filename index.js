const {isValid, isLoopback} = require('./lib/validator');
const {parseInt32, parseStr, parse} = require('./lib/parser');
const {strToInt32, int32ToBin, int32ToStr, calculateCIDR, binToInt32} = require('./lib/converter');

//Validators
module.exports.isValid = isValid;
module.exports.isLoopback = isLoopback;

//Parsers
module.exports.parseInt32 = parseInt32;
module.exports.parseStr = parseStr;
module.exports.parse = parse;

//Converters
module.exports.strToInt32 = strToInt32;
module.exports.int32ToBin = int32ToBin;
module.exports.int32ToStr = int32ToStr;
module.exports.calculateCIDR = calculateCIDR;
module.exports.binToInt32 = calculateCIDR;

/**
 * 
 * @returns {Object} Object containing IPv4 address, subnet mask and cidr
 */
module.exports.myIP = () => {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if(String(alias.family).toLowerCase() === 'ipv4'){
                if(!isLoopback(alias.address)){
                    return {
                        address: alias.address,
                        netmask: {
                            address: alias.netmask,
                            bin: int32ToBin(parseInt32(alias.netmask)),
                        },
                        cidr: alias.cidr,
                    }
                }
            }
        }
    }
}