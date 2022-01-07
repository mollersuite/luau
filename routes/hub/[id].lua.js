// TODO

import { createClient } from '@supabase/supabase-js'
import dedent from 'dedent'
import { encode } from '$lib/lua'
import exploit from '$lib/exploit'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, key, {
  fetch: fetch.bind(globalThis)
})

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params: { id }, headers, url }) {
  if (!exploit(headers)) {
    return {
      status: 301,
      headers: {
        Location: '/hub/' + id
      }
    }
  }
  const {
    body: [hub]
  } = await supabase.from('hubs').select('*').match({ id })
  const { body: scripts } = await supabase
    .from('scripts')
    .select('name,games,id,name')
    .in('id', hub.scripts)
  return {
    body: dedent`
      local scripts = ${encode(scripts)}
      local works_here = {}
      for _,v in pairs(scripts) do
        if not v.games or table.find(v.games, game.PlaceId) then
          table.insert(works_here, v)
        end
      end
      local gui = Instance.new('ScreenGui')
      gui.ResetOnSpawn = false
      gui.Name = game:GetService('HttpService'):GenerateGUID(false)
      if gethui then
          gui.Parent = gethui()
      elseif syn and syn.protect_gui then
          syn.protect_gui(gui)
          gui.Parent = game:GetService('CoreGui')
      else
          xpcall(function ()
              gui.Parent = game:GetService('CoreGui')
          end, function ()
              gui.Parent = game:GetService('Players').LocalPlayer:FindFirstChildOfClass('PlayerGui')
          end)
      end
            
      local Frame = Instance.new("ScrollingFrame")
      local UIListLayout = Instance.new("UIListLayout")
      local TextButton_2 = Instance.new("TextButton")

      --Properties:

      Frame.Name = "Frame"
      Frame.Parent = gui
      Frame.AnchorPoint = Vector2.new(1, 1)
      Frame.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
      Frame.BorderColor3 = Color3.fromRGB(27, 42, 53)
      Frame.BorderSizePixel = 0
      Frame.AutomaticCanvasSize = Enum.AutomaticSize.Y
      Frame.Position = UDim2.new(1, 0, 1, 0)
      Frame.Selectable = false
      Frame.Size = UDim2.new(0, 300, 0, 500)
      Frame.CanvasSize = UDim2.new(0, 0, 0, 0)

      UIListLayout.Parent = Frame

      for _,v in pairs(works_here) do
        local TextButton = Instance.new("TextButton")
        TextButton.Parent = Frame
        TextButton.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
        TextButton.BorderColor3 = Color3.fromRGB(27, 42, 53)
        TextButton.BorderSizePixel = 0
        TextButton.Size = UDim2.new(1, 0, 0, 0)
        TextButton.AutomaticSize = Enum.AutomaticSize.Y
        TextButton.Font = Enum.Font.SourceSans
        TextButton.Text = v.name .. (not v.games and " (Works everywhere)" or "")
        TextButton.TextColor3 = Color3.fromRGB(255, 255, 255)
        TextButton.TextSize = 14
        TextButton.Name = v.name
        TextButton.TextWrapped = true
        TextButton.TextXAlignment = Enum.TextXAlignment.Left
        TextButton.TextYAlignment = Enum.TextYAlignment.Top
        TextButton.MouseButton1Click:Connect(function()
          loadstring(game:HttpGetAsync('${url.origin}/script/lua/' .. v.id), v.Name)()
        end)
      end

      -- Close
      TextButton_2.Name = "!"
      TextButton_2.Parent = Frame
      TextButton_2.Active = false
      TextButton_2.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
      TextButton_2.BorderColor3 = Color3.fromRGB(27, 42, 53)
      TextButton_2.Selectable = false
      TextButton_2.Size = UDim2.new(1, 0, 0, 25)
      TextButton_2.Font = Enum.Font.GothamBlack
      TextButton_2.Text = ${JSON.stringify(hub.name)}
      TextButton_2.TextColor3 = Color3.fromRGB(255, 255, 255)
      TextButton_2.TextSize = 14.000
      TextButton_2.MouseButton1Click:Connect(function ()
        gui:Destroy()
      end)
    `
  }
}
