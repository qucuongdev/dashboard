/**
 * Format số tiền thành chuỗi hiển thị với đơn vị triệu, tỷ
 * @param value Giá trị tiền (VND)
 * @returns Chuỗi định dạng như "1.5 tỷ", "500 triệu"
 */
export const formatCurrency = (value: number): string => {
  if (value === 0) return '0';

  if (value >= 1000000000) {
    // >= 1 tỷ
    const billions = value / 1000000000;
    if (billions >= 1000) {
      // >= 1000 tỷ
      const thousands = billions / 1000;
      return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)} nghìn tỷ`;
    }
    return `${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)} tỷ`;
  } else if (value >= 1000000) {
    // >= 1 triệu
    const millions = value / 1000000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} triệu`;
  } else if (value >= 1000) {
    // >= 1 nghìn
    const thousands = value / 1000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)} nghìn`;
  } else {
    return value.toLocaleString('vi-VN');
  }
};

/**
 * Format số tiền cho tooltip hiển thị đầy đủ với dấu phẩy phân cách
 * @param value Giá trị tiền (VND)
 * @returns Chuỗi định dạng như "1,500,000,000 VND"
 */
export const formatCurrencyFull = (value: number): string => {
  return `${value.toLocaleString('vi-VN')} VND`;
};

/**
 * Tạo scale values phù hợp cho biểu đồ dựa trên giá trị max
 * @param maxValue Giá trị lớn nhất trong dataset
 * @returns Mảng các giá trị scale và max scale
 */
export const getChartScale = (
  maxValue: number
): { max: number; stepSize: number } => {
  if (maxValue <= 1000000000) {
    // <= 1 tỷ
    const max = Math.ceil(maxValue / 200000000) * 200000000; // Làm tròn lên theo bội số 200 triệu
    return { max, stepSize: max / 4 };
  } else if (maxValue <= 10000000000) {
    // <= 10 tỷ
    const max = Math.ceil(maxValue / 2000000000) * 2000000000; // Làm tròn lên theo bội số 2 tỷ
    return { max, stepSize: max / 4 };
  } else if (maxValue <= 100000000000) {
    // <= 100 tỷ
    const max = Math.ceil(maxValue / 20000000000) * 20000000000; // Làm tròn lên theo bội số 20 tỷ
    return { max, stepSize: max / 4 };
  } else {
    // > 100 tỷ
    const max = Math.ceil(maxValue / 200000000000) * 200000000000; // Làm tròn lên theo bội số 200 tỷ
    return { max, stepSize: max / 4 };
  }
};
