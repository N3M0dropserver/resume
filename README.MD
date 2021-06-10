# Resume site

A site/blog for my Resume

---
## Requirements

For development, you will only need Node.js. Optionally a node global package, Yarn which helps with
installing into your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Node installation on Arch

  You can use pacman or even better yay (Yet Another Yaourt).
      
      $ pacman -S nodejs
      $ pacman -S npm

      $ yay nodejs
      $ yay npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/N3M0dropserver/resume
    $ cd resume
    $ yarn install

## Configure app

There is no settings feel free to make changes in `index.js` then edit it with your desired changes.


## Running the project

    $ yarn start

## Simple build for production

    $ yarn build

## Alternatively to install and start you can:

    $ git clone https://github.com/N3M0dropserver/resume
    $ cd resume
    $ npm install / npm -i
    $ node index.js

You can also run ```$ node index.js &``` to run the node server in the background

