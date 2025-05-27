import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card
} from '@mui/material';
import { gridSpacing } from 'store/constant';
import SensorApexChart from './SensorApexChart';

export default function Dashboard() {
  const navigate = useNavigate();

  const [sensorList, setSensorList] = useState([]);
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/pages/login');
  }, [navigate]);

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}api/data`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const sensoresUnicos = [...new Set(response.data.map((d) => d['Sensor ID']))];
        setSensorList(sensoresUnicos);
        const areasUnicas = [...new Set(response.data.map((d) => d['Área']))];
        setAreaList(areasUnicas);
      } catch (error) {
        console.error('Error al obtener sensores:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}api/data/stats`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { groupBy: 'Sensor ID' }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      {/* Card de Filtros */}
      <Grid item xs={12}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Monitoreo Energético - Datos Históricos
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="sensor-label">Sensor</InputLabel>
                <Select
                  labelId="sensor-label"
                  value={selectedSensorId}
                  label="Sensor"
                  onChange={(e) => setSelectedSensorId(e.target.value)}
                  MenuProps={menuProps}
                >
                  {sensorList.map((sensor) => (
                    <MenuItem key={sensor} value={sensor}>
                      {sensor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="area-label">Área</InputLabel>
                <Select
                  labelId="area-label"
                  value={selectedArea}
                  label="Área"
                  onChange={(e) => setSelectedArea(e.target.value)}
                  MenuProps={menuProps}
                >
                  {areaList.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Inicio"
                InputLabelProps={{ shrink: true }}
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Fin"
                InputLabelProps={{ shrink: true }}
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Card de Gráfica */}
      <Grid item xs={12} md={8}>
        {(selectedSensorId || selectedArea) && (
          <Card sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 3 }}>
            <SensorApexChart
              selectedSensorId={selectedSensorId}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              selectedArea={selectedArea}
            />
          </Card>
        )}
      </Grid>

      {/* Card de Tabla */}
      <Grid item xs={12} md={4}>
        <Card sx={{ mt: 3, p: 2, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Estadísticas de Promedio por Sensor
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Sensor</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Promedio Voltaje (V)</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Promedio Corriente (A)</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.map((row) => (
                  <TableRow key={row['Sensor ID'] || row['Área']}>
                    <TableCell>{row['Sensor ID'] || row['Área']}</TableCell>
                    <TableCell>{row.promedioVoltaje}</TableCell>
                    <TableCell>{row.promedioCorriente}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  );
}
