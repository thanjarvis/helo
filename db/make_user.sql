insert into helo_users (
    username, password
)values(
    $1, $2
);

select * from helo_users
where username = $1