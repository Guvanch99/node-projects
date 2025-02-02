CREATE TABLE banners(
    id SERIAL,
    image_url TEXT NOT NULL,
    redirect_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expire_at TIMESTAMPTZ
)
