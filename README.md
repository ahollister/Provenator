# Provenator

[![Travis build](	https://img.shields.io/travis/glowkeeper/Provenator.svg?style=flat-square)](https://travis-ci.org/glowkeeper/Provenator)
[![Issues open](https://img.shields.io/github/issues-raw/badges/shields.svg?style=flat-square)](https://github.com/glowkeeper/Provenator/issues)
[![GitHub version](https://badge.fury.io/gh/glowkeeper%2FProvenator.svg?style=flat-square)](https://badge.fury.io/gh/glowkeeper%2FProvenator)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](/docs/prs.md)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

This is the repository for **Provenator**, a prototype application for proving the origins of captured digital media. It does so using cryptographic tools and blockchain technology. By using the trust mechanisms of blockchain technology, the aim of the application is to show, beyond doubt, the provenance of any source of digital media.

**Provenator** is the result of the academic paper called, **Fake News - a Technological Approach to Proving Provenance Using Blockchains**, by Steve Huckle and Martin White, of the [University of Sussex Informatics Department](http://www.sussex.ac.uk/informatics/). That paper is going to be published in December, 2017, in a special issue on fake news for Mary Anne Liebert's [Big Data](http://www.liebertpub.com/big).

If you would like to help with [further work](#1), then please email s dot huckle at sussex dot ac dot uk.

## Demo

The instructions below allow you to play with a demo' of **Provenator**, which is running on [ipfs](https://ipfs.io/) and Ethereum's test network, [rinkeby](https://www.rinkeby.io).

### Prerequisites

To run the demo', you must first install the browser plugin [MetaMask](https://metamask.io/), which allows you to sign transactions on [Ethereum](https://www.ethereum.org/) networks. **Provenator** is running on [rinkeby](https://www.rinkeby.io), so once you've installed [MetaMask](https://metamask.io/), please select [rinkeby](https://www.rinkeby.io).

To add records to **Provenator**, you will need some test Ether. To get some, follow thje instructions at the [rinkeby faucet](https://www.rinkeby.io/#faucet).

### Running the Demo'

Load the live demo of **Provenator** by loading the following URL into your [MetaMask](https://metamask.io/) enabled browser (having selected the [rinkeby](https://www.rinkeby.io) Ethereum network): [https://gateway.ipfs.io/ipfs/Qmd1wMefUk9k3ch9tcXAmWKDYmsuo3i4AVRSC6oLmZFueD/](https://gateway.ipfs.io/ipfs/Qmd1wMefUk9k3ch9tcXAmWKDYmsuo3i4AVRSC6oLmZFueD/).

If you want to get a record of an image already added to **Provenator** (you will not need any test Ether for this), download this image of an [evil cat](/image/evilCat.bmp), then click on the [Get Object](https://gateway.ipfs.io/ipfs/Qmd1wMefUk9k3ch9tcXAmWKDYmsuo3i4AVRSC6oLmZFueD/#/read) link on **Provenator**, and select the [evil cat](/image/evilCat.bmp) image you just downloaded.

### Demo' Screenshot

Here's a tempting action shot of a very early prototype of **Provenator**:

![Provenator homepage](images/fakeNewsApp.png)

The picture above shows that to describe a digital resource, users of **Provenator** do the following:

1. Get a hash of the digital media.
2. Create and submit metadata pertaining to the digital resource.
3. Sign the transactions created, using [MetaMask](https://github.com/MetaMask/metamask-extension). That will store the cryptographic hash of the digital resource, and its associated metadata, on the [rinkeby](https://www.rinkeby.io) blockchain.

Subsequently, users are able to check a digital resource's provenance data on [rinkeby](https://www.rinkeby.io):

1. Get a cryptographic hash of the digital resource.
2. Check whether that hash exists on the blockchain.
3. If the hash exists, retrieve the associated metadata.

## Installing **Provenator** Locally

The instruction below enable you to run **Provenator** on a local, private, Ethereum test network (via [Ganache](https://github.com/trufflesuite/ganache)).

### Getting Started

After cloning this repository, install the prerequisites listed and follow the instructions below to get the project up and running on your local machine (for development and testing purposes).

However, if you'd rather just use **Provenator**, then it is currently being ported to the Ethereum testnet [rinkeby](https://www.rinkeby.io) and the content delivery network [ipfs](https://ipfs.io/). *Please watch this space*.

Once **Provenator** is running on [rinkeby](https://www.rinkeby.io) and [ipfs](https://ipfs.io/), it won't cost any real Ether to load a media resource and register its provenance. However, you will need some test Ether, and the [rinkeby faucet](https://www.rinkeby.io/#faucet) has instructions for getting some of that.

Meanwhile, if you have any problems, or you would like to get involved, perhaps by helping to port the application to the Ethereum testnet, or by getting involved in [future work](#1), then please email s dot huckle at sussex dot ac dot uk.

### Prerequisites

After cloning this repository, download and install the dependencies:

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Ganache](https://github.com/trufflesuite/ganache)
- [Truffle](https://github.com/trufflesuite/truffle)
- [http-server](https://www.npmjs.com/package/http-server)

### Install

Follow the instructions in the [Ganache](https://github.com/trufflesuite/ganache) repository for downloading and installing Ganache; basically, you need to clone the  [Ganache](https://github.com/trufflesuite/ganache) repository, then build the appropriate image for your platform.

In the **Provinator** repository's home directory, type `npm install`. That should install everything listed in [package.json](/package.json), which form the components of the REACT-based web frontend to this application.

Now, publish the contracts to your local blockchain (via [Ganache](https://github.com/trufflesuite/ganache)):

1. Change directory to the [Ganache](https://github.com/trufflesuite/ganache) repository.
2. Start [Ganache](https://github.com/trufflesuite/ganache) by typing `npm start`.
3. Ensure [Ganache](https://github.com/trufflesuite/ganache) is running on [http://localhost:8545](http://localhost:8545) (you may need to change its settings to do so).
4. Change to the **Provinator** repository's home directory.
5. Change to the **Provinator** directory [/blockchain/contracts](/blockchain/contracts), and type `truffle migrate`.
6. Edit the **Provinator** source file [/app/utils/contractHandler.jsx](/app/utils/contractHandler.jsx) so that the four static variables `premisObjectContractAddress`, `premisEventContractAddress`, `premisAgentContractAddress` and `premisRightsContractAddress` contain the addresses generated by `truffle migrate`, above. e.g

````
static premisObjectContractAddress = '0xb9bfd8ff77db391a28a45b6c1cb72b0028695219'
static premisEventContractAddress = '0x12dba0b95a32239a5ba3e6bf7d05471d18f30d1f'
static premisAgentContractAddress = '0xc3a182dd01e3d9ffdbe95ce568b9c8d936e2ca9d'
static premisRightsContractAddress = '0xec6a5f11e7865aadc61f27faf8707795c1cda868'
````

Now create the web application:

1. Change to the **Provinator** repository's home directory.
2. Build the REACT frontend by typing `npm run copy && npm run watch`.
3. Startup an instance of [http-server](https://www.npmjs.com/package/http-server) by typing `npm run start`.

Then fire up a browser, go to the URL [http://localhost:8081](http://localhost:8081), and use the links to create a digital media resource and subsequently, get details about that resource.

### Built Using...

- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Ganache](https://github.com/trufflesuite/ganache)
- [Truffle](https://github.com/trufflesuite/truffle)
- [REACT](https://reactjs.org/)
<a name="1">&nbsp;</a>
## Future work

A current limitation of **Provenator** is also its strength - the same digital media resource will always generate the same hash. Hence, if two hashes match, you are certain that they are the same object. However, if a single pixel of some digital resource is changed, then that resource will generate a different hash entirely. Therefore, 'similar' media objects will never match. Now, it should be possible to extend **Provenator** so that it uses techniques for finding similar hashes, too. [Perceptual hashing](https://www.phash.org/) is one such candidate, but there may be other methods; by using such techniques, it should be possible to make **Provenator** more capable. The intention is to extend the application and write an academic paper about that extension. Want to help? Then please email s dot huckle at sussex dot ac dot uk.

## Licensing

Copyright © Steve Huckle at the University of Sussex, 2017.

![CC BY-NC-SA 4.0](/images/ccbyncsa.png)

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0). It is attributed to Steve Huckle at the University of Sussex. The license lets you remix, tweak, and build upon the work non-commercially, as long as you credit Steve Huckle and license your new creations under the identical terms.
