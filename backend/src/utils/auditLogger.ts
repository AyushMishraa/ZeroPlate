import { AuditLog } from "../models/auditLogs";

export const logAudit = async ({
  userId,
  action,
  entity,
  entityId,
  ipAddress,
}: {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  ipAddress: string;
}) => {
  await AuditLog.create({
    userId,
    action,
    entity,
    entityId,
    ipAddress,
  });
};
