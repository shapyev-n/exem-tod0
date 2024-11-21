"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (request: Request) => {
  const { id } = await request.json();
  try {
    await prisma.todoList.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      message: "Todo deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete todo", status: 500 });
  }
};
