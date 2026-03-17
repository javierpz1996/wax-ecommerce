-- Emails de suscripción para novedades/promos.
create table if not exists public.email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint email_subscriptions_email_unique unique (email)
);

alter table public.email_subscriptions enable row level security;

create policy "Allow public insert email_subscriptions"
  on public.email_subscriptions for insert
  with check (true);

create policy "Allow public read email_subscriptions"
  on public.email_subscriptions for select
  using (true);

