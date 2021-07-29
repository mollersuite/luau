getgenv().request = request or (http and http.request) or (syn and syn.request) or (lib and lib.request)

-- //
-- || INSTANCE SETUP
-- \\
local lplr = game:GetService('Players').LocalPlayer
local luau = Instance.new("ScreenGui")
luau.Name = game:GetService('HttpService'):GenerateGUID()
luau.IgnoreGuiInset = true
luau.ResetOnSpawn = false
local main = Instance.new("ScrollingFrame", luau)
local UIListLayout = Instance.new("UIListLayout", main)


if gethui then
	luau.Parent = gethui()
elseif syn and syn.protect_gui then
	syn.protect_gui(luau)
else
	local incoregui = pcall(function ()
		luau.Parent = game:GetService('CoreGui')
	end)

	if not incoregui then
		luau.Parent = lplr:WaitForChild("PlayerGui")
	end
end

main.CanvasSize = UDim2.new(0,0,0,0)
main.AnchorPoint = Vector2.new(0.5, 0.5)
main.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
main.BorderSizePixel = 0
main.Position = UDim2.new(0.5, 0, 0.5, 0)
main.Size = UDim2.new(0, 0, 0, 0)
main.AutomaticCanvasSize = Enum.AutomaticSize.Y
main.VerticalScrollBarInset = Enum.ScrollBarInset.ScrollBar

UIListLayout.VerticalAlignment = Enum.VerticalAlignment.Top
UIListLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
UIListLayout.FillDirection = Enum.FillDirection.Vertical
UIListLayout.Padding = UDim.new(0,5)
UIListLayout.SortOrder = Enum.SortOrder.Name

-- //
-- || INTRO
-- \\

local Tween = game:GetService('TweenService')
local Debris = game:GetService('Debris')

local ids = {
	7168960412,
	7168960458,
	7168960513
}

