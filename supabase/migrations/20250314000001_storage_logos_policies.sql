-- Políticas para el bucket "logos" (Storage).
-- Antes de aplicar: crear el bucket "logos" en Dashboard > Storage > New bucket.
-- Nombre: logos | Public: sí (para que la URL del logo sea accesible).

-- Lectura pública de archivos del bucket logos
create policy "Public read logos"
  on storage.objects for select
  using (bucket_id = 'logos');

-- Subida pública (para que el panel pueda subir el logo con anon key)
create policy "Public insert logos"
  on storage.objects for insert
  with check (bucket_id = 'logos');

-- Actualizar/reemplazar (por si se sube con el mismo path)
create policy "Public update logos"
  on storage.objects for update
  using (bucket_id = 'logos')
  with check (bucket_id = 'logos');
