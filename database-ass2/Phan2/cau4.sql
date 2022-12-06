-- đếm số kiên hàng nhận dựa vào ma khach hang
DROP FUNCTION IF EXISTS numberOfPackage;
delimiter $$
create function numberOfPackage(id INT)
returns int deterministic
begin
	declare total int;
	select count(*) into total from KIEN_HANG where KIEN_HANG.MA_NGUOI_NHAN=id;
	return total;
end $$
delimiter ; select numberOfPackage(10)





-- đếm số kiện hàng của mỗi trạng thái
DROP FUNCTION IF EXISTS numberOfStatus;
delimiter $$
create function numberOfStatus(status VARCHAR(20))
returns int deterministic
begin
	declare total int;
	select count(*) into total from YEU_CAU where YEU_CAU.TRANG_THAI=status;
	return total;
end $$
delimiter ;  SELECT numberOfStatus('DA HOAN THANH')
