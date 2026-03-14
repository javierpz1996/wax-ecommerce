-- Número de WhatsApp (se muestra como "Número actual" y es el link del botón).
create table if not exists public.whatsapp_number_config (
  id integer primary key,
  number text
);

insert into public.whatsapp_number_config (id, number)
values (1, null)
on conflict (id) do nothing;

alter table public.whatsapp_number_config enable row level security;

create policy "Allow public read whatsapp_number"
  on public.whatsapp_number_config for select
  using (true);

create policy "Allow public update whatsapp_number"
  on public.whatsapp_number_config for update
  using (true)
  with check (true);

create policy "Allow public insert whatsapp_number"
  on public.whatsapp_number_config for insert
  with check (true);
