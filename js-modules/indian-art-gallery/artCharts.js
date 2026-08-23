// Art Charts - Vanilla JS Canvas API chart components for Indian Art & Craft Gallery
import { ART_FORMS, ART_MEDIUMS, REGIONS } from './artTypes.js';

// Base Chart Class
class BaseChart {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.padding = options.padding || { top: 40, right: 20, bottom: 40, left: 60 };
    this.colors = options.colors || ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawTitle(title) {
    this.ctx.fillStyle = '#f1f5f9';
    this.ctx.font = 'bold 14px Inter, sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(title, this.padding.left, 24);
  }

  getChartArea() {
    return {
      x: this.padding.left,
      y: this.padding.top,
      width: this.width - this.padding.left - this.padding.right,
      height: this.height - this.padding.top - this.padding.bottom
    };
  }
}

// Bar Chart
export class BarChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Bar Chart');

    const chartArea = this.getChartArea();
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
    const barWidth = (chartArea.width / data.length) * 0.7;
    const gap = (chartArea.width / data.length) * 0.3;

    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.y + (chartArea.height / 5) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.x, y);
      this.ctx.lineTo(chartArea.x + chartArea.width, y);
      this.ctx.stroke();

      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(Math.round(maxValue - (maxValue / 5) * i), chartArea.x - 8, y + 4);
    }

    data.forEach((d, i) => {
      const x = chartArea.x + i * (barWidth + gap) + gap / 2;
      const barHeight = (d.value / maxValue) * chartArea.height;
      const y = chartArea.y + chartArea.height - barHeight;

      const gradient = this.ctx.createLinearGradient(x, y, x, chartArea.y + chartArea.height);
      gradient.addColorStop(0, d.color || this.colors[i % this.colors.length]);
      gradient.addColorStop(1, (d.color || this.colors[i % this.colors.length]) + '66');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      this.ctx.fill();

      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.font = 'bold 11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(d.value, x + barWidth / 2, y - 8);

      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '10px Inter, sans-serif';
      this.ctx.fillText(d.label, x + barWidth / 2, chartArea.y + chartArea.height + 20);
    });

    return this;
  }
}

// Pie Chart
export class PieChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Pie Chart');

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 20;
    const radius = Math.min(this.width, this.height) / 2 - 60;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    let startAngle = -Math.PI / 2;

    data.forEach((d, i) => {
      const sliceAngle = (d.value / total) * Math.PI * 2;

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      this.ctx.closePath();
      this.ctx.fillStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.fill();

      this.ctx.strokeStyle = '#1e293b';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;

      if (sliceAngle > 0.3) {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 12px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(d.label, labelX, labelY - 8);
        this.ctx.font = '11px Inter, sans-serif';
        this.ctx.fillText(`${Math.round((d.value / total) * 100)}%`, labelX, labelY + 8);
      }

      startAngle += sliceAngle;
    });

    // Legend
    const legendX = this.width - 120;
    let legendY = this.padding.top + 10;
    data.forEach((d, i) => {
      this.ctx.fillStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.fillRect(legendX, legendY, 12, 12);
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(d.label, legendX + 18, legendY + 10);
      legendY += 20;
    });

    return this;
  }
}

// Line Chart
export class LineChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Line Chart');

    const chartArea = this.getChartArea();
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;

    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.y + (chartArea.height / 5) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.x, y);
      this.ctx.lineTo(chartArea.x + chartArea.width, y);
      this.ctx.stroke();

      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(Math.round(maxValue - (maxValue / 5) * i), chartArea.x - 8, y + 4);
    }

    const points = [];
    data.forEach((d, i) => {
      const x = chartArea.x + (i / (data.length - 1)) * chartArea.width;
      const y = chartArea.y + chartArea.height - (d.value / maxValue) * chartArea.height;
      points.push({ x, y, label: d.label, value: d.value });
    });

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, chartArea.y + chartArea.height);
    points.forEach(p => this.ctx.lineTo(p.x, p.y));
    this.ctx.lineTo(points[points.length - 1].x, chartArea.y + chartArea.height);
    this.ctx.closePath();

    const gradient = this.ctx.createLinearGradient(0, chartArea.y, 0, chartArea.y + chartArea.height);
    gradient.addColorStop(0, (options.color || '#FF6B6B') + '44');
    gradient.addColorStop(1, (options.color || '#FF6B6B') + '00');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => this.ctx.lineTo(p.x, p.y));
    this.ctx.strokeStyle = options.color || '#FF6B6B';
    this.ctx.lineWidth = 2.5;
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    points.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = options.color || '#FF6B6B';
      this.ctx.fill();
      this.ctx.strokeStyle = '#1e293b';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    data.forEach((d, i) => {
      if (i % Math.ceil(data.length / 8) === 0 || i === data.length - 1) {
        this.ctx.fillStyle = '#94a3b8';
        this.ctx.font = '10px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(d.label, points[i].x, chartArea.y + chartArea.height + 20);
      }
    });

    return this;
  }
}

