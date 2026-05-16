create table if not exists public.roles_v2 (
  id text primary key,
  name text not null,
  color text not null default '#f1a126',
  sort_order integer not null default 100,
  is_system boolean not null default false,
  created_at timestamptz not null default now()
);

insert into public.roles_v2 (id, name, color, sort_order, is_system)
values
  ('admin', 'Admin', '#ff6961', 10, true),
  ('teacher', 'Ogretmen', '#f1a126', 20, true),
  ('member', 'Uye', '#6e80ff', 40, true),
  ('guest', 'Misafir', '#63df63', 90, true),
  ('assistant', 'Asistan', '#9c8cff', 95, true)
on conflict (id) do update
set
  name = excluded.name,
  color = excluded.color,
  sort_order = excluded.sort_order,
  is_system = excluded.is_system;

create table if not exists public.profiles_v2 (
  id text primary key,
  display_name text not null,
  email text,
  is_guest boolean not null default false,
  is_online boolean not null default false,
  last_seen timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles_v2 (
  user_id text not null references public.profiles_v2(id) on delete cascade,
  role_id text not null references public.roles_v2(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

create table if not exists public.home_content_v2 (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.roles_v2 enable row level security;
alter table public.profiles_v2 enable row level security;
alter table public.user_roles_v2 enable row level security;
alter table public.home_content_v2 enable row level security;

drop policy if exists "roles v2 read" on public.roles_v2;
create policy "roles v2 read" on public.roles_v2 for select to anon, authenticated using (true);

drop policy if exists "profiles v2 all" on public.profiles_v2;
create policy "profiles v2 all" on public.profiles_v2 for all to anon, authenticated using (true) with check (true);

drop policy if exists "user roles v2 all" on public.user_roles_v2;
create policy "user roles v2 all" on public.user_roles_v2 for all to anon, authenticated using (true) with check (true);

drop policy if exists "home content v2 all" on public.home_content_v2;
create policy "home content v2 all" on public.home_content_v2 for all to anon, authenticated using (true) with check (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles_v2'
  ) then
    alter publication supabase_realtime add table public.profiles_v2;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'user_roles_v2'
  ) then
    alter publication supabase_realtime add table public.user_roles_v2;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'home_content_v2'
  ) then
    alter publication supabase_realtime add table public.home_content_v2;
  end if;
end $$;
