"use client"
import { useRouter } from "next/navigation";
import { MainButton, SecondButton, SubmitButton, UnsureButton, NextButton } from "@/components/ButtonComponent";
import { QuizDifficulty, ClassTag, DoneTag, DueTag, OverdueTag } from "@/components/BadgeTagComponent";

export default function Home() {
  const router = useRouter();
  return (
    <div className="mx-20 my-20 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-bold">Buttons</h1>
        </div>
        <div className="flex gap-2">
          <MainButton className="w-fit" type="submit" onClick={() => router.push("/testing")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <p>Check Dashboard</p>
          </MainButton>
          <SecondButton className="w-fit" type="submit" onClick={() => router.push("/admin/home")}>
            <p>Admin Dashboard</p>
          </SecondButton>
          <SubmitButton className="w-fit" type="submit" onClick={() => alert("Button clicked!")}>
            <p>Submit</p>
          </SubmitButton>
          <UnsureButton className="w-fit" type="submit" onClick={() => alert("Button clicked!")}>
            <p>Unsure</p>
          </UnsureButton>
          <NextButton className="w-fit" type="submit" onClick={() => alert("Button clicked!")}>
            <p>Next</p>
          </NextButton>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-bold">Tags</h1>
        </div>
        <div className="flex gap-2">
          <QuizDifficulty className="w-fit text-center">
            <p>Easy</p>
          </QuizDifficulty>
          <ClassTag className="w-fit text-center">
            <p>SMA/SMK</p>
          </ClassTag>
          <DoneTag className="w-fit text-center">
            <p>Done</p>
          </DoneTag>
          <DueTag className="w-fit text-center">
            <p>Due Soon</p>
          </DueTag>
          <OverdueTag className="w-fit text-center">
            <p>Overdue</p>
          </OverdueTag>
        </div>
      </div>
    </div>
  );
}
