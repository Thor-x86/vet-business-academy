# Vet Business Academy's Abandoned Site

This source code supposed to be proprietary. However, they won't care the site anymore. So I publish this to GitHub for knowledge sharing. This site is using [Vue](https://vuejs.org/) with [router](https://router.vuejs.org/) and **authentication**. So you could use this as an example for your ongoing project. Do whatever you want with this source, just **don't forget to credit my name** if you copy a lot of stuffs from here. Thanks!

## Username and Password

See [AccountAPI.ts](https://github.com/Thor-x86/vet-business-academy/blob/master/src/api/AccountAPI.ts). Modify it as you like :)

## Project setup

First, you have to install [NPM](https://nodejs.org/en/download/). Then use command prompt or terminal, go to this folder with `cd` command (or for Windows users: right-click+shift on this folder then choose Command Prompt or Powershell). After that, enter this command:

```
npm install
```

### Run the site in development mode

After project setup, you can run the site with this command:

```
npm run serve
```

Then go visit [localhost:8080](http://localhost:8080) on your browser.

### Publish the site

Run this command first:

```
npm run build
```

After finished, copy everything inside `dist` folder to your hosting's `public_html`.

### Lints and fixes files

As an additional knowledge, you can lint (a.k.a. fix coding style) with this command:

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
