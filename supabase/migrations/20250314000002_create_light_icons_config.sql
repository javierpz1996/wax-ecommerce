-- Iconos de los 5 botones del menú (id 1 = botón 1, etc.).
create table if not exists public.light_icons_config (
  id integer primary key check (id >= 1 and id <= 5),
  url text
);

insert into public.light_icons_config (id, url)
values (1, null), (2, null), (3, null), (4, null), (5, null)
on conflict (id) do nothing;

alter table public.light_icons_config enable row level security;

create policy "Allow public read light_icons"
  on public.light_icons_config for select
  using (true);

create policy "Allow public update light_icons"
  on public.light_icons_config for update
  using (true)
  with check (true);

create policy "Allow public insert light_icons"
  on public.light_icons_config for insert
  with check (true);
