
// Hàm tạo hoặc cập nhật biểu đồ
function createOrUpdatePieChart(labels, totals) {
    const ctx = document.getElementById("myPieChart");

    // Kiểm tra nếu biểu đồ đã tồn tại và là một đối tượng Chart hợp lệ
    if (window.myPieChart && window.myPieChart instanceof Chart) {
        window.myPieChart.destroy(); // Hủy bỏ biểu đồ cũ
    }

    // Màu sắc sẽ được sử dụng cho các mục
    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];

    // Tạo biểu đồ mới
    window.myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: totals,
                backgroundColor: colors,
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f0b848', '#d94b33'],
                hoverBorderColor: "rgba(234, 236, 244, 1)"
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

    // Áp dụng màu sắc vào các thẻ <i> dựa trên id
    labels.forEach((label, index) => {
        const element = document.getElementById(label.toLowerCase());
        if (element) {
            element.style.color = colors[index];
        }
    });
}
