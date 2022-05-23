const { isValid, isLoopback } = require('./lib/validator');
const { parseInt32, parseStr, parse } = require('./lib/parser');
const { strToInt32, int32ToBin, int32ToStr, calculateCIDR, binToInt32 } = require('./lib/converter');

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
            if (String(alias.family).toLowerCase() === 'ipv4') {
                if (!isLoopback(alias.address)) {
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

/**
 * 
 * @param {String, Number, Array, Object} from IP Address to start generating range
 * @param {String, Number, Array, Object} to IP Address to end generating range 
 * @param {Boolean} includeBorders Include borders in range 
 * @returns Array of generated IP addresses
 */

module.exports.generateIPRange = (from, to, includeBorders = false) => {
    if(isValid(from) && isValid(to)){
        const from_arr = parse(from);
        const to_arr = parse(to);

        const from_int = strToInt32(from_arr.join('.'));
        const to_int = strToInt32(to_arr.join('.'));

        let range = [];
        let offset = includeBorders ? 0 : 1;

        for (let i = from_int + offset; i <= to_int - offset; i++) {
            range.push(int32ToStr(i));
        }

        return range;
    }else{
        throw new Error('Invalid IP address');
    }
}