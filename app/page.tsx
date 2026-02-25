  "use client"

  import Image from "next/image";
  import { useRouter } from "next/navigation";
  import { MainButton, ActiveButton, SubmitButton, UnsureButton, NextButton } from "@/components/ButtonComponent";
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
              <p>Check Dashboard</p>
            </MainButton>
            <ActiveButton className="w-fit" type="submit" onClick={() => router.push("/admin/home")}>
              <p>Admin Dashboard</p>
            </ActiveButton>
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
