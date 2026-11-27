import { sampleMatches, sampleQuestions } from './data';

const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockRequest(method: string, path: string, body?: any): Promise<any> {
  await wait();

  if (method === 'POST' && path === '/auth/signup') return { message: 'Code sent' };
  if (method === 'POST' && path === '/auth/resend-code') return { message: 'Code sent' };
  if (method === 'POST' && path === '/auth/verify') {
    if (body?.code !== '123456') throw new Error('That code is wrong. Try again.');
    return { token: 'mock-token' };
  }
  if (method === 'POST' && path === '/auth/login') {
    if (!body?.email || !body?.password) throw new Error('Wrong email or password.');
    return { token: 'mock-token' };
  }

  if (method === 'PUT' && path === '/profile') return { ok: true };
  if (method === 'GET' && path === '/questions') return sampleQuestions;
  if (method === 'POST' && path === '/answers') return { ok: true };

  if (method === 'POST' && path.endsWith('/respond')) return { mutual: false };

  if (method === 'GET' && path.startsWith('/matches/')) {
    const id = path.split('/')[2];
    const found = sampleMatches.find((m) => m.id === id);
    if (!found) throw new Error('Match not found.');
    return found;
  }

  if (method === 'GET' && path.startsWith('/matches')) {
    const query: Record<string, string> = {};
    (path.split('?')[1] ?? '')
      .split('&')
      .filter(Boolean)
      .forEach((pair) => {
        const [key, value] = pair.split('=');
        query[key] = decodeURIComponent(value ?? '');
      });
    return sampleMatches.filter((m) => {
      if (query.area && m.area !== query.area) return false;
      if (query.maxBudget && m.budgetMin > Number(query.maxBudget)) return false;
      return true;
    });
  }

  throw new Error('Mock API: no route for ' + method + ' ' + path);
}
