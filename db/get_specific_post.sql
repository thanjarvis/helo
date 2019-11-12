select posts.title, posts.img, posts.content, helo_users.username, helo_users.profile_pic
from helo_users
join posts on helo_users.id = posts.author_id
where posts.id = $1