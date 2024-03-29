do
  local games = { _games }
  if not table.find(games, game.PlaceId) then -- place id NOT game id
    local gui = Instance.new('ScreenGui')
    gui.Name = game:GetService('HttpService'):GenerateGUID(false)

    if gethui then
      gui.Parent = gethui()
    elseif syn and syn.protect_gui then
      syn.protect_gui(gui)
      gui.Parent = game:GetService('CoreGui')
    else
      xpcall(
        function()
          gui.Parent = game:GetService('CoreGui')
        end,
        function()
          gui.Parent =
            game:GetService('Players').LocalPlayer:FindFirstChildOfClass(
              'PlayerGui'
            )
        end
      )
    end

    -- make gui
    local frame = Instance.new('Frame', gui)
    frame.Size = UDim2.new(0, 300, 0, 500)
    frame.Position = UDim2.new(0.5, 0, 0.5, 0)
    frame.AnchorPoint = Vector2.new(0.5, 0.5)
    frame.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
    frame.BorderSizePixel = 0

    Instance.new('UICorner', frame).CornerRadius = UDim.new(0, 8)
    local list = Instance.new('UIListLayout', frame)
    list.FillDirection = Enum.FillDirection.Vertical
    list.HorizontalAlignment = Enum.HorizontalAlignment.Center
    list.SortOrder = Enum.SortOrder.Name

    local heading = Instance.new('TextLabel', frame)
    heading.Font = Enum.Font.GothamBlack
    heading.Text = 'This script does not support this game.'
    heading.TextColor3 = Color3.new(1, 1, 1)
    heading.Size = UDim2.new(1, 0, 0, 50)
    heading.TextWrapped = true
    heading.TextSize = 20
    heading.Name = '!'
    heading.BackgroundTransparency = 1

    local heading2 = Instance.new('TextLabel', frame)
    heading2.Font = Enum.Font.GothamBold
    heading2.Text = 'However, these games do:'
    heading2.TextColor3 = Color3.new(1, 1, 1)
    heading2.Size = UDim2.new(1, 0, 0, 50)
    heading2.TextSize = 15
    heading2.Name = '!1'
    heading2.BackgroundTransparency = 1
    for _, v in pairs(games) do
      local btn = Instance.new('TextButton', frame)
      btn.Font = Enum.Font.Gotham
      btn.TextColor3 = Color3.new(1, 1, 1)
      btn.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
      btn.Size = UDim2.new(1, 0, 0, 50)
      btn.TextSize = 15
      local name = game:GetService('MarketplaceService'):GetProductInfo(v).Name
      btn.Name = '1' .. name
      btn.Text = name
      btn.MouseButton1Click:Connect(function()
        game:GetService('TeleportService'):Teleport(v)
      end)
      btn.BackgroundTransparency = 1
    end
    local close = Instance.new('TextButton', frame)
    close.Font = Enum.Font.GothamBold
    close.Text = 'Script hosted on Luau.ml (Click here to close)'
    close.TextWrapped = true
    close.Name = 'ZZZZZZZZZZ'
    close.TextColor3 = Color3.new(1, 1, 1)
    close.Size = UDim2.new(1, 0, 0, 50)
    close.TextSize = 17
    close.MouseButton1Click:Connect(function()
      gui:Destroy()
    end)
    close.BackgroundTransparency = 1
    error('Game not supported.')
  end
end
