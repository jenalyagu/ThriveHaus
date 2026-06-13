-- ThriveHaus Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Families
create table public.families (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  zip_code text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Parents
create table public.parents (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid references public.families(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  first_name text not null,
  last_name text not null default '',
  email text not null default '',
  role text check (role in ('primary', 'partner')) not null default 'primary',
  work_schedule text,
  support_needs text[] default '{}',
  created_at timestamptz default now() not null
);

-- Children
create table public.children (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid references public.families(id) on delete cascade not null,
  first_name text not null,
  age integer,
  birth_month text,
  stage text,
  needs text[] default '{}',
  created_at timestamptz default now() not null
);

-- Blueprints
create table public.blueprints (
  id uuid primary key default uuid_generate_v4(),
  family_id uuid references public.families(id) on delete cascade not null,
  version integer default 1,
  content jsonb default '{}',
  status text check (status in ('generating', 'complete', 'error')) default 'generating',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Row Level Security
alter table public.families enable row level security;
alter table public.parents enable row level security;
alter table public.children enable row level security;
alter table public.blueprints enable row level security;

-- RLS Policies: families
create policy "Users can manage their own family"
  on public.families for all
  using (auth.uid() = user_id);

-- RLS Policies: parents
create policy "Users can manage parents in their family"
  on public.parents for all
  using (
    family_id in (
      select id from public.families where user_id = auth.uid()
    )
  );

-- RLS Policies: children
create policy "Users can manage children in their family"
  on public.children for all
  using (
    family_id in (
      select id from public.families where user_id = auth.uid()
    )
  );

-- RLS Policies: blueprints
create policy "Users can manage blueprints for their family"
  on public.blueprints for all
  using (
    family_id in (
      select id from public.families where user_id = auth.uid()
    )
  );

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger families_updated_at before update on public.families
  for each row execute function public.handle_updated_at();

create trigger blueprints_updated_at before update on public.blueprints
  for each row execute function public.handle_updated_at();
