const createMockJWT = (payload) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = "mock-signature";
  return `${header}.${body}.${signature}`;
};

export const loginApi = async ({ email, password }) => {
  await new Promise((res) => setTimeout(res, 500));

  if (email === "admin@test.com" && password === "123456") {
    const token = createMockJWT({
      userId: 1,
      role: "admin",
      exp: Date.now() + 60 * 60 * 1000, // 1 hour expiry
    });

    return {
      token,
      user: {
        id: 1,
        role: "admin",
        email,
      },
    };
  }

  throw new Error("Invalid credentials");
};
