create database web_project_g2;
use web_project_g2;

/*tables*/
create table if not exists users (
    username varchar(255) not null primary key,
    email varchar(255) not null,
    password varchar(255) not null,
    phone_number varchar(10),
    join_date date not null,
    constraint ck_phone_number_digits check(phone_number not like '%[^0-9]%'),
    constraint ck_phone_number_length check(length(phone_number) = 10 or length(phone_number) = null)
);

create table if not exists categories (
    category varchar(255) not null primary key
);

create table if not exists tickets (
    ticket_ID int not null primary key AUTO_INCREMENT,
    event_name varchar(255) not null,
    category varchar(255) default "other",
    event_date date not null,
    start_time time not null,
    location_name varchar(255) not null,
    address varchar(255) not null,
    row_seat int,
    chair int,
    purchase_price real not null,
    sale_price real not null,
    qunatity int default 1,
    phone varchar(10),
    sold boolean default 0,
    owner varchar(255) not null,
    upload_time datetime not null,
    constraint ck_phone_digits check(phone not like '%[^0-9]%'),
    constraint ck_phone_length check(length(phone) = 10 or length(phone) = null),
    constraint fk_owner foreign key (owner) references users(username),
    constraint fk_category foreign key (category) references categories(category)
);

create table if not exists deals (
    deal_ID int not null primary key AUTO_INCREMENT,
    ticket_ID int not null,
    ticket_price real,
    seller varchar(255),
    buyer varchar(255),
    deal_datetime datetime not null,
    constraint fk_seller foreign key (seller) references users(username),
    constraint fk_buyer foreign key (buyer) references users(username)
);

create table if not exists contacts (
    contact_ID int not null primary key AUTO_INCREMENT,
    full_name varchar(255) not null,
    phone_number varchar(10) not null,
    email varchar(255) not null,
    content varchar(500),
    contact_time datetime,
    constraint ck_conatctPhone_digits check (phone_number not like '%[^0-9]%'),
    constraint ck_contactPhone_length check (length(phone_number) = 10 or length(phone_number) = null)
);

create table if not exists connections (
    username varchar(255),
    connection_time datetime,
    primary key(username, connection_time),
    constraint fk_username foreign key (username) references users(username)
);

create view userTickets as
    select T.ticket_ID as ticket_ID, T.event_name as event_name, T.category as category, T.event_date as event_date,
        T.start_time as start_time, T.location_name as location, T.address as address, T.sale_price as price, T.owner as owner,
        D.seller as seller, D.buyer as buyer
    from tickets as T left join deals as D on T.ticket_ID = D.ticket_ID;

create view availableTickets as
    select *
    from tickets
    where sold = 0;



/*categories data*/
insert into categories (category) values ('concerts'), ('sports'), ('standup'), ('parties'), ('festivals'), ('theater'), ('cinema'), ('kids'), ('other');

