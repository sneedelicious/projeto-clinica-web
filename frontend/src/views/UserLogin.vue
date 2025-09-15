<template>
  <div class="container hero">
    <h2 class="section-title">Clínica do Sérgio</h2>
    <p>Agende suas consultas de forma rápida, visualize informações importantes e tenha uma experiência completa em nossa clínica.</p>
    <div class="auth-container">
      <h3>Login</h3>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Senha" required />
        <button type="submit" class="btn btn-primary"><i class="fas fa-sign-in-alt"></i> Entrar</button>
      </form>
      <p>Não tem uma conta? <router-link to="/register">Cadastre-se</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        
        this.$store.dispatch('login', {
          token: response.data.token,
          user: response.data.user
        });

        this.$router.push('/dashboard');
      } catch (error) {
        alert('Credenciais inválidas. Por favor, tente novamente.');
        console.error('Erro de login:', error);
      }
    }
  }
};
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 40px 0;
  margin-bottom: 40px;
}
.hero h2 {
  font-size: 2.5rem;
  color: #0d47a1;
  margin-bottom: 20px;
}
.hero p {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 30px;
  color: #37474f;
}
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
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