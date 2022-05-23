# IPv4 Utils

## Table of Contents
* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)

## Overview
IPv4 Utils is a library for working with IPv4 addresses.

## Installation
IPv4 Utils is available on npm as ipv4-utils:
```sh
$ npm install --save ipv4-utils
```
To use the module in your application, `require` it from any JavaScript file:
```js
const ipv4_utils = require('ipv4-utils');
```

## Usage

### Require IPv4 Utils
```js
const ipv4_utils = require('ipv4-utils');
```
### Get local IPv4 Address
```js
const myIPv4 = ipv4_utils.myIP();
/*
Response sample:

{
    address: '192.168.0.0',
    netmask: {
        address: '255.255.255.0',
        binary: '11111111111111111111111100000000'
    },
    cidr: '192.168.0.0/24'
}
*/
const myIPv4_str = myIPv4.address;
//192.168.0.0
const myIPv4_cidr = myIPv4.cidr;
//192.168.0.0/24
const myIPv4_netmask_addr = myIPv4.netmask.address;
//255.255.255.0
const myIPv4_netmask_binary = myIPv4.netmask.binary;
//11111111111111111111111100000000
```

### Calculate CIDR using existing IPv4 address and netmask
```js

const cidr = ipv4_utils.cidrFromIPv4(myIPv4_str, myIPv4_netmask_addr);
/*NOTE: 
Allowed values for IP address:
    -IPv4 address string. (Ex: '192.168.0.0')
    -IPv4 address binary string. (Ex: '11000000101010000000000000000000')
    -IPv4 address integer (Ex: 3232235520)
    -IPv4 address array (Ex: [192, 168, 0, 0])

Allowed values for netmask:
    -IPv4 netmask address string. (Ex: '255.255.255.0')
    -IPv4 netmask binary string. (Ex: '11111111111111111111111100000000')
    -IPv4 netmask integer (Ex: 4294967040)
    -IPv4 netmask array (Ex: [255, 255, 255, 0])
*/
```
### Parse IPv4 address
```js
const ipv4_str = '192.168.0.0';
const ipv4_binary = '11000000101010000000000000000000';
const ipv4_int = 3232235520;
const ipv4_arr = ipv4_utils.parse(ipv4_str);

ipv4_utils.parse(ipv4_binary); //Output: [192, 168, 0, 0]
ipv4_utils.parse(ipv4_int); //Output: [192, 168, 0, 0]
ipv4_utils.parse(ipv4_arr); //Output: [192, 168, 0, 0]

/*NOTE:
Allowed values for IP address:
    -IPv4 address string. (Ex: '192.168.0.0')
    -IPv4 address binary string. (Ex: '11000000101010000000000000000000')
    -IPv4 address integer (Ex: 3232235520)
    -IPv4 object (Ex: { address: '192.168.0.0', netmask: {address: '255.255.255.0', binary: '11111111111111111111111100000000'}, cidr: '192.168.0.0/24' })
*/
```