/*users data*/
insert into users (username, email, password, join_date) values ('sabthorpe0', 'gespina0@tiny.cc', 'nschistl0', '2021-05-15');
insert into users (username, email, password, join_date) values ('cwhitmell1', 'kfayne1@foxnews.com', 'rtitmarsh1', '2020-12-20');
insert into users (username, email, password, join_date) values ('eswetenham2', 'rsmallpeice2@devhub.com', 'hroden2', '2021-01-08');
insert into users (username, email, password, join_date) values ('bdinsdale3', 'swoolens3@nbcnews.com', 'ccoxhell3', '2021-01-15');
insert into users (username, email, password, join_date) values ('bniche4', 'sdary4@github.io', 'pcarlucci4', '2021-04-02');
insert into users (username, email, password, join_date) values ('kcouves5', 'awhitrod5@vk.com', 'mwivell5', '2021-04-25');
insert into users (username, email, password, join_date) values ('lsearles6', 'pugoletti6@wsj.com', 'aboylan6', '2021-04-24');
insert into users (username, email, password, join_date) values ('ndelve7', 'egulliver7@sciencedirect.com', 'bglassborow7', '2020-10-26');
insert into users (username, email, password, join_date) values ('akarys8', 'ccaurah8@msn.com', 'agiacovazzo8', '2021-04-30');
insert into users (username, email, password, join_date) values ('ebuncombe9', 'mmacinnes9@arizona.edu', 'dpiddick9', '2021-03-09');
insert into users (username, email, password, join_date) values ('jdunlopa', 'jgreensteada@tinypic.com', 'lpressera', '2020-10-18');
insert into users (username, email, password, join_date) values ('marderneb', 'mruddellb@state.tx.us', 'mdraceyb', '2021-09-13');
insert into users (username, email, password, join_date) values ('gbrandolinic', 'bmorecombec@behance.net', 'omaltmanc', '2021-03-30');
insert into users (username, email, password, join_date) values ('goiseaud', 'pboundyd@yandex.ru', 'rbachelord', '2021-02-01');
insert into users (username, email, password, join_date) values ('gleagase', 'tkurdanie@netlog.com', 'nrudgleye', '2020-12-07');
insert into users (username, email, password, join_date) values ('mbaughf', 'fdanickf@w3.org', 'ddrohanef', '2021-01-27');
insert into users (username, email, password, join_date) values ('nsibbsong', 'blaurieg@geocities.jp', 'ggoodletg', '2021-07-13');
insert into users (username, email, password, join_date) values ('gjirousekh', 'lmacranaldh@paypal.com', 'tduthieh', '2021-07-05');
insert into users (username, email, password, join_date) values ('egoldsacki', 'byallopi@taobao.com', 'avanyardi', '2020-12-30');
insert into users (username, email, password, join_date) values ('fhamlynj', 'cvannoortj@delicious.com', 'hmarchbankj', '2021-01-10');
insert into users (username, email, password, join_date) values ('otinemank', 'eascoughk@php.net', 'lmuldowniek', '2021-02-20');
insert into users (username, email, password, join_date) values ('civanyutinl', 'mchaffynl@blog.com', 'ddeeveyl', '2020-10-11');
insert into users (username, email, password, join_date) values ('sgeraghtym', 'givanusyevm@purevolume.com', 'telesanderm', '2021-08-22');
insert into users (username, email, password, join_date) values ('mkennewelln', 'vgodmern@t.co', 'agatlingn', '2020-10-16');
insert into users (username, email, password, join_date) values ('bstandingfordo', 'tgoggeyo@blogger.com', 'sstollsteimero', '2021-07-10');
insert into users (username, email, password, join_date) values ('hpietrusiakp', 'rtitmusp@nyu.edu', 'cvasinp', '2020-11-14');
insert into users (username, email, password, join_date) values ('ngogieq', 'edowseq@adobe.com', 'nslaightq', '2021-07-04');
insert into users (username, email, password, join_date) values ('jantoniadesr', 'thawickr@nationalgeographic.com', 'amatteuccir', '2021-03-09');
insert into users (username, email, password, join_date) values ('rschultess', 'mgrewcocks@over-blog.com', 'jpaszaks', '2021-05-28');
insert into users (username, email, password, join_date) values ('sdimitrijevict', 'adinehartt@imdb.com', 'ffozardt', '2020-11-12');
insert into users (username, email, password, join_date) values ('amattsonu', 'pfenixu@blogs.com', 'ndadamou', '2021-02-11');
insert into users (username, email, password, join_date) values ('jgiffinv', 'dterrenv@mlb.com', 'pcrocettiv', '2021-01-04');
insert into users (username, email, password, join_date) values ('cdegregariow', 'pgimenow@indiatimes.com', 'fchalcotw', '2020-11-02');
insert into users (username, email, password, join_date) values ('arebillardx', 'rcorkittx@ed.gov', 'minglebyx', '2021-05-23');
insert into users (username, email, password, join_date) values ('vtanbyy', 'kstirlandy@cloudflare.com', 'mrenforthy', '2020-09-26');
insert into users (username, email, password, join_date) values ('mblakeneyz', 'jcostellz@shutterfly.com', 'vmallabundz', '2021-01-26');
insert into users (username, email, password, join_date) values ('hhanhardt10', 'vborrington10@booking.com', 'jreignould10', '2020-11-14');
insert into users (username, email, password, join_date) values ('obicknell11', 'cmantle11@geocities.jp', 'fcarolan11', '2021-03-21');
insert into users (username, email, password, join_date) values ('msybbe12', 'tferrino12@sciencedirect.com', 'mbinion12', '2021-06-18');
insert into users (username, email, password, join_date) values ('nwhiteson13', 'rgrogono13@homestead.com', 'elaxon13', '2021-05-25');
insert into users (username, email, password, join_date) values ('cleate14', 'cnilges14@google.nl', 'aliver14', '2020-10-15');
insert into users (username, email, password, join_date) values ('hslowly15', 'rpostians15@pagesperso-orange.fr', 'bsampson15', '2021-06-15');
insert into users (username, email, password, join_date) values ('jjosipovic16', 'eroches16@bloglines.com', 'glemoir16', '2021-09-17');
insert into users (username, email, password, join_date) values ('hsale17', 'abattershall17@behance.net', 'rqueripel17', '2021-09-03');
insert into users (username, email, password, join_date) values ('dtrulock18', 'mmarc18@eepurl.com', 'fkhidr18', '2020-12-11');
insert into users (username, email, password, join_date) values ('cakett19', 'kdennington19@live.com', 'dwescott19', '2021-03-08');
insert into users (username, email, password, join_date) values ('jrearie1a', 'cisakowicz1a@typepad.com', 'rsaur1a', '2021-09-12');
insert into users (username, email, password, join_date) values ('pscurman1b', 'bostick1b@baidu.com', 'hbardwell1b', '2021-04-23');
insert into users (username, email, password, join_date) values ('owhiteoak1c', 'msweetsur1c@wisc.edu', 'kheindrich1c', '2020-10-07');

