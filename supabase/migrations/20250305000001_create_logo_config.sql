-- Tabla para la URL del logo (una sola fila).
create table if not exists public.logo_config (
  id integer primary key,
  url text
);

insert into public.logo_config (id, url)
values (1, null)
on conflict (id) do nothing;

alter table public.logo_config enable row level security;

create policy "Allow public read logo"
  on public.logo_config for select
  using (true);

create policy "Allow public update logo"
  on public.logo_config for update
  using (true)
  with check (true);

create policy "Allow public insert logo"
  on public.logo_config for insert
  with check (true);
