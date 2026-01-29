import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
// ❌ REMOVE fetch mode for Node
delete neonConfig.poolQueryViaFetch;

const sql = neon(process.env.DATABASE_URL);
const adapter = new PrismaNeon(sql);

const prisma = new PrismaClient({ adapter });

export default prisma;
