-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  created_at timestamptz default now() not null,
  email text not null,
  full_name text,
  role text not null default 'agent' check (role in ('admin', 'agent', 'designer')),
  phone text,
  avatar_url text
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by authenticated users" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Listings
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  title text not null,
  slug text not null unique,
  description text not null default '',
  location text not null default '',
  latitude numeric(10,7),
  longitude numeric(10,7),
  price numeric(15,2) not null default 0,
  currency text not null default 'USD',
  status text not null default 'sale' check (status in ('sale', 'rent')),
  property_type text not null default 'apartment',
  area_sqft numeric(10,2),
  bedrooms integer,
  bathrooms integer,
  featured boolean not null default false,
  published boolean not null default false,
  meta_title text,
  meta_description text,
  agent_id uuid references public.profiles(id) on delete set null
);

alter table public.listings enable row level security;

create policy "Published listings are publicly viewable" on public.listings
  for select using (published = true or auth.role() = 'authenticated');

create policy "Authenticated users can insert listings" on public.listings
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update listings" on public.listings
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete listings" on public.listings
  for delete using (auth.role() = 'authenticated');

create index idx_listings_slug on public.listings(slug);
create index idx_listings_status on public.listings(status);
create index idx_listings_published on public.listings(published);
create index idx_listings_featured on public.listings(featured);

-- Interior Projects
create table public.interior_projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  title text not null,
  slug text not null unique,
  description text not null default '',
  category text not null default 'residential',
  featured boolean not null default false,
  published boolean not null default false,
  meta_title text,
  meta_description text,
  designer_id uuid references public.profiles(id) on delete set null
);

alter table public.interior_projects enable row level security;

create policy "Published projects are publicly viewable" on public.interior_projects
  for select using (published = true or auth.role() = 'authenticated');

create policy "Authenticated users can manage projects" on public.interior_projects
  for all using (auth.role() = 'authenticated');

create index idx_projects_slug on public.interior_projects(slug);
create index idx_projects_category on public.interior_projects(category);

-- Media
create table public.media (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  module text not null check (module in ('real-estate', 'interior-design')),
  type text not null check (type in ('image', 'video', 'link')),
  url text not null,
  thumbnail_url text,
  alt_text text,
  sort_order integer not null default 0,
  listing_id uuid references public.listings(id) on delete cascade,
  project_id uuid references public.interior_projects(id) on delete cascade,
  is_cover boolean not null default false
);

alter table public.media enable row level security;

create policy "Media is publicly viewable" on public.media
  for select using (true);

create policy "Authenticated users can manage media" on public.media
  for all using (auth.role() = 'authenticated');

create index idx_media_listing on public.media(listing_id);
create index idx_media_project on public.media(project_id);
create index idx_media_module on public.media(module);

-- Leads
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  email text not null,
  phone text,
  message text,
  type text not null default 'inquiry' check (type in ('inquiry', 'callback', 'general')),
  listing_id uuid references public.listings(id) on delete set null,
  project_id uuid references public.interior_projects(id) on delete set null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  source text
);

alter table public.leads enable row level security;

create policy "Anyone can insert leads" on public.leads
  for insert with check (true);

create policy "Authenticated users can view and manage leads" on public.leads
  for select using (auth.role() = 'authenticated');

create policy "Authenticated users can update leads" on public.leads
  for update using (auth.role() = 'authenticated');

-- Page Views
create table public.page_views (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now() not null,
  page text not null,
  listing_id uuid references public.listings(id) on delete set null,
  project_id uuid references public.interior_projects(id) on delete set null,
  referrer text,
  user_agent text
);

alter table public.page_views enable row level security;

create policy "Anyone can insert page views" on public.page_views
  for insert with check (true);

create policy "Authenticated users can view analytics" on public.page_views
  for select using (auth.role() = 'authenticated');

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger listings_updated_at before update on public.listings
  for each row execute procedure public.set_updated_at();

create trigger projects_updated_at before update on public.interior_projects
  for each row execute procedure public.set_updated_at();

-- Storage buckets (run in Supabase dashboard or via API)
-- insert into storage.buckets (id, name, public) values ('real-estate', 'real-estate', true);
-- insert into storage.buckets (id, name, public) values ('interior-design', 'interior-design', true);
