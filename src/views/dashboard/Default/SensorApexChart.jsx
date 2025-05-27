import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Box, Typography, Paper } from '@mui/material';

export default function SensorApexChart({ selectedSensorId, selectedArea, fechaInicio, fechaFin }) {
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/data/filtered`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            sensor: selectedSensorId || undefined,
            area: selectedArea || undefined,
            fechaInicio: fechaInicio || undefined,
            fechaFin: fechaFin || undefined
          }
        });

        const data = response.data.map((item) => ({
          hora: `${item.Fecha} ${item.Hora}`,
          voltaje: parseFloat(item['Voltaje (V)']),
          corriente: parseFloat(item['Corriente (A)'])
        }));

        const horas = data.map(d => d.hora);
        const voltajes = data.map(d => d.voltaje);
        const corrientes = data.map(d => d.corriente);

        setChartData({
          series: [
            {
              name: 'Voltaje (V)',
              data: voltajes,
              color: '#008FFB'
            },
            {
              name: 'Corriente (A)',
              data: corrientes,
              color: '#00E396'
            }
          ],
          options: {
            chart: {
              id: 'sensor-chart',
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  reset: true
                }
              },
              background: '#fff',
              foreColor: '#333',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
              }
            },
            xaxis: {
              categories: horas,
              title: { text: 'Fecha y Hora', style: { fontWeight: 600 } },
              labels: { rotate: -45, style: { fontSize: '12px' } }
            },
            yaxis: [
              {
                title: { text: 'Voltaje (V)', style: { fontWeight: 600 } },
                labels: { style: { colors: '#008FFB' } }
              },
              {
                opposite: true,
                title: { text: 'Corriente (A)', style: { fontWeight: 600 } },
                labels: { style: { colors: '#00E396' } }
              }
            ],
            tooltip: {
              shared: true,
              intersect: false,
              theme: 'light',
              y: {
                formatter: (value) => `${value.toFixed(2)}`
              }
            },
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '14px',
              markers: {
                radius: 12
              }
            },
            stroke: {
              curve: 'smooth',
              width: 3
            },
            grid: {
              borderColor: '#e7e7e7',
              strokeDashArray: 4
            }
          }
        });
      } catch (error) {
        console.error('Error al obtener datos filtrados:', error);
      }
    };

    if (selectedSensorId || selectedArea) {
      fetchFilteredData();
    }
  }, [selectedSensorId, selectedArea, fechaInicio, fechaFin]);

  if (!chartData.series.length) {
    return <Typography sx={{ mt: 3 }}>No hay datos para mostrar.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" gutterBottom>
          Gráfica de Voltaje y Corriente
        </Typography>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={380}
        />
      </Paper>
    </Box>
  );
}
