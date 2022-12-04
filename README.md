# database-ass2
Tui có xem phần create và populate CSDL, thấy rất ổn. Bạn có thể cập nhật lại ERD và Relational Schema cho phù hợp với SQL. Đây là phần t bổ sung:
-	Thêm AUTO_INCREMENT vào các thuộc tính ID của kiểu thực thể có khóa chính không phải là foreign key
-	Thêm UNIQUE cho Email của KHÁCH HÀNG
-	Thêm NOT NULL cho Mã cuốc xe của YÊU CẦU
-	Thêm miền giá trị GPLX cho CSDL
-	Thêm check total participation cho CHUYẾN XE LIÊN TỈNH
-	Thêm thuộc tính derived số kiện hàng trong CHUYẾN XE LIÊN TỈNH
-	Thêm thuộc tính derived khối lượng hiện tại trong CHUYẾN XE LIÊN TỈNH
-	Sửa kiểu dữ liệu cho thuộc tích Địa chỉ của KHO thành VARCHAR(100)
-	Sửa kiểu dữ liệu cho thuộc tích Địa chỉ của KHÁNH HÀNG thành VARCHAR(100)
-	Sửa kiểu dữ liệu cho thuộc tính GPLX của TÀI XẾ NỘI THÀNH
-	Sửa kiểu dữ liệu cho thuộc tính Khối lượng thành DECIMAL(4,1) vì có thể chứa giá trị 100kg 
-	Sửa lại các giá trị GPLX của các Tài xế trong populate-database
-	Sửa lại các câu lệnh INSERT CHUYẾN XE LIÊN TỈNH để phù hợp với lược đồ mới
-	Thay các câu lệnh INSERT INTO CHỞ thành các lời gọi thủ tục 
-	Trọng lượng hiện tại của CUỐC XE NỘI THÀNH có thể derived
-	Overlap không cần check
