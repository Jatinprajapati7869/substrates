CREATE TABLE public.purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plan text NOT NULL,
  status text NOT NULL DEFAULT 'paid',
  stripe_session_id text UNIQUE NOT NULL,
  stripe_customer_id text,
  stripe_subscription_id text,
  amount_total integer,
  currency text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.purchases TO authenticated;
GRANT ALL ON public.purchases TO service_role;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own purchases" ON public.purchases FOR SELECT TO authenticated USING (auth.uid() = user_id);