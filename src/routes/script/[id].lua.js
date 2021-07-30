import dedent from 'dedent'
import exploit from '$lib/exploit.js'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, key)

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params, headers }) {
  const { id } = params
  if (!exploit(headers)) {
    return {
      status: 301,
      headers: {
        Location: '/script/' + id
      }
    }
  }

  const [script] =
    (await supabase.from('scripts').select('*').match({ id })).body || []

  if (!script) {
    return {
      status: 404,
      body: 'error("Script not found.")'
    }
  }

  const using = exploit(headers)
  const analytics =
    (await supabase.from('analytics').select('*')).body ||
    []
  if (!analytics.length) {
    await supabase.from('analytics').insert({ script, [using]: 1 })
  } else {
    await supabase
      .from('analytics')
      .update({ [using]: analytics[0][using] + 1 })
      .match({ id })
  }
  if (script.games?.length) {
    script.source =
      dedent`
      do
        local games = { ${script.games.join(', ')} }
        if not table.find(games, game.PlaceId) then -- place id NOT game id

          -- validnumber function and random string polyfill by Amourousity
          local function ValidNumber(Number)
            local Returned = table.pack(pcall(function()
                return type(Number) == "number" and not string.find(string.lower(tostring(Number)),"nan")
            end))
            table.remove(Returned,1)
            return unpack(Returned)
          end
          
          local function RandomString(Length)
              local Returned = table.pack(pcall(function()
                  return string.gsub(string.rep(" ",ValidNumber(Length) and math.clamp(Length,1,2e5-1) or math.random(5,100)),".",function()
                      return string.char(({math.random(48,57),math.random(65,90),math.random(97,122)})[math.random(1,3)])
                  end)
              end))
              table.remove(Returned,1)
              return unpack(Returned)
          end

          local random = (crypt and (crypt.random or crypt.generatebytes)) or (syn and syn.crypt and syn.crypt.random) or RandomString
          local gui = Instance.new('ScreenGui')
          gui.Name = random(200)

          -- parenting
          if syn and syn.protect_gui then
            syn.protect_gui(gui)
            gui.Parent = game:GetService('CoreGui')
          elseif gethui then
            gui.Parent = gethui()
          else
            local worked = pcall(function ()
              gui.Parent = game:GetService('CoreGui')
            end)
            if not worked then
              gui.Parent = game:GetService('Players').LocalPlayer:FindFirstChildWhichIsA('PlayerGui')
            end
          end

          -- make gui
          local frame = Instance.new('Frame', gui)
          frame.Size = UDim2.new(0, 300, 0, 500)
          frame.Position = UDim2.new(0.5, 0, 0.5, 0)
          frame.AnchorPoint = Vector2.new(0.5, 0.5)
          frame.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
          frame.BorderSizePixel = 0

          Instance.new('UICorner', frame).CornerRadius = UDim.new(0,8)
          local list = Instance.new('UIListLayout', frame)
          list.FillDirection = Enum.FillDirection.Vertical
          list.HorizontalAlignment = Enum.HorizontalAlignment.Center
          list.SortOrder = Enum.SortOrder.Name

          local heading = Instance.new('TextLabel', frame)
          heading.Font = Enum.Font.GothamBlack
          heading.Text = 'This script does not support this game.'
          heading.TextColor3 = Color3.new(1,1,1)
          heading.Size = UDim2.new(1, 0, 0, 50)
          heading.TextWrapped = true
          heading.TextSize = 20
          heading.Name = '!'
          heading.BackgroundTransparency = 1

          local heading2 = Instance.new('TextLabel', frame)
          heading2.Font = Enum.Font.GothamBold
          heading2.Text = 'However, these games do:'
          heading2.TextColor3 = Color3.new(1,1,1)
          heading2.Size = UDim2.new(1, 0, 0, 50)
          heading2.TextSize = 15
          heading2.Name = '!1'
          heading2.BackgroundTransparency = 1
          for _,v in pairs(games) do
            local btn = Instance.new('TextButton', frame)
            btn.Font = Enum.Font.Gotham
            btn.TextColor3 = Color3.new(1,1,1)
            btn.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
            btn.Size = UDim2.new(1, 0, 0, 50)
            btn.TextSize = 15
            local name = game:GetService('MarketplaceService'):GetProductInfo(v).Name
            btn.Name = '1' .. name
            btn.Text = name
            btn.MouseButton1Click:Connect(function ()
              game:GetService('TeleportService'):Teleport(v)
            end)
            btn.BackgroundTransparency = 1
          end
          local close = Instance.new('TextButton', frame)
          close.Font = Enum.Font.GothamBold
          close.Text = 'Script hosted on Luau.ml (Click here to close)'
          close.TextWrapped = true
          close.Name = 'ZZZZZZZZZZ'
          close.TextColor3 = Color3.new(1,1,1)
          close.Size = UDim2.new(1, 0, 0, 50)
          close.TextSize = 17
          close.MouseButton1Click:Connect(function ()
              gui:Destroy()
          end)
          close.BackgroundTransparency = 1
          error('Game not supported.')
        end
      end
    ` +
      '\n' +
      script.source
  }
  if (script) {
    return {
      body: script.source
    }
  }
}
