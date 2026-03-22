-- URL del ícono del botón "Escribinos por WhatsApp" (null = ícono SVG por defecto).
alter table public.whatsapp_number_config
  add column if not exists icon_url text;
