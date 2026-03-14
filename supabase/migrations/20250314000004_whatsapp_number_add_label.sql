-- Texto del botón "Escribinos por WhatsApp".
alter table public.whatsapp_number_config
  add column if not exists label text;
