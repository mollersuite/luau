# luau

the script-ware of script sharing websites

(many "useless" features)

## usage

```sh
# install node, if you haven't already
# Windows 10/11
# when winget releases this will be `winget install OpenJS.NodeJS`
curl https://nodejs.org/dist/v14.18.0/node-v14.18.0-x64.msi -o %temp%/node.msi
%temp%/node.msi
# Ubuntu
sudo apt install nodejs
# Arch
sudo pacman -S nodejs
# Alpine
apk add nodejs-current
```

```sh
git clone https://github.com/mollersuite/luau
cd luau
npm i
npm run build
wrangler deploy
```
