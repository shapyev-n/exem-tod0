-- CreateTable
CREATE TABLE "TodoList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3),

    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);
