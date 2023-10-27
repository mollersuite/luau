# Luau.ml is Open Source

To celebrate [Roblox exploiting offically dying](https://devforum.roblox.com/t/exploit-prevention-update/2663101), we have released the Luau.ml source code.

Luau.ml was Etcetera's take on "cloud scripts", and predates both Fluxus' rbxscripts.xyz and Thunder Mods' scriptblox.com by at least 7 months. Luau.ml also had Hubs: playlists of scripts that were themselves scripts. Other platforms never implemented lists, let alone made them work in-game.

Luau.ml also briefly featured the "Luau Hub", a Roblox frontend for Luau.ml. This predated the Sirius "ScriptSearch" by over a year.

Also notable is [trendsetter.svelte](./routes/trendsetter.svelte). This was a UI concept for mollermethod 5 "trendsetter", the first public release of mollermethod.

Luau.ml was powered by SvelteKit, Supabase, and fluent-svelte.

We planned on launching analytics, whitelisting, support for screenshots and profile pictures, and automatic changelogs, but never did, mostly because we lost motivation when ScriptBlox launched and instantly gained over ten thousand users.

---

# luau

the script-ware of script sharing websites

(many "useless" features)

## usage

```sh
# install node, if you haven't already
# Windows 10/11
winget install OpenJS.NodeJS
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
