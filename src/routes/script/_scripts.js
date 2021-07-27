import dedent from 'dedent'

export const scripts = {
  [1]: {
    name: 'Tux Autofarm',
    description:
      'The fastest autofarm for Build A Boat For Treasure, powered by Tux.',
    source: dedent`
    local Stages = workspace.BoatStages.NormalStages
    local client = game:GetService("Players").LocalPlayer
    local RunService = game:GetService("RunService")

    local Penguin = workspace.ChangeCharacter
    local Gold = workspace.ClaimRiverResultsGold

    _G.Busy = true

    function Float()
        while _G.Busy do
            RunServices.RenderStepped:wait()
            if client.Character:FindFirstChild("Humanoid") ~= nil then
                client.Character.Humanoid:ChangeState(10)
            end
        end
    end

    function Farm()
        while _G.Busy do
            for i = 1,10 do
            wait(2)
            client.Character.HumanoidRootPart.CFrame = Stages["CaveStage" .. i].DarknessPart.CFrame
            wait(0.1)
            Gold:FireServer() end
            wait(1)
            Penguin:FireServer("PenguinCharacter")
            client.Character:WaitForChild("HumanoidRootPart", math.huge)
        end
    end

    spawn(Float) spawn(Farm)
    `,
    games: [537413528]
  },
  [2]: {
    name: 'moller hub',
    description: 'A terrible script hub, powered by beagles.',
    source: dedent`
    -- //
    -- || INSTANCE SETUP
    -- \\
    local lplr = game:GetService('Players').LocalPlayer
    local mollerhub = Instance.new("ScreenGui")
    mollerhub.Name = game:GetService('HttpService'):GenerateGUID()
    mollerhub.IgnoreGuiInset = true
    mollerhub.ResetOnSpawn = falase
    local main = Instance.new("ImageButton", mollerhub)
    local List = Instance.new("ScrollingFrame", mollerhub)
    local UIListLayout = Instance.new("UIListLayout", List)

    -- Parenting
    if syn and syn.protect_gui then
      syn.protect_gui(mollerhub)
    end

    local incoregui = pcall(function ()
      mollerhub.Parent = gethui and gethui() or game:GetService('CoreGui')
    end)

    if not incoregui then
      mollerhub.Parent = lplr:WaitForChild("PlayerGui")
    end

    main.AnchorPoint = Vector2.new(0, 1)
    main.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    main.BackgroundTransparency = 1
    main.BorderSizePixel = 0
    main.Position = UDim2.new(0, 0, 1, 0)
    main.Size = UDim2.new(0, 50, 0, 50)
    main.ZIndex = 10000
    main.Image = "rbxassetid://7027680965"
    main.ImageTransparency = 1
    main.ScaleType = Enum.ScaleType.Fit

    List.AutomaticCanvasSize = Enum.AutomaticSize.X
    List.AnchorPoint = Vector2.new(0, 1)
    List.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
    List.BorderColor3 = Color3.fromRGB(27, 42, 53)
    List.BorderSizePixel = 0
    List.ClipsDescendants = true
    List.Position = UDim2.new(0, 50, 1, 0)
    List.Selectable = false
    List.ScrollBarThickness = 0
    List.Size = UDim2.new(0,0,0,50)
    List.CanvasSize = UDim2.new(0, 0, 0, 0)

    Instance.new('UIPadding', List).PaddingLeft = UDim.new(0,5)

    UIListLayout.VerticalAlignment = Enum.VerticalAlignment.Center
    UIListLayout.FillDirection = Enum.FillDirection.Horizontal
    UIListLayout.Padding = UDim.new(0,5)
    UIListLayout.SortOrder = Enum.SortOrder.Name

    -- //
    -- || INTRO
    -- \\

    local Tween = game:GetService('TweenService')
    local Debris = game:GetService('Debris')

    local ids = {
      7037264869, -- molly sleeping in my bed
      7037156897, -- Exruw's favorite Molly photo
      7043731194, -- molly mug
      7037269561, -- devil dog (will kill you if you do not repost)
      7037272153, -- mollerOS logo
      7037339934, -- molge
      7037356929, -- idk what this is but its funny
      7044042331, -- mollersuite/moller hub logo before it got turned monocolor
      7044088926, -- seconds before "bragle" was taken
      7046289590, -- she wants your food
    }

    function intro ()
      Tween:Create(main, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In, .5), {
        BackgroundTransparency = 0
      }):Play()

      for i = 0,50 do
        local particle = Instance.new('ImageLabel', mollerhub)
        particle.Size = UDim2.new(0,150,0,150)
        particle.Image = 'rbxassetid://' .. ids[math.random(#ids)]
        particle.BackgroundTransparency = 1
        particle.ScaleType = Enum.ScaleType.Fit
        particle.ZIndex = -100
        particle.AnchorPoint = Vector2.new(0,1)
        particle.Position = UDim2.new(math.random(), 0, math.random(), 0)
        particle.ImageTransparency = 1
        Tween:Create(particle, TweenInfo.new(.1), {
          ImageTransparency = 0
        }):Play()
        Tween:Create(particle, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In), {
          Position = UDim2.new(0,0,1,0),
          Size = UDim2.new()
        }):Play()
        Debris:AddItem(particle, 1.5)
        game:GetService('RunService').Heartbeat:Wait()
      end

      wait(1.5)

      Tween:Create(main, TweenInfo.new(.3, Enum.EasingStyle.Sine, Enum.EasingDirection.Out, 0, false), {
        ImageTransparency = 0,
        BackgroundTransparency = 1
      }):Play()
    end

    coroutine.wrap(intro)()

    function outro ()
      Debris:AddItem(main, 0)
      Debris:AddItem(List, 0)

      for i = 0,50 do
        local particle = Instance.new('ImageLabel', mollerhub)
        particle.Size = UDim2.new()
        particle.Image = 'rbxassetid://' .. ids[math.random(#ids)]
        particle.BackgroundTransparency = 1
        particle.ScaleType = Enum.ScaleType.Fit
        particle.ZIndex = -100
        particle.AnchorPoint = Vector2.new(0,1)
        particle.Position = UDim2.new(0,0,1,0)
        particle.ImageTransparency = 0
        Tween:Create(particle, TweenInfo.new(.1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, 0,false,.7), {
          ImageTransparency = 1
        }):Play()
        Tween:Create(particle, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
          Position = UDim2.new(math.random(), 0, math.random(), 0),
          Size = UDim2.new(0,150,0,150)
        }):Play()
        Debris:AddItem(particle, 1.5)
        game:GetService('RunService').Heartbeat:Wait()
      end
      game:GetService('Debris'):AddItem(mollerhub, 1.5)
    end


    -- //
    -- || SCRIPTS
    -- \\

    local Scripts = {
      -- universal
      ["Close moller hub"] = {
        load = outro
      },
      ["Infinite Yield"] = {
        load = 'https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source'
      },
      ["CMD-X"] = {
        load = 'https://raw.githubusercontent.com/CMD-X/CMD-X/master/Source'
      },
      ["Domain 2"] = {
        load = 'https://github.com/shlexsoftworks/Domain/blob/main/source'
      },
      ["Hydroxide"] = {
        load = function ()
          local owner = "CandyWirus"
          local branch = "revision"

          local function webImport(file)
            return loadstring(game:HttpGetAsync(("https://raw.githubusercontent.com/%s/Hydroxide/%s/%s.lua"):format(owner, branch, file)), file .. '.lua')()
          end

          shared.Dihydroxide = {}
          shared.Dihydroxide.owner = owner
          shared.Dihydroxide.branch = branch

          webImport("init")
          webImport("ui/main")
        end
      },
      --games
      ["Magma Core"] = {
        load = 'https://raw.githubusercontent.com/opBandwidth/Magma-Core/main/Jailbreak/Main.lua',
        games = {606849621, 245662005}
      },
      ["Barrier Remover"] = {
        load = 'https://pastebin.com/raw/HqFgVGXn',
        games = {1217895158,3243063589,718328620,610172644,738548299,5580097107,323925323,3522042406,2075082966}
      },
      ["molafarm"] = {
        load = function ()
          local Stages = workspace.BoatStages.NormalStages
          local on = true
          coroutine.wrap(function ()
            while on do
              for i = 1, 10 do
                game:GetService('TweenService'):Create(lplr.Character.HumanoidRootPart, TweenInfo.new(.1), {
                  CFrame = Stages["CaveStage"..i].DarknessPart.CFrame
                }):Play()
                Stages["CaveStage"..i].DarknessPart.Touched:Wait()
                workspace.ClaimRiverResultsGold:FireServer()
              end
            end
          end)()
          return function ()
            on = false
          end
        end,
        games = {210851291, 537413528}
      }
    }

    function Button (text, first)
      local TextButton = Instance.new("TextButton")
      local UIPadding = Instance.new("UIPadding", TextButton)
      local UICorner = Instance.new("UICorner", TextButton)
      TextButton.AutomaticSize = Enum.AutomaticSize.X
      TextButton.BackgroundColor3 = Color3.fromRGB(61, 96, 121)
      TextButton.BorderColor3 = Color3.fromRGB(27, 42, 53)
      TextButton.BorderSizePixel = 0
      TextButton.Size = UDim2.new(0, 100, 0, 25)
      TextButton.Font = Enum.Font.Roboto
      TextButton.Text = text
      TextButton.TextWrapped = false
      TextButton.Name = first and ('!' .. text) or text
      TextButton.TextColor3 = Color3.fromRGB(255, 255, 255)
      TextButton.TextSize = 14.000

      UIPadding.PaddingLeft = UDim.new(0, 5)
      UIPadding.PaddingRight = UDim.new(0, 5)
      UICorner.CornerRadius = UDim.new(0,8)

      return TextButton
    end

    for name, data in pairs(Scripts) do
      if (not data.games) or table.find(data.games, game.GameId) then
        local code = data.load
        local btn = Button(name, data.games and true or nil)
        btn.Parent = List
        local enabled = false
        local disable
        pcall(function ()
          btn.MouseButton1Click:Connect(
            typeof(code) == 'string'
              and loadstring(game:HttpGet(code, true))
              or function ()
              if not enabled then
                local result = code()
                if typeof(result) == 'function' then
                  enabled = true
                  btn.BackgroundColor3 = Color3.fromRGB(60, 200, 60)
                  disable = result
                elseif typeof(result) == 'RBXScriptConnection' then
                  enabled = true
                  btn.BackgroundColor3 = Color3.fromRGB(60, 200, 60)
                  disable = function ()
                    result:Disconnect()
                  end
                end
              else
                disable()
                btn.BackgroundColor3 = Color3.fromRGB(61, 96, 121)
                enabled = false
              end
            end
          )
        end)
      end
    end

    local open = false
    main.MouseButton1Click:Connect(function ()
      open = not open
      if open then
        List.ScrollBarThickness = 12
        Tween:Create(List, TweenInfo.new(.3), {
          Size = UDim2.new(1,-50,0,50)
        }):Play()
      else
        List.ScrollBarThickness = 0
        Tween:Create(List, TweenInfo.new(.3), {
          Size = UDim2.new(0,0,0,50)
        }):Play()
      end
    end)
    `
  }
}
