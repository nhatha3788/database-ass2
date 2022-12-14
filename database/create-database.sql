DROP SCHEMA IF EXISTS transportation_service;
CREATE SCHEMA transportation_service;
USE  transportation_service;

-- DERIVED DOANH THU
-- CHECK TOTAL PARTICIPATION
CREATE TABLE KHACH_HANG (
    MA_KH INT AUTO_INCREMENT,
    SSN CHAR(9) NOT NULL UNIQUE,
    TEN VARCHAR(15) NOT NULL,
    EMAIL VARCHAR(20) UNIQUE,
    PRIMARY KEY (MA_KH)
);

-- NGUOI NHAN PHAI CO KIEN HANG VA BBN
CREATE TABLE NGUOI_NHAN (
    NID INT,
    PRIMARY KEY (NID),
    FOREIGN KEY (NID)
        REFERENCES KHACH_HANG (MA_KH)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- NGUOI GUI PHAI CO KIEN HANG VA BBG
CREATE TABLE NGUOI_GUI (
    GID INT,
    PRIMARY KEY (GID),
    FOREIGN KEY (GID)
        REFERENCES KHACH_HANG (MA_KH)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- CHECK TOTAL PARTICIPATION
-- CHECK DISJOINT
CREATE TABLE NHAN_VIEN (
    MA_NV INT AUTO_INCREMENT,
    SSN VARCHAR(9) NOT NULL UNIQUE,
    TEN VARCHAR(25) NOT NULL,
    PRIMARY KEY (MA_NV)
);

CREATE TABLE NGUOI_QUAN_LY (
    MA_NV INT,
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- TINH PHAI CO KHO
CREATE TABLE TINH (
    MA_TINH INT,
    TEN VARCHAR(10) NOT NULL UNIQUE,
    PRIMARY KEY (MA_TINH)
);

CREATE TABLE KHO (
    MA_KHO INT AUTO_INCREMENT,
    DIA_CHI VARCHAR(100) NOT NULL,
    TEN_KHO VARCHAR(10) NOT NULL,
    DIEN_TICH DECIMAL(10 , 2 ) NOT NULL,
    MA_QUAN_LY INT NOT NULL UNIQUE,
    MA_TINH INT NOT NULL,
    PRIMARY KEY (MA_KHO),
    FOREIGN KEY (MA_TINH)
        REFERENCES TINH (MA_TINH)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_QUAN_LY)
        REFERENCES NGUOI_QUAN_LY (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE XE_NOI_THANH (
    MA_XE INT AUTO_INCREMENT,
    SO_XE VARCHAR(10) NOT NULL UNIQUE,
    TRONG_TAI INT NOT NULL,
    PRIMARY KEY (MA_XE)
);

CREATE TABLE TAI_XE_NOI_THANH (
    MA_NV INT,
    GPLX CHAR(1) NOT NULL CHECK (GPLX IN ('B', 'C')),
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE LO_XE_NOI_THANH (
    MA_NV INT,
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- TRONG LUONG HIEN TAI DERIVED 
-- KHO PHAI PHU HOP VOI NOI GUI, NOI NHAN CUA KIEN HANG VA MOT TRONG CAC DIA CHI CUA NGUOI GUI, NGUOI NHAN
CREATE TABLE CUOC_XE_NOI_THANH (
    MA_CHUYEN INT AUTO_INCREMENT,
    MA_KHO INT NOT NULL,
    MA_XE INT NOT NULL,
    MA_TAI_XE INT NOT NULL,
    MA_LO_XE INT NOT NULL,
    TRONG_LUONG_HIEN_TAI DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (MA_CHUYEN),
    FOREIGN KEY (MA_KHO)
        REFERENCES KHO (MA_KHO)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_XE)
        REFERENCES XE_NOI_THANH (MA_XE)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_TAI_XE)
        REFERENCES TAI_XE_NOI_THANH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_LO_XE)
        REFERENCES LO_XE_NOI_THANH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- DERIVED SO KIEN HANG
-- CHECK NGAY GUI
CREATE TABLE BIEN_BAN_GUI(
BBGID INT AUTO_INCREMENT,
NGAY_GUI DATE NOT NULL,
PHI_NOI_THANH DECIMAL(10,2) CHECK(PHI_NOI_THANH >= 0) NOT NULL,
MA_CUOC_XE INT,
MA_NGUOI_GUI INT NOT NULL,
TONG_KHOI_LUONG INT,
PRIMARY KEY (BBGID),
FOREIGN KEY (MA_CUOC_XE) REFERENCES CUOC_XE_NOI_THANH (MA_CHUYEN) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (MA_NGUOI_GUI) REFERENCES NGUOI_GUI (GID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- DERIVED SO LUONG
-- CHECK NGAY NHAN
-- MA SO THU TU CUA BB PHAI THEO THOI GIAN
CREATE TABLE BIEN_BAN_NHAN (
BBNID INT AUTO_INCREMENT,
NGAY_NHAN DATE NOT NULL,
PHI_NOI_THANH DECIMAL(10,2) CHECK (PHI_NOI_THANH >= 0) NOT NULL,
MA_CUOC_XE INT,
MA_NGUOI_NHAN INT NOT NULL,
TONG_KHOI_LUONG INT,
PRIMARY KEY (BBNID),
FOREIGN KEY (MA_CUOC_XE) REFERENCES CUOC_XE_NOI_THANH (MA_CHUYEN) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (MA_NGUOI_NHAN) REFERENCES NGUOI_NHAN (NID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CHECK NOI DI, NOI DEN
CREATE TABLE KIEN_HANG (
    ID INT AUTO_INCREMENT,
    LOAI VARCHAR(20) NOT NULL CHECK (LOAI IN ('THONG THUONG', 'DE VO')),
    KHOI_LUONG DECIMAL(4 , 1 ) NOT NULL CHECK (KHOI_LUONG > 0),
    NOI_DI VARCHAR(200) NOT NULL,
    NOI_DEN VARCHAR(200) NOT NULL,
    PHI_LIEN_TINH DECIMAL(10 , 2 ) NOT NULL CHECK (PHI_LIEN_TINH > 0),
    MA_NGUOI_NHAN INT NOT NULL,
    MA_NGUOI_GUI INT NOT NULL,
    MA_BBN INT NOT NULL,
    MA_BBG INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (MA_NGUOI_NHAN)
        REFERENCES NGUOI_NHAN (NID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_NGUOI_GUI)
        REFERENCES NGUOI_GUI (GID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_BBG)
        REFERENCES BIEN_BAN_GUI (BBGID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_BBN)
        REFERENCES BIEN_BAN_NHAN (BBNID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- YEU CAU PHAI CO UOC LUONG
CREATE TABLE YEU_CAU (
    MA_NGUOI_GUI INT,
    MA_SO INT,
    TRANG_THAI VARCHAR(20) NOT NULL CHECK (TRANG_THAI IN ('CHUA XU LY' , 'DANG XU LY', 'DA HOAN THANH')),
    MA_CUOC_XE INT NOT NULL,
    PRIMARY KEY (MA_NGUOI_GUI , MA_SO),
    FOREIGN KEY (MA_NGUOI_GUI)
        REFERENCES NGUOI_GUI (GID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_CUOC_XE)
        REFERENCES CUOC_XE_NOI_THANH (MA_CHUYEN)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE UOC_LUONG_HANG_HOA (
    MA_NGUOI_GUI INT,
    MA_SO_YEU_CAU INT,
    LOAI VARCHAR(20),
    KHOI_LUONG DECIMAL(3 , 1 ) NOT NULL CHECK (KHOI_LUONG > 0),
    SO_LUONG INT NOT NULL,
    PRIMARY KEY (MA_NGUOI_GUI , MA_SO_YEU_CAU , LOAI),
    FOREIGN KEY (MA_NGUOI_GUI , MA_SO_YEU_CAU)
        REFERENCES YEU_CAU (MA_NGUOI_GUI , MA_SO)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NGUOI_DIEU_HANH (
    MA_NV INT,
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CONTAINER (
    MA_XE INT AUTO_INCREMENT,
    SO_XE VARCHAR(10) UNIQUE NOT NULL,
    TRONG_TAI INT NOT NULL CHECK (TRONG_TAI > 0),
    PRIMARY KEY (MA_XE)
);

CREATE TABLE TAI_XE_LIEN_TINH (
    MA_NV INT,
    GPLX CHAR(1) NOT NULL CHECK (GPLX IN ('B','C')),
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE LO_XE_LIEN_TINH (
    MA_NV INT,
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NHAN_VIEN_KHO (
    MA_NV INT,
    PRIMARY KEY (MA_NV),
    FOREIGN KEY (MA_NV)
        REFERENCES NHAN_VIEN (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- DERIVED SO KIEN HANG
-- CHECK NGAY XUAT, NGAY NHAP
-- CHECK KHO DI, KHO DEN
-- KHO DI, KHO DEN PHAI PHU HOP VOI NOI GUI, NOI NHAN
-- MA SO THU TU CAC CHUYEN XE PHAI THEO THOI GIAN
CREATE TABLE CHUYEN_XE_LIEN_TINH (
    MA_CHUYEN INT AUTO_INCREMENT,
    QUANG_DUONG DECIMAL(10 , 2 ) CHECK (QUANG_DUONG > 0),
    MA_XE INT NOT NULL,
    MA_TAI_XE INT NOT NULL,
    MA_LO_XE INT NOT NULL,
    MA_KHO_DI INT NOT NULL,
    NGAY_XUAT_KHO DATE NOT NULL,
    MA_NGUOI_XUAT INT NOT NULL,
    MA_KHO_DEN INT NOT NULL,
    NGAY_NHAP_KHO DATE NOT NULL,
    MA_NGUOI_NHAP INT NOT NULL,
	SO_KIEN_HANG INT NOT NULL DEFAULT 0,
    KHOI_LUONG_HIEN_TAI DECIMAL(7,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (MA_CHUYEN),
    FOREIGN KEY (MA_KHO_DI)
        REFERENCES KHO (MA_KHO)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_KHO_DEN)
        REFERENCES KHO (MA_KHO)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_XE)
        REFERENCES CONTAINER (MA_XE)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_TAI_XE)
        REFERENCES TAI_XE_LIEN_TINH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_LO_XE)
        REFERENCES LO_XE_LIEN_TINH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_NGUOI_XUAT)
        REFERENCES NHAN_VIEN_KHO (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_NGUOI_NHAP)
        REFERENCES NHAN_VIEN_KHO (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- CHECK TOTAL PARTICIPATION CUA KIEN HANG
-- CHECK TOTAL PARTICIPATION CUA CHUYEN XE LIEN TINH
CREATE TABLE CHO (
    MA_KIEN_HANG INT,
    MA_CHUYEN_XE INT,
    PRIMARY KEY (MA_KIEN_HANG , MA_CHUYEN_XE),
    FOREIGN KEY (MA_KIEN_HANG)
        REFERENCES KIEN_HANG (ID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_CHUYEN_XE)
        REFERENCES CHUYEN_XE_LIEN_TINH (MA_CHUYEN)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- PHAI KHOP VOI THONG TIN VE TAI XE VA CONTAINER O CAC CHUYEN XE
CREATE TABLE LAI (
    MA_TAI_XE INT,
    MA_CONTAINER INT,
    PRIMARY KEY (MA_TAI_XE , MA_CONTAINER),
    FOREIGN KEY (MA_TAI_XE)
        REFERENCES TAI_XE_LIEN_TINH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_CONTAINER)
        REFERENCES CONTAINER (MA_XE)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE GAN (
    MA_NGUOI_GAN INT,
    MA_TAI_XE INT,
    MA_NGUOI_GUI INT,
    MA_SO_YEU_CAU INT,
    PRIMARY KEY (MA_NGUOI_GAN , MA_TAI_XE , MA_NGUOI_GUI , MA_SO_YEU_CAU),
    FOREIGN KEY (MA_NGUOI_GAN)
        REFERENCES NGUOI_DIEU_HANH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_TAI_XE)
        REFERENCES TAI_XE_NOI_THANH (MA_NV)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (MA_NGUOI_GUI , MA_SO_YEU_CAU)
        REFERENCES YEU_CAU (MA_NGUOI_GUI , MA_SO)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- CHECK SDT HOP LE
-- MOI KHACH HANG PHAI CO SDT
CREATE TABLE SDT_KHACH_HANG (
    SDT VARCHAR(10),
    MA_KH INT,
    PRIMARY KEY (SDT , MA_KH),
    FOREIGN KEY (MA_KH)
        REFERENCES KHACH_HANG (MA_KH)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- MOI KHACH HANG PHAI CO DIA CHI
CREATE TABLE DIA_CHI_KHACH_HANG (
    DIA_CHI VARCHAR(100),
    MA_KH INT,
    PRIMARY KEY (DIA_CHI , MA_KH),
    FOREIGN KEY (MA_KH)
        REFERENCES KHACH_HANG (MA_KH)
        ON DELETE CASCADE ON UPDATE CASCADE
);
