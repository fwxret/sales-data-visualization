# Sales Data Visualization

Dự án này là một ứng dụng trực quan hóa dữ liệu bán hàng từ cơ sở dữ liệu `saledb`, sử dụng các công cụ như Node.js, Express và MongoDB để xây dựng API và giao diện người dùng. Các dữ liệu bán hàng được hiển thị dưới dạng biểu đồ động, cung cấp cái nhìn sâu sắc về doanh thu, số lượng sản phẩm bán ra, và các thông tin liên quan khác.

## Mục tiêu

- **Trực quan hóa dữ liệu bán hàng** thông qua các biểu đồ để dễ dàng theo dõi và phân tích.
- **Tạo các API** để lấy dữ liệu từ cơ sở dữ liệu và cung cấp cho frontend.
- **Xây dựng bảng điều khiển (dashboard)** để hiển thị các chỉ số như doanh thu theo tháng, tổng số sản phẩm, và phân tích theo danh mục.

## Các tính năng

- **API lấy dữ liệu**: Các API sẽ cung cấp dữ liệu bán hàng từ cơ sở dữ liệu MongoDB, bao gồm:
  - Doanh thu hàng tháng.
  - Tổng số lượng sản phẩm bán ra.
  - Tổng số danh mục và quốc gia.
- **Biểu đồ doanh thu**: Dữ liệu doanh thu được biểu diễn trên biểu đồ line chart với các tháng trong năm.
- **Biểu đồ phân tích theo danh mục**: Sử dụng biểu đồ hình tròn (pie chart) để hiển thị dữ liệu phân bổ theo các danh mục sản phẩm.

## Công nghệ sử dụng

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Frontend**:
  - HTML, CSS, JavaScript
  - Chart.js (cho biểu đồ)
- **Công cụ khác**:
  - Fetch API
  - Custom JavaScript file để xử lý dữ liệu và cập nhật giao diện.

## Cách cài đặt và chạy

### 1. Cài đặt môi trường
Clone repo về máy của bạn:

```bash
git clone https://github.com/<username>/sales-data-visualization.git
cd sales-data-visualization
```

### 2.Mở trình duyệt và truy cập vào http://localhost:3001 để xem giao diện trực quan hóa dữ liệu.
Các API
Dưới đây là các API chính mà ứng dụng sử dụng:

- /api/average-price: Lấy giá trị trung bình của các sản phẩm bán ra.
- /api/total-categories: Lấy tổng số danh mục sản phẩm.
- /api/total-countries: Lấy tổng số quốc gia mà sản phẩm được bán.
- /api/total-quantity: Lấy tổng số lượng sản phẩm đã bán.
- /api/monthly-revenue: Lấy doanh thu theo tháng.
- /api/categories: Lấy dữ liệu phân bổ doanh thu theo từng danh mục sản phẩm.
-Cách sử dụng
 Khi mở trang web, ứng dụng sẽ tự động gọi các API và hiển thị dữ liệu vào các biểu đồ. Bạn sẽ thấy thông tin về doanh thu hàng tháng, các danh mục sản phẩm, và các thông số khác được cập nhật liên tục.


### 3.Preview

<img src="img/demo web.png">


- Link database:https://www.kaggle.com/datasets/yusufdelikkaya/online-sales-dataset
