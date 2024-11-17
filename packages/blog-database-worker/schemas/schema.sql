drop table if exists comments;

create table if not exists comments (
    guid text primary key not null,
    content text not null,
    sendTimestamp integer not null,
    slug text not null,
    userGuid text not null,
    isAnonymous integer not null
);

drop table if exists users;

create table if not exists users (
    guid text primary key not null,
    displayName text not null,
    email text not null,
    password text not null
);

insert into users(guid, displayName, email, password) values('abcde-01234', 'Root Admin', 'example@abc.com', '0000');
