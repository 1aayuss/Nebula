import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const decreaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const UserApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (UserApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: UserApiLimit.count - 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: MAX_FREE_COUNTS - 1 },
    });
  }
};

export const CheckApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const UserApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!UserApiLimit || (UserApiLimit.count != 0 && !(UserApiLimit.count < 0)))
    return true;
  else return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) {
    return MAX_FREE_COUNTS;
  }

  return userApiLimit.count;
};
