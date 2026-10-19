import { DOCTOR_REGISTRATION } from "@/config/site";

/** One row of the credential list: the doctor's registration, shown only once it has been supplied. */
export default function RegistrationRow() {
  if (!DOCTOR_REGISTRATION) return null;
  return (
    <div>
      <dt>Medical registration</dt>
      <dd>
        {DOCTOR_REGISTRATION.council}, no. {DOCTOR_REGISTRATION.number}
      </dd>
    </div>
  );
}