// Horizontal Bar Chart
export class HorizontalBarChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Horizontal Bar Chart');

    const chartArea = this.getChartArea();
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
    const barHeight = (chartArea.height / data.length) * 0.7;
    const gap = (chartArea.height / data.length) * 0.3;
    const labelWidth = 100;

    data.forEach((d, i) => {
      const y = chartArea.y + i * (barHeight + gap) + gap / 2;
      const barWidth = (d.value / maxValue) * (chartArea.width - labelWidth);

      this.ctx.fillStyle = '#cbd5e1';
      this.ctx.font = '12px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(d.label, chartArea.x + labelWidth - 10, y + barHeight / 2);

      this.ctx.fillStyle = 'rgba(255,255,255,0.05)';
      this.ctx.beginPath();
      this.ctx.roundRect(chartArea.x + labelWidth, y, chartArea.width - labelWidth, barHeight, 4);
      this.ctx.fill();

      const gradient = this.ctx.createLinearGradient(chartArea.x + labelWidth, y, chartArea.x + labelWidth + barWidth, y);
      gradient.addColorStop(0, d.color || this.colors[i % this.colors.length]);
      gradient.addColorStop(1, (d.color || this.colors[i % this.colors.length]) + '88');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.roundRect(chartArea.x + labelWidth, y, barWidth, barHeight, 4);
      this.ctx.fill();

      this.ctx.fillStyle = '#f1f5f9';
      this.ctx.font = 'bold 11px Inter, sans-serif';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(d.value + (options.suffix || ''), chartArea.x + labelWidth + barWidth + 8, y + barHeight / 2);
    });

    return this;
  }
}

// Radar Chart
export class RadarChart extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Radar Chart');

    const centerX = this.width / 2;
    const centerY = this.height / 2 + 20;
    const radius = Math.min(this.width, this.height) / 2 - 60;
    const sides = data.length;
    const angleStep = (Math.PI * 2) / sides;

    for (let ring = 1; ring <= 5; ring++) {
      const ringRadius = (radius / 5) * ring;
      this.ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * ringRadius;
        const y = centerY + Math.sin(angle) * ringRadius;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    data.forEach((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      this.ctx.stroke();

      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      this.ctx.fillStyle = '#cbd5e1';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(d.label, labelX, labelY);
    });

    this.ctx.beginPath();
    data.forEach((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const valueRadius = (d.value / 100) * radius;
      const x = centerX + Math.cos(angle) * valueRadius;
      const y = centerY + Math.sin(angle) * valueRadius;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    this.ctx.closePath();

    const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, (options.color || '#FF6B6B') + '66');
    gradient.addColorStop(1, (options.color || '#FF6B6B') + '22');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    this.ctx.strokeStyle = options.color || '#FF6B6B';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    data.forEach((d, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const valueRadius = (d.value / 100) * radius;
      const x = centerX + Math.cos(angle) * valueRadius;
      const y = centerY + Math.sin(angle) * valueRadius;

      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = options.color || '#FF6B6B';
      this.ctx.fill();
      this.ctx.strokeStyle = '#1e293b';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    return this;
  }
}

// Scatter Plot
export class ScatterPlot extends BaseChart {
  draw(data, options = {}) {
    this.clear();
    this.drawTitle(options.title || 'Scatter Plot');

    const chartArea = this.getChartArea();
    const maxX = Math.max(...data.map(d => d.x)) * 1.1;
    const maxY = Math.max(...data.map(d => d.y)) * 1.1;

    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.y + (chartArea.height / 5) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(chartArea.x, y);
      this.ctx.lineTo(chartArea.x + chartArea.width, y);
      this.ctx.stroke();

      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'right';
      this.ctx.fillText(Math.round(maxY - (maxY / 5) * i), chartArea.x - 8, y + 4);
    }

    data.forEach((d, i) => {
      const x = chartArea.x + (d.x / maxX) * chartArea.width;
      const y = chartArea.y + chartArea.height - (d.y / maxY) * chartArea.height;
      const radius = d.size || 8;

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = (d.color || this.colors[i % this.colors.length]) + '88';
      this.ctx.fill();
      this.ctx.strokeStyle = d.color || this.colors[i % this.colors.length];
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    if (options.xLabel) {
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(options.xLabel, chartArea.x + chartArea.width / 2, chartArea.y + chartArea.height + 30);
    }

    if (options.yLabel) {
      this.ctx.save();
      this.ctx.translate(15, chartArea.y + chartArea.height / 2);
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.font = '11px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(options.yLabel, 0, 0);
      this.ctx.restore();
    }

    return this;
  }
}

// Create Art-specific charts using the base chart classes
export function createArtFormPieChart(canvas, data) {
  return new PieChart(canvas).draw(data, { title: '🎨 Art Form Distribution' });
}

export function createMediumBarChart(canvas, data) {
  return new BarChart(canvas).draw(data, { title: '🖌 Art Mediums' });
}

export function createRegionBarChart(canvas, data) {
  return new HorizontalBarChart(canvas).draw(data, { title: '🗺 Regional Artworks' });
}

export function createPriceVsRatingChart(canvas, data) {
  return new ScatterPlot(canvas).draw(data, {
    title: '💰 Price vs Rating',
    xLabel: 'Price (₹)',
    yLabel: 'Rating'
  });
}

export function createSkillRadar(canvas, data) {
  return new RadarChart(canvas).draw(data, { title: '📊 Skill Level Distribution', color: '#4ECDC4' });
}

export function createPopularityChart(canvas, data) {
  return new LineChart(canvas).draw(data, { title: '📈 Art Popularity Trend', color: '#FFB347' });
}

// Export chart classes
export const ArtCharts = {
  BarChart,
  PieChart,
  LineChart,
  HorizontalBarChart,
  RadarChart,
  ScatterPlot,
  createArtFormPieChart,
  createMediumBarChart,
  createRegionBarChart,
  createPriceVsRatingChart,
  createSkillRadar,
  createPopularityChart
};

export default ArtCharts;