insert into tickets (ticket_ID, event_name, category, event_date, start_time, location_name, address, row_seat, chair, purchase_price, sale_price, qunatity, phone, sold, upload_time, owner) values 
    ('1','a','concerts','2021-12-12','20:10','aa','1, aaa','1','2','100','80','1',null,'0', '2021-11-22','sabthorpe0'),
    ('2','b','concerts','2021-12-22','20:10','aa','12, ddd','1','2','120','90','1',null,'0', '2021-11-12','sabthorpe0'),
    ('3','c','concerts','2021-12-01','20:10','aa','1, aaa','1','2','120','50','1',null,'0', '2021-11-02','sabthorpe0'),
    ('4','d','sports','2021-11-10','20:10','aa','1, aaa','1','2','90','12','1',null,'0', '2021-10-12','sabthorpe0'),
    ('5','e','kids','2022-02-11','20:10','aa','1, bbb','1','2','120','34','1',null,'1', '2021-12-12','sabthorpe0'),
    ('6','f','kids','2021-10-09','20:10','aa','1, aaa','1','2','120','85','2',1122334455,'1', '2021-08-12','jrearie1a'),
    ('7','g','concerts','2022-01-12','20:10','aa','43, aaa','1','2','120','76','2',null,'1', '2021-11-10','jrearie1a'),
    ('8','h','sports','2021-11-22','20:10','aa','1, aaa','1','2','12','10','2',null,'1', '2021-05-04','jrearie1a'),
    ('9','i','sports','2021-01-13','20:10','aa','1, aaa','1','2','320','250','1',1234567890,'0', '2021-01-12','jrearie1a'),
    ('10','j','parties','2021-12-23','20:10','aa','1, aaa','1','2','420','300','1',null,'0', '2021-12-22','pscurman1b'),
    ('11','k','parties','2021-11-15','20:10','aa','1, aaa','1','2','120','50','1',null,'0', '2021-11-12','pscurman1b'),
    ('12','l','concerts','2021-11-12','20:10','aa','1, aaa','1','2','100','80','1',0987654321,'0', '2021-11-12','pscurman1b'),
    ('13','m','concerts','2021-01-10','20:10','aa','1, bbb','1','2','120','100','1',null,'1', '2021-01-12','pscurman1b'),
    ('14','n','sports','2021-10-19','20:10','aa','1, aaa','1','2','130','100','1',null,'1', '2021-10-12','pscurman1b'),
    ('15','o','concerts','2021-11-13','20:10','aa','1, aaa','1','2','500','430','3',null,'1', '2021-11-12','owhiteoak1c'),
    ('16','o','sports','2021-12-21','20:10','aa','11, ccc','1','2','450','430','1',null,'1', '2021-12-12','owhiteoak1c'),
    ('17','o','kids','2021-10-03','20:10','aa','1, aaa','1','2','450','430','1',null,'1', '2021-09-12','owhiteoak1c'),
    ('18','o','sports','2021-12-07','20:10','aa','1, aaa','1','2','450','430','4',null,'1', '2021-11-13','owhiteoak1c'),
    ('19','o','standup','2021-12-15','20:10','aa','1, aaa','1','2','470','400','1',null,'1', '2021-11-13','owhiteoak1c'),
    ('20','o','concerts','2021-12-13','20:10','aa','1, aaa','1','2','460','410','2',null,'0', '2021-11-13','owhiteoak1c');



