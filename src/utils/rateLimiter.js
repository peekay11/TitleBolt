const RATE_LIMIT_KEY = 'titlebolt_generations';
const MAX_FREE_GENERATIONS = 5;
const RESET_HOURS = 24;

export const checkRateLimit = (isSignedIn) => {
  if (isSignedIn) return { allowed: true, remaining: Infinity };

  const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{}');
  const now = Date.now();
  const resetTime = data.resetTime || now;

  if (now > resetTime) {
    const newData = {
      count: 0,
      resetTime: now + (RESET_HOURS * 60 * 60 * 1000)
    };
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(newData));
    return { allowed: true, remaining: MAX_FREE_GENERATIONS };
  }

  const remaining = MAX_FREE_GENERATIONS - (data.count || 0);
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    resetTime
  };
};

export const incrementUsage = () => {
  const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{}');
  data.count = (data.count || 0) + 1;
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
};

export const getTimeUntilReset = (resetTime) => {
  const hours = Math.ceil((resetTime - Date.now()) / (1000 * 60 * 60));
  return hours;
};
