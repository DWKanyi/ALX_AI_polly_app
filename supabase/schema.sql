-- Supabase schema for polls and votes
-- Follows project standards: UUID PKs, user_id FK to auth.users, timestamps, RLS, policies

-- Extensions
create extension if not exists pgcrypto;

-- Utility: updated_at trigger function
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Table: polls
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  is_multiple boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint polls_title_length check (char_length(title) between 3 and 200)
);

create index if not exists idx_polls_user_id on public.polls(user_id);
create index if not exists idx_polls_expires_at on public.polls(expires_at);

drop trigger if exists trg_polls_updated_at on public.polls;
create trigger trg_polls_updated_at
before update on public.polls
for each row execute function set_updated_at();

-- Table: poll_options
create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  label text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint poll_options_label_length check (char_length(label) between 1 and 200)
);

-- Ensure (poll_id, id) can be referenced and prevent duplicate labels per poll
create unique index if not exists ux_poll_options_poll_id_id on public.poll_options(poll_id, id);
create unique index if not exists ux_poll_options_poll_id_label on public.poll_options(poll_id, lower(label));
create index if not exists idx_poll_options_poll_id on public.poll_options(poll_id);

drop trigger if exists trg_poll_options_updated_at on public.poll_options;
create trigger trg_poll_options_updated_at
before update on public.poll_options
for each row execute function set_updated_at();

-- Table: votes
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_id uuid not null references public.poll_options(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- A user can vote once per option per poll; app enforces single-choice vs multiple-choice
  constraint ux_votes_unique_user_per_option unique (poll_id, user_id, option_id),
  -- Ensure option belongs to poll via composite reference
  constraint fk_votes_option_belongs_to_poll
    foreign key (poll_id, option_id)
    references public.poll_options(poll_id, id)
    on delete cascade
    deferrable initially deferred
);

create index if not exists idx_votes_poll_id on public.votes(poll_id);
create index if not exists idx_votes_option_id on public.votes(option_id);
create index if not exists idx_votes_user_id on public.votes(user_id);

drop trigger if exists trg_votes_updated_at on public.votes;
create trigger trg_votes_updated_at
before update on public.votes
for each row execute function set_updated_at();

-- Row Level Security
alter table public.polls enable row level security;
alter table public.poll_options enable row level security;
alter table public.votes enable row level security;

-- Policies for polls: only owners can access their polls
drop policy if exists "polls_select_own" on public.polls;
create policy "polls_select_own" on public.polls
for select
to authenticated
using (user_id = auth.uid());

-- Allow all authenticated users to read polls
drop policy if exists "polls_select_all" on public.polls;
create policy "polls_select_all" on public.polls
for select
to authenticated
using (true);

drop policy if exists "polls_insert_own" on public.polls;
create policy "polls_insert_own" on public.polls
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "polls_update_own" on public.polls;
create policy "polls_update_own" on public.polls
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "polls_delete_own" on public.polls;
create policy "polls_delete_own" on public.polls
for delete
to authenticated
using (user_id = auth.uid());

-- Policies for poll_options: only owners of parent poll can access
drop policy if exists "poll_options_select_owner" on public.poll_options;
create policy "poll_options_select_owner" on public.poll_options
for select
to authenticated
using (exists (
  select 1 from public.polls p
  where p.id = poll_options.poll_id and p.user_id = auth.uid()
));

-- Allow all authenticated users to read poll options
drop policy if exists "poll_options_select_all" on public.poll_options;
create policy "poll_options_select_all" on public.poll_options
for select
to authenticated
using (true);

drop policy if exists "poll_options_insert_owner" on public.poll_options;
create policy "poll_options_insert_owner" on public.poll_options
for insert
to authenticated
with check (exists (
  select 1 from public.polls p
  where p.id = poll_options.poll_id and p.user_id = auth.uid()
));

drop policy if exists "poll_options_update_owner" on public.poll_options;
create policy "poll_options_update_owner" on public.poll_options
for update
to authenticated
using (exists (
  select 1 from public.polls p
  where p.id = poll_options.poll_id and p.user_id = auth.uid()
))
with check (exists (
  select 1 from public.polls p
  where p.id = poll_options.poll_id and p.user_id = auth.uid()
));

drop policy if exists "poll_options_delete_owner" on public.poll_options;
create policy "poll_options_delete_owner" on public.poll_options
for delete
to authenticated
using (exists (
  select 1 from public.polls p
  where p.id = poll_options.poll_id and p.user_id = auth.uid()
));

-- Policies for votes: users can manage their own votes only
drop policy if exists "votes_select_own" on public.votes;
create policy "votes_select_own" on public.votes
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "votes_insert_own" on public.votes;
create policy "votes_insert_own" on public.votes
for insert
to authenticated
with check (
  user_id = auth.uid()
  and exists (
    select 1 from public.poll_options po
    where po.id = votes.option_id and po.poll_id = votes.poll_id
  )
);

drop policy if exists "votes_update_own" on public.votes;
create policy "votes_update_own" on public.votes
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "votes_delete_own" on public.votes;
create policy "votes_delete_own" on public.votes
for delete
to authenticated
using (user_id = auth.uid());

-- Optional: allow owners to view aggregated votes without exposing individual rows
-- This can be achieved via a view with a separate policy if needed later.


