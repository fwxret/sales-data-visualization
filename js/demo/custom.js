document.addEventListener("DOMContentLoaded", () => {
    fetchAllData(); // Gọi tất cả API khi DOM sẵn sàng
});

async function fetchAllData() {
    try {
        await fetchAveragePrice();
        await fetchTotalCategories();
        await fetchTotalCountries();
        await fetchTotalQuantity();
        await fetchMonthlyRevenue();
        await fetchCategoryData(); // Thêm logic gọi fetchCategoryData
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function fetchAveragePrice() {
    try {
        const response = await fetch('http://localhost:3001/api/average-price');
        const data = await response.json();
        document.getElementById('average-price').innerText = data.averagePrice;
    } catch (error) {
        console.error("Error fetching average price:", error);
    }
}

async function fetchTotalCategories() {
    try {
        const response = await fetch('http://localhost:3001/api/total-categories');
        const data = await response.json();
        const totalCategories = data[0]?.totalCategories || 0;
        document.getElementById('total-categories').innerText = totalCategories;
    } catch (error) {
        console.error("Error fetching total categories:", error);
    }
}

async function fetchTotalCountries() {
    try {
        const response = await fetch('http://localhost:3001/api/total-countries');
        const data = await response.json();
        const totalCountries = data[0]?.totalCountries || 0;
        document.getElementById('total-countries').innerText = totalCountries;
    } catch (error) {
        console.error("Error fetching total countries:", error);
    }
}

async function fetchTotalQuantity() {
    try {
        const response = await fetch('http://localhost:3001/api/total-quantity');
        const data = await response.json();
        const totalQuantity = data[0]?.totalQuantity || 0;
        document.getElementById('totalQuantity').innerText = totalQuantity;
    } catch (error) {
        console.error("Error fetching total quantity:", error);
    }
}

async function fetchMonthlyRevenue() {
    try {
        const response = await fetch('http://localhost:3001/api/monthly-revenue');
        const data = await response.json();
        updateChart(data);  // Cập nhật biểu đồ sau khi lấy dữ liệu
    } catch (error) {
        console.error("Error fetching monthly revenue:", error);
    }
}


/*<----*---->*/

// Hàm lấy dữ liệu danh mục và cập nhật biểu đồ
async function fetchCategoryData() {
    try {
        const response = await fetch('http://localhost:3001/api/categories'); // Sửa lại URL API
        const categories = await response.json();

        const labels = categories.map(item => item.name);
        const totals = categories.map(item => item.total);

        createOrUpdatePieChart(labels, totals); // Gọi hàm từ pie-chart-demo.js
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
}

