-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'admin',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Listings (Real Estate)
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  location text,
  price numeric,
  currency text default 'USD',
  status text default 'sale' check (status in ('sale', 'rent')),
  property_type text default 'apartment',
  area_sqft numeric,
  bedrooms int,
  bathrooms int,
  featured boolean default false,
  published boolean default false,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.listings enable row level security;
create policy "Public can view published listings" on public.listings for select using (published = true);
create policy "Admins can do all on listings" on public.listings for all using (auth.role() = 'authenticated');

-- Interior Projects
create table public.interior_projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  category text default 'residential',
  featured boolean default false,
  published boolean default false,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.interior_projects enable row level security;
create policy "Public can view published projects" on public.interior_projects for select using (published = true);
create policy "Admins can do all on projects" on public.interior_projects for all using (auth.role() = 'authenticated');

-- Media
create table public.media (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade,
  project_id uuid references public.interior_projects(id) on delete cascade,
  url text not null,
  storage_path text,
  type text default 'image' check (type in ('image', 'video')),
  is_cover boolean default false,
  is_external boolean default false,
  thumbnail_url text,
  alt_text text,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table public.media enable row level security;
create policy "Public can view media" on public.media for select using (true);
create policy "Admins can do all on media" on public.media for all using (auth.role() = 'authenticated');

-- Leads
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  message text,
  type text default 'general',
  status text default 'new' check (status in ('new', 'contacted', 'closed')),
  listing_id uuid references public.listings(id) on delete set null,
  project_id uuid references public.interior_projects(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.leads enable row level security;
create policy "Anyone can insert leads" on public.leads for insert with check (true);
create policy "Admins can view/update/delete leads" on public.leads for all using (auth.role() = 'authenticated');

-- Page Views (analytics)
create table public.page_views (
  id uuid default uuid_generate_v4() primary key,
  path text not null,
  listing_id uuid references public.listings(id) on delete set null,
  project_id uuid references public.interior_projects(id) on delete set null,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

alter table public.page_views enable row level security;
create policy "Anyone can insert page views" on public.page_views for insert with check (true);
create policy "Admins can view page views" on public.page_views for select using (auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_listings_updated_at before update on public.listings
  for each row execute function public.handle_updated_at();

create trigger set_projects_updated_at before update on public.interior_projects
  for each row execute function public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage bucket (run manually in Supabase dashboard or via CLI)
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);
