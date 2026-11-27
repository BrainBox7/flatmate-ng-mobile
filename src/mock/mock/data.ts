export const lagosAreas = ['Yaba', 'Surulere', 'Lekki', 'Ajah', 'Ikeja', 'Victoria Island', 'Ikorodu', 'Maryland'];

export const sampleQuestions = [
  { id: 'q1', text: 'How do you feel about paying bills on time?', options: ['Always on time', 'Usually on time', 'Flexible'] },
  { id: 'q2', text: 'How tidy are you?', options: ['Relaxed', 'Average', 'Very tidy'] },
  { id: 'q3', text: 'How much privacy do you need?', options: ['A lot', 'Some', 'Not much'] },
  { id: 'q4', text: 'Do you smoke?', options: ['No', 'Sometimes', 'Yes'] },
  { id: 'q5', text: 'How often do you use the kitchen?', options: ['Daily', 'A few times a week', 'Rarely'] },
];

export const sampleMatches = [
  { id: 'm1', name: 'Amaka', age: 24, score: 87, area: 'Yaba', budgetMin: 250000, budgetMax: 400000,
    reasons: ['Both non-smokers', 'Similar budget', 'Both tidy'] },
  { id: 'm2', name: 'Tunde', age: 27, score: 79, area: 'Lekki', budgetMin: 400000, budgetMax: 600000,
    reasons: ['Both pay bills on time', 'Similar move-in date', 'Both need privacy'] },
  { id: 'm3', name: 'Chioma', age: 23, score: 72, area: 'Surulere', budgetMin: 200000, budgetMax: 350000,
    reasons: ['Both non-smokers', 'Both cook often', 'Same area'] },
];
