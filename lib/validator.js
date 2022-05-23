const converter = require('./converter')
const parser = require('./parser')

function stringIsValid(ip) {
    let ip_arr = ip.split('.');
    let isValid = true;

    if (ip_arr.length === 4) {
        ip_arr.forEach((number) => {
            if (number < 0 || number > 255) {
                isValid = false;
            }
        });
    } else {
        isValid = false;
    }
    return isValid;
}

function arrayIsValid(ip) {
    let isValid = true;

    if (ip.length === 4) {
        ip.forEach((number) => {
            if (number < 0 || number > 255) {
                isValid = false;
            }
        });
    } else {
        isValid = false;
    }
    return isValid;
}

function numberIsValid(ip_num){
    if(ip_num >= 0 && ip_num <= 4294967295){
        return true;
    }else{
        return false;
    }
}

/**
 * 
 * @param {String, Array} ip IP address to check
 * @returns {Boolean} true if given ip is valid else false 
 */
module.exports.isValid = (ip) => {
    if (typeof ip === 'string' || ip instanceof String) {
        return stringIsValid(ip);
    } else if (typeof ip === 'array' || ip instanceof Array) {
        return arrayIsValid(ip);
    } else if (typeof ip === 'number' || ip instanceof Number) {
        return numberIsValid(ip);
    } else if(typeof ip === 'object'){
        if(ip.address && ip.subnet.address){
            return this.isValid(ip.address);
        }
    }
}

/**
 * 
 * @param {String} ip_str 
 * @returns true if given IP Address is loopback else false
 */
module.exports.isLoopback = function (ip_str) {
    if(stringIsValid(ip_str)){
        return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(ip_str);
    }else{
        throw new Error('Invalid IP Address');
    }
};