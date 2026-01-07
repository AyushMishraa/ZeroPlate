import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  userId?: mongoose.Types.ObjectId;
  action: string;
  entity: string;
  entityId?: string;
  ipAddress: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: String },
    ipAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model<IAuditLog>(
  "AuditLog",
  auditLogSchema
);
