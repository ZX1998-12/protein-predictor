import axios from 'axios';

// 根据环境选择API URL
const isDevelopment = process.env.NODE_ENV === 'development';
const API_URL = isDevelopment
  ? (process.env.REACT_APP_LOCAL_API_URL || 'http://localhost:5000/api')
  : (process.env.REACT_APP_API_URL || 'https://api.yourserver.com/api');

console.log('当前API地址:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 文件上传配置
const fileApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export interface PredictionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Kcat预测
export const predictKcat = async (sequence: string, substrate: string): Promise<PredictionResponse> => {
  try {
    const response = await api.post('/predict/kcat', { sequence, substrate });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Kcat预测API错误:', error);
    const errorMessage = error.response?.data?.error || '预测服务请求失败';
    const statusCode = error.response?.status;
    
    // 根据HTTP状态码定制错误信息
    if (statusCode === 503) {
      return { 
        success: false, 
        error: errorMessage
      };
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
};

export const predictKcatWithFile = async (file: File, substrateFile: File | null): Promise<PredictionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (substrateFile) {
      formData.append('substrate_file', substrateFile);
    }
    
    const response = await fileApi.post('/predict/kcat/file', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Kcat文件预测API错误:', error);
    const errorMessage = error.response?.data?.error || '文件处理过程中发生错误';
    const statusCode = error.response?.status;
    
    // 根据HTTP状态码定制错误信息
    if (statusCode === 503) {
      return { 
        success: false, 
        error: errorMessage
      };
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
};

// Km预测
export const predictKm = async (sequence: string, substrate: string): Promise<PredictionResponse> => {
  try {
    const response = await api.post('/predict/km', { sequence, substrate });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '预测过程中发生错误' 
    };
  }
};

export const predictKmWithFile = async (file: File, substrateFile: File | null): Promise<PredictionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (substrateFile) {
      formData.append('substrate_file', substrateFile);
    }
    
    const response = await fileApi.post('/predict/km/file', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '文件处理过程中发生错误' 
    };
  }
};

// Tm预测
export const predictTm = async (sequence: string): Promise<PredictionResponse> => {
  try {
    const response = await api.post('/predict/tm', { sequence });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '预测过程中发生错误' 
    };
  }
};

export const predictTmWithFile = async (file: File): Promise<PredictionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fileApi.post('/predict/tm/file', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '文件处理过程中发生错误' 
    };
  }
};

// 溶解度预测
export const predictSolubility = async (sequence: string): Promise<PredictionResponse> => {
  try {
    const response = await api.post('/predict/solubility', { sequence });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '预测过程中发生错误' 
    };
  }
};

export const predictSolubilityWithFile = async (file: File): Promise<PredictionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fileApi.post('/predict/solubility/file', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '文件处理过程中发生错误' 
    };
  }
};

// 启动子强度预测
export const predictPromoter = async (sequence: string): Promise<PredictionResponse> => {
  try {
    const response = await api.post('/predict/promoter', { sequence });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '预测过程中发生错误' 
    };
  }
};

export const predictPromoterWithFile = async (file: File): Promise<PredictionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fileApi.post('/predict/promoter/file', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '文件处理过程中发生错误' 
    };
  }
};

// RBS翻译起始率预测
export const predictRbs = async (sequence: string): Promise<PredictionResponse> => {
  try {
    const response = await api.post('/predict/rbs', { sequence });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '预测过程中发生错误' 
    };
  }
};

export const predictRbsWithFile = async (file: File): Promise<PredictionResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fileApi.post('/predict/rbs/file', formData);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || '文件处理过程中发生错误' 
    };
  }
}; 