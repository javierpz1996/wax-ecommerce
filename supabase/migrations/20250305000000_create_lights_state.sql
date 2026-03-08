-- Tabla para guardar el estado de las luces del menú (una sola fila).
create table if not exists public.lights_state (
  id text primary key default 'default',
  enabled jsonb not null default '[true,true,true,true,true]'::jsonb
);

-- Fila inicial.
insert into public.lights_state (id, enabled)
values ('default', '[true,true,true,true,true]'::jsonb)
on conflict (id) do nothing;

-- RLS: permitir leer y escribir para anon (API desde el front usa anon key).
alter table public.lights_state enable row level security;

create policy "Allow public read"
  on public.lights_state for select
  using (true);

create policy "Allow public update"
  on public.lights_state for update
  using (true)
  with check (true);

create policy "Allow public insert"
  on public.lights_state for insert
  with check (true);
