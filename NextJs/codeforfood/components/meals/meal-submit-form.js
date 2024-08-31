"use client";
import { useFormStatus } from "react-dom";

export default function SubmitMeal() {
  const { pending } = useFormStatus();

  return (
    <>
      <button type="submit" disabled={pending}>
        {pending ? `submitting ...` : `Share Meal`}
      </button>
    </>
  );
}
