
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: 'http://127.0.0.1:5500', // Chỉ cho phép từ frontend đang chạy ở 127.0.0.1:5500
  methods: ['GET', 'POST', 'OPTIONS'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
}));

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/saledb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Định nghĩa schema và model cho bảng `sales`
const saleSchema = new mongoose.Schema({
  InvoiceNo: String,
  StockCode: String,
  Description: String,
  Quantity: Number,
  InvoiceDate: Date,
  UnitPrice: Number,
  CustomerID: String,
  Country: String,
  Discount: Number,
  Category: String
});

const Sale = mongoose.model('Sale', saleSchema);

// API để lấy tổng số lượng sản phẩm đã bán
app.get('/api/total-quantity', async (req, res) => {
  try {
    const totalQuantity = await Sale.aggregate([
      { $group: { _id: null, totalQuantity: { $sum: "$Quantity" } } }
    ]);
    res.json(totalQuantity);
  } catch (error) {
    res.status(500).send('Error fetching total quantity');
  }
});

// API để lấy giá trung bình của sản phẩm
app.get('/api/average-price', async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: "$UnitPrice" }
                }
            }
        ]);

        // Làm tròn giá trị trung bình tới 2 chữ số sau dấu phẩy
        const averagePrice = result[0] ? result[0].averagePrice.toFixed(2) : 0;

        res.json({ averagePrice: averagePrice });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving data" });
    }
});


// API để lấy tổng số danh mục
app.get('/api/total-categories', async (req, res) => {
  try {
    const totalCategories = await Sale.aggregate([
      { $group: { _id: "$Category" } },
      { $count: "totalCategories" }
    ]);
    res.json(totalCategories);
  } catch (error) {
    res.status(500).send('Error fetching total categories');
  }
});

// API để lấy tổng số quốc gia
app.get('/api/total-countries', async (req, res) => {
  try {
    const totalCountries = await Sale.aggregate([
      { $group: { _id: "$Country" } },
      { $count: "totalCountries" }
    ]);
    res.json(totalCountries);
  } catch (error) {
    res.status(500).send('Error fetching total countries');
  }
});


app.get('/api/monthly-revenue', async (req, res) => {
  try {
    // Lấy tất cả các đơn hàng từ cơ sở dữ liệu
    const sales = await Sale.find();

    // Mảng chứa tổng doanh thu của mỗi tháng (12 tháng)
    const monthlyRevenue = Array(12).fill(0);

    // Duyệt qua các đơn hàng và tính tổng doanh thu theo tháng
    sales.forEach(order => {
      const date = new Date(order.InvoiceDate);
      const month = date.getMonth(); // Lấy tháng từ 0-11

      const revenue = (order.Quantity * order.UnitPrice) * (1 - order.Discount); // Tính doanh thu của đơn hàng
      monthlyRevenue[month] += revenue; // Cộng doanh thu vào tháng tương ứng
    });

    // Làm tròn các doanh thu theo tháng, giữ lại 2 chữ số thập phân
    const roundedMonthlyRevenue = monthlyRevenue.map(amount => amount.toFixed(2));

    // Trả về mảng doanh thu theo tháng đã làm tròn
    res.json(roundedMonthlyRevenue);
  } catch (error) {
    res.status(500).send('Error fetching monthly revenue');
  }
});


// API để lấy tên danh mục và tổng số lượng sản phẩm trong từng danh mục
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Sale.aggregate([
      {
        $group: {
          _id: "$Category", // Nhóm theo danh mục
          total: { $sum: "$Quantity" } // Tính tổng số lượng sản phẩm
        }
      },
      {
        $project: {
          _id: 0, // Ẩn `_id`
          name: "$_id", // Đổi `_id` thành `name`
          total: 1 // Giữ lại tổng số lượng
        }
      }
    ]);

    res.json(categories); // Trả về danh sách các danh mục và tổng số lượng
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
});





// Lắng nghe trên cổng 3001
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

/*
Tổng số lượng sản phẩm đã bán:

http://localhost:3001/api/total-quantity


Giá trung bình của các sản phẩm:

http://localhost:3001/api/average-price


Tổng số danh mục sản phẩm:

http://localhost:3001/api/total-categories


Tổng số quốc gia:

http://localhost:3001/api/total-countries


Tong so danh muc va ten danh muc
http://localhost:3001/api/categories


*/