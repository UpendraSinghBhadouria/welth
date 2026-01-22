import { Transaction } from "@/lib/generated/prisma/client";
import { RecurringInterval } from "@/lib/generated/prisma/enums";

export const isNewMonth = (lastAlertDate: Date, currentDate: Date) => {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
};

export const calculateNextRecurringDate = (
  startDate: Date,
  interval: RecurringInterval
) => {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
};

export const resizeImage = async (file: File): Promise<File> => {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  await new Promise((res) => (img.onload = res));

  const canvas = document.createElement("canvas");
  const maxWidth = 1024; // perfect for receipts
  const scale = Math.min(maxWidth / img.width, 1);

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob>((res, rej) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          res(blob);
        } else {
          rej(new Error("Failed to create blob from canvas"));
        }
      },
      "image/jpeg",
      0.7
    );
  });

  return new File([blob], file.name, { type: "image/jpeg" });
};

export const isTransactionDue = (transaction: Transaction) => {
  // If no lastProcessed date, transaction is due
  if (!transaction.lastProcessed) return true;

  const today = new Date();
  const nextDue = transaction.nextRecurringDate
    ? new Date(transaction.nextRecurringDate)
    : null;

  // Compare with nextDue date
  return nextDue !== null && nextDue <= today;
};

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_BASE_URL_DEV;
