-- Velocidad del news ticker (100 = 100%, velocidad por defecto).
alter table public.news_ticker_config
  add column if not exists speed_percent integer not null default 100;

update public.news_ticker_config
set speed_percent = 100
where speed_percent is null;

alter table public.news_ticker_config
  drop constraint if exists news_ticker_speed_percent_range;

alter table public.news_ticker_config
  add constraint news_ticker_speed_percent_range
  check (speed_percent >= 25 and speed_percent <= 250);
