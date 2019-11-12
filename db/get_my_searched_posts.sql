select helo_users.username, helo_users.profile_pic, posts.id, posts.title, posts.img, posts.content from helo_users
join posts on posts.author_id = helo_users.id
where helo_users.id = $1 and posts.title like $2