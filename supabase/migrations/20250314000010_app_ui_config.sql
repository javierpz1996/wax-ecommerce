-- Preferencias de UI (formulario de suscripción visible u oculto en la home).
create table if not exists public.app_ui_config (
  id integer primary key,
  show_email_subscription boolean not null default true
);

insert into public.app_ui_config (id, show_email_subscription)
values (1, true)
on conflict (id) do nothing;

alter table public.app_ui_config enable row level security;

create policy "Allow public read app_ui_config"
  on public.app_ui_config for select
  using (true);

create policy "Allow public update app_ui_config"
  on public.app_ui_config for update
  using (true)
  with check (true);

create policy "Allow public insert app_ui_config"
  on public.app_ui_config for insert
  with check (true);
