import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

const signupschema = z.object({
  candidateName: z.string()
  .min(1, "Name is required"),
  domain: z.string()
  .min(1, "Domain Is required"),
  level: z.string()
  .min(1, "Level is required")
});
export function MockSetup() {
      const form = useForm({
          resolver: zodResolver(signupschema),
          defaultValues: {
            candidateName: "",
            domain: "",
            level: "",
        }});

        // const onSubmit = async (data) => console.log(data);
        
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Setup Your Mock Interview Session</CardTitle>
        <CardDescription>
          all fields are required to proceed further
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
              <Controller
                    name="candidateName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
              <Controller
                    name="domain"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Domain</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          placeholder="job role"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
              <Controller
                    name="level"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Level</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          placeholder="fresher"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />             
            <Field>
                <Button type="submit">Create Session</Button>
                <Button variant="outline" className="w-full">
                    Cancel
                </Button>
              </Field>        
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
