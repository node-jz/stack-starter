import type { UserResponse, UserUpdateDto } from '$entities/user.entity';
import { get, patch, post } from './base.api';

async function getMe(): Promise<UserResponse> {
  return get<UserResponse>(`user/me`, true);
}

async function update(id: string, dto: UserUpdateDto): Promise<UserResponse> {
  return patch<UserResponse>(`user/${id}`, dto, true);
}

export default {
  getMe,
  update,
};
