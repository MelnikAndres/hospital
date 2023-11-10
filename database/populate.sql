insert into "Users" (name, hashed_pass, role, token_validator,created_at)
values ('Master', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin', '123abc',NOW());
insert into "Admins" (user_id)
values (1);