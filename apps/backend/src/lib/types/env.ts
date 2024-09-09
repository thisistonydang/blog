export interface Env {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  BACKEND_URL: string;
  BLOG_URL: string;
  JWT_PRIVATE_KEY: string;
  JWT_PUBLIC_KEY: string;
  MC_DKIM_PRIVATE_KEY: string;
  MODE: string;
  STRIPE_API_KEY: string;
  STRIPE_ENDPOINT_SECRET: string;
  STRIPE_ONE_TIME_DONATION_PRICE: string;
  SUPABASE_SERVICE_KEY: string;
  SUPABASE_URL: string;
}
