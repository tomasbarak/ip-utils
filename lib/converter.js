const parser = require('./parser');
const validator = require('./validator');

/**
 * 
 * @param {Stromg} ip_str IP Address to convert to int32
 * @returns 32bit Integer representation of IP Address
 */
module.exports.strToInt32 = (ip_str) => {
    let ip_arr = parser.parseStr(ip_str, 'string');
    let ip_int32 = 0;
    ip_arr.forEach((octet) => {
        ip_int32 <<= 8;
        ip_int32 += parseInt(octet);
    });
    return (ip_int32 >>> 0);
}

/**
 * 
 * @param {Number} ip_int32 32bit Integer representation of IP Address to convert to string
 * @returns String representation of IP Address
 */
module.exports.int32ToStr = (ip_int32) => {
    const ip_arr = parser.parseInt32(ip_int32);
    return String(ip_arr.join('.'))
}

/**
 * 
 * @param {Number} ip_int32 Integer to convert to binary
 * @returns String representation of binary integer
 */
module.exports.int32ToBin = (ip_int32) => {
    const ip_bin = (ip_int32 >>> 0).toString(2);
    return ip_bin;
}

/**
 * 
 * @param {String} ip_bin String representation of binary value to convert
 * @returns Converted integer value of binary string
 */
module.exports.binToInt32 = (ip_bin) => {
    const ip_int32 = parseInt(ip_bin, 2);
    return ip_int32;
}

/**
 * 
 * @param {String} ip_str IP Address to calculate CIDR
 * @param {String} subnet_bin_str String representation of the binary subnet mask
 * @returns A string representation of the CIDR
 */
module.exports.calculateStrCIDR = (ip_str, subnet_bin_str) => {
    if(validator.isValid(ip_str) && validator.isValid(this.int32ToStr(this.binToInt32(subnet_bin_str)))){
        let cidr = 0;
        let i = 0;
        while (subnet_bin_str[i] === '1') {
            cidr++;
            i++;
        }
        return cidr;
    }else{
        throw new Error('Invalid IP or subnet');
    }
}

/**
 * 
 * @param {String, Number, Array} ip IP Address used for CIDR calculation
 * @param {String, Number. Array} subnet Netmask used for CIDR calculation
 * @returns A string representation of the CIDR
 */
module.exports.calculateCIDR = (ip, subnet) => {
    let subnet_bin_str = '';
    let ip_str = '';

    switch (typeof ip) {
        case 'string':
            if(ip.length <= 15){
                ip_str = ip;
            }else if(ip.length == 32){
                ip_str = this.int32ToStr(this.binToInt32(ip));
            }
            break;
        case 'number':
            ip_str = this.int32ToStr(ip);
            break;
        case 'array' && ip instanceof Array:
            ip_str = ip.join('.');
            break
    }

    switch (typeof subnet) {
        case 'string':
            if(subnet.length <= 15){
                subnet_bin_str = this.int32ToBin(this.strToInt32(subnet));
            }else if(subnet.length == 32){
                subnet_bin_str = subnet;
            }
            break;
        case 'number':
            subnet_bin_str = this.int32ToBin(subnet);
            break;
        case 'array' && subnet instanceof Array:
            subnet_bin_str = subnet.join('');
            break;
    }
    return this.calculateStrCIDR(ip_str, subnet_bin_str);
}