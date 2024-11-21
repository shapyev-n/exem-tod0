"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (req: Request) => {
  const { id, title, image } = await req.json();

  try {
    const data = await prisma.todoList.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        image,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
};
