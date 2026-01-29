

import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";

export const inngest = new Inngest({ id: "profile-marketplace" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const { data } = event;

      console.log("Clerk user created:", data.id);

      await prisma.user.upsert({
        where: { id: data.id },
        update: {
          email: data?.email_addresses?.[0]?.email_address ?? "",
          name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim(),
          image: data?.image_url ?? "",
        },
        create: {
          id: data.id,
          email: data?.email_addresses?.[0]?.email_address ?? "",
          name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim(),
          image: data?.image_url ?? "",
        },
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Inngest create user error:", error);
      throw error;
    }
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { data } = event;

      console.log("Clerk user deleted:", data.id);

      await prisma.user.delete({
        where: { id: data.id },
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Inngest delete user error:", error);
      throw error;
    }
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { data } = event;

      console.log("Clerk user updated:", data.id);

      await prisma.user.update({
        where: { id: data.id },
        data: {
          email: data?.email_addresses?.[0]?.email_address ?? "",
          name: `${data?.first_name ?? ""} ${data?.last_name ?? ""}`.trim(),
          image: data?.image_url ?? "",
        },
      });

      return { success: true };
    } catch (error) {
      console.error("❌ Inngest update user error:", error);
      throw error;
    }
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];
