create table helo_users(
    id serial primary key,
    username varchar(20),
    password varchar(300),
    profile_pic text
);

create table posts(
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references helo_users(id)
)