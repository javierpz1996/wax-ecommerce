-- Tabla para el texto del news ticker (una sola fila).
create table if not exists public.news_ticker_config (
  id integer primary key,
  text text
);

insert into public.news_ticker_config (id, text)
values (1, null)
on conflict (id) do nothing;

alter table public.news_ticker_config enable row level security;

create policy "Allow public read news_ticker"
  on public.news_ticker_config for select
  using (true);

create policy "Allow public update news_ticker"
  on public.news_ticker_config for update
  using (true)
  with check (true);

create policy "Allow public insert news_ticker"
  on public.news_ticker_config for insert
  with check (true);
