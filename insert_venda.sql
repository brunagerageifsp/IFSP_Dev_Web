insert into venda values ("5","1","2023-06-01","12");
insert into venda values ("2","1","2023-06-02","50");
insert into venda values ("3","1","2023-06-22","5");
insert into venda values ("4","1","2023-06-21","20");

select * from venda where dataVenda between "2023-06-01" and "2023-06-20"