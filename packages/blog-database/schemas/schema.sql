drop table if exists comments;

create table if not exists comments (
    guid text not null primary key,
    slug text not null,
    content text not null,
    sendTimestamp integer not null,
    userGuid text not null,
    isAnonymous integer not null
);

drop table if exists commends;

create table if not exists commends (
    slug text not null primary key,
    positive integer not null,
    negative integer not null
);

drop table if exists users;

create table if not exists users (
    guid text primary key not null,
    displayName text not null,
    email text not null,
    password text not null
);

insert into users(guid, displayName, email, password) values('abcde-01234', 'Root Admin', 'example@abc.com', '0000');
