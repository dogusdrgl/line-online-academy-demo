create table if not exists public.app_users (
  id text primary key,
  display_name text not null,
  role_id text not null default 'student',
  is_guest boolean not null default false,
  is_muted boolean not null default false,
  is_banned boolean not null default false,
  is_online boolean not null default false,
  last_seen timestamptz,
  created_at timestamptz not null default now()
);

alter table public.app_users
add column if not exists is_muted boolean not null default false;

alter table public.app_users
add column if not exists is_banned boolean not null default false;

alter table public.app_users
add column if not exists is_online boolean not null default false;

alter table public.app_users
add column if not exists last_seen timestamptz;

alter table public.app_users
add column if not exists avatar_image text;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  channel_id text not null,
  author_id text references public.app_users(id) on delete set null,
  author_name text not null,
  author_role text not null default 'Uye',
  author_avatar text,
  content text not null check (char_length(content) <= 240),
  created_at timestamptz not null default now()
);

alter table public.messages
add column if not exists author_avatar text;

create table if not exists public.direct_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id text not null,
  sender_id text not null,
  receiver_id text not null,
  sender_name text not null,
  receiver_name text not null,
  content text not null check (char_length(content) <= 500),
  created_at timestamptz not null default now()
);

alter table public.app_users enable row level security;
alter table public.messages enable row level security;
alter table public.direct_messages enable row level security;

drop policy if exists "Public can read app users" on public.app_users;
create policy "Public can read app users"
on public.app_users
for select
to anon, authenticated
using (true);

drop policy if exists "Public can create app users" on public.app_users;
create policy "Public can create app users"
on public.app_users
for insert
to anon, authenticated
with check (true);

drop policy if exists "Users can update own app profile" on public.app_users;
create policy "Users can update own app profile"
on public.app_users
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public can delete app users" on public.app_users;
create policy "Public can delete app users"
on public.app_users
for delete
to anon, authenticated
using (true);

drop policy if exists "Public can read messages" on public.messages;
create policy "Public can read messages"
on public.messages
for select
to anon, authenticated
using (true);

drop policy if exists "Public can create messages" on public.messages;
create policy "Public can create messages"
on public.messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can delete messages" on public.messages;
create policy "Public can delete messages"
on public.messages
for delete
to anon, authenticated
using (true);

drop policy if exists "Public can read direct messages" on public.direct_messages;
create policy "Public can read direct messages"
on public.direct_messages
for select
to anon, authenticated
using (true);

drop policy if exists "Public can create direct messages" on public.direct_messages;
create policy "Public can create direct messages"
on public.direct_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can delete direct messages" on public.direct_messages;
create policy "Public can delete direct messages"
on public.direct_messages
for delete
to anon, authenticated
using (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'app_users'
  ) then
    alter publication supabase_realtime add table public.app_users;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'direct_messages'
  ) then
    alter publication supabase_realtime add table public.direct_messages;
  end if;
end $$;

-- Tek seferlik temizlik:
-- Dogus/Doğuş disindaki tum kullanicilari sifirlamak icin asagidaki sorguyu SQL Editor'da calistir.
-- delete from public.app_users
-- where lower(display_name) not in ('dogus', 'doğuş');
