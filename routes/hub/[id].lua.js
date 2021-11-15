// TODO

import { createClient } from '@supabase/supabase-js'
import dedent from 'dedent'
import { encode } from '$lib/lua'
import exploit from '$lib/exploit'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, key)

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params: { id }, headers }) {
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
    .select('name,games,id')
    .in('id', hub.scripts)
  return {
    body: dedent`
      -- 📜 ${hub.name}, powered by Luau.ml
      local scripts = ${encode(scripts)}
      local works_here = {}
      for _,v in pairs(scripts) do
        if table.find(v.games, game.PlaceId) or not v.games then
          table.insert(works_here, v)
        end
      end

      local gui = Instance.new('ScreenGui')
      gui.ResetOnSpawn = false
      gui.Name = string.gsub(string.rep(" ",200,".",function()
            return string.char(({math.random(48,57),math.random(65,90),math.random(97,122)})[math.random(1,3)])
      end)

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
    `
  }
}
