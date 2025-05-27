import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import {
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

  // --------- Estados ---------
  const [sensorList, setSensorList] = useState([]);
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [stats, setStats] = useState([]);

  // --------- Redirección si no hay token ---------
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/pages/login');
  }, [navigate]);

  // --------- Opciones del menú desplegable ---------
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 300
      }
    }
  };

  // --------- Cargar sensores y áreas ---------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/data`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setSensorList([...new Set(data.map((d) => d['Sensor ID']))]);
        setAreaList([...new Set(data.map((d) => d['Área']))]);
      } catch (error) {
        console.error('Error al obtener sensores/áreas:', error);
      }
    };

    fetchData();
  }, []);

  // --------- Cargar estadísticas ---------
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/data/stats`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { groupBy: 'Sensor ID' }
        });
        setStats(data);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      {/* ---------- Card de Filtros ---------- */}
      <Grid item xs={12}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Monitoreo Energético – Filtros
          </Typography>

          <Grid container spacing={3}>
            {/* --- Select Sensor --- */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="sensor-label" sx={{ fontSize: '1.1rem' }}>
                  Sensor
                </InputLabel>
                <Select
                  labelId="sensor-label"
                  value={selectedSensorId}
                  onChange={(e) => setSelectedSensorId(e.target.value)}
                  displayEmpty
                  renderValue={(v) => v || <em>Selecciona un sensor</em>}
                  MenuProps={menuProps}
                  sx={{ height: 56, fontSize: '1rem' }}
                >
                  <MenuItem disabled value="">
                    <em>Selecciona un sensor</em>
                  </MenuItem>
                  {sensorList.map((sensor) => (
                    <MenuItem key={sensor} value={sensor} sx={{ fontSize: '1rem' }}>
                      {sensor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* --- Select Área --- */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="area-label" sx={{ fontSize: '1.1rem' }}>
                  Área
                </InputLabel>
                <Select
                  labelId="area-label"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  displayEmpty
                  renderValue={(v) => v || <em>Selecciona un área</em>}
                  MenuProps={menuProps}
                  sx={{ height: 56, fontSize: '1rem' }}
                >
                  <MenuItem disabled value="">
                    <em>Selecciona un área</em>
                  </MenuItem>
                  {areaList.map((area) => (
                    <MenuItem key={area} value={area} sx={{ fontSize: '1rem' }}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* --- Fecha Inicio --- */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Inicio"
                InputLabelProps={{ shrink: true }}
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                sx={{ height: 56 }}
              />
            </Grid>

            {/* --- Fecha Fin --- */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Fin"
                InputLabelProps={{ shrink: true }}
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                sx={{ height: 56 }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* ---------- Card de Gráfica ---------- */}
      <Grid item xs={12}>
        {(selectedSensorId || selectedArea) && (
          <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Gráfica de Consumo
            </Typography>
            <SensorApexChart
              selectedSensorId={selectedSensorId}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              selectedArea={selectedArea}
            />
          </Card>
        )}
      </Grid>

      {/* ---------- Card de Estadísticas ---------- */}
      <Grid item xs={12}>
        <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Estadísticas de Promedio por Sensor
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Sensor</strong></TableCell>
                  <TableCell><strong>Promedio Voltaje (V)</strong></TableCell>
                  <TableCell><strong>Promedio Corriente (A)</strong></TableCell>
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
