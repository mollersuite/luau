import { scripts } from './_scripts.js'
import dedent from 'dedent'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { id } = params

  if (isNaN(Number(id))) {
    return {
      status: 400,
      body: 'error("ID must be a number")'
    }
  }

  const script = scripts[Number(id)]?.source
  if (script.games?.length) {

    script.source = dedent`
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

          local list = Instance.new('UIListLayout', frame)
          list.FillDirection = Enum.FillDirection.Vertical
          list.HorizontalAlignment = Enum.HorizontalAlignment.Center

          local heading = Instance.new('TextLabel', frame)
          heading.Font = Enum.Font.GothamBlack
          heading.Text = 'This script does not support this game.'
          heading.TextColor3 = Color3.new(1,1,1)
          heading.Size = UDim2.new(1, 0, 0, 50)
          heading.TextSize = 20
          heading.BackgroundTransparency = 1

          local heading2 = Instance.new('TextLabel', frame)
          heading2.Font = Enum.Font.GothamBold
          heading2.Text = 'However, these games do:'
          heading2.TextColor3 = Color3.new(1,1,1)
          heading2.Size = UDim2.new(1, 0, 0, 50)
          heading2.TextSize = 20
          heading2.BackgroundTransparency = 1
          for _,v in pairs(games) do
            
          end
        end
      end
    ` + script.source
  }
  if (script) {
    return {
      body: script
    }
  }
}
