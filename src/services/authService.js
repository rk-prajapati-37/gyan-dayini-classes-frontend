export const authService = {
  // ...existing login, validateToken, etc.
  signup: async ({ name, email, password }) => {
    // Yahan actual API endpoint ka URL daalein
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) throw new Error('Signup failed');
    return await res.json();
  }
};