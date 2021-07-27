import dedent from 'dedent'

export const scripts = {
  [1]: {
    name: 'Tux Autofarm',
    description: 'The fastest autofarm for Build A Boat For Treasure, powered by Tux.',
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
            client.Character.HumanoidRootPart.CFrame=Stages["CaveStage" .. i].DarknessPart.CFrame
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
  }
}
