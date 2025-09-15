<template>
  <div class="container appointment-section">
    <h2 class="section-title">Agendamento de Consulta</h2>
    <form @submit.prevent="submitAppointment">
      <div class="form-row">
        <div class="form-group">
          <label for="description">Descrição da Consulta:</label>
          <textarea v-model="description" placeholder="Ex: Consulta de rotina" required class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="date">Data da Consulta:</label>
          <input type="datetime-local" v-model="date" required class="form-control">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="zipCode">CEP:</label>
          <input type="text" v-model="zipCode" placeholder="00000-000" required class="form-control">
        </div>
        <div class="form-group">
          <label for="address">Endereço:</label>
          <input type="text" v-model="address" class="form-control" placeholder="Preenchido automaticamente com o CEP" disabled>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary" style="width: 100%;">
        <i class="fas fa-calendar-plus"></i> Confirmar Agendamento
      </button>

      <div class="weather-alert">
        <i class="fas fa-cloud-sun-rain"></i>
        <div>
          <strong>Previsão do tempo para o dia da consulta:</strong>
          <p>{{ weatherMessage }}</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

// A seção <script> inteira foi substituída por esta
export default {
  name: 'AppointmentForm',
  data() {
    return {
      date: '',
      description: '',
      zipCode: '',
      address: '', // O endereço agora começará vazio
      weatherMessage: 'A previsão do tempo será exibida aqui após o agendamento.'
    };
  },
  watch: {
    // Esta função "assiste" a variável zipCode.
    // Sempre que ela mudar, o código aqui dentro será executado.
    zipCode(newZipCode) {
      // Remove caracteres não numéricos do CEP
      const cleanZipCode = newZipCode.replace(/\D/g, '');
      
      // Se o CEP tiver 8 dígitos, busca o endereço
      if (cleanZipCode.length === 8) {
        this.fetchAddress(cleanZipCode);
      } else {
        // Se não tiver 8 dígitos, limpa o campo de endereço
        this.address = '';
      }
    }
  },
  methods: {
    async fetchAddress(cep) {
      try {
        // Chama a nova rota que criamos no backend
        const response = await axios.get(`http://localhost:5000/api/cep/${cep}`);
        const { street, city, state } = response.data;
        // Preenche o campo de endereço automaticamente
        this.address = `${street}, ${city} - ${state}`;
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        this.address = 'CEP não encontrado.';
      }
    },
    async submitAppointment() {
      if (!this.address || this.address === 'CEP não encontrado.') {
        alert('Por favor, insira um CEP válido.');
        return;
      }

      try {
        const token = this.$store.state.token;
        if (!token) {
          alert('Sessão expirada. Por favor, faça login novamente.');
          this.$router.push('/');
          return;
        }

        // Agora o 'zipCode' já está no formato correto no 'data'
        const response = await axios.post('http://localhost:5000/api/appointments', {
          date: this.date,
          description: this.description,
          zipCode: this.zipCode.replace(/\D/g, '') // Envia o CEP limpo
        }, {
          headers: {
            'x-auth-token': token
          }
        });
        
        this.weatherMessage = `${response.data.weather.description} (${response.data.weather.temperature}°C)`;
        
        alert('Consulta agendada com sucesso!');
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Erro ao agendar a consulta. Verifique os dados e tente novamente.');
        console.error('Erro de agendamento:', error.response?.data || error.message);
      }
    }
  }
};
</script>

<style scoped>
.appointment-section {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}
.section-title {
  text-align: center;
  color: #0d47a1;
  margin-bottom: 30px;
  font-size: 1.8rem;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #37474f;
}
.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}
.form-control:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.weather-alert {
  display: flex;
  align-items: center;
  background: #ffecb3;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  color: #7d6608;
}
.weather-alert i {
  margin-right: 10px;
  font-size: 1.5rem;
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
</style>