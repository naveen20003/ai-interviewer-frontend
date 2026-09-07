// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireInput,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { useInterview } from "@/context/interviewContext";

const items = [
  { name: "domain", required: true },
  { name: "level", required: true },
  { name: "mode", required: true },
  { name: "interviewRound", required: true },
  { name: "questionNumbers", required: true },
];
// const interviewSchema = z.object({
//   domain: z.string()
//   .min(1, "Domain Is required"),
//   level: z.string()
//   .min(1, "Level is required"),
//   interviewtype: z.string()
//   .min(1, "type is required"),
//   quequantity: z.string()
//   .min(1, "Number of questions is required")
// });


function InterviewManualSetup() {
    const router = useRouter();

    const {
      startInterview,
    } = useInterview();

     let interviewtype = "standard";

  function handleSubmit(event) {
    event.preventDefault();

    const formData =
      new FormData(event.currentTarget);

    formData.append(
      "interviewtype",
      interviewtype
    );

    const plainObject =
      Object.fromEntries(formData);

    // console.log(
    //   "Starting interview:",
    //   plainObject
    // );

    startInterview(plainObject);

    router.push(
      `/interview/interviewroom/${plainObject.mode}`
    );
     }
    return (
       <Questionnaire
          className="mx-auto max-w-md bg-card text-card-foreground border p-5 rounded-md"
          defaultItem="domain"
          items={items}
          onSubmit={handleSubmit}
        >
          <QuestionnaireProgress
            className="w-full"
            render={(props, state) => (
              <div {...props}>
                <div className="mb-2 flex gap-1.5" aria-hidden="true">
                  {Array.from({ length: state.total }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < state.current
                          ? "h-1.5 flex-1 rounded-full bg-green-300"
                          : "h-1.5 flex-1 rounded-full bg-muted"
                      }
                    />
                  ))}
                </div>
                <span className="text-foreground">
                  Checkpoint {state.current} of {state.total}
                </span>
              </div>
            )}
          />
          <QuestionnaireItem name="domain" required>
            <QuestionnaireTitle>*Job Role</QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireInput
                aria-label="Another refactoring approach"
                placeholder="data analyst"
                className="bg-input"
               />
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="level" required>
              <QuestionnaireTitle>
                *Experience Level
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="frasher">
                  Frasher
                </QuestionnaireChoice>
                <QuestionnaireChoice value="intermediate">
                  intermediate
                </QuestionnaireChoice>
                <QuestionnaireChoice value="experienced">
                  Experienced
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="mode" required>
              <QuestionnaireTitle>
                *Mode
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="text">
                  Text To Text 
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="interviewRound" required>
              <QuestionnaireTitle>*Interview Type</QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="mixed">
                  Mixed (Recommended)
                </QuestionnaireChoice>
                <QuestionnaireChoice value="technical">
                  Technical
                </QuestionnaireChoice>
                <QuestionnaireChoice value="hr">
                  HR & Behavioral
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireItem name="questionNumbers" required>
              <QuestionnaireTitle>
                Number Of Questions ?
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="5">5</QuestionnaireChoice>
                <QuestionnaireChoice value="10">
                  10
                </QuestionnaireChoice>
                <QuestionnaireChoice value="15">
                  15
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
            <QuestionnaireActions>
              <QuestionnairePrevious className="bg-secondary text-secondary-foreground"/>
              <QuestionnaireNext className="bg-primary text-primary-foreground">Next</QuestionnaireNext>
              <QuestionnaireSubmit className="bg-primary text-primary-foreground">Finish plan</QuestionnaireSubmit>
            </QuestionnaireActions>
        </Questionnaire>
  )
}

export default InterviewManualSetup;