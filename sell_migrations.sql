-- Create sell_requests table
create table public.sell_requests (
  id uuid default gen_random_uuid() primary key,
  brand text not null,
  model_number text not null,
  condition text not null,
  expected_price numeric not null,
  notes text,
  full_name text not null,
  email text not null,
  phone text not null,
  image_urls text[] not null default '{}',
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.sell_requests enable row level security;

-- Allow anyone to insert (since it's a public form)
create policy "Anyone can insert sell requests"
  on public.sell_requests
  for insert
  to public
  with check (true);

-- Allow admins to view (assuming authenticated users or specific role, keeping simple for now)
create policy "Authenticated users can view sell requests"
  on public.sell_requests
  for select
  to authenticated
  using (true);

-- Create storage bucket for sell images
insert into storage.buckets (id, name, public)
values ('sell-images', 'sell-images', true);

-- Storage policies
create policy "Anyone can upload sell images"
  on storage.objects
  for insert
  to public
  with check ( bucket_id = 'sell-images' );

create policy "Anyone can view sell images"
  on storage.objects
  for select
  to public
  using ( bucket_id = 'sell-images' );
