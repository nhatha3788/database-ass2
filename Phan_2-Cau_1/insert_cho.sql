USE transportation_service;
DROP PROCEDURE IF EXISTS  INSERT_CHO;

DELIMITER $$

CREATE PROCEDURE INSERT_CHO
	(MA_KIEN_HANG INT,
    MA_CHUYEN_XE INT) 
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
		
    START TRANSACTION;
    
	CALL INSERT_CHO_NOT_COMMIT(MA_KIEN_HANG, MA_CHUYEN_XE);

    COMMIT;
    SET AUTOCOMMIT = 1;
END $$

DELIMITER ;

