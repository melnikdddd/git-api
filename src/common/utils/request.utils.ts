import { RequestWithUser } from '../types/request';
import { Roles } from '@prisma/client';

export const getUserIdFromReq = (
  req: RequestWithUser,
  userId: string,
): string => {
  const role = req.user['role'];
  if (role === Roles.admin || role === Roles.moderator) {
    return userId;
  }
  return req.user['sub'];
};

export const checkRoleFromReq = (req: RequestWithUser): boolean => {
  const role = req.user['role'];
  return role === Roles.moderator || role === Roles.admin;
};
