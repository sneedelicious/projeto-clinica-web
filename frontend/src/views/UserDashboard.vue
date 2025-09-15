<template>
  <div class="container admin-panel">
    <h2 class="section-title">Painel de Controle</h2>
    <div v-if="userRole === 'patient'">
      <p>Bem-vindo(a), {{ userName }}!</p>
      <router-link to="/schedule" class="btn btn-primary" style="margin-bottom: 20px;">
        <i class="fas fa-calendar-plus"></i> Agendar Nova Consulta
      </router-link>
      <h3>Minhas Consultas</h3>
      <ul class="schedule-list">
        <li v-for="appointment in appointments" :key="appointment._id" class="schedule-item">
          <div class="schedule-info">
            <h4>{{ userName }}</h4>
            <p>
              <i class="far fa-calendar"></i> {{ formatDate(appointment.date) }} <br>
              <strong>Descrição:</strong> {{ appointment.description }} <br>
              <strong>Status:</strong> {{ appointment.status }} <br>
            </p>
            <div v-if="appointment.weather">
              <i class="fas fa-cloud-sun-rain"></i>
              <strong>Previsão do Tempo:</strong> {{ appointment.weather.description }} ({{ appointment.weather.temperature }}°C)
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div v-else-if="userRole === 'secretary'">
      <p>Bem-vinda, secretária {{ userName }}!</p>
      <h3 class="section-title">Todos os Agendamentos</h3>
      <ul class="schedule-list">
        <li v-for="appointment in appointments" :key="appointment._id" class="schedule-item">
          <div class="schedule-info">
            <h4>{{ appointment.patient.name }}</h4>
            <p>
              <i class="far fa-calendar"></i> {{ formatDate(appointment.date) }} <br>
              <strong>Endereço:</strong> {{ appointment.address.street }}, {{ appointment.address.city }} - {{ appointment.address.state }} <br>
              <strong>Descrição:</strong> {{ appointment.description }} <br>
              <strong>Status:</strong> {{ appointment.status }}
            </p>
            <div v-if="appointment.weather">
              <i class="fas fa-cloud-sun-rain"></i>
              <strong>Previsão do Tempo:</strong> {{ appointment.weather.description }} ({{ appointment.weather.temperature }}°C)
            </div>
          </div>
        </li>
      </ul>
    </div>

    <button @click="logout" class="btn btn-primary" style="background-color: #e74c3c;">
      <i class="fas fa-sign-out-alt"></i> Sair
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserDashboard',
  data() {
    return {
      appointments: []
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    userName() {
      return this.$store.state.user ? this.$store.state.user.name : 'Usuário';
    }
  },
  created() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const token = this.$store.state.token;
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: { 'x-auth-token': token }
        });
        this.appointments = response.data;
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error.response.data);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString('pt-BR');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.admin-panel {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.section-title {
  text-align: center;
  color: #0d47a1;
  margin-bottom: 30px;
  font-size: 1.8rem;
}
.btn {
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-primary {
  background-color: #1976d2;
  color: #fff;
}
.btn-primary:hover {
  background-color: #0d47a1;
  transform: translateY(-2px);
}
.schedule-list {
  list-style: none;
  margin-top: 20px;
  padding: 0;
}
.schedule-item {
  padding: 15px;
  border-left: 4px solid #1976d2;
  background: #e3f2fd;
  margin-bottom: 15px;
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.schedule-info h4 {
  color: #0d47a1;
  margin-bottom: 5px;
}
.schedule-info p {
  color: #546e7a;
}
</style>