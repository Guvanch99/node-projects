CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username varchar(500) NOT NULL,
  email varchar(500) NOT NULL,
  password varchar(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
