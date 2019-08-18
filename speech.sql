create table User
(
	id int auto_increment,
	name varchar(191) null,
	type int null,
	password varchar(191) null,
	email varchar(191) null,
	constraint User_pk
		primary key (id)
);
