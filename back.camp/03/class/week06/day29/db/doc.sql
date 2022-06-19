show variables
where Variable_name="max_connections";

set global max_connections=151;

show status
where Variable_name="Threads_connected";

show processlist;

kill 104;
