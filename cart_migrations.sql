-- Create cart_items table to persist user carts
create table public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  product_id text not null,
  name text not null,
  price numeric not null,
  quantity integer not null default 1,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Secure the table with Row Level Security (RLS)
alter table public.cart_items enable row level security;

-- Policies to ensure users can only access their own cart items
create policy "Users can view their own cart items." on cart_items
  for select using (auth.uid() = user_id);

create policy "Users can insert their own cart items." on cart_items
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own cart items." on cart_items
  for update using (auth.uid() = user_id);

create policy "Users can delete their own cart items." on cart_items
  for delete using (auth.uid() = user_id);
