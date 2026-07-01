-- Locations table for coastal areas
create table public.locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text unique not null,
  emoji text default '📍',
  description text,
  color text default 'from-cyan-500 to-blue-600',
  sort_order int default 0,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.locations enable row level security;
create policy "Public can view active locations" on public.locations for select using (active = true);
create policy "Admins can do all on locations" on public.locations for all using (auth.role() = 'authenticated');

-- Seed default coastal areas
insert into public.locations (name, slug, emoji, description, color, sort_order) values
  ('Bheemunipatnam', 'bheemunipatnam', '🏖️', 'Prime beachfront plots on the golden sands of Bheemunipatnam, just 25 km from Vizag city.', 'from-cyan-500 to-blue-600', 1),
  ('Rushikonda', 'rushikonda', '🌊', 'Scenic sea view villa plots on the rocky Rushikonda coastline with breathtaking Bay of Bengal views.', 'from-blue-500 to-indigo-600', 2),
  ('Bheemili', 'bheemili', '🐚', 'Peaceful coastal residential plots in heritage Bheemili with Dutch fort views and pristine beaches.', 'from-teal-500 to-cyan-600', 3),
  ('Rishikonda Hills', 'rishikonda-hills', '⛰️', 'Elevated hillside plots with panoramic 180-degree sea views over Rushikonda bay.', 'from-emerald-500 to-teal-600', 4),
  ('Vizag Beach Road', 'vizag-beach-road', '🛣️', 'Premium commercial and residential plots along the iconic Vizag Beach Road corridor.', 'from-orange-500 to-amber-600', 5),
  ('Bhogapuram Coast', 'bhogapuram-coast', '🌅', 'Affordable coastal plots near the new Bhogapuram International Airport — massive appreciation potential.', 'from-rose-500 to-orange-500', 6),
  ('Nakkapalle Coast', 'nakkapalle-coast', '🌴', 'Unspoiled coastal land in Nakkapalle with long stretches of pristine beach at very accessible prices.', 'from-green-500 to-teal-600', 7),
  ('Airport Zone', 'airport-zone', '✈️', 'Strategic plots near Bhogapuram International Airport — ideal for commercial and hospitality development.', 'from-violet-500 to-purple-600', 8);