insert into deals (deal_ID, ticket_ID, ticket_price, seller, buyer, deal_datetime) values 
    ('1', '5', '34', 'sabthorpe0', 'jrearie1a', '2021-11-23 12:0:10'),
    ('2', '6', '85', 'jrearie1a', 'sabthorpe0', '2021-11-14 12:10:10'),
    ('3', '7', '76', 'jrearie1a', 'owhiteoak1c', '2021-11-10 10:0:10'),
    ('4', '8', '10', 'jrearie1a', 'owhiteoak1c', '2021-02-01 14:0:30'),
    ('5', '13', '100', 'pscurman1b', 'sabthorpe0', '2021-03-12 16:5:23'),
    ('6', '14', '100', 'pscurman1b', 'owhiteoak1c', '2021-08-22 12:20:40'),
    ('7', '15', '430', 'owhiteoak1c', 'sabthorpe0', '2021-12-12 12:40:10'),
    ('8', '16', '450', 'owhiteoak1c', 'sabthorpe0', '2021-11-11 12:50:10'),
    ('9', '17', '430', 'owhiteoak1c', 'pscurman1b', '2021-04-02 14:00:13'),
    ('10', '18', '430', 'owhiteoak1c', 'jrearie1a', '2021-01-12 7:9:50'),
    ('11', '19', '400', 'owhiteoak1c', 'jrearie1a', '2021-11-12 10:50:10');


insert into connections (username, connection_time) values 
    ('sabthorpe0', '2021-09-13 10:40:50'),
    ('sabthorpe0', '2021-11-23 12:3:10'),
    ('sabthorpe0', '2021-04-15 12:5:10'),
    ('sabthorpe0', '2021-10-01 13:30:10'),
    ('jrearie1a', '2021-10-14 2:1:10'),
    ('jrearie1a', '2021-06-06 5:6:45'),
    ('jrearie1a', '2021-09-03 15:56:11'),
    ('jrearie1a', '2021-10-19 16:33:22'),
    ('pscurman1b', '2021-11-11 12:0:34'),
    ('pscurman1b', '2021-11-02 7:34:56'),
    ('pscurman1b', '2021-11-23 17:20:15'),
    ('owhiteoak1c', '2021-11-23 17:7:30'),
    ('owhiteoak1c', '2021-11-23 8:45:10'),
    ('owhiteoak1c', '2021-11-23 13:7:20'),
    ('owhiteoak1c', '2021-11-23 12:10:40'),
    ('owhiteoak1c', '2021-12-21 13:0:10');



/*contact us data*/
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('1', 'orin nuriel', '0544557482', 'orin@gmail.com', 'good job!', '2021-09-23 12:00:10');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('2', 'mira khoury', '0546566871', 'mira@gmail.com', 'best site ever', '2021-08-23 12:00:10');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('3', 'omri chiel', '0529890123', 'omri@gmail.com', 'this is nust be grade 100', '2021-09-13 12:00:10');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('4', 'klil lahav', '0544622123', 'klil@gmail.com', 'hello', '2021-09-23 12:10:10');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('5', 'yarden nuriel', '0540809923', 'yarden@gmail.com', 'web is fun', '2021-09-15 13:5:50');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('6', 'saar chen', '0500122343', 'saar@gmail.com', 'happy new year', '2021-09-23 14:40:10');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('7', 'shiran hemo', '0500999876', 'shiran@gmail.com', 'I am hungry', '2021-09-23 12:32:12');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('8', 'hadar netzerel', '0544433098', 'hadar@gmail.com', 'Saar 0', '2021-09-23 11:33:16');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('9', 'lynn chanan', '0547776589', 'lynn@gmail.com', 'good luck', '2021-09-23 16:45:20');
insert into contacts (contact_ID, full_name, phone_number, email, content, contact_time) values ('10', 'shlomi perets', '0500098735', 'shlomi@gmail.com', 'good bye', '2021-09-23 15:19:14');
