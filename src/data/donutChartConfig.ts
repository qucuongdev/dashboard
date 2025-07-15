// Donut Chart Configuration
export interface DonutChartCategory {
  title: string;
  factor: number;
  key: string;
}

export interface DonutChartDataPoint {
  percentage: number;
  color: string;
}

export interface DonutChartLegendItem {
  label: string;
  color: string;
}

export interface HorizontalBarData {
  categoryName: string;
  value: string;
  percentage: number;
  color: string;
}

// Categories configuration for donut charts
export const DONUT_CHART_CATEGORIES: DonutChartCategory[] = [
  { title: 'Trang Bị Nhóm 1', factor: 0.3, key: 'trangBiNhom1' },
  { title: 'Trang Bị Nhóm 2', factor: 0.25, key: 'trangBiNhom2' },
  { title: 'Vật Tư Nhóm 1', factor: 0.2, key: 'vatTuNhom1' },
  { title: 'Vật Tư Nhóm 2', factor: 0.15, key: 'vatTuNhom2' },
  { title: 'Vật Chất', factor: 0.1, key: 'vatChat' },
];

// Chart data configuration for each donut chart
export const DONUT_CHART_DATA: DonutChartDataPoint[] = [
  { percentage: 40, color: '#007D6E' },
  { percentage: 25, color: '#0074D6' },
  { percentage: 15, color: '#ECC94B' },
  { percentage: 10, color: '#FF851B' },
  { percentage: 10, color: '#E53E3E' },
];

// Legend configuration for donut charts
export const DONUT_CHART_LEGEND: DonutChartLegendItem[] = [
  { label: 'Cấp 1', color: '#2F855A' },
  { label: 'Cấp 2', color: '#0074D6' },
  { label: 'Cấp 3', color: '#ECC94B' },
  { label: 'Cấp 4', color: '#DD6B20' },
  { label: 'Cấp 5', color: '#FF4136' },
];

// Horizontal bar chart configuration
export const HORIZONTAL_BAR_CONFIG: HorizontalBarData[] = [
  {
    categoryName: 'Theo quy định',
    value: '1',
    percentage: 100,
    color: '#599D7B',
  },
  {
    categoryName: 'Hiện tại',
    value: '0.6',
    percentage: 60,
    color: '#EA6565',
  },
];