function intro ()
	Tween:Create(main, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In, 0, false, .5), {
		Size = UDim2.new(0, 300, 0, 500)
	}):Play()
	for i = 0,50 do
		local particle = Instance.new('ImageLabel', luau)
		particle.Size = UDim2.new(0,100,0,100)
		particle.Image = 'rbxassetid://' .. ids[math.random(#ids)]
		particle.BackgroundTransparency = 1
		particle.ScaleType = Enum.ScaleType.Fit
		particle.ZIndex = -100
		particle.AnchorPoint = Vector2.new(0.5,0.5)
		particle.Position = UDim2.new(math.random(), 0, math.random(), 0)
		particle.ImageTransparency = 1
		Tween:Create(particle, TweenInfo.new(.1), {
			ImageTransparency = 0
		}):Play()
		Tween:Create(particle, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.In), {
			Position = UDim2.new(0.5,0,0.5,0),
			Size = UDim2.new()
		}):Play()
		Debris:AddItem(particle, 1.5)
		game:GetService('RunService').Heartbeat:Wait()
	end

	wait(1.5)

	-- tween everything else LOL
end

coroutine.wrap(intro)()

function outro ()
	Tween:Create(main, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out, 0), {
		Size = UDim2.new(0, 0, 0, 0)
	}):Play()

	for i = 0,50 do
		local particle = Instance.new('ImageLabel', luau)
		particle.Size = UDim2.new()
		particle.Image = 'rbxassetid://' .. ids[math.random(#ids)]
		particle.BackgroundTransparency = 1
		particle.ScaleType = Enum.ScaleType.Fit
		particle.ZIndex = -100
		particle.AnchorPoint = Vector2.new(0.5,0.5)
		particle.Position = UDim2.new(0.5,0,0.5,0)
		particle.ImageTransparency = 0
		Tween:Create(particle, TweenInfo.new(.1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, 0,false,.7), {
			ImageTransparency = 1
		}):Play()
		Tween:Create(particle, TweenInfo.new(1, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out), {
			Position = UDim2.new(math.random(), 0, math.random(), 0),
			Size = UDim2.new(0,100,0,100)
		}):Play()
		Debris:AddItem(particle, 1.5)
		game:GetService('RunService').Heartbeat:Wait()
	end
	game:GetService('Debris'):AddItem(luau, 1.5)
end

local function get (url)
	return game:GetService('HttpService'):JSONDecode(game:HttpGet('https://luau.ml/' .. url))
end

local scripts = get('scripts/0.json')

for _,scr in pairs(scripts) do
	if (not scr.games) or table.find(scr.games, game.PlaceId) then
		local btn = Instance.new('TextButton', main)
		btn.Font = Enum.Font.GothamBlack
		btn.Size = UDim2.new(1,-10,0,75)
		btn.TextXAlignment = Enum.TextXAlignment.Left
		btn.TextYAlignment = Enum.TextYAlignment.Top
		btn.TextWrapped = true
		btn.RichText = true
		btn.TextColor3 = Color3.new(1,1,1)
		btn.AutomaticSize = Enum.AutomaticSize.Y
		btn.BackgroundColor3 = Color3.fromRGB(27, 42, 53)
		btn.Text = scr.name .. '\n<font face="Gotham">' .. scr.description .. '</font>'
		btn.Name = scr.name
		btn.TextSize = 17
		btn.MouseButton1Click:Connect(function ()
		  loadstring(request({
		    Url = "https://luau.ml/script/" .. scr.id,
		    Method = 'GET'
		  }).Body, scr.name)()
		end)
		local padding = Instance.new('UIPadding', btn)
		padding.PaddingLeft = UDim.new(0,5)
		padding.PaddingTop = UDim.new(0,5)
		padding.PaddingRight = UDim.new(0,5)
		padding.PaddingBottom = UDim.new(0,5)
		Instance.new('UICorner', btn).CornerRadius = UDim.new(0,8)
	end
end

-- Header
do
	local header = Instance.new('ScrollingFrame', main)
	header.AutomaticCanvasSize = Enum.AutomaticSize.X
	header.CanvasSize = UDim2.new(0,0,0,0)
	header.Name = string.rep('!', 100)
	header.Size = UDim2.new(1,0,0,50)
	header.BackgroundColor3 = Color3.fromRGB(27, 42, 53)

	local list = Instance.new("UIListLayout", header)
	list.VerticalAlignment = Enum.VerticalAlignment.Center
	list.HorizontalAlignment = Enum.HorizontalAlignment.Left
	list.FillDirection = Enum.FillDirection.Horizontal
	list.Padding = UDim.new(0,5)
	list.SortOrder = Enum.SortOrder.Name

	local name = Instance.new('TextLabel', header)
	name.Size = UDim2.new(0,0,1,0)
	name.BackgroundTransparency = 1
	name.Text = 'Luau.ml'
	name.Font = Enum.Font.GothamBlack
	name.Name = '!'
	name.TextSize = 20
	name.TextColor3 = Color3.new(1,1,1)
	name.AutomaticSize = Enum.AutomaticSize.X

	local close = Instance.new('TextButton', header)
	close.Size = UDim2.new(0,0,1,-5)
	close.Text = 'Close'
	close.Name = 'Close'
	close.BackgroundColor3 = Color3.new(0,0,0)
	close.TextColor3 = Color3.new(1,1,1)
	close.AutomaticSize = Enum.AutomaticSize.X
	close.MouseButton1Click:Connect(function ()
		outro()
	end)
	local padding = Instance.new('UIPadding', close)
	padding.PaddingLeft = UDim.new(0,5)
	padding.PaddingTop = UDim.new(0,5)
	padding.PaddingRight = UDim.new(0,5)
	padding.PaddingBottom = UDim.new(0,5)
	Instance.new('UICorner', close).CornerRadius = UDim.new(0,8)
end

return nil
