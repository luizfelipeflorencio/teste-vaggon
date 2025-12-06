import axios from 'axios';

// Criar uma instância do axios com configuração base
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL base da API
  timeout: 10000, // Timeout de 10 segundos
});

// Função genérica para fazer chamadas de API com tratamento centralizado de erros
export const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await api.request({
      method,
      url,
      data,
      ...config,
    });
    return { success: true, data: response.data };
  } catch (error) {
    // Centralizar tratamento de erros aqui
    let errorMessage = 'Erro desconhecido';

    if (error.response) {
      // Erro de resposta do servidor
      errorMessage = error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Erro de rede
      errorMessage = 'Erro de conexão. Verifique sua internet.';
    } else {
      // Outro erro
      errorMessage = error.message;
    }

    console.error('API Error:', errorMessage); // Log para debug

    return { success: false, error: errorMessage };
  }
};

// Métodos específicos para conveniência
export const post = (url, data, config) => apiRequest('POST', url, data, config);
export const get = (url, config) => apiRequest('GET', url, null, config);
export const put = (url, data, config) => apiRequest('PUT', url, data, config);
export const del = (url, data, config) => apiRequest('DELETE', url, data, config);

// Exportar a instância para uso direto se necessário
export default api;
