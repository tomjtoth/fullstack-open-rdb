CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer default 0
);

insert into blogs(author, url, title, likes)
values ('author1', 'url1', 'title1', 1),
       ('author1', 'url2', 'title2', 5);
