-- Add category and area_unit columns to listings
alter table public.listings
  add column if not exists category text default 'Open Plots',
  add column if not exists area_unit text default 'Sq Yard';
