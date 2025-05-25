import mongoose from "mongoose";
import RoleModel from "./models/roles-permission.model";
import { RolePermissions } from "../src/utils/role-permission";
import { RoleType } from "../src/enums/role.enum"; // <-- Keep importing the enum

const MONGO_URI = "mongodb+srv://mani18012003:aIrOirrUhfJYIJsN@cluster0.kt7hrft.mongodb.net/myAppDb?retryWrites=true&w=majority";

const createOwnerRole = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Use the string value of the enum directly
    const existingRole = await RoleModel.findOne({ name: "OWNER" }); // <-- Directly use the string key

    if (!existingRole) {
      const newRole = new RoleModel({
        name: "OWNER", // <-- Use the string key directly
        permissions: RolePermissions["OWNER"], // <-- Use the string key directly
      });

      await newRole.save();
      console.log("✅ Owner role created!");
    } else {
      console.log("ℹ️ Owner role already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating Owner role:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createOwnerRole();
