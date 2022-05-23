const validator = require('./validator');
const converter = require('./converter');

/**
 * Parse IPv4 address string into array
 * @param  {String} ip_str IP to parse
 * @param  {String} [array_type="number"] Type of array to return  
 * @return {Array} Parsed IP address
 */
module.exports.parseStr = (ip_str, array_type = 'number') => {
    if (typeof ip_str === 'string' || ip_str instanceof String) {
        let ip_arr = [];
        if(ip_str.length <= 15){
            ip_arr = ip_str.split('.');
        }else if(ip_str.length == 32){
            ip_arr = converter.int32ToStr(converter.binToInt32(ip_str)).split('.');
        }else{
            ip_arr = ip_str.split('.');
        }
        if (validator.isValid(ip_arr)) {
            ip_arr.forEach((number, index) => {
                switch (String(array_type).toLowerCase()) {
                    case 'number':
                        ip_arr[index] = Number(number);
                        break;
                    case 'string':
                        ip_arr[index] = String(number);
                        break;
                    default:
                        throw new Error('Invalid array type');
                }
            });
            return ip_arr;
        } else {
            throw new Error('Invalid IP address');
        }
    } else {
        throw new Error('IP must be a string');
    }
}

/**
 * Parse IPv4 int32 address into array
 * @param  {Number} ip_int32 Int32 IP to parse
 * @param  {String} [array_type="number"] Type of array to return  
 * @return {Array} Parsed IP address
 */
module.exports.parseInt32 = (ip_int32, array_type = 'number') => {
    if (typeof ip_int32 === 'number' || ip_int32 instanceof Number) {
        let ip_arr = [];
        ip_arr.push(ip_int32 >>> 24);
        ip_arr.push(ip_int32 >>> 16 & 0xFF);
        ip_arr.push(ip_int32 >>> 8 & 0xFF);
        ip_arr.push(ip_int32 & 0xFF);
        return ip_arr;
    }
}

/**
 * 
 * @param {[String, Number, Array, Object]} IPv4 Address to parse
 * @param {String} [array_type="number"] Type of array to return
 * @returns 
 */

module.exports.parse = (ip, array_type = 'number') => {
    if (typeof ip === 'string' || ip instanceof String) {
        return module.exports.parseStr(ip, array_type);
    } else if (typeof ip === 'number' || ip instanceof Number) {
        return module.exports.parseInt32(ip, array_type);
    } else if (ip instanceof Array) {
        return ip;
    } else if(typeof ip === 'object'){
        if(ip.address && ip.netmask.address){
            return module.exports.parseStr(ip.address);
        }else{
            throw new Error('Invalid IP Object');
        }
    } else {
        throw new Error('Invalid IP address');
    }
}