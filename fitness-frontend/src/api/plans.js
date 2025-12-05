import axiosInstance from './axiosInstance';

// Get workout plan for a user
export const getWorkoutPlan = async (userId) => {
  try {
    const response = await axiosInstance.get(`/plans/workout/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch workout plan';
  }
};

// Get diet plan for a user
export const getDietPlan = async (userId) => {
  try {
    const response = await axiosInstance.get(`/plans/diet/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch diet plan';
  }
};

// Generate plan with custom data
export const generatePlan = async (planType, userData) => {
  try {
    const response = await axiosInstance.post(`/plans/${planType}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to generate plan';
  }
};
