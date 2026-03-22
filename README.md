This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Supabase (estado del panel de luces)

El estado de las luces del menú se guarda en Supabase para que funcione en Vercel.

1. Creá un proyecto en [Supabase](https://supabase.com).
2. En el proyecto: **Settings → API** copiá la **Project URL** y la **anon public** key.
3. Creá un archivo `.env.local` en la raíz con:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   ```
4. En Supabase: **SQL Editor** → ejecutá las migraciones en orden: `20250305000000_create_lights_state.sql`, `20250305000001_create_logo_config.sql`, `20250314000000_create_news_ticker_config.sql`, `20250314000007_news_ticker_speed_percent.sql`, `20250314000002_create_light_icons_config.sql`, `20250314000003_create_whatsapp_number_config.sql`, `20250314000006_create_email_subscriptions.sql`, `20250314000008_whatsapp_icon_url.sql`.
5. **Storage (logo por imagen):** en Supabase → **Storage** → **New bucket**. Nombre: `logos`. Marcá **Public bucket**. Después, en **SQL Editor**, ejecutá `supabase/migrations/20250314000001_storage_logos_policies.sql` para permitir subir imágenes desde el panel.
6. En Vercel: añadí las mismas variables en **Settings → Environment Variables**.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
