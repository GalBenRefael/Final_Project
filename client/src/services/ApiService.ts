import { CardProps, CardWithLikes } from '../interfaces/Card';
import { User } from '../interfaces/User';
import { getToken } from '../auth/TokenManager';

export const baseUrl = 'http://localhost:3001/';
const apiUrl = baseUrl + 'api/';
const userUrl = `${apiUrl}users/`;
const cardUrl = `${apiUrl}cards/`;

export async function getCards(): Promise<CardWithLikes[]> {
  const res = await fetch(`${cardUrl}`);
  return res.json();
}

export async function getMyCards() {
  const res = await fetch(`${cardUrl}/my-cards`, {
    headers: {
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}

export async function editCard(
  _id: string,
  card: Omit<CardProps, '_id'>
): Promise<CardProps> {
  const res = await fetch(`${cardUrl}${_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken(),
    },
    body: JSON.stringify(card),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function getCardById(_id: string): Promise<CardProps> {
  const res = await fetch(`${cardUrl}${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}
export async function getUserById(_id: string): Promise<User> {
  const res = await fetch(`${userUrl}myuser/${_id}`, {
    headers: {
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}
export async function getCardByUser(_id: string): Promise<CardProps[]> {
  const res = await fetch(`${userUrl}cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken(),
    },
  });
  const { data } = await res.json();
  return data;
}

export async function addCard(
  card: Omit<CardProps, '_id'>
): Promise<CardProps> {
  const res = await fetch(`${cardUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getToken(),
    },
    body: JSON.stringify(card),
  });
  if (!res.ok) {
    const errorMessage = (await res.json()).message;
    throw new Error('Failed to create Card: ' + errorMessage);
  }
  return res.json();
}

export async function deleteCard(_id: string): Promise<CardProps> {
  const res = await fetch(`${cardUrl}${_id}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}

export async function getUsers(): Promise<Array<User>> {
  const res = await fetch(`${userUrl}`, {
    headers: {
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}

export async function editUser(
  userId: string,
  formData: FormData
): Promise<User> {
  const res = await fetch(`${userUrl}${userId}`, {
    method: 'PATCH',
    headers: {
      'x-auth-token': getToken(),
    },
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.details.map((err: any) => err.message).join(', '));
  }
  return res.json();
}

export async function deleteUser(_id: string): Promise<User> {
  const res = await fetch(`${userUrl}${_id}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}

export async function favorite(
  businessId: string
): Promise<{ success: boolean; type: string }> {
  const res = await fetch(`${userUrl}favorite/${businessId}`, {
    method: 'POST',
    headers: {
      'x-auth-token': getToken(),
    },
  });
  return res.json();
}

type NewUser = Omit<User, '_id' | 'favorites'>;

export async function register(formData: FormData): Promise<User> {
  const res = await fetch(`${userUrl}register`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();

    if (data.details) {
      throw new Error(data.details.map((err: any) => err.message).join(', '));
    } else {
      throw new Error(data.message);
    }
  }
  return res.json();
}

export async function login(user: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch(`${userUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const data = await res.json();
    if (data.details) {
      throw new Error(data.details.map((err: any) => err.message).join(', '));
    } else {
      throw new Error(data.message);
    }
  }
  return res.json();
}

export async function resetPassword({
  code,
  newPassword,
}: {
  code: string;
  newPassword: string;
}): Promise<any> {
  const res = await fetch(`${userUrl}reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      newPassword,
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    if (data.details) {
      throw new Error(data.details.map((err: any) => err.message).join(', '));
    } else {
      throw new Error(data.message);
    }
  }
  return res.json();
}

export async function verifyToken(): Promise<User | undefined> {
  const token = getToken();
  if (!token) {
    return;
  }
  const res = await fetch(`${userUrl}verify-token`, {
    method: 'POST',
    headers: {
      'x-auth-token': token,
    },
  });
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
}

export async function startPasswordReset(email: string) {
  const res = await fetch(`${userUrl}start-password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }
  return res.json();
}
