<script>
  import Header from '$lib/components/Header.svelte'
  import Scripts from '$lib/components/Scripts.svelte'
  import Help from '@fluentui/svg-icons/icons/question_20_regular.svg?raw'
  import Invisible from '@fluentui/svg-icons/icons/video_person_off_24_regular.svg?raw'
  import Airplane from '@fluentui/svg-icons/icons/airplane_24_regular.svg?raw'
  import Respawn from '@fluentui/svg-icons/icons/arrow_clockwise_24_regular.svg?raw'
  import Refresh from '@fluentui/svg-icons/icons/arrow_clockwise_dashes_24_regular.svg?raw'
  import Hop from '@fluentui/svg-icons/icons/arrow_bounce_24_regular.svg?raw'
  import Rejoin from '@fluentui/svg-icons/icons/arrow_repeat_all_24_regular.svg?raw'
  import { Button, IconButton, InfoBadge, TextBox } from 'fluent-svelte'
</script>

<svelte:head>
  <title>trendsetter</title>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="description" content="fire when the strobe hits you" />
</svelte:head>

<nav />
<aside>
  <h1>MOCKUP</h1>
  <p>
    This screenshot is actually HTML and CSS - it's a mockup of mollermethod 5
    codename "trendsetter".
  </p>
</aside>
<main>
  <Header
    path="/home"
    links={[
      {
        name: 'Help',
        goto: '/',
        icon: Help
      },
      {
        name: 'About',
        goto: '/about',
        icon: ''
      },
      {
        name: 'Contact',
        goto: '/contact',
        icon: ''
      }
    ]}
  >
    <a class="selected" href="/"
      ><img src="https://mthd.ml/icon.png" height="16" alt="mollermethod" /><b
        >mollermethod</b
      ></a
    >
    <form>
      <TextBox type="search" placeholder="Find a script" />
    </form>
  </Header>
  <!-- <h2>welcome to mollermethod support</h2>
  <h3>Problems with a feature/script? Put the tile's ID here.</h3>
  <TextBox required name="q" type="search" />
  <h3>Other problems? Join our support server!</h3>
  <Button variant="hyperlink">Join Support</Button> -->
  <h2>
    <img
      src="https://tr.rbxcdn.com/4fca9c9e02719e0446eaccdbd4dd3670/150/150/AvatarHeadshot/Png"
      alt="me"
      height="64"
    />Hello, SunRaysEffect
  </h2>
  <Scripts
    scripts={[
      {
        name: 'Unnamed ESP',
        description: 'Unnamed ESP is an open source ESP made by icewolf',
        id: 'l123'
      },
      {
        name: 'FE Giant',
        description: 'Makes you giant. (Requires R15 and slender avatar)',
        id: 'l23'
      },
      {
        name: 'domainX cracked',
        description: 'we winning shlex losin',
        id: 's478'
      },
      {
        name: 'molly jumpscare',
        description: 'AAAAA',
        id: 'l6'
      },
      {
        name: 'yeat the best rapper',
        description:
          'I was crying out of depression and lack of money. Then I came across mad bout that because my neighbor blasted it, and I stood up and decided to get my life together and now I got my money up and my hoes stay beggin for my presence. Thank you evil twin.',
        id: 'l10'
      },
      {
        name: 'SQUID GAMES⁉️⁉️⁉️',
        description: `I was splurgin at north park tryna look rich
Could've bought an ass for my motherfuckin bitch`,
        id: 'l11'
      },
      {
        name: 'yessir raknet rce',
        description: 'see "mau roblox lpe"',
        id: 'l11'
      },
      {
        name: 'mau roblox lpe',
        description: 'see "user fmod rce"',
        id: 'l12'
      },
      {
        name: 'user fmod rce',
        description: 'see "yessir raknet rce"',
        id: 'l13'
      }
    ]}
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="plr">
      <select multiple height="5" value="domainhubcrack_ed">
        <option>SunRaysEffect</option>
        <option>UIPadding</option>
        <option>Jack_Hase</option>
        <option>swaggie_auxnos</option>
        <option>Molly_Bdenum</option>
        <option>trollsmile</option>
        <option>svelte_user</option>
        <option selected>domainhubcrac_ked</option>
        <option>MollyMoIIer</option>
        <option>shlexius</option>
      </select>
      <article>
        <h1>
          shlex (@shlexius)<br /><em>created 5 years ago | 304343782</em><br
          /><InfoBadge>mom's credit card</InfoBadge>
        </h1>
        <Button>Fling</Button>
        <Button>To</Button>
        <Button>Bring</Button>
        <Button>Kill</Button>
        <Button>Kick</Button>
      </article>
    </a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="local">
      <IconButton title="Invisible">
        {@html Invisible}
      </IconButton>
      <IconButton title="Fly">
        {@html Airplane}
      </IconButton>
      <IconButton title="Respawn">
        {@html Respawn}
      </IconButton>
      <IconButton title="Refresh">
        {@html Refresh}
      </IconButton>
      <IconButton title="Rejoin">
        {@html Rejoin}
      </IconButton>
      <IconButton title="Serverhop">
        {@html Hop}
      </IconButton>
    </a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="unleashed">
      <h1>Scripting, unleashed.</h1>
      <p>See what's new in mollermethod 5.</p>
    </a>
  </Scripts>
</main>

<style>
  em {
    color: gray;
    font-size: 70%;
  }
  nav {
    /* width: 464px;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 50;
    background: darkslategray; */
    z-index: 49;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url(/bg.png) fixed;
    background-size: 1920px 1080px;
  }
  main {
    max-width: calc(100vw - 464px);
    box-sizing: border-box;
    padding-left: 5em;
    padding-right: 5em;
    left: 464px;
    z-index: 50;
    top: 0;
    position: fixed;
    overflow: auto;
    height: 100vh;
  }
  .local {
    grid-column: 1 / 3;
  }
  .plr article {
    height: 100%;
  }
  select {
    scrollbar-width: thin;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    border: none;
    padding: 0.5em;
    height: 100%;
  }
  option {
    font-family: 'Segoe UI Variable Small';
  }
  .plr {
    display: grid;
    column-gap: initial;
    column-count: initial;
    column-width: initial;
    gap: 1em;
    grid-template-columns: 30% 70%;
    grid-template-rows: masonry;
    padding: 0;
    block-size: 200px;
    grid-column: 1 / 3;
  }
  .unleashed {
    background: var(--fds-accent-tertiary);
    color: var(--fds-text-on-accent-tertiary);
    text-align: center;
  }
  h2 img {
    border-radius: 50%;
    border: solid white 1px;
  }
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
    text-align: center;
  }
  aside {
    opacity: 0.5;
    position: fixed;
    z-index: 5000;
    bottom: 5em;
    right: 5em;
    text-align: right;
    font-size: 0.7em;
  }
</style>
